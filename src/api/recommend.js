import request from 'common/js/request'

export function getVideoTypes () {
  return request({
    url: '/web/getVideoTypes',
    method: 'post'
  })
}

export function getVideoListByTypeForIndexPage (data) {
  return request({
    url: '/web/getVideoListByTypeForIndexPage',
    method: 'post',
    data
  })
}

export function getContactQQ () {
  return request({
    url: '/web/getContactNumber',
    method: 'post'
  })
}
