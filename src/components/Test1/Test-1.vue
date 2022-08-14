<template>
  <div>
    <h1>test-1</h1>
    <h2>{{ msg|fil }}</h2>
  </div>
</template>

<script>
export default {
  name: 'TestOne',
  data() {
    return {
      msg: '000'
    }
  }

}
</script>

<style>

</style>
