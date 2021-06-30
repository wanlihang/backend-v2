import axios from 'axios';
import QS from 'querystring';
import config from '../config';
// 请求域名
axios.defaults.baseURL = config.url;
axios.defaults.timeout = 10000;

// 请求拦截器(附带上token)
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('astoken');
        token && (config.headers.Authorization = 'Bearer ' + token);
        return config;
    },
    error => {
        return Promise.error(error);
    });

// 响应拦截器
axios.interceptors.response.use(
    response => {
        let status = response.data.status;
        //console.log(status)
        if (status !== 0 && status != 401) {
            // api请求返回错误
            return Promise.reject(response);
        } else {
            return Promise.resolve(response);
        }
    },
    // 当http的状态码非0
    error => {
        let httpCode = error.response.status;
        if (httpCode === 401) {
            // 未登录
        } else if (httpCode === 403) {
            // 无权限
        } else {
            // 其他错误
        }
        return Promise.reject(error.response);
    }
);

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

export function destroy(url) {
    return new Promise((resolve, reject) => {
        axios.delete(url).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}