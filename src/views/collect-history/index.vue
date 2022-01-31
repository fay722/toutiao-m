<template>
  <div class="collect-history">
    <van-nav-bar class="page-nav-bar" title="收藏/历史">
      <template #left>
        <van-icon slot="left" name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="我的收藏">
        <ch-list :target="active"></ch-list>
      </van-tab>
      <van-tab title="我的历史">
        <ch-list :target="active"></ch-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import chList from './component/ch-list'
export default {
  name: 'collectHistory',
  components: {
    chList
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tab--active {
  color: #3296fa !important;
}
/deep/.van-tabs__line {
  background-color: #3296fa;
  width: 129px;
  height: 5px;
}
</style>
