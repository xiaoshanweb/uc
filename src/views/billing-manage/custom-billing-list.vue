<template>
  <div class="logistics-company-list p-main">
    <v-card padding="30px">
      <v-title class="mb10">会员基础信息</v-title>
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="会员号" prop="delverID">
              <el-input v-model="form.delverID" :disabled="disabled || disabledSPU" />
            </el-form-item>
            <el-form-item label="会员名字" prop="memberName">
              <el-input v-model="form.memberName" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="会员名称" prop="memberNick">
              <el-input v-model="form.memberNick" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="openId" prop="openId">
              <el-input v-model="form.openId" :disabled="disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="avator" class="image">
              <el-image src="../../assets/images/avatar.jpg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <v-title class="mb10">订单信息</v-title>
      <v-table
        :table-config="tableConfig"
        :table-data="tableData"
        @pagination="getList"
      >
        <template slot="toolsBar">
          <el-button type="primary" @click="addOrder()">添加订单</el-button>
        </template>
      </v-table>
      <el-button v-show="!disabled" type="primary" class="submit" @click="submitForm">提交</el-button>
    </v-card>
    <el-dialog title="添加订单" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="商品SUP">
          <el-input v-model="orderForm.goodsSPU" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="orderForm.orderNo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="收件人">
          <el-input v-model="orderForm.receiver" autocomplete="off" />
        </el-form-item>
        <el-form-item label="收件人地址">
          <el-input v-model="orderForm.receiverAddress" autocomplete="off" />
        </el-form-item>
        <el-form-item label="收件人手机号码">
          <el-input v-model="orderForm.cellphone" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

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
        delverID: '',
        memberName: '',
        memberNick: '',
        phone: '',
        email: '',
        openId: '',
        avator: ''
      },
      params: {
        goodsSPU: '',
        type: ''
      },
      dialogFormVisible: false,
      orderForm: {
        goodsSPU: '',
        orderNo: '',
        receiver: '',
        receiverAddress: '',
        cellphone: ''
      },
      tableConfig: [
        {
          prop: 'goodsSPU',
          label: '商品SPU',
          width: '150px'
        },
        {
          prop: 'receiver',
          label: '收件人'
        },
        {
          prop: 'receiverAddress',
          label: '收件地址'
        },
        {
          prop: 'cellphone',
          label: '员工手机号',
          width: '150px'
        }
      ],
      tableData: [
        { goodsSPU: 'fc', receiver: 'scs', receiverAddress: 'wffwca', cellPhone: 'dcvwfve' }
      ]
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
    getList() {},
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
    submitForm() {

    },
    addOrder() {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .submit{
    margin-top: 20px;
  }
    .image{
        float: right;
      margin-right:100px;
      margin-top:100px;
  }
</style>
