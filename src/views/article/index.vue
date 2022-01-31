<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleContent.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleContent.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleContent.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ articleContent.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ articleContent.pubdate | relativeTime }}
          </div>

          <!-- 模板中$event是事件参数 -->
          <!-- 当传递给子组件的参数既要使用 还有修改
                传递 props  修改 自定义事件
                :is-followd="articleContent.is_followed"
                @update-is_followed="articleContent.is_followed = $event"
                简写方式 在组件上使用v-model
                value = 'articleContent.is_followed'
                @input = "articleContent.is_followed = $event"

                如果想要修改v-modle的规则名称 可以通过子组件的model属性来配置

                如果有多个数据需要实现v-model的效果
                一个组件上只能使用一次v-model
                可以使用.sync修饰符
           -->
          <follow-user
            class="follow-btn"
            :UserId="articleContent.art_id"
            v-model="articleContent.is_followed"
          ></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleContent.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <comment-list
          :source="articleContent.art_id"
          @onload-success="total_count = $event.total_count"
          :list="commentList"
          @reply-click="onReplyClick"
        ></comment-list>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
          >
            写评论
          </van-button>
          <van-icon name="comment-o" :info="total_count" color="#777" />
          <collect-article
            :articleId="articleContent.art_id"
            v-model="articleContent.is_collected"
            class="btn-item"
          ></collect-article>
          <like-article
            class="btn-item"
            :articleId="articleContent.art_id"
            v-model="articleContent.attitude"
          ></like-article>
          <van-icon name="share" color="#777777"> </van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="articleContent.art_id"
            @post-success="onPostSucces"
          ></comment-post>
        </van-popup>
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle(articleId)"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 回复评论弹出层 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleContentAPI } from '@/api'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/followUser'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './component/comment-list.vue'
import CommentPost from './component/comment-post.vue'
import CommentReply from './component/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  // 给所有的后代组件提供数据
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data() {
    return {
      loading: true, // 渲染loading
      articleContent: {},
      errStatus: 0, // 失败状态码
      total_count: 0,
      isPostShow: false, // 控制发布显示
      commentList: [],
      isReplyShow: false,
      currentComment: {} // 当前点击的评论项
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle(this.articleId)
  },
  mounted() {
  },
  methods: {
    async loadArticle(id) {
      // 先要展示loading状态
      this.loading = true
      try {
        const { data } = await getArticleContentAPI(id)

        // if (Math.random() > 0.5) {
        //   JSON.parse('dhksSCSACSACnlk')
        // }

        // 数据驱动视图这件事 不是立即的
        this.articleContent = data.data

        // 初始化图片点击预览
        // 数据驱动视图这件事 不是立即的
        // console.log(this.$refs['article-content']) // undefined
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      // 请求后 关闭loading
      this.loading = false
    },
    previewImage() {
      // 得到所有的Image节点
      const articleCon = this.$refs['article-content']
      // dom操作得到img数组
      const imgs = articleCon.querySelectorAll('img')
      const images = []
      // 遍历数组
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          // 预览图片组件
          ImagePreview({
            images, // 预览的图片地址数组
            startPosition: index // 起始位置
          })
        }
      })
    },
    onPostSucces(data) {
      // 关闭弹层
      this.isPostShow = false
      // 将发布内容放在列表最前面
      this.commentList.unshift(data.new_obj)
      console.log(this.commentList)
    },
    onReplyClick(comment) {
      this.currentComment = comment
      this.isReplyShow = true
    }
  }

}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
  }
}
</style>
