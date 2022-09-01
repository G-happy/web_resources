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
import { getPermissionListAPI, getRoleDetailAPI } from '@/api'
import { tranListToTreeData } from '@/utils'
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
      permData: [],
      permIds: []
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('update:managerDialog', false)
    },
    async getPermissionList(id) {
      const res = await getPermissionListAPI()
      const { permIds } = await getRoleDetailAPI(id)
      this.permData = tranListToTreeData(res, '0')
      this.permIds = permIds
    },
    // 确认按钮(提交)
    submitFn() {
      this.handleClose()
    }
  }
}
</script>
