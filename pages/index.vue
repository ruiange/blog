<template>
  <div>
    <div class="title-box">
      <h2 class="title">首页
        <span class="sub-title">Home</span>
      </h2>

    </div>


  </div>
</template>

<script setup lang="ts">
  // 模拟文章数据
  const posts = ref([
    {
      id: 1,
      title: '使用 Nuxt3 构建现代化博客',
      excerpt: '探索 Nuxt3 的新特性和最佳实践，打造高性能的博客系统...',
      date: '2024-03-20',
      category: '技术',
    },
    {
      id: 2,
      title: 'Vue3 组合式 API 详解',
      excerpt: '深入理解 Vue3 组合式 API 的使用方法和优势...',
      date: '2024-03-19',
      category: '前端',
    },
    {
      id: 3,
      title: 'TypeScript 类型系统进阶',
      excerpt: '掌握 TypeScript 高级类型和类型体操技巧...',
      date: '2024-03-18',
      category: '编程',
    },
  ]);
</script>

<style scoped>
  .title-box {
    .title {
      font-size: 28px;
      color: #333;
      .sub-title {
        font-weight: 400;
        font-size: 14px;
        color: #999;
      }
    }

  }
</style>
