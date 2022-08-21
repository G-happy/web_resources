<template>
  <div class="setting-box">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first">
        <!-- 新增角色按钮 -->
        <el-row>
          <el-button type="primary" size="small">新增角色</el-button>
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
            <template>
              <el-button type="success" size="small">分配权限</el-button>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </template></el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-row type="flex" justify="end" class="pagination">
          <el-pagination
            :current-page="queryInfo.page"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      // 默认选择 '用户管理'
      activeName: 'first',
      // 获取角色信息的配置项
      queryInfo: {
        page: 1,
        pagesize: 10
      }
    }
  },
  computed: {
    ...mapGetters(['rolesList', 'total'])
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
    handleCurrentChange(val) {
      this.queryInfo.page = val
      this.getRolesListInfo()
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
</style>

