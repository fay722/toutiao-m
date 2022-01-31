<template>
  <div class="user-container">
    <!-- 导航头 -->
    <van-nav-bar class="page-nav-bar" title="名字">
      <template #left>
        <van-icon class="back-icon" name="arrow-left" @click="$router.back()" />
      </template>
      <template #right>
        <van-icon class="back-icon" name="ellipsis" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- 信息 -->
    <div class="user-info">
      <van-image class="user-photo" round fit="cover" :src="userInfo.photo" />
      <div class="user-data">
        <div class="user-data-s">
          <div class="data">
            <span class="count">{{ userInfo.art_count }}</span>
            <span class="text">发布</span>
          </div>
          <div class="data" @click="$router.push({ path: '/followNav' })">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </div>
          <div class="data" @click="$router.push({ path: '/followNav' })">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
        <van-button class="follow-btn"> 关注</van-button>
      </div>
    </div>
    <!-- 简介 -->
    <div class="sign">
      <div class="authentication">
        <span class="explain">认证：</span>
        <span class="user-content">{{ userInfo.certi }}</span>
      </div>
      <div class="intro">
        <span class="explain">简介：</span>
        <span class="user-content">{{ userInfo.intro }}</span>
      </div>
    </div>
    <!-- 文章 -->
    <!-- <user-article-list></user-article-list> -->
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
import { mapState } from 'vuex'
// import UserArticleList from './component/user-article-list'
export default {
  name: 'UserIndex',
  components: {
    // UserArticleList
  },
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    if (this.user) {
      // 验证用户是否登陆 再请求信息
      this.getUserInfo()
    }
  },
  computed: {
    ...mapState(['user']) // 获取user
  },
  methods: {
    async getUserInfo() {
      // 调用接口获取信息
      const res = await getUserInfoAPI()
      this.userInfo = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  .user-info {
    padding: 20px 26px;
    overflow: hidden;
    height: 237px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;

    .user-photo {
      width: 158px;
      height: 158px;
      margin-right: 60px;
    }
    .user-data {
      flex: 1;
      // height: 65px;
      // background-color: pink;
      display: flex;
      flex-direction: column;
      .user-data-s {
        display: flex;
        justify-content: space-between;
        .data {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .count {
            font-size: 30px;
          }
          .text {
            font-size: 24px;
            color: #a5a4a6;
          }
        }
      }
      .follow-btn {
        margin-left: 80px;
        width: 289px;
        height: 55px;
        background-color: rgb(107, 181, 255);
        border-radius: 15px;
        margin-top: 27px;
        color: #fff;
        border: none;
      }
    }
  }
  .sign {
    padding: 25px 26px;
    margin: 13px 0;
    background-color: #fff;
    font-size: 24px;
    .user-content {
      color: #a7a5a6;
    }
  }
}
</style>
