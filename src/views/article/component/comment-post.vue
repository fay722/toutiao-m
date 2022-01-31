<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postCommentsAPI } from '@/api'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String],
      require: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  inject: {
    articleId: {
      type: [Number, String],
      default: null
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    async onPost() {
      try {
        this.$toast.loading({
          message: '登陆中',
          forbidClick: true, // 禁用点击背景
          duration: 0 // 默认为2000 表示2s后消失 为0表示不会消失
        })
        const { data } = await postCommentsAPI({
          target: this.target,
          content: this.message,
          art_id: this.articleId
        })
        this.message = '' // 清空文本内容
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
