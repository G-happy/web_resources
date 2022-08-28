<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <!-- 账户设置 -->
        <el-tab-pane label="登录账户设置">
          <!-- 放置表单 -->
          <el-form label-width="120px" style="margin-left: 120px; margin-top:30px" :model="userInfo" :rules="rules">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="userInfo.username" style="width:300px" />
            </el-form-item>
            <el-form-item label="密码:" prop="password2">
              <el-input v-model="userInfo.password2" style="width:300px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updataUserInfo">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 个人详情 -->
        <el-tab-pane label="个人详情">
          <userInfo ref="userInfoRef" />
          <!-- <component :is="userInfo" /> -->
        </el-tab-pane>
        <!-- 岗位信息 -->
        <el-tab-pane label="岗位信息">岗位信息</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserAvator, saveUserDetailByIdAPI } from '@/api'
import userInfo from './components/user-info.vue'
export default {
  name: 'Detail',
  components: { userInfo },
  data() {
    return {
      userInfo: {
        //   专门存放基本信息
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  computed: {
    currentUserId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getUserAvator()
  },
  methods: {
    // 根据 id 获取用户信息
    async getUserAvator() {
      this.userInfo = await getUserAvator(this.currentUserId)
      this.$refs.userInfoRef.userInfo = { ...this.userInfo }
    },
    // 更新
    async updataUserInfo() {
      try {
        await saveUserDetailByIdAPI()
        this.$message.success('更新成功')
      } catch (error) {
        this.$message.error('更新失败')
        return error
      }
    }
  }
}
</script>

