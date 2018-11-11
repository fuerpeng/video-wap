import request from 'common/js/request'

export function getVideoListByType (data) {
  return request({
    url: '/web/getVideoListByType',
    method: 'post',
    data
  })
}
