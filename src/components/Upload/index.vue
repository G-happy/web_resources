<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.2)"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :http-request="uploadAvator"
      :on-change="OnChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="limit"
      :class="`${fileList.length === limit ? 'hideAdd' : ''}`"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 预览弹层 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewImgDialogVisible"
    >
      <img style="width: 100%" :src="previewImageURL">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDnTxCDzWorfEYdT3OTJvIQIvKTN1QaVAb',
  SecretKey: 'FExRhhSyEF1YqtgEXbQzIMAj26uTmrhH'
})
export default {
  name: 'UploadImg',
  props: {
    limit: {
      type: Number,
      default: 1
    }
    // // eslint-disable-next-line vue/require-default-prop
    // beforeUploadFn: Function
  },
  data() {
    return {
      // 图片列表
      // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      fileList: [],
      // 预览图片地址
      previewImageURL: '',
      // 控制弹层显示/隐藏
      previewImgDialogVisible: false,
      loading: false
    }
  },
  methods: {
    // 添加文件, 上传成功或者失败时触发
    OnChange(file, fileList) {
      this.fileList = fileList
      // file 最新上传的图片  fileList  所有图片的列表集合
    },
    // 自定义上传行为
    uploadAvator(data) {
      this.loading = true
      cos.putObject({
        Bucket: 'ghl-resources-1313544785', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: function(progressData) {
        //   console.log(JSON.stringify(progressData))
        }
      }, (err, data) => { // 成功或失败均进入该函数
        this.loading = false
        // err null, false 没有错
        // err 不为null, true 有错
        if (err || data.statusCode !== 200) {
          return this.$message.error('亲,上传失败,请重试')
        }
        this.$emit('onSuccess', {
          url: 'https://' + data.Location
        })
      })
    },
    // 删除
    onRemove(file, fileList) { // 当前删除图片, 剩余图片列表
      this.fileList = fileList
    },
    // 预览
    onPreview(file) {
      this.previewImageURL = file.url
      this.previewImgDialogVisible = true
    },
    // 上传前的校验
    beforeUpload(file) {
    //   if (this.beforeUploadFn && !this.beforeUploadFn(file)) {
    //     return false
    //   }
      // 检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error(`上传图片只能是${types.join(',')}格式!`)
        return false
      }

      // 检查文件大小(单位为B)
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5MB')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less">
.hideAdd {
    .el-upload--picture-card {
        display: none;
    }
}
</style>
