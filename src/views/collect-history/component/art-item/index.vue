<template>
  <div class="art-item">
    <article-item :article="article"> </article-item>
    <van-grid direction="horizontal" :column-num="3">
      <van-grid-item icon="comment-o" text="评论" />
      <van-grid-item icon="good-job-o" text="点赞" />
      <van-grid-item icon="star-o" text="收藏" />
    </van-grid>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArtItem',
  components: {
    ArticleItem
  },
  props: {
    article: {
      type: Object,
      require: true
    }
  }

}
</script>

<style lang="less" scoped>
.van-grid-item {
  height: 94px;
}
</style>
