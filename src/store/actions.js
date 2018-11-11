import * as types from './mutation-types'
import {getGuessYouLikeVideo} from 'api/player-detail'
import {ERR_OK} from 'api/config'

function findIndex (list, obj) {
  return list.findIndex((item) => {
    return item.id === obj.id
  })
}

function hasMore (dataList, pageSize) {
  if (!dataList.length || dataList.length < pageSize) {
    return false
  }
  return true
}

export const updateVideoTypeVideos = function ({commit, state}, videoTypeObject) {
  let recommendVideos = state.recommendVideos.slice()
  let fpIndex = findIndex(recommendVideos, videoTypeObject)
  if (fpIndex > -1) {
    recommendVideos.splice(fpIndex, 1, videoTypeObject)
    commit(types.SET_RECOMMEND_VIDEO_LIST, recommendVideos)
  }
}

export const insertGuessLikeVideos = function ({commit, state}, typeId) {
  return new Promise((resolve, reject) => {
    let pageSize = 10
    let pageNum = state.guessLikePageNum
    getGuessYouLikeVideo({typeId: typeId, pageNum: pageNum++, pageSize}).then(response => {
      const {currentStatus, currentData} = response
      if (currentStatus === ERR_OK) {
        let guessLikeList = state.guessLikeList.slice()
        guessLikeList = guessLikeList.concat(currentData.list)

        commit(types.SET_GUESS_LIKE_HAS_MORE, hasMore(currentData.list, pageSize))

        commit(types.SET_GUESS_LIKE_LIST, guessLikeList)
        commit(types.SET_GUESS_LIKE_PAGE_NUM, pageNum)
        resolve(response.currentData)
      } else {
        reject(new Error('error data'))
      }
    }).catch(error => {
      reject(error)
    })
  })
}
