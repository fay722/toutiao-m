<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1,
    }"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { likeArticleAPI, delLikeArticleAPI } from '@/api'
export default {
  name: 'LikeArticle',
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onLike() {
      this.loading = true
      let status = -1
      try {
        if (this.value === 1) {
          await delLikeArticleAPI(this.articleId)
        } else {
          await likeArticleAPI(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast('操作失败，请稍后再试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #9c3f47;
  }
}
</style>
