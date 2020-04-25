<template>
  <div class="v-form">
    <el-form ref="vForm" :model="formData" inline label-position="right" size="small" :label-width="labelWidth">
      <el-form-item
        v-for="(v, k) in formConfig"
        :key="k"
        :label="v.label"
        :prop="v.prop"
      >
        <template v-if="!v.slot">
          <template v-if="v.type === 'el-input'">
            <el-input v-model="formData[v.prop]" :placeholder="v.placeholder || '请输入'" />
          </template>
          <template v-else-if="v.type === 'el-select'">
            <el-select v-model="formData[v.prop]" :placeholder="v.placeholder || '请选择'">
              <el-option v-for="(v1,k1) in v.options" :key="k1" :label="v1.label" :value="v1.value" />
            </el-select>
          </template>
          <template v-else-if="v.type === 'el-date-picker'">
            <el-date-picker
              v-model="formData[v.prop]"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </template>
        </template>
      </el-form-item>
      <el-form-item label=" ">
        <el-button size="small" type="primary" @click="search">搜 索</el-button>
        <el-button size="small" @click="resize">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    labelWidth: {
      default: () => {
        return '120px'
      }
    },
    formConfig: {
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  mounted() {
    this.formConfig.forEach(v => {
      this.$set(this.formData, v.prop, v.default || null)
    })
    this.$mount()
  },
  methods: {
    resize() {
      this.$refs['vForm'].resetFields()
      for (const key in this.formData) {
        this.formConfig.forEach(v => {
          if (key === v.prop) {
            this.formData[key] = v.default || null
          }
        })
      }
      this.$emit('search', this.formData)
    },
    search() {
      this.$emit('search', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-form{}
</style>
