import request from '@/utils/request'

// 查询集团、公司信息列表
export function listCompany(query) {
  return request({
    url: '/tongxiang/company/list',
    method: 'get',
    params: query
  })
}

// 查询集团、公司信息详细
export function getCompany(id) {
  return request({
    url: '/tongxiang/company/' + id,
    method: 'get'
  })
}

// 查询公司下的工地
export function getAllProject(query) {
  return request({
    url: '/tongxiang/company/getAllProject',
    method: 'get',
    params: query
  })
}

// 查询公司下的人员
export function getAllPeople(query) {
  return request({
    url: '/tongxiang/company/getAllPeople',
    method: 'get',
    params: query
  })
}

// 新增集团、公司信息
export function addCompany(data) {
  return request({
    url: '/tongxiang/company',
    method: 'post',
    data: data
  })
}

// 修改集团、公司信息
export function updateCompany(data) {
  return request({
    url: '/tongxiang/company',
    method: 'put',
    data: data
  })
}

// 删除集团、公司信息
export function delCompany(id) {
  return request({
    url: '/tongxiang/company/' + id,
    method: 'delete'
  })
}

// 导出集团、公司信息
export function exportCompany(query) {
  return request({
    url: '/tongxiang/company/export',
    method: 'get',
    params: query
  })
}