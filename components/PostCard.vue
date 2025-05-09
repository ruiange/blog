<template>
  <div class="post-item" @click="navigateToPost">
    <!-- 文章封面图 -->
    <div class="post-cover">
      <img :src="post.cover || 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg'" alt="封面图">
    </div>
    
    <!-- 文章信息区域 -->
    <div class="post-info">
      <!-- 文章标题 -->
      <h3 class="post-title">{{ post.title }}</h3>
      
      <!-- 文章摘要 -->
      <p class="post-excerpt">{{ post.excerpt }}</p>
      
      <!-- 文章底部信息：日期和分类 -->
      <div class="post-meta">
        <div class="post-date">
          <i class="iconfont icon-clock"></i>
          <span>{{ post.date }}</span>
        </div>
        <div class="post-category">
          <i class="iconfont icon-folder"></i>
          <span>{{ post.category }}</span>
        </div>
      </div>
    </div>
    
    <!-- 阅读更多箭头 -->
    <div class="read-more">
      <i class="iconfont icon-arrow-right"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义文章类型接口
interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover?: string;
}

// 接收传入的文章数据
const props = defineProps<{
  post: Post;
}>();

// 文章导航方法
const navigateToPost = () => {
  // 导航到文章详情页，可以使用Nuxt的导航
  navigateTo(`/post/${props.post.id}`);
};
</script>

<style scoped>
.post-item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.post-cover {
  width: 260px;
  height: 170px;
  flex-shrink: 0;
  margin-right: 24px;
  overflow: hidden;
  border-radius: 6px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.post-item:hover {
  background-color: #f9f9f9;
  
  .post-cover img {
    transform: scale(1.05);
  }
  
  .post-title {
    color: #0056b3;
  }
  
  .read-more {
    opacity: 1;
    transform: translateX(0);
  }
}

.post-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 40px;
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.post-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-meta {
  display: flex;
  align-items: center;
  margin-top: auto;
  font-size: 13px;
  color: #999;
}

.post-date, .post-category {
  display: flex;
  align-items: center;
  margin-right: 15px;
  
  .iconfont {
    margin-right: 5px;
    font-size: 14px;
  }
}

.read-more {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) translateX(5px);
  opacity: 0.5;
  transition: all 0.3s ease;
  
  .iconfont {
    font-size: 16px;
    color: #999;
  }
}

/* 小屏幕适配 */
@media (max-width: 640px) {
  .post-item {
    flex-direction: column;
    padding: 15px 0;
  }
  
  .post-cover {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .post-info {
    padding-right: 0;
  }
  
  .read-more {
    display: none;
  }
}
</style> 