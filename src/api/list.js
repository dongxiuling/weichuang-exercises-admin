import request from '@/utils/request'
//获取分类目录
export function getList(params) {
  return request({
    url: 'http://localhost:3001/getPartsNameByBigpartname',
    method: 'get',
    params
  })
}
//获取按分类单选题列表
export function getSingleParts(params){
  return request({
    url: 'http://localhost:3001/show_single_by_parts',
    method:'get',
    params
  })
}

//获取按分类多选题列表
export function getMultipleParts(params){
  return request({
    url: 'http://localhost:3001/show_multiple_by_parts',
    method:'get',
    params
  })
}
//修改按分类单选题
export function changeSingleParts(params){
  return request({
    url: 'http://localhost:3001/updateSingleExercise',
    method:'get',
    params
  })
}
//修改按分类多选题
export function changeMultipleParts(params){
  return request({
    url: 'http://localhost:3001/updateMultipleExercise',
    method:'get',
    params
  })
}
//添加按分类单选题
export function addSingleParts(params){
  return request({
    url: 'http://localhost:3001/insertPartSingleExercise',
    method:'get',
    params
  })
}
//添加按分类多选题
export function addMultipleParts(params){
  return request({
    url: 'http://localhost:3001/insertPartMultipleExercise',
    method:'get',
    params
  })
}
//删除按分类单选题
export function deleteSingleParts(params){
  return request({
    url: 'http://localhost:3001/deleSingleExercise',
    method:'get',
    params
  })
}
//删除按分类多选题
export function deleteMultipleParts(params){
  return request({
    url: 'http://localhost:3001/deleMultipleExercise',
    method:'get',
    params
  })
}