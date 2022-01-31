<template>
  <!-- :to="`/article/${article.art_id}`" -->
  <van-cell
    class="article-item"
    :to="{ name: 'article', params: { articleId: article.art_id } }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, ind) in article.cover.images"
          :key="ind"
          :src="img"
        >
          <van-image class="cover-img" :src="img" fit="cover" />
        </div>
      </div>
      <div class="article-info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
      <!-- <div class="close">
        <i class="toutiao toutiao-guanbi"></i>
      </div> -->
    </div>
    <van-image
      class="cover-img"
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
      fit="cover"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: rgb(58, 58, 58);
    margin-bottom: 24px;
  }
  .cover-wrap {
    display: flex;
    margin-bottom: 31px;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
  .cover-img {
    width: 100%;
    height: 146px;
  }
  .article-info {
    span {
      margin-right: 23px;
      font-size: 23px;
      color: #c5c5c5;
    }
  }
  .van-cell__value {
    flex: unset;
    padding-left: 25px;
  }
}
</style>
