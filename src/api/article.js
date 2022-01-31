// 文章请求模块

import request from '@/utils/request'

// 请求获取文章列表数据
export const getArticles = (params) => request({
  url: '/v1_0/articles',
  method: 'GET',
  params
})

// 获取文章详情
export const getArticleContent = (id) => request({
  url: `/v1_0/articles/${id}`,
  method: 'GET'
})

// 收藏文章
export const collectArticle = (target) => request({
  url: '/v1_0/article/collections',
  method: 'POST',
  data: {
    target
  }
})

// 取消收藏
export const delCollectArticle = (target) => request({
  url: `/v1_0/article/collections/${target}`,
  method: 'DELETE'
})

// 对文章点赞
export const likeArticle = (target) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target
  }
})

// 取消对文章点赞
export const delLikeArticle = (target) => request({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE'
})

// 获取用户阅读历史
export const getHistoy = (params) => request({
  url: '/v1_0/user/histories',
  method: 'GET',
  params
})
