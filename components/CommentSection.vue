<script setup lang="ts">
  import { ref, reactive } from 'vue'
  // 评论
  interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
    likes: number;
    liked?: boolean;
    replies?: Comment[];
  }

  const comments = ref<Comment[]>([]);
  const newComment = reactive({
    content: '',
    replyTo: null as number | null,
    replyToAuthor: ''
  });

  // 获取评论
  const fetchComments = () => {
    comments.value = [
      {
        id: 1,
        author: '张三',
        avatar: 'https://halo.ruiange.com/upload/0.gif',
        content: '这篇文章真的很有帮助，特别是关于Nuxt Content的部分，解决了我一直困扰的问题。',
        date: '2024-03-21 14:30',
        likes: 5,
        liked: false,
        replies: [
          {
            id: 4,
            author: '王五',
            avatar: 'https://halo.ruiange.com/upload/0.gif',
            content: '我也有同感，Nuxt Content确实很强大。',
            date: '2024-03-21 15:20',
            likes: 2,
            liked: false,
          }
        ]
      },
      {
        id: 2,
        author: '李四',
        avatar: 'https://halo.ruiange.com/themes/theme-iemo/assets/images/cover-author.jpg',
        content: '对Nitro服务器引擎很感兴趣，请问有没有更详细的资料推荐？',
        date: '2024-03-21 16:45',
        likes: 3,
        liked: false,
        replies: []
      },
      {
        id: 3,
        author: '王五',
        avatar: 'https://halo.ruiange.com/upload/0.gif',
        content: '写得非常清晰，对Nuxt3的理解有了很大提升。期待更多相关内容！',
        date: '2024-03-22 09:20',
        likes: 7,
        liked: false,
        replies: []
      }
    ];
  };

  // 获取评论
  fetchComments();

  // 提交评论
  const submitComment = () => {
    if (!newComment.content.trim()) {
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
    
    const comment: Comment = {
      id: Date.now(), // 使用时间戳作为临时ID
      author: '访客', // 实际应用中应该从用户信息获取
      avatar: 'https://halo.ruiange.com/upload/0.gif',
      content: newComment.content,
      date: formattedDate,
      likes: 0,
      liked: false,
      replies: []
    };

    if (newComment.replyTo) {
      // 添加回复
      const parentComment = findComment(comments.value, newComment.replyTo);
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push({
          ...comment,
          replies: undefined // 回复不需要再有回复数组
        });
      }
    } else {
      // 添加新评论
      comments.value.unshift(comment);
    }

    // 重置表单
    newComment.content = '';
    newComment.replyTo = null;
    newComment.replyToAuthor = '';
  };

  // 递归查找评论
  const findComment = (commentList: Comment[], id: number): Comment | null => {
    for (const comment of commentList) {
      if (comment.id === id) {
        return comment;
      }
      if (comment.replies && comment.replies.length > 0) {
        const found = findComment(comment.replies, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  // 回复评论
  const replyToComment = (comment: Comment) => {
    newComment.replyTo = comment.id;
    newComment.replyToAuthor = comment.author;
    // 聚焦到评论输入框
    const commentInput = document.querySelector('.comment-input') as HTMLTextAreaElement;
    if (commentInput) {
      commentInput.focus();
    }
  };

  // 取消回复
  const cancelReply = () => {
    newComment.replyTo = null;
    newComment.replyToAuthor = '';
  };

  // 点赞
  const likeComment = (comment: Comment) => {
    if (comment.liked) {
      comment.likes--;
      comment.liked = false;
    } else {
      comment.likes++;
      comment.liked = true;
    }
  };

  // 获取评论总数（包括回复）
  const getTotalCommentCount = () => {
    let count = comments.value.length;
    for (const comment of comments.value) {
      if (comment.replies) {
        count += comment.replies.length;
      }
    }
    return count;
  };
</script>

<template>
  <!-- 评论区 -->
  <div class="comments-section">
    <h3 class="section-title">评论 ({{ getTotalCommentCount() }})</h3>
    <div class="comment-form">
      <div v-if="newComment.replyTo" class="reply-indicator">
        <span>回复给 <strong>{{ newComment.replyToAuthor }}</strong></span>
        <button class="cancel-reply" @click="cancelReply">取消</button>
      </div>
      <textarea 
        v-model="newComment.content" 
        :placeholder="newComment.replyTo ? `回复 ${newComment.replyToAuthor}...` : '在这里发表您的评论...'" 
        class="comment-input"
      ></textarea>
      <button class="comment-submit" @click="submitComment">发表评论</button>
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
            <span class="comment-reply" @click="replyToComment(comment)">回复</span>
            <span class="comment-like" :class="{ 'liked': comment.liked }" @click="likeComment(comment)">
              <i class="iconfont" :class="comment.liked ? 'icon-heart-fill' : 'icon-heart'"></i>
              <span>{{ comment.likes }}</span>
            </span>
          </div>
          
          <!-- 嵌套回复 -->
          <div v-if="comment.replies && comment.replies.length > 0" class="replies-container">
            <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
              <div class="comment-avatar">
                <img :src="reply.avatar" alt="用户头像">
              </div>
              <div class="comment-content">
                <div class="comment-info">
                  <span class="comment-author">{{ reply.author }}</span>
                  <span class="comment-date">{{ reply.date }}</span>
                </div>
                <div class="comment-text">{{ reply.content }}</div>
                <div class="comment-actions">
                  <span class="comment-reply" @click="replyToComment(reply)">回复</span>
                  <span class="comment-like" :class="{ 'liked': reply.liked }" @click="likeComment(reply)">
                    <i class="iconfont" :class="reply.liked ? 'icon-heart-fill' : 'icon-heart'"></i>
                    <span>{{ reply.likes }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="comments.length === 0" class="no-comments">
        还没有评论，来发表第一条评论吧！
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
    position: relative;
  }

  .reply-indicator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background-color: var(--bg-secondary);
    border-radius: 4px 4px 0 0;
    margin-bottom: -1px;
    border: 1px solid var(--border-color);
    border-bottom: none;
  }

  .cancel-reply {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 12px;
    padding: 2px 5px;
  }

  .cancel-reply:hover {
    color: var(--primary-color);
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

  .comment-like.liked {
    color: #ff4757;
  }

  .comment-like .iconfont {
    margin-right: 5px;
    font-size: 14px;
  }

  /* 回复样式 */
  .replies-container {
    margin-top: 15px;
    padding-left: 20px;
    border-left: 2px solid var(--border-color);
  }

  .reply-item {
    display: flex;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed var(--border-color);
  }

  .reply-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .reply-item .comment-avatar {
    width: 36px;
    height: 36px;
  }

  .no-comments {
    text-align: center;
    padding: 30px 0;
    color: var(--text-muted);
    font-style: italic;
  }
</style>