<template>
  <div class="app-container">
    <el-upload
      ref="upload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      action="http://192.168.1.213:3000/api/upfile">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import { upfile } from '@/api/file'
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleChange(file, fileList) {
      console.log(fileList)
    },
    uploadFile(param) {
      console.log(param.file)
      const form = new FormData()
      this.$set(form, 'file', param.file)
      upfile(form).then(rs => {
        console.log(rs)
      }).catch(rs => {
        this.$message.info('上传失败，请重试')
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>
