<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    :loading="Loading"
    size="small"
    @click="onFollowUser"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="badge"
    color="#3296fa"
    round
    :loading="Loading"
    size="small"
    icon="plus"
    @click="onFollowUser"
    >关注</van-button
  >
</template>

<script>
import { addFollowAPI, cancelFollowAPI } from '@/api'
export default {
  name: 'FollowUser',
  data() {
    return {
      Loading: false
    }
  },
  // 自定义修改model
  model: {
    prop: 'isFollowed', // 默认是value
    event: 'update-isFollowed' // 默认是input
  },
  props: {
    isFollowed: {
      type: Boolean,
      require: true
    },
    UserId: {
      type: [String, Number, Object],
      require: true
    }
  },
  methods: {
    async onFollowUser() {
      this.Loading = true // 开启loading状态
      try {
        if (this.isFollowed) {
          // 取消关注
          await cancelFollowAPI(this.UserId)
        } else {
          // 关注
          await addFollowAPI(this.UserId)
        }
        this.$emit('update-isFollowed', !this.isFollowed)
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.$toast('请登陆')
        } else if (err.response.status === 400) {
          this.$toast('不可以关注自己噢')
        } else {
          this.$toast('请求错误，请稍后再试')
        }
      }
      this.Loading = false // 关闭loading状态
    }
  }

}
</script>

<style>
</style>
