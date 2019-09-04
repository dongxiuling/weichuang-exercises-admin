import request from '@/utils/request'

export function login(data) {
  // console.log(123);
  return request({
    url: 'http://login.superlanlanlan.cn/teaMangeLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
