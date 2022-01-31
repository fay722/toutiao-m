<template>
  <div class="user-profile">
    <van-nav-bar class="page-nav-bar" right-text="保存" title="个人信息">
      <template #left>
        <van-icon slot="left" name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>

    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avator" fit="cover" round :src="profile.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="profile.name"
      is-link
      @click="isUpdateNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="profile.gender === 1 ? '女' : '男'"
      is-link
      @click="isUpdateGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="profile.birthday"
      is-link
      @click="isUpdateBirShow = true"
    ></van-cell>

    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        @close="isUpdateNameShow = false"
        v-model="profile.name"
      ></update-name>
    </van-popup>

    <!-- 编辑性别弹出层 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <update-gender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="profile.gender"
      ></update-gender>
    </van-popup>

    <!-- 编辑生日弹出层 -->
    <van-popup
      v-model="isUpdateBirShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <update-birthday
        v-if="isUpdateBirShow"
        v-model="profile.birthday"
        @close="isUpdateBirShow = false"
      ></update-birthday>
    </van-popup>

    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-pho
        v-if="isUpdatePhoShow"
        :img="img"
        @close="isUpdatePhoShow = false"
        @updata-photo="profile.photo = $event"
      ></update-pho>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileAPI } from '@/api'
import UpdateName from './component/update-name.vue'
import UpdateGender from './component/update-gender.vue'
import UpdateBirthday from './component/update-birthday.vue'
import UpdatePho from './component/update-pho.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePho
  },

  data() {
    return {
      profile: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirShow: false,
      isUpdatePhoShow: false,
      img: null // 预览的图片
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfileAPI()
        this.profile = data.data
      } catch (err) {
        this.$toast('获取失败，请稍后重试')
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhoShow = true
      // 如果选了同一个文件 不会触发改变事件
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.avator {
  width: 60px;
  height: 60px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
