import {
    get,
    post,
    put
} from './http';

const Api = {
    Auth: {
        Login(params) {
            return post('/backend/api/v1/login', params);
        }
    },
    App: {
        Index(params) {
            return get('/backend/api/v1/app/index', params);
        },
        Store(params) {
            return post('/backend/api/v1/app/store', params);
        },
        Edit(id, params) {
            return get(`/backend/api/v1/app/edit/${id}`, params);
        },
        Update(id, params) {
            return put(`/backend/api/v1/app/edit/${id}`, params);
        },
        Recharge(id, params) {
            return post(`/backend/api/v1/app/recharge/${id}`, params);
        },
        Record(id, params) {
            return get(`/backend/api/v1/app/${id}/record`, params);
        }
    },
    Stat: {
        Statistic(id, params) {
            return get(`/backend/api/v1/statistic/${id}`, params);
        },
    },
    Member: {
        Info() {
            return get(`/backend/api/v1/member/info`);
        }
    },
    Media: {
        Image: {
            List(params) {
                return get(`/backend/api/v1/media/images`, params);
            }
        }
    }
}

export default Api;