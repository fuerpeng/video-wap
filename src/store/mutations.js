import * as types from './mutation-types'
import {setPlaying} from 'common/js/cache'

const mutations = {
  [types.SET_PLAYER_VIDEO] (state, video) {
    console.log(video, '11111')
    setPlaying(video)
    state.playerVideo = video
  },
  [types.SET_ROUTER_TITLE] (state, title) {
    state.routerTitle = title
  },
  [types.SET_RECOMMEND_VIDEO_LIST] (state, videos) {
    state.recommendVideos = videos
  },
  [types.SET_VIDEO_TYPES] (state, types) {
    state.videoTypes = types
  },
  [types.SET_GUESS_LIKE_LIST] (state, list) {
    state.guessLikeList = list
  },
  [types.SET_GUESS_LIKE_PAGE_NUM] (state, pageNum) {
    state.guessLikePageNum = pageNum
  },
  [types.SET_GUESS_LIKE_HAS_MORE] (state, hasMore) {
    state.guessLikeHasMore = hasMore
  },
  [types.SET_QQ] (state, payload) {
    state.qq = payload.qq
  },
  [types.SET_WECHAT] (state, payload) {
    state.weChat = payload.weChat
  },
  [types.SET_FAVORITELIST] (state, payload) {
    if (payload) {
      let isHave = state.favoriteList.filter(function (item) {
        return item.id === payload.id
      })
      if (isHave.length === 0) {
        state.favoriteList.push(payload)
        let localData = window.localStorage.getItem('favoriteList')
        var data = []
        if (localData != null) {
          data = JSON.parse(localData)
          data.push(payload)
        } else {
          data = [payload]
        }
        window.localStorage.setItem('favoriteList', JSON.stringify(data))
      }
    }
  }
}

export default mutations
