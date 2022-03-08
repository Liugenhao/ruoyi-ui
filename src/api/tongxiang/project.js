import request from '@/utils/request'

// 查询工地信息列表
export function listProject(query) {
  return request({
    url: '/tongxiang/project/list',
    method: 'get',
    params: query
  })
}

// 查询工地信息详细
export function getProject(id) {
  return request({
    url: '/tongxiang/project/' + id,
    method: 'get'
  })
}

// 查询该工地所有扬尘设备
export function getUnbind(id) {
  return request({
    url: '/tongxiang/project/unbind/' + id,
    method: 'get'
  })
}

// 查询该工地已绑定扬尘设备
export function getBind(id) {
  return request({
    url: '/tongxiang/project/bind/' + id,
    method: 'get'
  })
}

// 新增工地信息
export function addProject(data) {
  return request({
    url: '/tongxiang/project',
    method: 'post',
    data: data
  })
}

// 修改工地信息
export function updateProject(data) {
  return request({
    url: '/tongxiang/project',
    method: 'put',
    data: data
  })
}

// 删除工地信息
export function delProject(id) {
  return request({
    url: '/tongxiang/project/' + id,
    method: 'delete'
  })
}

// 导出工地信息
export function exportProject(query) {
  return request({
    url: '/tongxiang/project/export',
    method: 'get',
    params: query
  })
}

export function bindDevice(query) {
  return request({
    url: '/tongxiang/project/bindDevice',
    method: 'get',
    params: query
  })
}

export function unBindDevice(query) {
  return request({
    url: '/tongxiang/project/unBindDevice',
    method: 'get',
    params: query
  })
}