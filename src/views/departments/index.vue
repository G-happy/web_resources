<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :tree-node="company" class="title" :is-root="false" @addDepts="addDepts" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <tree-tools slot-scope="obj" :tree-node="obj.data" @delDepts="getDepartments" @addDepts="addDepts" />
        </el-tree>
      </el-card>
    </div>
    <!-- 新增部门弹窗 -->
    <AddDept :show-dialog.sync="showDialog" :tree-node="treeNode" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept'
import { getDepartmentsAPI } from '@/api'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'Departments',
  components: { TreeTools, AddDept },
  data() {
    return {
      company: { }, // 就是头部的数据结构
      departs: [],
      defaultProps: {
        label: 'name'
      },
      // 控制新增部分的弹窗
      showDialog: false,
      // 当前点击的节点(当前点击部门)
      treeNode: {}
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const { depts, companyName, companyManage } = await getDepartmentsAPI()
      this.company = { name: companyName, manager: companyManage, id: '' }
      this.departs = tranListToTreeData(depts, '') // 需要将其转化成树形结构
    },
    // 监听 tree-tools 中触发的添加子部门事件
    addDepts(treeNode) {
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.treeNode = treeNode
    }

  }
}
</script>

<style lang="less" scoped>
.departments-container {
  width: 900px;
  margin: 20px auto;
}
.title{
  margin-bottom: 15px;
}
</style>

