<template>
  <div class="v-card">
    <el-card :body-style="{ padding: padding }">
      <slot />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    padding: {
      type: String,
      default: () => {
        return '10px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
