<template>
  <div>
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
import { importEmployeeAPI } from '@/api'
export default {
  computed: {
    type() {
      return this.$route.query.type
    }
  },
  methods: {
    async success({ header, results }) {
      if (this.type === 'user') {
        const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        const arr = []
        // results 所有人员的信息(数组)
        //  item : {入职日期: 43535,姓名: "高大山",工号: 20089,手机号: 13041131879,转正日期: 43719}
        results.forEach(item => {
          const userInfo = {}

          // console.log(Object.keys(item))  // ['手机号', '姓名', '入职日期', '转正日期', '工号']
          Object.keys(item).forEach(key => {
          // 将中文key 替换为 英文 key
            if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
              userInfo[userRelations[key]] = this.formatDate(item[key], '-')
              return
            }
            userInfo[userRelations[key]] = item[key]
          })
          arr.push(userInfo)
        })
        await importEmployeeAPI(arr)
      }
      this.$router.back()
    },
    //   处理日期 (日期,连接符)
    formatDate(numb, format) {
      const time = new Date(numb * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
