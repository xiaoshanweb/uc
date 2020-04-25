<template>
  <div class="custom-billing-list p-main">
    <v-form :form-config="formConfig" label-width="100px" @search="search" />
    <v-table
      :table-config="tableConfig"
      :table-data="tableData"
      :total="total"
      :page.sync="pagination.page"
      :limit.sync="pagination.pageSize"
      @pagination="getList"
    >
      <template slot="warehouseCostSwitch" slot-scope="scope">
        <el-switch v-model="scope.row.warehouseCostSwitch" @change="val => toggleSwitch(val, scope.row, 'warehouseCostSwitch')" />
      </template>
      <template slot="materialBuyCostSwitch" slot-scope="scope">
        <el-switch v-model="scope.row.materialBuyCostSwitch" @change="val => toggleSwitch(val, scope.row, 'materialBuyCostSwitch')" />
      </template>
      <template slot="storageCostSwitch" slot-scope="scope">
        <el-switch v-model="scope.row.storageCostSwitch" @change="val => toggleSwitch(val, scope.row, 'storageCostSwitch')" />
      </template>
      <template slot="serviceCostSwitch" slot-scope="scope">
        <el-switch v-model="scope.row.serviceCostSwitch" @change="val => toggleSwitch(val, scope.row, 'serviceCostSwitch')" />
      </template>
      <template slot="materialSendCostSwitch" slot-scope="scope">
        <el-switch v-model="scope.row.materialSendCostSwitch" @change="val => toggleSwitch(val, scope.row, 'materialSendCostSwitch')" />
      </template>
      <template slot="returnCostSwitch" slot-scope="scope">
        <el-switch v-model="scope.row.returnCostSwitch" @change="val => toggleSwitch(val, scope.row, 'returnCostSwitch')" />
      </template>
      <template slot="paidCostSwitch" slot-scope="scope">
        <el-switch v-model="scope.row.paidCostSwitch" @change="val => toggleSwitch(val, scope.row, 'paidCostSwitch')" />
      </template>
      <template slot="withdrawalCostSwitch" slot-scope="scope">
        <el-switch v-model="scope.row.withdrawalCostSwitch" @change="val => toggleSwitch(val, scope.row, 'withdrawalCostSwitch')" />
      </template>
    </v-table>
  </div>
</template>

<script>
export default {
  name: 'CustomBillingList',
  data() {
    return {
      formConfig: [
        {
          type: 'el-input',
          prop: 'warehouseName',
          label: '仓库名称',
          placeholder: '请输入仓库名称'
        },
        {
          type: 'el-input',
          prop: 'warehouseCode',
          label: '仓库编码',
          placeholder: '请输入仓库编码'
        }
      ],
      form: {},
      tableConfig: [
        {
          prop: 'warehouseName',
          label: '仓库名称'
        },
        {
          prop: 'warehouseSystem',
          label: '仓库系统'
        },
        {
          prop: 'warehouseCode',
          label: '仓库编码'
        },
        {
          prop: 'warehouseCostSwitch',
          label: '仓租费',
          slot: 'warehouseCostSwitch'
        },
        {
          prop: 'materialBuyCostSwitch',
          label: '包材代采费',
          slot: 'materialBuyCostSwitch'
        },
        {
          prop: 'storageCostSwitch',
          label: '入库费',
          slot: 'storageCostSwitch'
        },
        {
          prop: 'serviceCostSwitch',
          label: '增值服务费',
          slot: 'serviceCostSwitch'
        },
        {
          prop: 'materialSendCostSwitch',
          label: '拦截费',
          slot: 'materialSendCostSwitch'
        },
        {
          prop: 'returnCostSwitch',
          label: '退货费',
          slot: 'returnCostSwitch'
        },
        {
          prop: 'paidCostSwitch',
          label: '赔付费',
          slot: 'paidCostSwitch'
        },
        {
          prop: 'withdrawalCostSwitch',
          label: '撤仓费',
          slot: 'withdrawalCostSwitch'
        },
        {
          prop: 'updateUid',
          label: '更新者'
        },
        {
          prop: 'updateTime',
          label: '最近更新时间',
          width: 150
        }
      ],
      total: 0,
      pagination: {
        page: 1,
        pageSize: 20
      },
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const data = {
        ...this.form,
        ...this.pagination
      }
      console.log(data)
      this.$http.specialList(data).then(res => {
        // if (res.data.data == null) {
        //   this.$message.error('没有数据返回')
        // }
        const body = res.data.data || []
        this.total = res.data.totalNum
        body.forEach(item => {
          for (const key in item) {
            if (item[key] === 1) {
              item[key] = false
            }
            if (item[key] === 0) {
              item[key] = true
            }
          }
        })
        this.tableData = body
      })
    },
    search(form) {
      this.form = form
      this.getList()
    },
    togglePage(val) {
      this.page = val
      this.getList()
    },
    toggleSwitch(value, row, type) {
      const tip = value === true ? '您确定要启用吗?' : '您确定要停用吗？'
      const message = value === true ? '启用后该供应商将有权限导入相关账单' : '停用后该供应商将无权限导入相关账单'
      this.$confirm(message, tip, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          costCode: row.costCode,
          [type]: row[type] == true ? 0 : 1
        }
        this.$http.specialListUpdate(data).then(res => {
          row[type] = value
          this.getList()
        }).catch(() => {
          row[type] = !value
        })
      }).catch(() => {
        row[type] = !value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-billing-list{}
</style>
