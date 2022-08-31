<template>
  <el-dialog
    title="分配角色"
    :visible="value"
    :before-close="handleClose"
  >
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="role in rolesList" :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button :loading="loading" type="primary" size="small" @click="submitAssign">确定</el-button>
        <el-button size="small" @click="$emit('input', false)">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRolesListAPI, getUserAvator, assignRolesAPI } from '@/api'
export default {
  name: 'HrsaasAssignRole',
  //   model: { event: 'update' },
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleIds: [], // 选中角色的id列表
      rolesList: [], // 角色列表
      loading: false
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('input', false)
      this.roleIds = []
    },
    // 提交
    async submitAssign() {
      try {
        this.loading = true
        await assignRolesAPI({ id: this.$attrs['user-id'], roleIds: this.roleIds })
        this.$message.success('更新权限成功')
        this.handleClose()
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    },
    // 获取所有角色信息
    async getRolesList() {
      const { rows } = await getRolesListAPI()
      this.rolesList = rows || []
    },
    // 根据 id 获取员工信息
    async getUserDetail() {
      await this.$nextTick()
      const { roleIds } = await getUserAvator(this.$attrs['user-id'])
      this.roleIds = roleIds
    }
  }
}
</script>
