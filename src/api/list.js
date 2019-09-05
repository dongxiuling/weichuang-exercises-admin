import request from '@/utils/request'
//获取分类目录
var baseUrl='http://excises.superlanlanlan.cn'
export function getList(params) {
  return request({
    url: baseUrl+'/getPartsNameByBigpartname',
    method: 'get',
    params
  })
}
//获取按分类单选题列表
export function getSingleParts(params){
  return request({
    url: baseUrl+'/show_single_by_parts',
    method:'get',
    params
  })
}

//获取按分类多选题列表
export function getMultipleParts(params){
  return request({
    url: baseUrl+'/show_multiple_by_parts',
    method:'get',
    params
  })
}
//修改按分类单选题
export function changeSingleParts(params){
  return request({
    url: baseUrl+'/updateSingleExercise',
    method:'get',
    params
  })
}
//修改按分类多选题
export function changeMultipleParts(params){
  return request({
    url: baseUrl+'/updateMultipleExercise',
    method:'get',
    params
  })
}
//添加按分类单选题
export function addSingleParts(params){
  return request({
    url: baseUrl+'/insertPartSingleExercise',
    method:'get',
    params
  })
}
//添加按分类多选题
export function addMultipleParts(params){
  return request({
    url: baseUrl+'/insertPartMultipleExercise',
    method:'get',
    params
  })
}
//删除按分类单选题
export function deleteSingleParts(params){
  return request({
    url: baseUrl+'/deleSingleExercise',
    method:'get',
    params
  })
}
//删除按分类多选题
export function deleteMultipleParts(params){
  return request({
    url: baseUrl+'/deleMultipleExercise',
    method:'get',
    params
  })
}