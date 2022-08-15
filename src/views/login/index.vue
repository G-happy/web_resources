<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginFormData" class="login-form" label-position="left" :rules="loginFormRules">
      <!-- login logo -->
      <div class="title-container">
        <img src="../../assets/common/login-logo.png" alt="">
      </div>

      <!-- 账号/用户名 -->
      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginFormData.mobile" placeholder="请输入手机号码" />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="passwordRef" v-model="loginFormData.password" placeholder="请输入密码" :type="passwordType" />
        <span class="svg-container">
          <svg-icon :icon-class="`${passwordType==='password'?'eye':'eye-open'}`" @click="changeSvgPwd" />
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button type="primary" style="width:100%;margin-bottom:30px;" class="loginBtn" :loading="loading" @click="loginBtn">登录</el-button>

      <!-- tip message -->
      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { loginFormRules } from '@/utils/rules'
export default {
  name: 'Login',
  data() {
    return {
      // 密码框类型切换
      passwordType: 'password',
      // 表单绑定的对象数据(用户名/密码)
      loginFormData: {
        mobile: '13800000002',
        password: '123456'
      },
      // 登录按钮的状态
      loading: false,
      // 校验规则
      loginFormRules: loginFormRules
    }
  },
  methods: {
    changeSvgPwd() {
      // 1.修改密码框类型
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'

      // 2.输入框聚焦
      this.$nextTick(() => {
        this.$refs.passwordRef.focus()
      })
    },
    // 登录
    async loginBtn() {
      try {
        // 登录前的预校验
        await this.$refs.loginForm.validate()
        // 登录按钮处于加载状态
        this.loading = true
        // 发送登录请求
        await this.$store.dispatch('setToken', this.loginFormData)
        // 跳转
        this.$router.push('/')
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg:#d4e5ff;
$light_gray:#68b0fe;
$cursor: #68b0fe;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
.el-form-item__error {
    color: #fff
  }
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background: url('~@/assets/common/login.jpg') center center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
      border-radius: 5px;
      color: #454545;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

  img{
    margin-bottom: 30px;
  }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.loginBtn {
  background: #407ffe;
  height: 55px;
  line-height: 32px;
  font-size: 24px;
}
</style>
