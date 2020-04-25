<template>
  <div class="logistics-company-list p-main">
    <v-form :form-config="formConfig" label-width="100px" @search="search" />
    <v-table
      :table-config="tableConfig"
      :table-data="tableData"
      :total="total"
      :page.sync="pagination.page"
      :limit.sync="pagination.pageSize"
      @pagination="getList"
    >
      <template slot="toolsBar">
        <el-button type="primary" @click="updateStatus('0')">添加商品</el-button>
      </template>
      <template slot="image" slot-scope="scope">
        <img :src="scope.row.img" style="width:100px;height:100px">
      </template>
      <el-table-column slot="operate" width="150px" label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="updateStatus('1',scope.row)">编辑</el-button>
          <el-button type="text" @click="updateStatus('2',scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </v-table>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      formConfig: [
        {
          type: 'el-input',
          prop: 'bsCompanyCode',
          label: '商品SPU',
          placeholder: '请输入商品SPU'
        }
      ],
      tableConfig: [
        {
          prop: 'goodsSPU',
          label: '商品编号',
          width: 120
        },
        {
          prop: 'img',
          label: '商品图片',
          slot: 'image',
          width: 200
        },
        {
          prop: 'title',
          label: '标题'
        },
        {
          prop: 'describle',
          label: '描述',
          width: 150
        },
        {
          prop: 'brand',
          label: '品牌'
        },
        {
          prop: 'unit',
          label: '单位'
        },
        {
          prop: 'price',
          label: '价格'
        },
        {
          prop: 'createTime',
          label: '注册时间',
          width: 120
        }
      ],
      form: {
        time: []
      },
      tableData: [],
      total: 0,
      pagination: {
        page: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const data = {
        ...this.form,
        ...this.pagination
      }
      console.log(data)
      this.$http.goodsList(data).then(res => {
        const body = res.data || []
        this.total = res.total
        // body[1].expressType = 1
        this.tableData = body
      })
    },
    search(val) {
      this.form = val
      this.form.beginTime = this.form.time ? this.form.time[0] : ''
      this.form.endTime = this.form.time ? this.form.time[1] : ''
      this.pagination.page = 1
      console.log(this.form, 'form')
      this.getList()
    },
    updateStatus(val, row) {
      console.log(row)
      const params = {
        goodsSPU: row.goodsSPU || '',
        type: val
      }
      this.$router.push({
        name: 'GoodsManage',
        params
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
