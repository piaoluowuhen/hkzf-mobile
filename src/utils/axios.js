import axios from 'axios'
import { getToken, removeToken } from './auth'
/* 
  1 在 api.js 中，添加请求拦截器。
  2 获取到当前请求的接口路径（url）。
  3 判断接口路径，是否是以 /user 开头，并且不是登录或注册接口（只给需要的接口添加请求头）。
  4 如果是，就添加请求头 Authorization。
  5 添加响应拦截器。
  6 判断返回值中的状态码。
  7 如果是 400，表示 token 超时或异常，直接移除 token。
*/
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    timeout: 10000,
    // headers: { 'X-Custom-Header': 'foobar' }
  })
  // 添加请求拦截器
  axiosInstance.interceptors.request.use(config => {
  // console.log(config, config.url)
  const { url } = config
  if (
    url.startsWith('/user') &&
    !url.startsWith('/user/login') &&
    !url.startsWith('/user/registered')
  ) {
    // 添加请求头
    config.headers.Authorization = getToken()
  }
  return config
})

// 添加响应拦截器
axiosInstance.interceptors.response.use(response => {
  // console.log(response)
  const { status } = response.data
  if (status === 400) {
    // 此时，说明 token 失效，直接移除 token 即可
    removeToken()
  }
  return response
})

  export default axiosInstance