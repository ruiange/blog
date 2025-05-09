<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// 在Nuxt 3中，window对象只在客户端可用
// 使用onMounted确保在客户端环境执行
import { onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';

// 当前路由路径，用于监听变化
const route = useRoute();
const currentPath = ref(route.fullPath);

// 监听路由变化
watch(() => route.fullPath, (newPath) => {
  // 防止相同路径的重复滚动
  if (newPath !== currentPath.value) {
    currentPath.value = newPath;
    // 确保DOM已更新后执行滚动
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }
});

// 在挂载时初始化滚动位置
onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0
  });

  // 添加手动点击链接的滚动处理
  document.addEventListener('click', (e) => {
    // 检查点击事件是否来自链接元素
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
      // 给DOM一点时间更新
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  });
});
</script>

<style>
/* 添加页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
