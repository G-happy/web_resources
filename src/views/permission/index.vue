<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools :show-left="false">
        <template v-slot:after>
          <el-button type="primary" size="small" @click="add('0',1)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table
        v-loading="loading"
        border
        :data="list"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        row-key="id"
      >
        <el-table-column label="序号" type="index" />
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.type === 1" type="text" icon="el-icon-circle-plus-outline" style="color:#67C23A;" @click="add(row.id,2)">添加</el-button>
            <el-button type="text" icon="el-icon-edit" @click="edit(row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              style="color:#F56C6C;"
              @click="del(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!-- 添加弹层 -->
    <addPermission ref="addRef" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getPermissionListAPI, delPermissionAPI } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
import addPermission from './components/add-permission.vue'
export default {
  name: 'Permission',
  components: { addPermission },
  data() {
    return {
      list: [],
      loading: false,
      dialogVisible: false
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限列表
    async getPermissionList() {
      try {
        this.loading = true
        const res = await getPermissionListAPI()
        this.list = tranListToTreeData(res, '0')
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    },
    // 删除
    async del(id) {
      try {
        await this.$confirm('此操作将永久删除权限, 是否继续?', '提示')
        await delPermissionAPI(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      } catch (error) {
        this.$message('取消删除')
      }
    },
    // 新增弹层展示
    add(pid, type) {
      this.$refs.addRef.formData.pid = pid
      this.$refs.addRef.formData.type = type
      this.dialogVisible = true
    },
    // 编辑弹层展示
    edit(row) {
      this.$refs.addRef.formData = { ...row }
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

