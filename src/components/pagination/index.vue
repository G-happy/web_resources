<template>
  <div class="pagination-container">
    <div class="myPagination">
      <div class="total">
        共 {{ total }} 条记录 &nbsp;&nbsp; 第 {{ currentPage }} / {{ sumPage }} 页
      </div>
      <div>
        <button :disabled="currentPage === 1 ? true : false" @click="changePageFn(-1)">上一页</button>
        <button :disabled="currentPage === sumPage ? true : false" @click="changePageFn(1)">下一页</button>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'MyPagination',
  props: {
    // 总条数
    total: {
      type: Number,
      default: 101
    },
    // 当前页数
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页数据量
    pageSize: {
      type: Number,
      default: 20
    }
  },
  computed: {
    // 总页数
    sumPage() {
      const page = this.total / this.pageSize
      if (Math.floor(page) === page) {
        return page
      }
      return Math.floor(page) + 1
    }
  },
  methods: {
    changePageFn(val) {
      this.$emit('changePage', this.currentPage + val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container{
  background: #fff;
  padding: 32px 16px;
  .myPagination {
  display: flex;
  justify-content:space-between;
  font-size: 16px;
  padding: 0;
  button {
    width: 70px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
    outline: none;
    border:none;
    color: #606266;
    height: 32px;
    line-height:32px;
  }
  button:disabled {
    background: #edf0f9;
    color: #d8dde3;
    cursor: no-drop;
  }
  .total {
    margin-right: 10px;
    font-weight: 400;
    color: #dbdfe5;
    height: 32px;
    line-height:32px;
  }
}
}

</style>
