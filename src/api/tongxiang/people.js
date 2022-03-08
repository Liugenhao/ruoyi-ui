import request from '@/utils/request'

// 查询人员信息列表
export function listPeople(query) {
  return request({
    url: '/tongxiang/people/list',
    method: 'get',
    params: query
  })
}

// 查询人员信息详细
export function getPeople(id) {
  return request({
    url: '/tongxiang/people/' + id,
    method: 'get'
  })
}

// 新增人员信息
export function addPeople(data) {
  return request({
    url: '/tongxiang/people',
    method: 'post',
    data: data
  })
}

// 修改人员信息
export function updatePeople(data) {
  return request({
    url: '/tongxiang/people',
    method: 'put',
    data: data
  })
}

// 删除人员信息
export function delPeople(id) {
  return request({
    url: '/tongxiang/people/' + id,
    method: 'delete'
  })
}

// 导出人员信息
export function exportPeople(query) {
  return request({
    url: '/tongxiang/people/export',
    method: 'get',
    params: query
  })
}