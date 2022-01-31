<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 //
      })
      try {
        const localGender = this.localGender
        await editUserProfileAPI({
          gender: localGender
        })
        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹层
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onPickerChange(picker, value, index) {
      this.localGender = index
    }
  }
}

</script>

<style>
</style>
