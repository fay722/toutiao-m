<template>
  <div class="Login-container">
    <!-- 导航头 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <template #left>
        <van-icon class="back-icon" name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form ref="userLoginForm" @submit="onSubmit">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        type="number"
        :rules="userFormRules.mobile"
        maxlength="11"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji icon-font"></i>
        </template>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        type="number"
        :rules="userFormRules.code"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma icon-font"></i>
        </template>
        <template #button>
          <van-count-down
            class="countDown"
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="sss"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLoginAPI, sendSmsAPI } from '@/api/index'
export default {
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 登陆验证
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          }, {
            pattern: /^(1[0-9][0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '手机号格式错误'
          }],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false // 倒计时组件是否显示
    }
  },

  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登陆中',
        forbidClick: true, // 禁用点击背景
        duration: 0 // 默认为2000 表示2s后消失 为0表示不会消失
      })
      try {
        const { data } = await userLoginAPI(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
        // 登陆成功后 返回
        this.$router.back()
      } catch (err) {
        this.$toast.fail('手机号或验证码错误')
      }
    },
    async onSendSms() {
      // 1.校验手机号
      try {
        await this.$refs.userLoginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败')
      }
      // 2.验证码通过 倒计时显示
      this.isCountDownShow = true

      // 3.请求发送验证码
      try {
        await sendSmsAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 请求失败时 获取验证码按钮显示
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('请求频繁，稍后再试')
        } else {
          this.$toast('请求错误，稍后再试')
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
.icon-font {
  font-size: 37px;
}
.van-button--default {
  background-color: rgb(237, 237, 237);
  color: #666;
}
.login-btn {
  margin: 53px 28px;
  .van-button {
    background-color: #6db4fb;
  }
}
.countDown {
  margin-right: 40px;
}
</style>
