<template>
  <div id="app">
    <pagination :current-page="currentPage" @changePage="currentPage = $event"></pagination>
  </div>
</template>

<script>
import pagination from '@/components/pagination/index.vue'
export default {
  name: 'App',
  components: { pagination },
  data() {
    return {
      currentPage: 1
    }
  }
}
</script>
