import request from 'request/request'

// 查询【请填写功能名称】列表
export function listEnv(query) {
    return request({
        url: '/ilab/system/env/list',
        method: 'get',
        params: query
    })
}

// 查询【请填写功能名称】详细
export function getEnv(id) {
    return request({
        url: '/ilab/system/env/' + id,
        method: 'get'
    })
}

// 新增【请填写功能名称】
export function addEnv(data) {
    return request({
        url: '/ilab/system/env',
        method: 'post',
        data: data
    })
}

// 修改【请填写功能名称】
export function updateEnv(data) {
    return request({
        url: '/ilab/system/env',
        method: 'put',
        data: data
    })
}

// 删除【请填写功能名称】
export function delEnv(id) {
    return request({
        url: '/ilab/system/env/' + id,
        method: 'delete'
    })
}
