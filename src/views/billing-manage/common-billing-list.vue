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
          <el-button type="text" @click="editForm('info',scope.row)">查看</el-button>
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
      tableData: [
        { delverID: 'ewfh', memberName: 'sdf', memberNick: 'fd', mobile: 'sc', email: 'dwf', openId: 'sf', createTime: '', updateUid: '1234', updateTime: '' }
      ]
    }
  },
  mounted() {
    // this.getList()
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
    editForm(type, row) {
      const params = {
        type,
        details: row || ''
      }
      this.$router.push({
        name: 'MemberManage',
        params
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.common-billing-list{}
</style>
