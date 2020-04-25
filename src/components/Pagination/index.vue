<template>
  <div>
    <el-pagination
      style="margin-top: 10px;text-align: right"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout.layout"
      :page-sizes="layout.pageSizes"
      :pager-count="layout.pagerCount"
      :total="total"
      v-bind="$attrs"
      @size-change="val =>emitPageConfig(val,'size')"
      @current-change="val =>emitPageConfig(val,'current')"
    />
  </div>
</template>

<script>
export default {
  name: 'SgPagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    layout: {
      type: Object,
      default: () => {
        return {
          pageSizes: [20, 50, 100],
          pagerCount: 7,
          layout: 'total, sizes, prev, pager, next, jumper'
        }
      }
    }

  },
  data() {
    return {
      style: ''
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    emitMethod(methodName, val) {
      this.$emit(methodName, val)
    },
    emitPageConfig(val, type) {
      if (type === 'size') {
        this.currentPage = 1
        this.$emit('pagination', { page: this.currentPage, limit: val })
      }
      if (type === 'current') {
        this.$emit('pagination', { page: val, limit: this.pageSize })
      }
    }
  }
}
</script>
