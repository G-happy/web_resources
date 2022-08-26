<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ token }}</div>
    <!-- <UploadExcel :before-upload="beforeUpload" /> -->
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
  },
  methods: {
    // beforeUpload(file) {
    //   // size 的单位为 B
    //   if (file.size > 6144) {
    //     this.$message.error('文件大小不能超过6KB')
    //     return false
    //   }
    //   return true
    // }
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
