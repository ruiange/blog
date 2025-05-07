<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Copyright from '~/component/Copyright.vue';

  definePageMeta({
    layout: 'none',
  });

  const router = useRouter();
  const formData = ref({
    username: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      // TODO: 实现登录逻辑
      await router.push('/admin/dashboard');
    } catch (error) {
      console.error('登录失败:', error);
    }
  };

</script>

<template>
  <div class="login-root">
    <div class="login-logo-fixed">
      <img src="/logo.gif" alt="logo" class="logo" />
    </div>
    <div class="login-left">
      <div class="login-header">
        <h2 class="main-title">登录到<br />博客管理系统</h2>
        <p class="subtitle">欢迎使用博客后台管理系统</p>
      </div>
      <t-form :data="formData" @submit="handleSubmit" class="login-form" :label-width="0">
        <t-form-item name="username">
          <t-input
            v-model="formData.username"
            placeholder="请输入用户名"
            size="large"
            :clearable="true"
          >
            <template #prefix-icon>
              <t-icon name="user" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="password">
          <t-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            clearable
          >
            <template #prefix-icon>
              <t-icon name="lock-on" />
            </template>
          </t-input>
        </t-form-item>

        <div class="form-options">
          <t-checkbox>记住账号</t-checkbox>
          <t-link theme="primary" hover="color">忘记密码</t-link>
        </div>
        <t-form-item>
          <t-button theme="primary" type="submit" block size="large" class="login-button">
            登录
          </t-button>
        </t-form-item>
      </t-form>
      <div class="login-footer">
        <t-link theme="primary" hover="color">使用微信扫码登录</t-link>
        <t-link theme="primary" hover="color">使用手机号登录</t-link>
        <div class="copyright"><Copyright></Copyright></div>
      </div>
    </div>
    <div class="login-bg-animate">
      <div class="bubble bubble1"></div>
      <div class="bubble bubble2"></div>
      <div class="bubble bubble3"></div>
    </div>
  </div>
</template>

<style scoped>
  .login-root {
    position: relative;
    display: flex;
    min-height: 100vh;
    background: #fff;
    align-items: center;
    justify-content: center;
  }

  .login-logo-fixed {
    position: absolute;
    left: 40px;
    top: 32px;
    z-index: 10;
  }
  .logo {
    height: 40px;
    margin-bottom: 0;
  }
  .login-left {
    width: 440px;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    padding: 30px;
    background: #fff;
    box-shadow: 2px 0 24px 0 rgba(0, 0, 0, 0.03);
    z-index: 2;
    border-radius: 8px;
  }

  .login-header {
    width: 100%;
    margin-bottom: 32px;
  }
  .main-title {
    font-size: 28px;
    font-weight: 700;
    color: #222;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }
  .subtitle {
    color: #888;
    font-size: 16px;
    margin-bottom: 32px;
  }
  .login-form {
    width: 100%;
    margin-bottom: 24px;
  }
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 14px;
  }
  .login-button {
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }
  .login-footer {
    width: 100%;
    margin-top: 24px;
    text-align: left;
  }
  .login-footer .t-link {
    margin-right: 16px;
    font-size: 14px;
  }
  .copyright {
    color: #bbb;
    font-size: 12px;
    margin-top: 24px;
  }

  .login-right {
    flex: 1;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }
  .illustration {
    max-width: 80%;
    max-height: 80vh;
    object-fit: contain;
    user-select: none;
    pointer-events: none;
  }

  .login-bg-animate {
    position: absolute;
    right: 0;
    top: 0;
    width: 60vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .bubble {
    position: absolute;
    border-radius: 50%;
    opacity: 0.5;
    filter: blur(2px);
    animation: float-bubble 8s ease-in-out infinite alternate;
  }
  .bubble1 {
    width: 320px;
    height: 320px;
    background: linear-gradient(135deg, #0052d9 0%, #00bcd4 100%);
    top: 10vh;
    right: 8vw;
    animation-delay: 0s;
  }
  .bubble2 {
    width: 180px;
    height: 180px;
    background: linear-gradient(135deg, #00bcd4 0%, #36b37e 100%);
    top: 60vh;
    right: 18vw;
    animation-delay: 2s;
  }
  .bubble3 {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #fff 0%, #0052d9 100%);
    top: 40vh;
    right: 2vw;
    opacity: 0.3;
    animation-delay: 1s;
  }
  @keyframes float-bubble {
    0% {
      transform: translateY(0) scale(1);
    }
    100% {
      transform: translateY(-30px) scale(1.05);
    }
  }
  @media (max-width: 900px) {
    .login-logo-fixed {
      left: 16px;
      top: 16px;
    }
    .login-root {
      flex-direction: column;
    }
    .login-left {
      width: 100%;
      align-items: center;
      box-shadow: none;
      padding: 32px 16px;
    }
    .login-right {
      display: none;
    }
    .login-bg-animate {
      display: none;
    }
  }
</style>
