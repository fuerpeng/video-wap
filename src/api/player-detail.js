import request from 'common/js/request'

export function getGuessYouLikeVideo (data) {
  return request({
    url: '/web/getVideoListByType',
    method: 'post',
    data
  })
}

export function getLines () {
  return request({
    url: '/web/getLines',
    method: 'post'
  })
}
