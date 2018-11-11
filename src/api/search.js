import request from 'common/js/request'

export function searchVideo (data) {
  return request({
    url: '/web/fuzzSearchVideo',
    method: 'post',
    data
  })
}
