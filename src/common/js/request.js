import axios from 'axios'
import {isJson} from './util'
import {assembleParam} from './cache'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 100000,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
})

service.interceptors.request.use(config => {
  return Object.assign(config, { data: assembleParam(config.url.replace(config.baseURL, ''), config.data) })
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    if (!isJson(response.data)) {
      return JSON.parse(response.data)
    }
    return response.data || {}
  },
  error => {
    return Promise.reject(error)
  })

export default service
