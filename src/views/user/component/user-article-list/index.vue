<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <article-item></article-item>
  </van-list>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getHistoyAPI } from '@/api'
export default {
  name: 'UserArticleList',
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getHistoyAPI()
        console.log(data)
      } catch (err) {

      }
    }
  }
}
</script>

<style>
</style>
