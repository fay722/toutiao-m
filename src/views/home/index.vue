<template>
  <div class="home-container">
    <!-- 导航头 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button
          class="search-btn"
          type="default"
          size="small"
          round
          to="/search"
        >
          <i slot="icon" class="toutiao toutiao-sousuo"></i>
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <!--
      通过 animated 属性可以开启切换标签内容时的转场动画。
      通过 swipeable 属性可以开启滑动切换标签页。
    -->
    <van-tabs class="channel-tab" v-model="active" animated swipeable>
      <van-tab v-for="obj in UserChannelList" :key="obj.id" :title="obj.name">
        <!-- 频道内容 -->
        <article-list :channel="obj"></article-list>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditshow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditshow"
      closeable
      close-icon="cross"
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :myChannels="UserChannelList"
        :active="active"
        @activeing="activeing"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0, // 默认情况下启用第一个标签。
      UserChannelList: '',
      isChannelEditshow: false // 控制编辑频道弹出层的展示状态
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.getUserChannelList()
  },
  computed: {
    ...mapState(['user']) // 将登陆数据映射过来
  },
  methods: {
    // 获取用户频道列表
    async getUserChannelList() {
      try {
        // 判断是否登陆
        if (this.user) {
          // 已登录
          const res = await getUserChannelsAPI()
          this.UserChannelList = res.data.data.channels
        } else {
          // 未登录
          // 判断有没有本地的数据
          if (getItem('TOUTIAO_CHANNELS')) {
            this.UserChannelList = getItem('TOUTIAO_CHANNELS')
          } else {
            // 如果没有 使用默认频道列表
            const res = await getUserChannelsAPI()
            this.UserChannelList = res.data.data.channels
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    activeing(active, isChannelEditshow = true) {
      this.active = active
      this.isChannelEditshow = isChannelEditshow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .page-nav-bar {
    ::v-deep.van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      color: #fff;
      .toutiao-sousuo {
        font-size: 32px;
      }
    }
  }
  // 频道列表
  /deep/.channel-tab {
    .van-tabs__nav {
      padding: 0;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border: 1px solid rgb(237, 239, 243);
      min-width: 200px;
      font-size: 30px;
      color: rgb(119, 119, 119);
    }
    .van-tab--active {
      color: rgb(51, 51, 51);
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: rgb(50, 150, 250);
    }
    .placeholder {
      width: 66px;
      height: 82px;
      // border-bottom: 4px solid #f1f3f6;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      .toutiao-gengduo {
        font-size: 33px;
      }
      &::before {
        content: "";
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain; // 以长边显示
      }
    }
  }
  /deep/.van-popup__close-icon {
    color: rgb(34, 34, 34) !important;
  }
}
</style>
