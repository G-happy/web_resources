<template>
  <div id="app">
    <!-- <router-view /> -->
    <!-- <TestOne /> -->
    <!-- <TestTwo /> -->
    <!-- <ul>
      <li v-for="(item,index) in list" :key="index">{{ item }}</li>
    </ul> -->
    <pagination :total="13" :num="3"></pagination>
    <!--
      total:数据总条数        默认值: 101
      num:每页数据条数        默认值: 10
      -->
  </div>
</template>

<script>
export default {
  name: 'App'
  // data() {
  //   return {
  //     list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  //   }
  // }

  // data() {
  //   return {
  //     currentPage1: 5,
  //     currentPage2: 5,
  //     currentPage3: 5,
  //     currentPage4: 4
  //   }
  // },
  // methods: {
  //   handleSizeChange(val) {
  //     console.log(`每页 ${val} 条`)
  //   },
  //   handleCurrentChange(val) {
  //     console.log(`当前页: ${val}`)
  //   }
  // }
}
</script>
