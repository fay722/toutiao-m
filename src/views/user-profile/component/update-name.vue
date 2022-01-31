<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onFinished"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        :placeholder="value"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'
export default {
  name: 'UpdateName',
  data() {
    return {
      message: ''
    }
  },
  props: {
    value: {
      type: String,
      require: true
    }
  },
  methods: {
    async onFinished() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 //
      })
      try {
        const localName = this.message
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await editUserProfileAPI({
          name: localName
        })
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹层
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-wrap {
  padding: 15px;
}
</style>
