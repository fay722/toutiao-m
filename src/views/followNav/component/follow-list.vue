<template>
  <div class="follow-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getUserFollowListAPI } from '@/api'
export default {
  name: 'FollowList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getUserFollowListAPI({
          page: this.page,
          per_page: this.per_page
        })
        console.log(data)
      } catch (err) {

      }
    }
  }
}
</script>

<style>
</style>
