<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left" @click="$router.push({ path: '/user' })">
          <van-image class="photo" :src="userInfo.photo" fit="cover" round />
          <div class="text">{{ userInfo.name }}</div>
        </div>
        <div class="right">
          <van-button
            type="default"
            size="small"
            round
            class="edit-btn"
            to="/user/profile"
          >
            编辑资料
          </van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="my-login-btn" @click="$router.push('/login')">
        <img class="img-mobile" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item
        icon="photo-o"
        text="文字"
        class="grid-item"
        @click="$router.push('/collectHistory')"
      >
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item
        icon="photo-o"
        text="文字"
        class="grid-item"
        @click="$router.push('/collectHistory')"
      >
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 通知 小智 -->
    <van-cell-group class="other-cell">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link> </van-cell>
      <!-- <a href="../robot/robot.html">123</a> -->
      <!-- <a href="../../robot/robot.html">robot</a> -->
    </van-cell-group>

    <!-- 退出登陆 -->
    <van-button
      type="default"
      size="large"
      class="log-out-btn"
      v-if="user"
      @click="onLogout"
    >
      退出登陆
    </van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: '' // 用户信息资料
    }
  },
  computed: {
    ...mapState(['user']) // 获取user
  },
  created() {
    if (this.user) {
      // 验证用户是否登陆 再请求信息
      this.getUserInfo()
    }
  },
  methods: {
    onLogout() {
      Dialog.confirm({
        title: '确定退出吗'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 点击取消
        })
    },
    async getUserInfo() {
      // 调用接口获取信息
      const res = await getUserInfoAPI()
      this.userInfo = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .my-login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img-mobile {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      height: 231px;
      padding: 81px 30px 55px 32px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .photo {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .text {
          color: #fff;
          font-size: 30px;
          margin-left: 22px;
        }
      }
      .right {
        .edit-btn {
          width: 134px;
          height: 33px;
          font-size: 20px;
          color: rgb(102, 102, 102);
        }
      }
    }
    .data-stats {
      height: 130px;
      display: flex;
      justify-content: space-around;
      .data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    height: 143px;
    .grid-item {
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: rgb(235, 82, 83);
      }
      .toutiao-lishi {
        color: rgb(255, 157, 29);
      }
      span.text {
        font-size: 28px;
      }
    }
  }

  .other-cell {
    margin-top: 9px;
  }
  .log-out-btn {
    margin-top: 9px;
    font-size: 30px;
    color: rgb(216, 98, 98);
  }
}
</style>
