<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      :immediate-check="false"
      error-text="请求失败，点击重新加载"
    >
      <comment-item
        v-for="(obj, index) in list"
        :key="index"
        :comment="obj"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getCommentsAPI } from '@/api'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [String, Number],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义prop数据验证
      default: 'a',
      validator(value) {
        return ['a', 'c'].includes(value)
      }
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },

  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 加载状态结束
      // 数据全部加载完成
      try {
        const { data } = await getCommentsAPI({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        // 把总数量给父组件
        this.$emit('onload-success', data.data)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style>
</style>
