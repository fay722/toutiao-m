<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="refreshSuccessText"
    >
      <!-- list初始化会触发一次load数据 加载一次 触发一次 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="obj in list"
          :key="obj.id"
          :article="obj"
        ></article-item>
        <!-- <van-cell v-for="obj in list" :key="obj.id" :title="obj.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态 为false不显示
      finished: false, // 控制数据加载结束的状态 加载完成为true
      error: false, // 将 error 设置成 true 即可显示错误提示
      timestamp: null, // 请求获取下一页数据的时间戳
      isLoading: false, // 控制下拉刷新状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 初始化和滚动到底部触发 并将loading设置为true
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   // 1.请求获取数据
    //   setTimeout(() => {
    //     // 2.请求结果放到了list数组中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 3.本次数据加载状态结束之后
    //     // loading关闭后才能触发下一次加载更多
    //     this.loading = false

    //     // 4.判断数据是否全部加载完成
    //     if (this.list.length >= 40) {
    //       // 如果没有数据 finished为true
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          // 简单理解 就是页码 第一页就是当前最新时间
          // 请求之前的时间戳会在响应之后有数值
          timestamp: this.timestamp || Date.now()

        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('sfaihlska')
        // }
        const { results } = data.data
        // console.log('results', results)
        // 2.请求结果放到了list数组中
        // 数组的展开操作符 他会把数组元素一个一个拿出来
        this.list.push(...results)
        // console.log(this.list)
        // 3.本次数据加载状态结束之后 把loading设置为false
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 本次是空的 没有数据了 不再加载更多了
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示
        this.error = true
        this.loading = false // 请求失败 loading也得关闭
      }
    },
    // 下拉刷新的时候触发调用
    async onRefresh() {
      // 将数据追加到列表顶部
      // 关闭下拉刷新的loading状态
      // 往下拉会自动把isloading设置为true
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('sfaihlska')
        // }
        this.list.unshift(...data.data.results)
        const { results } = data.data
        this.isLoading = false
        // 更新错误提示
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }

}
</script>
<style lang="less" scoped>
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>
