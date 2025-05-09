<script setup lang="ts">
  import { ref} from 'vue'
  // 评论
  interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
    likes: number;
  }

  const comments = ref<Comment[]>([]);

  // 获取评论
  const fetchComments = () => {
    comments.value = [
      {
        id: 1,
        author: '张三',
        avatar: 'https://halo.ruiange.com/upload/0.gif',
        content: '这篇文章真的很有帮助，特别是关于Nuxt Content的部分，解决了我一直困扰的问题。',
        date: '2024-03-21 14:30',
        likes: 5
      },
      {
        id: 2,
        author: '李四',
        avatar: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
        content: '对Nitro服务器引擎很感兴趣，请问有没有更详细的资料推荐？',
        date: '2024-03-21 16:45',
        likes: 3
      },
      {
        id: 3,
        author: '王五',
        avatar: 'https://halo.ruiange.com/upload/0.gif',
        content: '写得非常清晰，对Nuxt3的理解有了很大提升。期待更多相关内容！',
        date: '2024-03-22 09:20',
        likes: 7
      }
    ];
  };
  // 获取评论
  fetchComments();
</script>

<template>
  <!-- 评论区 -->
  <div class="comments-section">
    <h3 class="section-title">评论 ({{ comments.length }})</h3>
    <div class="comment-form">
      <textarea placeholder="在这里发表您的评论..." class="comment-input"></textarea>
      <button class="comment-submit">发表评论</button>
    </div>
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-avatar">
          <img :src="comment.avatar" alt="用户头像">
        </div>
        <div class="comment-content">
          <div class="comment-info">
            <span class="comment-author">{{ comment.author }}</span>
            <span class="comment-date">{{ comment.date }}</span>
          </div>
          <div class="comment-text">{{ comment.content }}</div>
          <div class="comment-actions">
            <span class="comment-reply">回复</span>
            <span class="comment-like">
                <i class="iconfont icon-heart"></i>
                <span>{{ comment.likes }}</span>
              </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .comments-section {
    margin-top: 50px;
    padding: 0 20px;
  }

  .comment-form {
    margin-bottom: 30px;
  }

  .comment-input {
    width: 100%;
    height: 100px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--bg-content);
    color: var(--text-color);
    font-size: 14px;
    resize: none;
    margin-bottom: 15px;
    box-sizing: border-box;
  }

  .comment-input:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .comment-submit {
    padding: 8px 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .comment-submit:hover {
    background-color: var(--primary-hover);
  }

  .comments-list {
    margin-top: 30px;
  }

  .comment-item {
    display: flex;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid var(--border-color);
  }

  .comment-item:last-child {
    border-bottom: none;
  }

  .comment-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
    flex-shrink: 0;
  }

  .comment-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .comment-content {
    flex: 1;
  }

  .comment-info {
    margin-bottom: 8px;
  }

  .comment-author {
    font-weight: 600;
    color: var(--text-color);
    margin-right: 10px;
    font-size: 15px;
  }

  .comment-date {
    font-size: 13px;
    color: var(--text-muted);
  }

  .comment-text {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-color);
    margin-bottom: 10px;
  }

  .comment-actions {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: var(--text-muted);
  }

  .comment-reply {
    cursor: pointer;
    margin-right: 15px;
    transition: color 0.3s ease;
  }

  .comment-reply:hover {
    color: var(--primary-color);
  }

  .comment-like {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .comment-like:hover {
    color: var(--primary-color);
  }

  .comment-like .iconfont {
    margin-right: 5px;
    font-size: 14px;
  }
</style>