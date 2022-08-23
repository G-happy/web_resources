// 部门校验规则

export const rules = {
  name: [
    { required: true, message: '部门名称不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }],
  code: [
    { required: true, message: '部门编码不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' }],

  manager: [
    { required: true, message: '部门负责人不能为空', trigger: 'blur' }],

  introduce: [
    { required: true, message: '部门介绍不能为空', trigger: 'blur' },
    { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
}
