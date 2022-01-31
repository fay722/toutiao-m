<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <van-icon name="delete" v-if="!isDel" @click="isDel = !isDel" />
      <div v-else>
        <span class="all-del" @click="$emit('clearHistory')">全部删除</span>
        <span class="finish" @click="isDel = !isDel">完成</span>
      </div>
    </van-cell>
    <van-cell
      v-for="(item, index) in historyList"
      :key="index"
      :title="item"
      @click="dealHistory(item, index)"
    >
      <van-icon name="close" v-show="isDel" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    historyList: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      isDel: false
    }
  },
  methods: {
    dealHistory(item, index) {
      if (this.isDel) {
        // 删除状态
        this.historyList.splice(index, 1)
      } else {
        // 非删除状态
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.all-del {
  margin-right: 20px;
}
</style>
