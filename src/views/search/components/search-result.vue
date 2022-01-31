<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="obj in resultList"
        :key="obj.art_id"
        :title="obj.title"
        @click="
          $router.push({
            name: 'article',
            params: { articleId: obj.art_id },
          })
        "
      />
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      resultList: [],
      page: 1,
      perPage: 20,
      error: false
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      try {
        const { data } = await getResultAPI({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText
        })
        // 2.将数据添加到数组列表中
        const { results } = data.data
        this.resultList.push(...results)
        // console.log(this.resultList)
        // 3.将本次加载中的loading关闭
        this.loading = false
        // 4.判断是否还有数据的页码
        if (results.length) {
          // 4.1如果有 则更新下一个数据的页码
          this.page++
        } else {
          // 4.2如果没有 则将加载状态finished设置为结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  loadResults() {

  }
}
</script>

<style>
</style>
