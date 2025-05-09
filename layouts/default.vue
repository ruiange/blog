<template>
  <!-- 主容器：整个应用的外层容器，自适应宽度设计 -->
  <div class="main-container">
    <!-- 左侧菜单区域：固定宽度，包含logo和导航菜单 -->
    <div class="left-menu">
      <!-- 网站logo -->
      <img :src="logoUrl" alt="logo" class="logo" @click="navigateToHome" />
      <!-- 滚动菜单容器 -->
      <div class="left-menu-content">
        <template v-for="item in 20">
          <!-- 菜单项：点击时会激活对应的菜单 -->
          <div
            class="menu-item"
            :class="{ 'menu-item-active': item === activeMenu }"
            @click="menuClick(item)"
          >
            <i class="iconfont icon-home"></i>
          </div>
        </template>
      </div>
      <!-- 占位元素，用于保持菜单布局的平衡 -->
      <div class="occupy-position"></div>
    </div>

    <!-- 右侧内容区域：自适应宽度，包含顶部搜索栏、主内容和侧边栏 -->
    <div class="right-info">
      <!-- 顶部搜索栏 -->
      <div class="top-box">
        <div class="search-container">
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="搜索..." class="search-input" />
        </div>
        <!-- 主题切换按钮 -->
        <div class="theme-toggle" @click="toggleDarkMode" :class="{'theme-toggle-dark': isDarkMode}">
          <div class="toggle-track">
            <i class="iconfont icon-sun toggle-icon-sun"></i>
            <i class="iconfont icon-moon toggle-icon-moon"></i>
          </div>
          <div class="toggle-thumb"></div>
        </div>
      </div>
      <!-- 右侧主体内容区域：使用flex布局 -->
      <div class="right-info-main">
        <!-- 页面内容插槽：用于显示不同页面的主要内容 -->
        <div class="content-container">
          <slot></slot>
        </div>
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
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

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

  // 导航到首页
  const navigateToHome = () => {
    router.push('/');
  };

  // 暗黑模式状态
  const isDarkMode = ref(false);

  // 切换暗黑模式
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    // 本地存储主题偏好
    localStorage.setItem('darkMode', isDarkMode.value.toString());
  };

  // 根据暗黑模式状态更新DOM
  watch(isDarkMode, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  });

  // 初始化主题
  onMounted(() => {
    // 检查本地存储中的主题偏好
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      isDarkMode.value = true;
      document.documentElement.classList.add('dark-mode');
    } else if (storedDarkMode === null) {
      // 如果未设置，检查系统偏好
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDarkMode) {
        isDarkMode.value = true;
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      }
    }
  });
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
    border-left: 1px solid var(--border-dark);
    border-right: 1px solid var(--border-dark);
    box-sizing: border-box; /* 确保边框计入宽度 */
  }

  /* 左侧菜单样式：固定宽度，垂直布局 */
  .left-menu {
    width: 98px;
    border-right: 1px solid var(--border-dark);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    flex-shrink: 0; /* 防止菜单被压缩 */
    box-sizing: border-box; /* 确保边框和内边距计入宽度 */
    background-color: var(--bg-content);
    /* Logo样式 */
    .logo {
      width: 50px;
      height: 50px;
      cursor: pointer; /* 添加鼠标指针样式 */
      transition: transform 0.3s ease; /* 添加过渡效果 */
    }
    .logo:hover {
      transform: scale(1.1); /* 悬停时放大效果 */
    }
    /* 菜单内容区域：可滚动但隐藏滚动条 */
    .left-menu-content {
      height: 70%;
      overflow-y: auto; /* 垂直方向可滚动 */
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20px 0;
      box-sizing: border-box; /* 确保内边距计入宽度 */
      /* 隐藏滚动条但保持可滚动功能 */
      -ms-overflow-style: none; /* IE 和 Edge */
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
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
        color: var(--text-color);
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0);
        box-sizing: border-box; /* 确保边框计入宽度 */
        /* 菜单图标样式 */
        .iconfont {
          font-size: 20px;
        }
        /* 悬停效果 */
        &:hover {
          background-color: var(--hover-bg);
          color: var(--text-color);
        }
        /* 点击效果 */
        &:active {
          border: 1px solid var(--border-dark);
        }
      }
      /* 激活状态的菜单项样式 */
      .menu-item-active {
        background-color: var(--primary-color);
        box-shadow: 0 2px 20px 0 rgba(0 0 0 / 0.2);
        color: #fff;
        border: 1px solid var(--primary-color);
      }
    }
  }

  /* 右侧内容区域：自适应宽度，垂直布局 */
  .right-info {
    flex: 1; /* 填充剩余空间 */
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 防止内容溢出 */
    background-color: var(--bg-content);
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
    /* padding: 20px; */
    box-sizing: border-box; /* 确保内边距计入宽度 */
    background-color: var(--bg-content);
  }

  /* 顶部搜索区域 */
  .top-box {
    width: 100%;
    border-bottom: 1px solid var(--border-dark);
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box; /* 确保内边距计入宽度 */
    background-color: var(--header-bg);
  }

  /* 主题切换按钮 */
  .theme-toggle {
    position: relative;
    width: 60px;
    height: 28px;
    border-radius: 14px;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
    /* 轨道样式 */
    .toggle-track {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;
      box-sizing: border-box;
    }
    
    /* 滑块样式 */
    .toggle-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
    }
    
    /* 太阳图标样式 */
    .toggle-icon-sun {
      font-size: 16px;
      color: #FFD700; /* 金黄色 */
      margin-left: 3px;
    }
    
    /* 月亮图标样式 */
    .toggle-icon-moon {
      font-size: 16px;
      color: #ccc;
      margin-right: 3px;
    }
    
    /* 暗色模式样式 */
    &.theme-toggle-dark {
      background-color: #e0e0e0;
      
      .toggle-thumb {
        transform: translateX(32px);
      }
    }
    
    &:hover {
      opacity: 0.9;
    }
  }

  /* 搜索容器样式 */
  .search-container {
    display: flex;
    align-items: center;
    background-color: var(--hover-bg);
    border-radius: 20px;
    padding: 8px 15px;
    width: 300px;
  }

  /* 搜索图标样式 */
  .search-container .iconfont {
    font-size: 18px;
    color: var(--text-muted);
    margin-right: 10px;
  }

  /* 搜索输入框样式 */
  .search-input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: 14px;
    color: var(--text-color);
  }

  /* 网站信息侧边栏：固定宽度 */
  .site-info {
    width: 300px;
    min-width: 250px; /* 最小宽度确保不会太窄 */
    height: 100%;
    flex-shrink: 0; /* 防止被压缩 */
    border-left: 1px solid var(--border-dark);
    position: relative; /* 相对定位用于版权信息的绝对定位 */
    box-sizing: border-box; /* 确保边框计入宽度 */
    background-color: var(--bg-content);
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
        background-color: var(--bg-content);
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
        color: var(--text-color);
        margin-bottom: 20px;
      }
      /* 用户描述样式 */
      .user-desc {
        font-size: 13px;
        color: var(--text-muted);
        margin-bottom: 20px;
      }
      /* 文章统计信息样式 */
      .post-info {
        background-color: var(--hover-bg);
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
            color: var(--text-muted);
            font-size: 13px;
            margin-bottom: 5px;
          }
          /* 标签数值样式 */
          .num {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-color);
          }
        }
      }
    }
    /* 版权信息：绝对定位到底部 */
    .copyright {
      position: absolute;
      bottom: 0;
      font-size: 13px;
      color: var(--text-muted);
      height: 50px;
      border-top: 1px solid var(--border-dark);
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

    /* 搜索容器宽度调整 */
    .search-container {
      width: 100%;
    }
  }

  /* 超小屏幕：优化顶部搜索栏 (480px以下) */
  @media screen and (max-width: 480px) {
    .top-box {
      height: 60px;
      padding: 0 10px;
    }

    .content-container {
      padding: 10px;
    }
  }
</style>
