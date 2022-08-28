<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ token }}</div>
    <a
      href="http://localhost:8080/assets/common/动画02.jpg"
      download="../../assets/common/动画02.jpg"
    >点击下载头像</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['token'])
  },
  mounted() {
    // import('@/vendor/Export2Excel').then(excel => {
    //   excel.export_json_to_excel({
    //     header: ['111'], // 表头 必填
    //     data: [[1]], // 具体数据 必填
    //     filename: 'excel-list', // 非必填
    //     autoWidth: true, // 非必填
    //     bookType: 'xlsx' // 非必填
    //   })
    // })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
