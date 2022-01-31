import { userLogin, sendSms, getUserInfo, getUserChannels, cancelFollow, addFollow, getUserFollowList, getUserCollectList, getUserHistoryList, getUserProfile, editUserProfile, editUserPhoto } from './user'
import { getArticles, getArticleContent, collectArticle, delCollectArticle, likeArticle, delLikeArticle, getHistoy } from './article'
import { allChannels, addUserChannel, delUserChannel } from './channel'
import { getSuggest, getResult } from './search'
import { getComments, postComments, addLike, delLike } from './comment'

export const userLoginAPI = userLogin
export const sendSmsAPI = sendSms
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticlesAPI = getArticles
export const allChannelsAPI = allChannels
export const getSuggestAPI = getSuggest
export const getResultAPI = getResult
export const addUserChannelAPI = addUserChannel
export const delUserChannelAPI = delUserChannel
export const getArticleContentAPI = getArticleContent
export const addFollowAPI = addFollow
export const cancelFollowAPI = cancelFollow
export const collectArticleAPI = collectArticle
export const delCollectArticleAPI = delCollectArticle
export const likeArticleAPI = likeArticle
export const delLikeArticleAPI = delLikeArticle
export const getCommentsAPI = getComments
export const postCommentsAPI = postComments
export const addLikeAPI = addLike
export const delLikeAPI = delLike
export const getHistoyAPI = getHistoy
export const getUserFollowListAPI = getUserFollowList
export const getUserCollectListAPI = getUserCollectList
export const getUserHistoryListAPI = getUserHistoryList
export const getUserProfileAPI = getUserProfile
export const editUserProfileAPI = editUserProfile
export const editUserPhotoAPI = editUserPhoto
