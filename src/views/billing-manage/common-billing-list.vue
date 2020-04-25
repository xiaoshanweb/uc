<template>
  <div class="common-billing-list p-main">
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
        <el-button type="primary" @click="editForm('add')">添加会员</el-button>
      </template>
      <el-table-column slot="operate" width="150px" label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editForm('edit',scope.row)">编辑</el-button>
          <el-button type="text" @click="updateStatus(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </v-table>
  </div>
</template>

<script>
export default {
  name: 'MemberList',
  data() {
    return {
      formConfig: [
        {
          type: 'el-input',
          prop: 'delverID',
          label: '会员号',
          placeholder: '请输入会员号'
        }
      ],
      form: {},
      tableConfig: [
        {
          prop: 'delverID',
          label: '会员号'
        },
        {
          prop: 'memberName',
          label: '会员名字'
        },
        {
          prop: 'memberNick',
          label: '会员名称'
        },
        {
          prop: 'mobile',
          label: '手机号码'
        },
        {
          prop: 'email',
          label: '邮箱'
        },
        {
          prop: 'openID',
          label: 'openID'
        },
        {
          prop: 'createTime',
          label: '注册时间'
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
      this.$http.memberList(data).then(res => {
        this.total = res.totalNum
        const body = res.data || []
        this.tableData = body
      })
    },
    search(form) {
      this.form = form
      this.getList()
    },
    toggleSwitch(value, row, type) {
      console.log(type, 'xs')
      const tip = value === true ? '您确定要启用吗?' : '您确定要停用吗？'
      const message = value === true ? '启用后该仓库将会产生该计费项' : '停用后该仓库不会产生该计费项'
      this.$confirm(message, tip, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          costCode: row.costCode,
          [type]: row[type] == true ? 0 : 1
        }
        console.log(data, 'cdcd')
        this.$http.commonListUpdate(data).then(res => {
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
.common-billing-list{}
</style>
