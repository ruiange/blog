<template>
  <div>
    <!-- 欢迎区域 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">欢迎来到我的博客</h1>
      <p class="text-xl text-gray-600">分享技术，记录生活</p>
    </div>

    <!-- 文章列表 -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            <NuxtLink :to="'/posts/' + post.id" class="hover:text-blue-600">
              {{ post.title }}
            </NuxtLink>
          </h2>
          <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>{{ post.date }}</span>
            <span>{{ post.category }}</span>
          </div>
        </div>
      </div>
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
    category: '技术'
  },
  {
    id: 2,
    title: 'Vue3 组合式 API 详解',
    excerpt: '深入理解 Vue3 组合式 API 的使用方法和优势...',
    date: '2024-03-19',
    category: '前端'
  },
  {
    id: 3,
    title: 'TypeScript 类型系统进阶',
    excerpt: '掌握 TypeScript 高级类型和类型体操技巧...',
    date: '2024-03-18',
    category: '编程'
  }
])
</script>

<style scoped>
/* 首页特定样式 */
</style> 