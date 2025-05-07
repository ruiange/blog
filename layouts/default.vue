<template>
  <div class="main-container" >
  <div class="left-menu"></div>
    <div>
      <div>搜索</div>
      <div>
        <div><slot></slot></div>
        <div>信息</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 布局组件逻辑
</script>

<style scoped>

.main-container{
  width: 1400px;
  margin: 0 auto;
  display: flex;
  height: 100vh;
}
.left-menu{
  width: 98px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style> 