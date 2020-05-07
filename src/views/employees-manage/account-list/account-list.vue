<template>
  <div class="account-list p-main">
    <v-form :form-config="formConfig" label-width="110px" @search="search" />
    <v-table
      :table-config="tableConfig"
      :table-data="tableData"
      :total="total"
      :page.sync="pagination.page"
      :limit.sync="pagination.pageSize"
      @pagination="getList"
    >
      <template slot="img" slot-scope="scope">
        <img src="scope.row.goodsImg" style="width:100px;height:100px">
      </template>
      <el-table-column slot="operate" label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="operateAdmin(scope.row, 'info')">查看</el-button>
          <el-button type="text" @click="operateAdmin(scope.row, 'edit')">编辑</el-button>
        </template>
      </el-table-column>
    </v-table>
  </div>
</template>

<script>
export default {
  name: 'AccountList',
  data() {
    return {
      formConfig: [
        {
          type: 'el-input',
          prop: 'delverID',
          label: '代理人会员号',
          placeholder: '请输入会员号'
        },
        {
          type: 'el-input',
          prop: 'mobile',
          label: '收件人手机号码',
          placeholder: '请输入手机号码'
        },
        {
          type: 'el-input',
          prop: 'orderNo',
          label: '订单号',
          placeholder: '请输入订单号'
        }
      ],
      form: {},
      tableConfig: [
        {
          prop: 'goodsTitle',
          label: '商品信息',
          width: '150px'
        },
        {
          slot: 'img',
          prop: 'goodsImg',
          label: '商品图片',
          width: '200px'
        },
        {
          prop: 'receiver',
          label: '收件人'
        },
        {
          prop: 'cellphone',
          label: '员工手机号',
          width: '150px'
        },
        {
          prop: 'pushTime',
          label: '推单时间',
          width: '150px'
        },
        {
          prop: 'status',
          label: '状态',
          render(row) {
            return row.status == 1 ? '已发货' : '未发货'
          }
        },
        {
          prop: 'memberID',
          label: '代理人会员号',
          width: 100
        },
        {
          prop: 'memberName',
          label: '代理人名字',
          width: 150
        }
      ],
      tableData: [
        { goodsSPU: 'fc', receiver: 'scs', receiverAddress: 'wffwca', cellPhone: 'dcvwfve' }
      ],

      pagination: {
        page: 1,
        pageSize: 20
      },
      total: 0,
      dialog: {
        title: '',
        type: true,
        visible: false
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    search(form) {
      this.form = form
      this.getList()
    },
    getList() {
      const data = {
        ...this.pagination
      }
      // console.log(data)
      this.$http.ordersList(data).then(res => {
        this.total = res.totalNum
        const body = res.data || []
        body.forEach(item => {
          item.goodsImg = item.goosdsMessage.img || '@/assets/images/1.jpg'
          item.goodsTitle = item.goosdsMessage.title || ''
        })
        this.tableData = body
      })
    },
    operateAdmin(row, status) {
      if (status == 'info' || status == 'edit') {
        const params = {
          details: row || null,
          status: status || null
        }
        this.$router.push({ name: 'AccountManage', params })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
