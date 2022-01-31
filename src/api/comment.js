import request from '@/utils/request'

// 获取文章评论
export const getComments = (params) => request({
  url: '/v1_0/comments',
  method: 'GET',
  params
})

// 发布评论
export const postComments = (data) => request({
  url: '/v1_0/comments',
  method: 'POST',
  data
})

// 评论点赞
export const addLike = (target) => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target
  }
})

// 取消点赞
export const delLike = (target) => request({
  url: `/v1_0/comment/likings/${target}`,
  method: 'DELETE'
})
