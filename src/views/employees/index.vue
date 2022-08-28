<!-- slot='插槽名称' -->
<!-- v-slot:插槽名称 -->
<template>
  <div>
    <div class="app-container">
      <PageTools>
        <span slot="before">共{{ total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import?type=user')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
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
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
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
import { formatDate } from '@/filters'
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
    },
    /**
     * 需要下载 npm install xlsx file-saver -S   npm install script-loader -S -D
     */
    // 导出
    async exportData() {
      // 获取所有列表数据
      const { rows } = await getEmployeesDetailInfoAPI({
        page: 1,
        // size: this.total
        size: 20
      })
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 处理表头和内容
      const header = Object.keys(headers)
      const data = this.fromJson(headers, rows)

      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: header, // 表头 必填  ['姓名', '手机号', '入职日期', '聘用形式']
          data: data, // 具体数据 必填 [['张三', '13399999', '2020-2020-2020', '正式']]
          filename: 'excel-list', // 文件名称, 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          multiHeader: [['手机号', '主要信息', '', '', '', '', '']], // 特殊表头
          merges: ['A1:A2', 'B1:G1'] // 合并单元格
        })
      })
    },
    // 处理'导出'数据的方法
    fromJson(headers, rows) {
      return rows.map(ele => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 格式化日期 -> 已经定义过过滤器直接使用即可
            return formatDate(ele[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            // 聘用形式 -> 需要引入EmployeeEnum常量进行处理
            const obj = EmployeeEnum.hireType.find(obj => obj.id === +ele[headers[key]])
            return obj ? obj.value : '非正式'
          }
          return ele[headers[key]]
        })
      })
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

