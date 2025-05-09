<template>
  <div class="post-detail">

    <!-- 文章封面图 -->
    <div class="post-cover" :style="`background-image: url('${post.cover || 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg'}')`">
      <!-- 文章头部：标题、时间、分类 -->
      <div class="post-header">
        <div class="post-meta">
          <div class="post-category">
            <i class="iconfont icon-folder"></i>
            <span>{{ post.category }}</span>
          </div>
          <div class="post-date">
            <i class="iconfont icon-clock"></i>
            <span>{{ post.date }}</span>
          </div>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
      </div>
    </div>

    <!-- 文章内容 -->
    <div class="post-content">
      <p v-for="(paragraph, index) in contentParagraphs" :key="index" class="paragraph">
        {{ paragraph }}
      </p>
    </div>

    <!-- 文章底部：标签、分享 -->
    <div class="post-footer">
      <div class="post-tags">
        <div class="tag" v-for="tag in post.tags" :key="tag">
          <i class="iconfont icon-tag"></i>
          <span>{{ tag }}</span>
        </div>
      </div>
      <div class="post-share">
        <span>分享到：</span>
        <i class="iconfont icon-weibo"></i>
        <i class="iconfont icon-wechat"></i>
        <i class="iconfont icon-twitter"></i>
      </div>
    </div>

    <!-- 相关文章 -->
    <div class="related-posts">
      <h3 class="section-title">相关文章</h3>
      <div class="related-posts-list">
        <div v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="related-post-item" @click="navigateToPost(relatedPost.id)">
          <div class="related-post-cover">
            <img :src="relatedPost.cover || 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg'" alt="封面图">
          </div>
          <div class="related-post-info">
            <h4 class="related-post-title">{{ relatedPost.title }}</h4>
            <div class="related-post-date">{{ relatedPost.date }}</div>
          </div>
        </div>
      </div>
    </div>


    <comment-section />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const postId = computed(() => Number(route.params.id));

// 文章类型接口
interface Post {
  id: number;
  title: string;
  content?: string;
  excerpt: string;
  date: string;
  category: string;
  cover?: string;
  tags?: string[];
}

// 当前文章数据
const post = ref<Post>({
  id: 0,
  title: '',
  content: '',
  excerpt: '',
  date: '',
  category: '',
  cover: '',
  tags: []
});

// 生成模拟段落文本
const contentParagraphs = ref<string[]>([]);

// 相关文章
const relatedPosts = ref<Post[]>([]);



// 导航到其他文章
const navigateToPost = (id: number) => {
  router.push(`/post/${id}`);
};

// 获取文章数据
const fetchPostData = async () => {
  try {
    // 这里应该是API请求，现在使用模拟数据
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 获取文章数据
    post.value = {
      id: postId.value,
      title: '使用 Nuxt3 构建现代化博客应用',
      content: '这是文章的完整内容。',
      excerpt: '探索 Nuxt3 的新特性和最佳实践。',
      date: '2024-03-20',
      category: '技术',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
      tags: ['Nuxt3', 'Vue3', 'JavaScript', '前端开发']
    };
    
    // 生成随机段落内容
    generateContentParagraphs();
    
    // 获取相关文章
    fetchRelatedPosts();
    

  } catch (error) {
    console.error('获取文章数据失败', error);
  }
};

// 生成文章内容段落
const generateContentParagraphs = () => {
  const paragraphs = [
    `在现代Web开发中，Nuxt3提供了一种强大而灵活的方式来构建高性能的Vue应用程序。作为一个基于Vue 3的完整框架，Nuxt3结合了服务器端渲染(SSR)、静态站点生成(SSG)、客户端渲染等多种渲染模式，使开发者能够根据不同的需求选择最适合的方案。`,
    
    `Nuxt3的核心优势之一是其出色的开发体验。通过约定大于配置的设计理念，Nuxt3大大简化了项目的搭建和维护过程。文件系统路由、自动导入、内置TypeScript支持等特性，使得开发者可以专注于业务逻辑的实现，而不必担心繁琐的配置和样板代码。`,
    
    `在性能方面，Nuxt3采用了Vite作为其默认的构建工具，这意味着开发环境下的即时热更新和生产环境中的优化构建。此外，Nuxt3还引入了Nitro服务器引擎，它不仅提供了更好的服务器端渲染性能，还支持多种部署平台，包括Node.js、Serverless函数、边缘计算等。`,
    
    `对于博客应用而言，Nuxt3的内容系统(Nuxt Content)提供了一种便捷的方式来管理和渲染Markdown、JSON、YAML等格式的内容。结合其强大的SEO功能，如自动生成元标签、站点地图和robots.txt，Nuxt3使得创建对搜索引擎友好的博客变得异常简单。`,
    
    `在安全性方面，Nuxt3提供了一系列内置的安全措施，如自动转义HTML、CSP策略支持等，帮助开发者构建更加安全的Web应用。同时，其模块化的设计允许开发者根据需要添加额外的安全功能。`,
    
    `此外，Nuxt3生态系统中丰富的模块进一步扩展了其功能。无论是状态管理、认证、国际化，还是UI组件库集成，都有相应的模块可供使用。这种模块化的方式不仅提高了开发效率，还确保了代码的可维护性和可扩展性。`,
    
    `总的来说，Nuxt3为构建现代化博客应用提供了一个全面而强大的解决方案。通过利用其前沿的技术栈和优秀的开发体验，开发者可以创建出高性能、SEO友好且易于维护的博客平台。随着Web技术的不断发展，Nuxt3也在持续演进，为开发者提供更多可能性。`
  ];
  
  contentParagraphs.value = paragraphs;
};

// 获取相关文章
const fetchRelatedPosts = () => {
  relatedPosts.value = [
    {
      id: 2,
      title: 'Vue3 组合式 API 详解',
      excerpt: '深入理解 Vue3 组合式 API 的使用方法和优势',
      date: '2024-03-19',
      category: '前端',
      cover: 'https://halo.ruiange.com/upload/0.gif'
    },
    {
      id: 4,
      title: '现代前端工程化实践',
      excerpt: '探讨前端工程化的最佳实践',
      date: '2024-03-17',
      category: '工程化',
      cover: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg'
    },
    {
      id: 16,
      title: '现代状态管理库比较',
      excerpt: '对比分析 Redux、Vuex、MobX、Recoil 等流行的状态管理库',
      date: '2024-03-05',
      category: '前端',
      cover: 'https://halo.ruiange.com/upload/0.gif'
    }
  ];
};



// 在组件挂载时获取数据
onMounted(() => {
  fetchPostData();
});
</script>

<style scoped>
.post-detail {
  margin: 0;
}
.post-cover {
  width: 100%;
  height: 350px;
  margin-bottom: 30px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.post-header {
  margin-bottom: 0;
  padding: 30px 20px;
  width: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
  color: #fff;
}

.post-meta {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: rgba(255,255,255,0.8);
}

.post-category, .post-date {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.post-category .iconfont, .post-date .iconfont {
  margin-right: 5px;
  font-size: 16px;
}

.post-title {
  font-size: 28px;
  line-height: 1.4;
  color: #fff;
  margin: 0;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  margin-bottom: 40px;
  line-height: 1.8;
  color: var(--text-color);
  padding: 0 20px;
}

.paragraph {
  margin-bottom: 20px;
  font-size: 16px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 40px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: var(--hover-bg);
  border-radius: 4px;
  color: var(--text-secondary);
  font-size: 13px;
  margin-right: 10px;
  margin-bottom: 5px;
}

.tag .iconfont {
  margin-right: 5px;
  font-size: 14px;
}

.post-share {
  display: flex;
  align-items: center;
  color: var(--text-muted);
  font-size: 14px;
}

.post-share .iconfont {
  margin-left: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.post-share .iconfont:hover {
  color: var(--primary-color);
}

.section-title {
  font-size: 20px;
  margin: 0 0 20px 0;
  color: var(--text-color);
  font-weight: 600;
}

.related-posts {
  margin-bottom: 50px;
  padding: 0 20px;
}

.related-posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.related-post-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.related-post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.related-post-cover {
  height: 150px;
  overflow: hidden;
}

.related-post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.related-post-item:hover .related-post-cover img {
  transform: scale(1.1);
}

.related-post-info {
  padding: 15px;
  background-color: var(--bg-content);
}

.related-post-title {
  font-size: 16px;
  margin: 0 0 10px 0;
  color: var(--text-color);
  font-weight: 500;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.related-post-date {
  font-size: 13px;
  color: var(--text-muted);
}



/* 媒体查询 - 移动设备适配 */
@media (max-width: 768px) {
  .post-cover {
    height: 300px;
  }

  .post-title {
    font-size: 22px;
  }

  .post-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-share {
    margin-top: 15px;
    width: 100%;
    justify-content: flex-end;
  }

  .related-posts-list {
    grid-template-columns: 1fr;
  }

  .comment-item {
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
}
</style> 