<template>
  <div class="setting-box">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first">
        <!-- 新增角色按钮 -->
        <el-row>
          <el-button type="primary" size="small" @click="addRoles">新增角色</el-button>
        </el-row>
        <!-- 表格区域 -->
        <el-table
          :data="rolesList"
          stripe
          style="width: 100%"
          border
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="120"
          />
          <el-table-column
            align="center"
            prop="name"
            label="角色"
            width="200"
          />
          <el-table-column
            align="center"
            prop="description"
            label="描述"
          />
          <el-table-column
            align="center"
            prop="address"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="managerPer(scope.row)">分配权限</el-button>
              <el-button type="primary" size="small" @click="eidtRoleInfo(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="delRoleInfo(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-row type="flex" justify="end" class="pagination">
          <el-pagination
            :current-page="queryInfo.page"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
        />
        <el-form label-position="right" label-width="80px" disabled>
          <el-form-item label="公司名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="form.address" />
          </el-form-item>
          <el-form-item label="公司邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.beizhu" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增角色的弹窗 -->
    <addRoleDialog ref="roleRef" />
    <!-- 分配角色的弹层 -->
    <managerPermission :manager-dialog.sync="managerDialog" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deleteRoleAPI } from '@/api'
import addRoleDialog from './components/addRoleDialog.vue'
import managerPermission from './components/manager-permission.vue'
export default {
  name: 'Setting',
  components: { addRoleDialog, managerPermission },
  data() {
    return {
      // 默认选择 '用户管理'
      activeName: 'first',
      // 获取角色信息的配置项
      queryInfo: {
        page: 1,
        pagesize: 10
      },
      form: {
        name: '江苏传智播客教育科技股份有限公司',
        address: '北京市昌平区建材城西路金燕龙办公楼一层',
        email: 'bd@itcastcn',
        beizhu: '传智播客官网-好口碑IT培训机构,一样的教育,不一样的品质'
      },
      // 控制分配角色弹层的显示和隐藏
      managerDialog: false
    }
  },
  computed: {
    ...mapGetters(['rolesList', 'total', 'addDialogVisible'])
  },
  created() {
    this.getRolesListInfo()
  },
  methods: {
    // 获取角色列表信息
    getRolesListInfo() {
      this.$store.dispatch('getRolesList', this.queryInfo)
    },
    // 每页展示数据条数
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getRolesListInfo()
    },
    // 当前页码
    handleCurrentChange(val) {
      this.queryInfo.page = val
      this.getRolesListInfo()
    },
    // 新增角色弹窗
    addRoles() {
      this.$store.commit('change_DialogVisible', true)
    },
    // 编辑角色弹窗
    eidtRoleInfo(row) {
      this.$store.commit('change_DialogVisible', true)
      this.$refs.roleRef.ruleForm = { ...row }
    },
    // 删除角色
    async delRoleInfo(id) {
      try {
        await this.$confirm('是否确认删除该角色, 是否继续?', '提示', {
          // 小图标
          type: 'warning'
        })
        // 删除
        await deleteRoleAPI(id)
        // console.log(this.queryInfo.page)
        // 确认提示信息
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 刷新列表
        this.getRolesListInfo()
      } catch (error) {
        // 取消提示信息
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 显示分配权限的弹层
    managerPer(row) {
      this.managerDialog = true
    }
  }
}
</script>

<style lang="less" scoped>
.setting-box{
  padding: 20px;

}
.el-table{
  margin-top: 20px;
}
.el-table__body td{
  text-align: center;
}
.pagination{
  margin-top: 10px;
}
.el-input{
  width: 30%;
}
.el-alert{
  margin-bottom: 20px;
}
</style>

