<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item">{{ item }}</el-option>
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;margin-left:10px" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }" class="content">
        <div class="date-content">
          <span class="text"> {{ date | getDay }}</span>
          <!-- <span class="text"> {{ data.day | getDay }}</span> -->
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'WorkCalendar',
  filters: {
    getDay(value) {
      return value.getDate()
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentDay: 3, // 当前日期
      currentMonth: 9, // 当前月份
      currentYear: 2022, // 当前年份
      currentDate: null,
      yearList: []
    }
  },
  created() {
    this.dealsTime()
    this.dateChange()
  },
  methods: {
    isWeek(date) {
      return date.getDay() === 0 || date.getDay() === 6
    },
    dateChange() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-${this.currentDay}`)
    },
    dealsTime() {
      this.currentYear = this.startDate.getFullYear()
      this.currentMonth = this.startDate.getMonth() + 1
      this.currentDay = this.startDate.getDate()
      this.yearList = Array.from(Array(11), (_, index) => {
        return this.currentYear - 5 + index
      })
    }
  }
}
</script>

<style  scoped lang="scss">
   ::v-deep .el-calendar-day {
    height:  auto;
   }
   ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
    border:none;
   }
  .date-content {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .date-content .rest {
    color: #fff;
    border-radius: 50%;
    background: rgb(250, 124, 77);
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
  }
  .date-content .text{
    width: 20px;
    height: 20px;
    line-height: 20px;
   display: inline-block;

  }
   ::v-deep .el-calendar-table td.is-selected .text{
     background: #409eff;
     color: #fff;
     border-radius: 50%;
   }
   ::v-deep .el-calendar__header {
     display: none
   }
  </style>

