<!-- slot='插槽名称' -->
<!-- v-slot:插槽名称 -->
<template>
  <div>
    <div class="app-container">
      <PageTools>
        <span slot="before">共{{ total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import?type=user')">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="tableLoading" border :data="employeesList">
          <el-table-column label="序号" sortable="" width="80" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatter" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{row}">
              {{ row.correctionTime |formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState">
            <template slot-scope="{row}">
              <el-switch
                :value="row.enableState === undefined"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployees(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            :current-page.sync="query.page"
            layout="prev, pager, next"
            :total="total"
            @current-change="getEmployeesDetailInfo"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 新增员工的弹层 -->
    <addEmployee :show-dialog.sync="showDialog" @getEmployeesDetailInfo="getEmployeesDetailInfo" />
  </div>
</template>

<script>
import { getEmployeesDetailInfoAPI, delEmployeeAPI } from '@/api'
// 处理聘用形式的数据
import EmployeeEnum from '@/api/constant/employees'
import addEmployee from './components/add-employee.vue'
export default {
  name: 'Employees',
  components: { addEmployee },
  data() {
    return {
      // 获取员工列表的配置对象
      query: {
        page: 1,
        size: 10
      },
      // 数据总条数
      total: 0,
      // 员工列表
      employeesList: [],
      // 新增员工弹层
      showDialog: false,
      tableLoading: false
    }
  },
  created() {
    this.getEmployeesDetailInfo()
  },
  methods: {
    async getEmployeesDetailInfo() {
      try {
        this.tableLoading = true
        const { rows, total } = await getEmployeesDetailInfoAPI(this.query)
        this.total = total
        this.employeesList = rows
        if (total !== 0 && rows.length === 0) {
          // 当前页没有数据
          this.query.page = this.query.page - 1
          this.getEmployeesDetailInfo()
        }
      } catch (error) {
        return error
      } finally {
        this.tableLoading = false
      }
    },
    // 处理聘用形式的数据(element提供的方法)
    formatter(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(ele => ele.id === cellValue * 1)
      return obj ? obj.value : '非正式'
      // return obj?.value ?? '非正式'
    },
    // 删除
    async  delEmployees(id) {
      try {
        await this.$confirm('确认删除该数据吗?', '提示', {
          type: 'warning'
        })
        await delEmployeeAPI(id)
        this.$message.success('删除数据成功')
        this.getEmployeesDetailInfo()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table--border td{
  text-align: center;
}
::v-deep .el-table--border th{
  text-align: center;
}
</style>

