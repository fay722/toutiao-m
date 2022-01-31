<template>
  <div class="ch-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(obj, index) in list" :key="index" :title="obj.title" /> -->
      <art-item
        v-for="(obj, index) in list"
        :key="index"
        :article="obj"
      ></art-item>
    </van-list>
  </div>
</template>

<script>
import { getUserCollectListAPI, getUserHistoryListAPI } from '@/api'
import ArtItem from '../art-item'
export default {
  name: 'chList',
  components: {
    ArtItem
  },
  props: {
    target: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page_0: 1,
      // page_1: 1,
      per_page: 5
    }
  },
  methods: {
    async onLoad() {
      try {
        if (this.target === 0) {
          const { data } = await getUserCollectListAPI({
            page: this.page_0,
            per_page: this.per_page
          })
          const { results } = data.data
          this.list.push(...results)
          this.page_0++
          this.loading = false
          if (results.length === 0) {
            this.finished = true
          }
        } else {
          const { data } = await getUserHistoryListAPI({
            page: this.page_0,
            per_page: this.per_page
          })
          const { results } = data.data
          this.list.push(...results)
          this.page_0++
          this.loading = false
          if (results.length === 0) {
            this.finished = true
          }
        }
      } catch (err) {
        this.$toast('获取失败，请稍后再试')
      }
    }
  }
}
</script>

<style>
</style>
