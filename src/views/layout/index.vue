<template>
  <div class="layout-container">
    <!-- 路由显示内容区域  -->
    <router-view></router-view>
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <template #icon>
          <i class="toutiao toutiao-shouye toutiao-icon"></i>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <!-- <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template> -->
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <!-- <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template> -->
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span>{{ $store.state.user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    .toutiao {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
