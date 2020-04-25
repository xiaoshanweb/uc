<template>
  <div class="v-table">
    <el-card body-style="padding: 10px">
      <div style="margin-bottom: 10px">
        <slot name="toolsBar" />
      </div>
      <el-table :data="tableData" border strip empty-text="暂无数据～" @sort-change="val => emitMethod('sort-change', val)">
        <slot name="insert" />
        <el-table-column
          v-for="(v, k) in tableConfig"
          :key="`table${k}`"
          :prop="v.prop"
          :label="v.label"
          :align="v.align || 'center'"
          :width="v.width"
          :min-width="v.minWidth"
          :sortable="v.sortable"
        >
          <template slot-scope="scope">
            <template v-if="!v.slot">
              <template v-if="v.render">
                {{ v.render(scope.row) }}
              </template>
              <template v-else>
                {{ scope.row[v.prop] || '-' }}
              </template>
            </template>
            <template v-else>
              <slot :name="v.slot" :row="scope.row" :$index="scope.$index" />
            </template>
          </template>
        </el-table-column>
        <slot name="appends" />
        <slot name="operate" />
      </el-table>
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
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表格配置项，可以不传，通过slot自定义内容
    tableConfig: {
      type: Array,
      default: () => []
    },
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
<style lang="scss" scoped>
.v-table{}
</style>
