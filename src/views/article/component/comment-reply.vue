<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon @click="$emit('close')" slot="left" name="cross" />
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment"></comment-item>

      <!-- 评论的回复列表 -->
      <van-cell title="全部回复"></van-cell>
      <comment-list
        :source="comment.com_id"
        :type="'c'"
        :list="commentList"
      ></comment-list>
    </div>

    <!-- 发布评论按钮 -->
    <div class="post-wrap">
      <van-button size="small" round class="post-btn" @click="replyShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 发布弹出层 -->
    <van-popup v-model="replyShow" position="bottom">
      <comment-post
        :target="comment.com_id"
        @post-success="onPostSuccess"
      ></comment-post>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data() {
    return {
      replyShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess(data) {
      // 更新回复数量
      this.comment.reply_count++
      // 关闭图层
      this.replyShow = false
      // 将最新的评论处于上方
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
