<template>
  <!-- 添加角色的弹窗 -->
  <div>
    <el-dialog
      :title="`${ruleForm.id?'修改':'新增'}角色`"
      :visible="addDialogVisible"
      width="50%"
      :before-close="CancelFn"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="addRoleFormRules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="ruleForm.description" />
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CancelFn">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submitFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRolesAPI, updataRolesAPI } from '@/api'
import { mapGetters } from 'vuex'
import { addRoleFormRules } from '@/utils/rules'
export default {
  data() {
    return {
      ruleForm: {
        description: '',
        name: ''
      },
      //   校验规则
      addRoleFormRules: addRoleFormRules,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['addDialogVisible'])
  },
  methods: {
    CancelFn() {
      this.ruleForm = {
        description: '',
        name: ''
      }
      this.$store.commit('change_DialogVisible', false)
    },
    // 确认
    async submitFn() {
      try {
        // 表单预校验
        await this.$refs.ruleForm.validate()
        this.loading = true
        this.ruleForm.id ? await updataRolesAPI(this.ruleForm) : await addRolesAPI(this.ruleForm)
        this.$message.success(`角色${this.ruleForm.id ? '编辑' : '新增'}成功`)
        // 刷新列表
        this.$parent.getRolesListInfo()
        this.ruleForm = {
          description: '',
          name: ''
        }
        // 关闭弹窗
        this.$store.commit('change_DialogVisible', false)
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    }

  }
}
</script>

<style>

</style>
