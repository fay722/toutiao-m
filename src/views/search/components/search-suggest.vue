<template>
  <div class="search-suggest">
    <van-cell
      v-for="(val, ind) in suggestList"
      :key="ind"
      :title="val"
      icon="search"
      @click="$emit('search', val)"
    >
      <div slot="title" v-html="highligth(val)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      suggestList: []
    }
  },
  watch: {
    searchText: {
      // handler(value) {
      //   this.loadSearchSuggest(value)
      // },
      // 优化防抖
      handler: debounce(function (value) {
        this.loadSearchSuggest(value)
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadSearchSuggest(q) {
      try {
        const { data } = await getSuggestAPI(q)
        if (data.data.options[0] === null) {
          this.suggestList = []
          return
        }
        this.suggestList = data.data.options
      } catch (err) {
        console.log('错了', err)
      }
    },
    highligth(value) {
      // 处理高亮
      const hightLightStr = `<span class="active">${this.searchText}</span>`
      // 动态创建正则表达式
      const reg = new RegExp(this.searchText, 'gi')
      return value.replace(reg, hightLightStr)
    }
  }

}
</script>

<style lang="less" scoped>
/deep/.active {
  color: #3296fa;
}
</style>
