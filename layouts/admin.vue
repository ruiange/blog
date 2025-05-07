<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuValue } from 'tdesign-vue-next'

const router = useRouter()
const isCollapsed = ref(false)

const menuItems = [
  {
    title: '仪表盘',
    icon: 'dashboard',
    path: '/admin/dashboard'
  },
  {
    title: '文章管理',
    icon: 'file',
    path: '/admin/posts'
  },
  {
    title: '分类管理',
    icon: 'folder',
    path: '/admin/categories'
  },
  {
    title: '标签管理',
    icon: 'tag',
    path: '/admin/tags'
  }
]

const handleMenuClick = (value: MenuValue) => {
  if (typeof value === 'string') {
    router.push(value)
  }
}
</script>

<template>
  <t-layout>
    <t-header>
      <t-head-menu>
        <template #logo>
          <img src="/logo.png" alt="logo" class="logo" />
          <span class="title">博客管理系统</span>
        </template>
        <template #operations>
          <t-dropdown :options="[{ content: '退出登录', value: 'logout' }]">
            <t-button variant="text">
              <t-avatar>管理员</t-avatar>
            </t-button>
          </t-dropdown>
        </template>
      </t-head-menu>
    </t-header>
    
    <t-layout>
      <t-aside :width="isCollapsed ? '64px' : '232px'" class="aside">
        <t-menu
          :collapsed="isCollapsed"
          :default-value="router.currentRoute.value.path"
          @change="handleMenuClick"
        >
          <t-menu-item
            v-for="item in menuItems"
            :key="item.path"
            :value="item.path"
            :icon="item.icon"
          >
            {{ item.title }}
          </t-menu-item>
        </t-menu>
      </t-aside>
      
      <t-layout>
        <t-content class="content">
          <slot />
        </t-content>
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<style scoped>
.logo {
  height: 32px;
  margin-right: 8px;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.aside {
  transition: width 0.3s;
  border-right: 1px solid var(--td-component-border);
}

.content {
  padding: 24px;
  background-color: var(--td-bg-color-container);
  min-height: calc(100vh - 64px);
}
</style>