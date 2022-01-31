<template>
  <div class="channelEdit-container">
    <!-- 我的频道 -->
    <van-cell :border="false" class="channelEdit-header">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        size="mini"
        round
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10" class="mygrid">
      <van-grid-item
        v-for="(obj, index) in myChannels"
        :key="obj.id"
        class="grid-item"
        @click="cutDel(obj, index)"
      >
        <van-icon
          v-show="isEdit && !fixChannels.includes(obj.id)"
          slot="icon"
          name="close"
          class="close-icon"
        />
        <span slot="text" class="text" :class="{ active: active === index }">
          {{ obj.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" direction="horizontal">
      <van-grid-item
        v-for="obj in recommendChannels"
        :key="obj.id"
        :text="obj.name"
        class="grid-item"
        @click="channelAdd(obj)"
      >
        <van-icon slot="icon" name="plus" class="plus-icon" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { allChannelsAPI, addUserChannelAPI, delUserChannelAPI } from '@/api'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑状态
      fixChannels: [0] // 固定频道
    }
  },
  props: {
    myChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      try {
        const { data } = await allChannelsAPI()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 添加频道
    async channelAdd(channel) {
      this.myChannels.push(channel)
      // 数据持久化
      if (this.user) {
        // 已登录 把数据请求接口放到线上
        try {
          addUserChannelAPI({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
        } catch (err) {
          this.$toast('添加失败，请稍后重试')
        }
      } else {
        // 未登录 把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 删除频道
    cutDel(channel, index) {
      if (this.isEdit) {
        // 为true 编辑状态
        // 如果是固定频道 则不删除
        if (this.fixChannels.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          // 让激活频道的索引-1
          this.$emit('activeing', this.active - 1, true)
        }
        // 删除频道项
        this.myChannels.splice(index, 1)
        // 数据持久化
        this.deleteChannel(channel.id)
      } else {
        // 完成状态
        // this.active = index
        this.$emit('activeing', index, false)
      }
    },
    // 删除时数据持久化
    async deleteChannel(id) {
      try {
        if (this.user) {
          // 已登录
          await delUserChannelAPI(id)
        } else {
          // 未登录
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
    }
  },

  computed: {
    ...mapState(['user']), // 将登陆数据映射过来
    // 筛选没有选中的频道 放在频道推荐
    // recommendChannels() {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     const ret = this.myChannels.find(myChannels => {
    //       // 返回满足条件的元素
    //       return myChannels.id === channel.id
    //     })
    //     // 如果我的频道中不包括频道项 则收集到推荐数组中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels
    // }
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannels =>
          myChannels.id === channel.id
        )
      })
    }
  }

}
</script>

<style lang="less" scoped>
.channelEdit-container {
  padding: 85px 0;
  .channel-title {
    font-size: 32px;
    color: rgb(51, 51, 51);
    margin-top: 5px;
  }

  .edit-btn {
    width: 102px;
    height: 48px;
    color: #f85a5a;
    border: 1px #f85a5a solid;
  }
  /deep/.mygrid {
    .grid-item {
      .van-grid-item__icon-wrapper {
        position: absolute;
        right: -12px;
        top: -12px;
        font-size: 30px;
        z-index: 2;
      }
    }
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap; // 不允许折行
      background-color: rgb(244, 245, 246);
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: rgb(34, 34, 34);
        margin-top: 0;
      }
      .active {
        color: #f85a5a;
      }
    }
  }
  .plus-icon {
    font-size: 28px;
    line-height: 84px;
    margin-right: 6px;
  }
}
</style>
