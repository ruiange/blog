<template>
  <!-- 主容器：整个应用的外层容器，自适应宽度设计 -->
  <div class="main-container">
    <!-- 左侧菜单区域：固定宽度，包含logo和导航菜单 -->
    <div class="left-menu">
      <!-- 网站logo -->
      <img :src="logoUrl" alt="logo" class="logo" />
      <!-- 滚动菜单容器 -->
      <div class="left-menu-content">
        <template v-for="item in 20">
          <!-- 菜单项：点击时会激活对应的菜单 -->
          <div
            class="menu-item"
            :class="{ 'menu-item-active': item === activeMenu }"
            @click="menuClick(item)"
          >
            首页
          </div>
        </template>
      </div>
      <!-- 占位元素，用于保持菜单布局的平衡 -->
      <div class="occupy-position"></div>
    </div>

    <!-- 右侧内容区域：自适应宽度，包含顶部搜索栏、主内容和侧边栏 -->
    <div class="right-info">
      <!-- 顶部搜索栏 -->
      <div class="top-box">搜索</div>
      <!-- 右侧主体内容区域：使用flex布局 -->
      <div class="right-info-main">
        <!-- 页面内容插槽：用于显示不同页面的主要内容 -->
        <div class="content-container"><slot></slot></div>
        <!-- 网站信息侧边栏：固定宽度，显示用户信息和版权信息 -->
        <div class="site-info">
          <!-- 封面图区域 -->
          <div class="cover">
            <!-- 头像容器：头像位于封面底部，部分超出 -->
            <div class="avatar-box">
              <img :src="logoUrl" alt="logo" class="avatar" />
            </div>
          </div>
          <!-- 用户信息区域 -->
          <div class="user-info">
            <!-- 用户名称 -->
            <div class="user-name">粥粥来了</div>
            <!-- 用户描述 -->
            <div class="user-desc">这家伙很懒，什么都没写</div>
            <!-- 文章统计信息 -->
            <div class="post-info">
              <!-- 文章数量标签 -->
              <div class="tag-item">
                <div class="name">文章</div>
                <div class="num">1</div>
              </div>
              <!-- 另一个统计标签 -->
              <div class="tag-item">
                <div class="name">文章</div>
                <div class="num">1</div>
              </div>
            </div>
            <!-- 版权信息：动态计算当前年份 -->
            <div class="copyright">Copyright © 2024 - {{ CurrentYear }} 测试</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  // 菜单列表数据
  const MenuList = ref([]);
  // 当前激活的菜单项
  const activeMenu = ref(1);
  // 获取当前年份，用于显示版权信息
  const CurrentYear = new Date().getFullYear();
  // Logo图片URL
  const logoUrl = ref('https://halo.ruiange.com/upload/0.gif');
  // 菜单点击事件处理函数
  const menuClick = (item: number) => {
    activeMenu.value = item;
  };
</script>

<style scoped>
  /* 修复全局样式，防止出现横向滚动条 */
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  /* 主容器样式：自适应宽度，最大宽度1400px，居中显示 */
  .main-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    height: 100vh; /* 全屏高度 */
    overflow: hidden; /* 防止内容溢出 */
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box; /* 确保边框计入宽度 */
  }

  /* 左侧菜单样式：固定宽度，垂直布局 */
  .left-menu {
    width: 98px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    flex-shrink: 0; /* 防止菜单被压缩 */
    box-sizing: border-box; /* 确保边框和内边距计入宽度 */
    /* Logo样式 */
    .logo {
      width: 50px;
      height: 50px;
    }
    /* 菜单内容区域：可滚动 */
    .left-menu-content {
      height: 70%;
      overflow-y: auto; /* 垂直方向可滚动 */
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20px 0;
      box-sizing: border-box; /* 确保内边距计入宽度 */
      /* 自定义滚动条样式 */
      &::-webkit-scrollbar {
        width: 2px;
        height: 20px;
      }
      /* 菜单项样式 */
      .menu-item {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        font-size: 15px;
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: #333;
        cursor: pointer;
        border: 1px solid #ffffff;
        box-sizing: border-box; /* 确保边框计入宽度 */
        /* 悬停效果 */
        &:hover {
          background-color: #f5f5f5;
          color: #333;
        }
        /* 点击效果 */
        &:active {
          border: 1px solid #8c8c8c;
        }
      }
      /* 激活状态的菜单项样式 */
      .menu-item-active {
        background-color: #333;
        box-shadow: 0 2px 20px 0 rgba(0 0 0 / 0.2);
        color: #fff;
        border: 1px solid #333;
      }
    }
  }

  /* 右侧内容区域：自适应宽度，垂直布局 */
  .right-info {
    flex: 1; /* 填充剩余空间 */
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 防止内容溢出 */
    /* 右侧主体内容区域：水平布局 */
    .right-info-main {
      display: flex;
      flex: 1; /* 填充剩余空间 */
      overflow: hidden; /* 防止内容溢出 */
    }
  }

  /* 内容容器：自适应宽度，可滚动 */
  .content-container {
    flex: 1; /* 填充剩余空间 */
    overflow-y: auto; /* 垂直方向可滚动 */
    overflow-x: hidden; /* 禁止水平滚动 */
    padding: 0 20px; /* 左右内边距 */
    box-sizing: border-box; /* 确保内边距计入宽度 */
  }

  /* 顶部搜索区域 */
  .top-box{
    width: 100%;
    border-bottom: 1px solid #ccc;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box; /* 确保内边距计入宽度 */
  }

  /* 网站信息侧边栏：固定宽度 */
  .site-info {
    width: 300px;
    min-width: 250px; /* 最小宽度确保不会太窄 */
    height: 100%;
    flex-shrink: 0; /* 防止被压缩 */
    border-left: 1px solid #ccc;
    position: relative; /* 相对定位用于版权信息的绝对定位 */
    box-sizing: border-box; /* 确保边框计入宽度 */
    /* 封面图样式 */
    .cover {
      width: 100%;
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-position: center;
      background-image: url('https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg');
      position: relative;
      box-sizing: border-box; /* 确保内边距计入宽度 */
      /* 头像容器：位于封面底部，部分超出 */
      .avatar-box {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: 0 2px 20px 0 rgba(0 0 0 / 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: -40px; /* 超出封面底部 */
        box-sizing: border-box; /* 确保边框计入宽度 */
      }
      /* 头像样式 */
      .avatar {
        width: 74px;
        height: 74px;
      }
    }
    /* 用户信息区域 */
    .user-info {
      width: 100%;
      height: calc(100% - 170px); /* 减去封面高度 */
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 60px; /* 顶部留白，避开头像 */
      box-sizing: border-box; /* 确保内边距计入宽度 */
      /* 用户名样式 */
      .user-name {
        font-size: 16px;
        font-weight: 700;
        color: #333;
        margin-bottom: 20px;
      }
      /* 用户描述样式 */
      .user-desc {
        font-size: 13px;
        color: #999;
        margin-bottom: 20px;
      }
      /* 文章统计信息样式 */
      .post-info {
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 10px 30px;
        width: 80%;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* 标签项样式 */
        .tag-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          /* 标签名称样式 */
          .name {
            font-style: normal;
            color: #999;
            font-size: 13px;
            margin-bottom: 5px;
          }
          /* 标签数值样式 */
          .num {
            font-size: 18px;
            font-weight: 700;
            color: #333;
          }
        }
      }
    }
    /* 版权信息：绝对定位到底部 */
    .copyright {
      position: absolute;
      bottom: 0;
      font-size: 13px;
      color: #999;
      height: 50px;
      border-top: 1px solid #ccc;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box; /* 确保边框计入宽度 */
    }
  }
  
  /* 响应式布局 */
  /* 中等屏幕：优先隐藏左侧菜单 (1200px以下) */
  @media screen and (max-width: 1200px) {
    /* 隐藏左侧菜单 */
    .left-menu {
      display: none;
    }
    
    /* 主容器无需左边框 */
    .main-container {
      border-left: none;
    }
  }
  
  /* 小屏幕：隐藏网站信息侧边栏 (768px以下) */
  @media screen and (max-width: 768px) {
    /* 隐藏网站信息侧边栏 */
    .site-info {
      display: none;
    }
    
    /* 右侧主体内容占满宽度 */
    .right-info-main {
      flex-direction: column;
    }
    
    /* 内容区域占满宽度 */
    .content-container {
      width: 100%;
    }
    
    /* 主容器无需右边框 */
    .main-container {
      border-right: none;
    }
  }
  
  /* 超小屏幕：优化顶部搜索栏 (480px以下) */
  @media screen and (max-width: 480px) {
    .top-box {
      height: 60px;
      padding: 0 10px;
    }
    
    .content-container {
      padding: 0 10px;
    }
  }
</style>
