<template>
  <div class="v-info-title">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
export default {
  data() {
    return {
      primaryColor: variables.primaryColor
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.v-info-title{
  display: block;
  border-left: 4px solid $primaryColor;
  padding: 4px 15px;
    .content{
      font-size: 18px;
      color: #333;
    }
}
</style>
