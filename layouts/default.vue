<template>
  <div class="main-container">
    <div class="left-menu">
      <img :src="logoUrl" alt="logo" class="logo" />
      <div class="left-menu-content">
        <template v-for="item in 20">
          <div
            class="menu-item"
            :class="{ 'menu-item-active': item === activeMenu }"
            @click="menuClick(item)"
          >
            首页
          </div>
        </template>
      </div>
      <div class="occupy-position"></div>
    </div>

    <div class="right-info">
      <div>搜索</div>
      <div class="right-info-main">
        <div style="width: 100%"><slot></slot></div>
        <div class="site-info">
          <div class="cover">
            <div class="avatar-box">
              <img :src="logoUrl" alt="logo" class="avatar" />
            </div>
          </div>
          <div class="user-info">
            <div class="user-name">粥粥来了</div>
            <div class="user-desc">这家伙很懒，什么都没写</div>
            <div class="post-info">
              <div class="tag-item">
                <div class="name">文章</div>
                <div class="num">1</div>
              </div>
              <div class="tag-item">
                <div class="name">文章</div>
                <div class="num">1</div>
              </div>
            </div>
            <div class="copyright">Copyright © 2024 - {{ CurrentYear }} 测试</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const MenuList = ref([]);
  const activeMenu = ref(1);
  const CurrentYear = new Date().getFullYear();
  const logoUrl = ref('https://halo.ruiange.com/upload/0.gif');
  const menuClick = (item: number) => {
    activeMenu.value = item;
  };
</script>

<style scoped>
  .main-container {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    height: 100vh;
    overflow: hidden;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .left-menu {
    width: 98px;

    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    flex-shrink: 0;
    .logo {
      width: 50px;
      height: 50px;
    }
    .left-menu-content {
      height: 70%;
      overflow-y: auto;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20px 0;
      &::-webkit-scrollbar {
        width: 2px;
        height: 20px;
      }
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
        &:hover {
          background-color: #f5f5f5;
          color: #333;
        }
        &:active {
          border: 1px solid #8c8c8c;
        }
      }
      .menu-item-active {
        background-color: #333;
        box-shadow: 0 2px 20px 0 rgba(0 0 0 / 0.2);
        color: #fff;
        border: 1px solid #333;
      }
    }
  }
  .right-info {
    width: 100%;
    .right-info-main {
      display: flex;
    }
  }
  .site-info {
    width: 300px;
    height: 100vh;
    flex-shrink: 0;
    border-left: 1px solid #ccc;
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
      .avatar-box {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: 0 2px 20px 0 rgba(0 0 0 / 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: -40px;
      }
      .avatar {
        width: 74px;
        height: 74px;
      }
    }
    .user-info {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 60px;
      .user-name {
        font-size: 16px;
        font-weight: 700;
        color: #333;
        margin-bottom: 20px;
      }
      .user-desc {
        font-size: 13px;
        color: #999;
        margin-bottom: 20px;
      }
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
        .tag-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .name {
            font-style: normal;
            color: #999;
            font-size: 13px;
            margin-bottom: 5px;
          }
          .num {
            font-size: 18px;
            font-weight: 700;
            color: #333;
          }
        }
      }
    }
    .copyright {
      position: absolute;
      bottom: 0;
      font-size: 13px;
      color: #999;
      height: 50px;
      border-top: 1px solid #ccc;
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
