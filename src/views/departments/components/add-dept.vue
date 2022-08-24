<template>
  <!-- 新增部门的弹层 -->
  <!-- before-close 为点击关闭按钮和遮罩层关闭弹层的回调 -->
  <el-dialog :title="title" :visible.sync="showDialog" :before-close="cancelBtn">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="formRef" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- 下拉框聚焦的时候获取员工简单列表 -->
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeesSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>

    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="sunbitDept">确定</el-button>
        <el-button size="small" @click="cancelBtn">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentsAPI, addDepartmentsAPI, getEmployeesSimpleAPI, getDepartDetailAPI, editDepartDetailAPI } from '@/api'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 当前点击的节点(部门)
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 检查部门是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      // value 是当前部门名称
      // 先要获取最新的组织架构数据列表
      const { depts } = await getDepartmentsAPI()
      let isRepeat
      // 区分新增和编辑
      if (this.formData.id) {
        // 1. 编辑(同级部门下,不能和其他的部门名称重复)
        // 当前点击部门的所有同级部门,且不包含自己
        const lists = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)
        // 判断 lists 中是否有 和自己相同的name
        isRepeat = lists.some(item => item.name === this.treeNode.name)
      } else {
        // 2. 新增
        // 当前点击部门的所有子部门
        const list = depts.filter(item => item.pid === this.treeNode.id)
        // 判断是否存在相同的部门
        isRepeat = list.some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`同级部门下已存在'${value}'部门`)) : callback()
    }
    // 检查编码重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartmentsAPI()
      let isRepeat
      if (this.formData.id) {
        // 1. 编辑
        // 排除自己
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        // 2. 新增
        // 这里加一个 value不为空 因为我们的部门有可能没有code
        isRepeat = depts.some(item => item.code === value && value)
      }
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      // 定义表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }],

        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }],

        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      // 员工人员列表
      peoples: []
    }
  },
  computed: {
    title() {
      // 根据 formData 中是否有 id 属性
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    // 取消 / 点击关闭按钮和阴影区域
    cancelBtn() {
      // 移除校验结果
      this.$refs.formRef.resetFields()
      // 清空表单数据
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 关闭弹窗
      this.$emit('update:showDialog', false)
    },
    // 获取员工简单列表(部门负责人数据)
    async getEmployeesSimple() {
      this.peoples = await getEmployeesSimpleAPI()
    },
    // 确认按钮
    sunbitDept() {
      this.$refs.formRef.validate(async valid => {
        // valid 的值为布尔值
        if (valid) {
          // 区分时编辑还是添加
          if (this.formData.id) {
            // 1. 编辑
            await editDepartDetailAPI(this.formData)
            this.$message.success('编辑部门成功!')
          } else {
            // 2. 添加
            // 添加的新部门的pid,为父级部门的id,代表是在当前部门下添加新部门
            await addDepartmentsAPI({ ...this.formData, pid: this.treeNode.id })
            // 信息提示
            this.$message.success('新增部门成功!')
          }
          // 关闭弹窗
          // 格式:  this.$emit('update:props中的值', 修改后的值)
          // 含义:  将props中的值 showDialog 改为 value
          // 父组件中需要用.sync 修饰符
          this.$emit('update:showDialog', false)
          // 清空表单数据
          this.$refs.formRef.resetFields()
          this.formData = {
            name: '', // 部门名称
            code: '', // 部门编码
            manager: '', // 部门管理者
            introduce: '' // 部门介绍
          }
          // 刷新页面(重新获取数据)
          this.$emit('addDepts')
        }
      })
    },
    // 根据id获取部门详情
    async getDepartDetail(id) {
      this.formData = await getDepartDetailAPI(id)
    }

  }
}
</script>

<style>

</style>
