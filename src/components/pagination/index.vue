<template>
  <div class="pagination">
    <div class="left">
      <span class="total">共 {{ total }} 条数据</span>
      <span class="current">当前 {{ current }} / {{ paginationSum }} 页</span>
    </div>
    <div class="right">
      <button class="pre" :disabled="current === 1 ? true : false" @click="toPre">上一页</button>
      <button class="next" :disabled="current === paginationSum ? true : false " @click="toNext">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 总条数
    total: {
      type: Number,
      default: 101
    },
    // 每页条数
    num: {
      type: Number,
      default: 10
    },
    // 列表数组
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      current: 1
    }
  },
  computed: {
    // 总页数
    paginationSum() {
      const res = this.total / this.num
      if (Math.floor(res) === res) {
        return res
      }
      return Math.floor(res) + 1
    }
    // // 根据当前页码展示的部分数据的数组
    // currentList() {
    //   // 每页第一条数据的索引值
    //   const currentFirtIndex = (this.current - 1) * this.num
    //   return this.list.filter((_, index) => index >= currentFirtIndex && index < currentFirtIndex + this.num)
    // }
  },
  // watch: {
  //   current() {
  //     console.log(this.current)
  //     this.$parent.list = this.currentList
  //   }
  // },
  methods: {
    toPre() {
      if (this.current > 1) {
        this.current--
      }
    },
    toNext() {
      if (this.current < this.paginationSum) {
        this.current++
      }
    }

  }
}

</script>

<style scoped lang="less">
.pagination{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 15px 25px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}
span,button{
  margin-right: 20px;
}

</style>
