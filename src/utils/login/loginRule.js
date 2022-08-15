const validtorMobile = (rule, value, callback) => {
  // rule 对应的规则; value 对应的值
  // callback 验证完成后调用的回调函数,验证通过直接调用. 验证不通过也是调用 callback,但是会把错误信息传递出去
  if (validMobile(value)) {
    return callback()
  }
  return callback(new Error('手机号码格式不正确'))
}

/**
 * 登录表单的校验规则
 */
export const loginFormRules = {
  mobile: [
    { required: true, message: '请填写手机号' },
    { validator: validtorMobile, trigger: 'blur' }
    // {
    //   pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    //   message: '手机号码格式不正确'
    // }
  ],
  password: [
    { required: true, message: '请填写密码' },
    { min: 6, max: 16, message: '密码的长度在6-16位之间 ', trigger: 'blur' }
  ]
}

/**
 * 校验手机号码的函数(单独抽取出来)
 * @param {String} str  用户输入的手机号码
 * @returns Boolean
 */
export const validMobile = (str) => {
  return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(str)
}
