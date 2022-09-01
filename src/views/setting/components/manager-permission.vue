<template>
  <el-dialog
    title="分配权限"
    :visible="managerDialog"
    :before-close="handleClose"
  >
    <el-tree
      ref="permTree"
      :data="permData"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="['62f0d56637ecc10a881557f5']"
      :props="{label:'name'}"
      default-expand-all
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="submitFn">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionListAPI } from '@/api'
export default {
  name: 'HrsaasManagerPermission',
  props: {
    managerDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permData: [
        {
          code: 'employees',
          description: '用户管理菜单',
          enVisible: '1',
          id: '604f7df5f900be1850edb152',
          name: '员工管理',
          pid: '0',
          type: 1,
          children: [
            {
              code: '214234',
              description: '412214',
              enVisible: '0',
              id: '62f0d56637ecc10a881557f5',
              name: '智商250',
              pid: '604f7df5f900be1850edb152',
              type: 2
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('update:managerDialog', false)
    },
    async getPermissionList() {
      const res = await getPermissionListAPI()

      console.log(res)
    },
    // 确认按钮(提交)
    submitFn() {
      this.handleClose()
    }
  }
}
</script>
