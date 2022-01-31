<template>
  <div class="followNav">
    <van-tabs v-model="active" class="nav-tab" color="#fff">
      <template #nav-left>
        <van-icon name="arrow-left" class="icon" @click="$router.back()" />
      </template>
      <van-tab title="关注">
        <follow-list></follow-list>
      </van-tab>
      <van-tab title="粉丝">粉丝</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import FollowList from './component/follow-list.vue'
export default {
  name: 'FollowNav',
  components: {
    FollowList
  },
  data() {
    return {
      active: 2
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__nav {
  background-color: #3296fa;
}
/deep/.van-tab__text {
  color: #fff !important;
}
/deep/.van-tabs__line {
  bottom: 40px;
  width: 46px;
  height: 6px;
}
/deep/.van-tab--active {
  font-size: 36px;
  font-weight: 500;
}
.van-icon-arrow-left {
  margin: 30px 0 0 28px;
  font-size: 32px;
  color: #fff;
}
</style>
