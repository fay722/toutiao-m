<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 加上form表单 输入法会显示搜索按钮 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFoucus"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 搜索建议 -->
    <search-suggest
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggest>
    <!-- 搜索历史 -->
    <search-history
      v-else
      :historyList="historyList"
      @search="onSearch"
      @clearHistory="historyList = []"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggest from './components/search-suggest.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  },
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果展示
      historyList: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 保存历史记录
    }
  },
  methods: {
    onSearch(val) {
      // 点击搜索触发函数
      this.isResultShow = true
      // 更新搜索历史记录
      // 要求 不要有重复数据 最新的要在前面
      const index = this.historyList.indexOf(val)
      if (index !== -1) {
        // 有重复的
        this.historyList.splice(index, 1)
      }
      // 新的在前面
      this.historyList.unshift(val)
      // 渲染搜索结果
      this.searchText = val
    },
    onCancel() {
      // 点击取消触发函数
      this.$router.back()
    },
    onFoucus() {
      // 获得焦点时 显示搜索建议
      this.isResultShow = false
    }
  },
  watch: {
    historyList(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
