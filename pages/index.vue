<template>
  <div>
    <div class="title-box">
      <h2 class="title">
        首页
        <span class="sub-title">Home</span>
      </h2>
    </div>

    <div class="tab-box">
      <div class="tag">
        <i class="iconfont icon-bookmark"></i>
        最新发布
      </div>
    </div>

    <!-- 文章列表区域 - 移除滚动容器 -->
    <div class="post-list">
      <div v-if="displayPosts.length > 0" class="posts-container">
        <div v-for="post in displayPosts" :key="post.id" class="post-item">
          <PostCard :post="post" />
        </div>
      </div>
      <div v-else class="no-posts">
        <i class="iconfont icon-message-circle"></i>
        <p>暂无文章，敬请期待...</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-more">
        <i class="iconfont icon-loader loading-icon"></i>
        <span>加载更多...</span>
      </div>

      <!-- 全部加载完成提示 -->
      <div v-if="isAllLoaded && displayPosts.length > 0" class="all-loaded">
        <span>已经到底了~</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';

  // 定义文章类型接口
  interface Post {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    cover?: string;
  }

  // 所有文章数据
  const allPosts = ref<Post[]>([
    {
      id: 1,
      title: '使用 Nuxt3 构建现代化博客',
      excerpt:
        '探索 Nuxt3 的新特性和最佳实践，打造高性能的博客系统，包括服务端渲染、静态站点生成、API路由等重要功能。本文将深入讲解如何利用这些特性构建一个专业的博客网站。',
      date: '2024-03-20',
      category: '技术',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
    },
    {
      id: 2,
      title: 'Vue3 组合式 API 详解',
      excerpt:
        '深入理解 Vue3 组合式 API 的使用方法和优势，从setup函数、响应式API到生命周期钩子，全面掌握组合式API编程范式，提升代码复用性和可维护性。',
      date: '2024-03-19',
      category: '前端',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 3,
      title: 'TypeScript 类型系统进阶',
      excerpt:
        '掌握 TypeScript 高级类型和类型体操技巧，包括条件类型、映射类型、类型守卫等，通过实际案例讲解如何构建类型安全的应用程序，提高开发效率和代码质量。',
      date: '2024-03-18',
      category: '编程',
    },
    {
      id: 4,
      title: '现代前端工程化实践',
      excerpt:
        '探讨前端工程化的最佳实践，涵盖构建工具、模块化策略、自动化测试、CI/CD 等核心话题，帮助团队建立高效的前端开发流程和规范。',
      date: '2024-03-17',
      category: '工程化',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 5,
      title: '响应式设计与移动优先策略',
      excerpt:
        '学习如何采用移动优先的响应式设计方法，确保网站在各种设备上的最佳表现，掌握媒体查询、弹性布局和相对单位的使用技巧。',
      date: '2024-03-16',
      category: 'UI/UX',
    },
    {
      id: 6,
      title: 'CSS 架构设计：从混乱到有序',
      excerpt:
        '探索现代 CSS 架构方法，包括 BEM、ITCSS、CSS Modules 和 Tailwind CSS，帮助你组织和维护大型项目中的样式代码。',
      date: '2024-03-15',
      category: 'CSS',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 7,
      title: '前端性能优化实战指南',
      excerpt:
        '从网络、渲染、资源加载和代码执行等多个维度，系统讲解前端性能优化策略，提供可立即实施的优化措施和性能评估方法。',
      date: '2024-03-14',
      category: '性能',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
    },
    {
      id: 8,
      title: 'JavaScript 异步编程全解析',
      excerpt:
        '深入理解 JavaScript 异步编程模式，从回调函数、Promise 到 async/await，掌握异步控制流程和错误处理的最佳实践。',
      date: '2024-03-13',
      category: 'JavaScript',
    },
    {
      id: 9,
      title: 'React Hooks 深度剖析',
      excerpt:
        '详细解析 React Hooks 的工作原理和使用场景，包括 useState、useEffect、useContext 等内置钩子，以及如何创建自定义钩子提升代码可复用性。',
      date: '2024-03-12',
      category: 'React',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 10,
      title: 'GraphQL 与 RESTful API 对比',
      excerpt:
        '分析 GraphQL 与传统 RESTful API 的差异、优势与劣势，探讨什么场景下选择 GraphQL 更为合适，以及如何在项目中平滑过渡到 GraphQL。',
      date: '2024-03-11',
      category: 'API',
    },
    {
      id: 11,
      title: 'Web 安全最佳实践指南',
      excerpt:
        '介绍现代 Web 应用的主要安全威胁（XSS、CSRF、SQL注入等）及其防御措施，讲解如何构建具有安全意识的前端应用，保护用户数据安全。',
      date: '2024-03-10',
      category: '安全',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
    },
    {
      id: 12,
      title: '微前端架构实战',
      excerpt:
        '探讨微前端架构的核心理念、实现方法和应用场景，包括如何拆分大型前端应用、处理应用间通信及共享资源，以及避免常见的集成陷阱。',
      date: '2024-03-09',
      category: '架构',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 13,
      title: 'TailwindCSS 实用指南',
      excerpt:
        '深入了解 TailwindCSS 的工作原理、核心概念和使用技巧，探讨如何利用其原子化CSS理念快速构建界面，同时保持代码的可维护性。',
      date: '2024-03-08',
      category: 'CSS',
    },
    {
      id: 14,
      title: 'Git 工作流与团队协作',
      excerpt:
        '介绍 Git Flow、GitHub Flow 等常见工作流程，讲解如何通过 Git 分支策略、代码审查和持续集成提升团队协作效率，减少合并冲突。',
      date: '2024-03-07',
      category: '工具',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
    },
    {
      id: 15,
      title: 'Docker 容器化前端应用',
      excerpt:
        '详解如何使用 Docker 容器化前端开发环境和生产应用，包括编写 Dockerfile、多阶段构建及优化镜像大小，以及在 CI/CD 流程中的最佳实践。',
      date: '2024-03-06',
      category: 'DevOps',
    },
    {
      id: 16,
      title: '现代状态管理库比较',
      excerpt:
        '对比分析 Redux、Vuex、MobX、Recoil 等流行的状态管理库的设计思想、使用方式和适用场景，帮助开发者根据项目需求选择合适的解决方案。',
      date: '2024-03-05',
      category: '前端',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 17,
      title: 'WebAssembly 入门指南',
      excerpt:
        '介绍 WebAssembly 的基本概念、工作原理和应用场景，探讨如何通过 WASM 在浏览器中运行高性能代码，以及与 JavaScript 交互的最佳实践。',
      date: '2024-03-04',
      category: '技术',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
    },
    {
      id: 18,
      title: '构建可访问性友好的网站',
      excerpt:
        '详解 Web 可访问性（a11y）的重要性、WCAG 标准和实现技巧，学习如何设计和开发包容性的网站，让所有人都能便捷地使用你的产品。',
      date: '2024-03-03',
      category: 'UI/UX',
    },
    {
      id: 19,
      title: 'Jest 单元测试最佳实践',
      excerpt:
        '介绍 Jest 测试框架的基本用法、模拟技巧和高级配置，分享如何编写可维护的测试用例，提高测试覆盖率，确保代码质量。',
      date: '2024-03-02',
      category: '测试',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 20,
      title: 'PWA 应用开发指南',
      excerpt:
        '探讨渐进式 Web 应用（PWA）的核心技术和设计理念，包括 Service Worker、Web App Manifest、离线缓存策略，以及如何提升用户体验和留存率。',
      date: '2024-03-01',
      category: 'PWA',
    },
    {
      id: 21,
      title: 'Node.js 性能调优指南',
      excerpt:
        '深入了解 Node.js 性能瓶颈分析方法、内存泄漏排查技巧和优化策略，学习如何利用集群模式、负载均衡和缓存机制提升应用性能和稳定性。',
      date: '2024-02-29',
      category: 'Node.js',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
    },
    {
      id: 22,
      title: 'CSS Grid 布局精通',
      excerpt:
        '全面掌握 CSS Grid 布局系统的概念和使用方法，通过实际案例学习如何创建复杂的二维布局、响应式设计，以及与 Flexbox 的结合应用。',
      date: '2024-02-28',
      category: 'CSS',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 23,
      title: '前端国际化解决方案',
      excerpt:
        '探讨前端应用国际化的技术选型、工作流程和最佳实践，包括文本翻译管理、日期时间格式化、RTL 布局支持等关键问题的解决方案。',
      date: '2024-02-27',
      category: '前端',
    },
    {
      id: 24,
      title: 'SVG 动画高级技巧',
      excerpt:
        '深入学习 SVG 动画的各种实现方法，包括 SMIL、CSS 动画、JavaScript 控制，以及如何创建复杂的交互式图形和数据可视化效果。',
      date: '2024-02-26',
      category: '动画',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
    },
    {
      id: 25,
      title: 'WebRTC 实时通讯开发',
      excerpt:
        '介绍 WebRTC 技术的基础架构、API 用法和应用场景，学习如何构建支持视频聊天、屏幕共享、文件传输等功能的实时通讯应用。',
      date: '2024-02-25',
      category: '实时通讯',
    },
    {
      id: 26,
      title: 'Monorepo 项目管理策略',
      excerpt:
        '探讨使用 Monorepo 管理多包项目的优势、挑战和工具选择，分享如何使用 Lerna、Nx、pnpm 等工具提升开发效率和代码共享。',
      date: '2024-02-24',
      category: '工程化',
      cover: 'https://halo.ruiange.com/upload/0.gif',
    },
    {
      id: 27,
      title: '浏览器渲染原理深度解析',
      excerpt:
        '详解现代浏览器的工作原理、渲染流程和性能优化点，包括关键渲染路径、重排重绘、合成层和硬件加速等核心概念的实践应用。',
      date: '2024-02-23',
      category: '浏览器',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
    },
    {
      id: 28,
      title: 'Canvas 图形编程基础',
      excerpt:
        '学习 HTML5 Canvas API 的使用方法、性能优化技巧及应用场景，掌握如何创建交互式图形、游戏和高性能数据可视化。',
      date: '2024-02-22',
      category: '图形',
    },
  ]);

  // 触底加载相关状态
  const isLoading = ref(false); // 是否正在加载
  const isAllLoaded = ref(false); // 是否已加载全部
  const pageSize = 5; // 每次加载数量
  const currentPage = ref(1); // 当前页码

  // 当前显示的文章
  const displayPosts = ref<Post[]>([]);

  // 滚动监听函数
  const handleScroll = () => {
    // 检查是否已滚动到底部附近
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - scrollTop - windowHeight < 200) {
      loadMorePosts();
    }
  };

  // 初始加载和设置滚动监听
  onMounted(() => {
    loadMorePosts();
    window.addEventListener('scroll', handleScroll);
  });

  // 移除滚动监听
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  // 加载更多文章
  const loadMorePosts = () => {
    if (isLoading.value || isAllLoaded.value) return;

    isLoading.value = true;

    // 模拟网络请求延迟
    setTimeout(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const newPosts = allPosts.value.slice(startIndex, endIndex);

      // 添加新文章到显示列表
      displayPosts.value = [...displayPosts.value, ...newPosts];

      // 检查是否全部加载完成
      if (displayPosts.value.length >= allPosts.value.length) {
        isAllLoaded.value = true;
      }

      currentPage.value++;
      isLoading.value = false;
    }, 800);
  };
</script>

<style scoped>
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .title {
      font-size: 28px;
      color: #333;
      margin: 0;
      .sub-title {
        font-weight: 400;
        font-size: 14px;
        color: #999;
        margin-left: 8px;
      }
    }
  }
  .tab-box {
    padding: 0 20px;
    .tag {
      padding: 6px 15px;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      user-select: none;
      color: #fff;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 85px;
    }
  }

  .post-list {
    margin-bottom: 20px;
  }

  .posts-container {
    display: flex;
    flex-direction: column;
  }

  .post-item {
    width: 100%;

  }

  .no-posts {
    text-align: center;
    padding: 60px 0;
    color: #999;
    .iconfont {
      font-size: 48px;
      margin-bottom: 16px;
    }
    p {
      font-size: 16px;
    }
  }

  .loading-more {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    color: #999;
    font-size: 14px;

    .loading-icon {
      margin-right: 8px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  .all-loaded {
    text-align: center;
    padding: 15px 0;
    font-size: 13px;
    color: #aaa;
    border-top: 1px dashed #eee;
    margin-top: 15px;
  }
</style>
