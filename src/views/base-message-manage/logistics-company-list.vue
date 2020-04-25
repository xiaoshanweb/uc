<template>
  <div class="logistics-company-list p-main">
    <v-card padding="30px">
      <v-title class="mb10">商品基础信息</v-title>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 300px">
        <el-form-item label="商品SPU" prop="goodsSPU">
          <el-input v-model="form.goodsSPU" :disabled="disabled || disabledSPU" placeholder="请输入员工手机号" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" :disabled="disabled" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="描述" prop="describle">
          <el-input v-model="form.describle" :disabled="disabled" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" :disabled="disabled" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" :disabled="disabled" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="描述价格" prop="price">
          <el-input v-model="form.price" :disabled="disabled" placeholder="请输入员工姓名" />
        </el-form-item>
      </el-form>
      <v-title class="mb10">图片信息</v-title>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-button v-show="!disabled" type="primary" class="submit" @click="submitForm">提交</el-button>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LogisticsCompanyList',
  data() {
    return {
      disabled: false,
      disabledSPU: false,
      form: {
        goodsSPU: '',
        title: '',
        descrilble: '',
        brand: '',
        unit: '',
        price: ''
      },
      rules: {
        goodsSPU: [{ required: true, message: '请输入商品SPU', trigger: 'blur' }],
        title: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
        descrilble: [{ required: true, message: '请输入描述', trigger: 'change' }],
        brand: [{ required: true, message: '请输入品牌', trigger: 'change' }],
        unit: [{ required: true, message: '请输入单位', trigger: 'change' }],
        price: [{ required: true, message: '请输入价格', trigger: 'change' }]
      },
      dialogVisible: false,
      dialogImageUrl: '',
      params: {
        goodsSPU: '',
        type: ''
      }
    }
  },
  created() {
    Object.assign(this.params, this.$route.params)
    if (this.params.type == 2) {
      this.disabled = true
      this.getDetais()
    } else if (this.params.type == 1) {
      this.disabledSPU = true
      this.getDetais()
    }
  },
  methods: {
    getDetais() {
      const data = {
        goodsSPU: this.params.goodsSPU
      }
      this.$http.goodsDetails({ ...data }).then(res => {
        const body = res.data[0]
        Object.assign(this.form, body)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log(111)
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitForm() {

    },
    handleSuccess(response, file, fileList) {
      console.log(file.url)
    }
  }
}
</script>

<style lang="scss" scoped>
  .submit{
    margin-top: 20px;
  }
</style>
