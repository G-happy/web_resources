<template>
  <el-dialog title="新增员工" :visible="showDialog" :before-close="_reset">
    <!-- 表单 -->
    <el-form ref="formDataRef" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input v-model="formData.departmentName" style="width:80%" placeholder="请选择部门" @focus="getDepartments" /> -->
        <!-- 级联选择器 -->
        <el-cascader v-model="formData.departmentName" :options="treeData" :show-all-levels="false" :props="defaultProps" @focus="getDepartments" @change="handleChange" />
        <!-- 树形控件 -->
        <!-- <el-tree
          v-if="showTree"
          v-loading="treeLoading"
          :data="treeData"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="selectNode"
        /> -->
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择日期" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="_reset">取消</el-button>
          <el-button type="primary" size="small" @click="submitFn">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import employees from '@/api/constant/employees'
import { getDepartmentsAPI, addEmployeeAPI } from '@/api'
import { tranListToTreeData } from '@/utils'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 表单数据
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],

        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'change' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],

        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      hireType: employees.hireType,
      treeData: [],
      // defaultProps: {
      //   label: 'name'
      // },
      defaultProps: {
        label: 'name',
        value: 'name',
        expandTrigger: 'hover'
      },
      showTree: false,
      treeLoading: false,
      submitLoading: false
    }
  },
  methods: {
    // 重置和清空表单数据  /  或者取消按钮
    _reset() {
      // 重置校验
      this.$refs.formDataRef.resetFields()
      // 关闭弹层
      this.$emit('update:showDialog', false)
      // 关闭部门树
      this.show = false
      // 清空表单
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
    },
    // 获取组织结构中的部门
    async getDepartments() {
      this.showTree = true
      this.treeLoading = true
      const { depts } = await getDepartmentsAPI()
      this.treeData = tranListToTreeData(depts, '')
      this.treeLoading = false
    },
    // 赋值
    selectNode(currentNode) {
      this.formData.departmentName = currentNode.name
      this.showTree = false
    },
    // 提交确认
    async submitFn() {
      try {
        // 预校验
        await this.$refs.formDataRef.validate()
        // 按钮加载状态
        this.submitLoading = true
        // 新增接口
        await addEmployeeAPI(this.formData)
        // 提示信息
        this.$message.success('新增员工成功')
        // 清空表单
        this._reset()
        // 刷新页面(初始化数据)
        this.$emit('getEmployeesDetailInfo')
      } catch (error) {
        return error
      } finally {
        this.submitLoading = false
      }
    },
    handleChange(val) {
      this.formData.departmentName = val[val.length - 1]
    }
  }
}
</script>
<style lang="less" scoped>
.el-cascader{
  width: 80%;
}
</style>

