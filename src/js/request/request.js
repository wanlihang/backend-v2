import {
    get,
    post,
    put,
    destroy
} from './http';

const Api = {
    Auth: {
        Login(params) {
            return post('/backend/api/v1/login', params);
        }
    },
    Administrator: {
        Detail() {
            return get(`/backend/api/v1/user`);
        },
        ChangePassword(params) {
            return put(`/backend/api/v1/administrator/password`, params);
        }
    },
    Stat: {
        Statistic(id, params) {
            return get(`/backend/api/v1/statistic/${id}`, params);
        },
    },
    Role: {
        Info(params) {
            return get(`/backend/api/v1/role`, params);
        },
        Destory(id) {
            return destroy(`/backend/api/v1/role/${id}`);
        },
        Create(params) {
            return post(`/backend/api/v1/role`, params);
        },
        Detail(id) {
            return get(`/backend/api/v1/role/${id}`);
        },
        Update(id, params) {
            return put(`/backend/api/v1/role/${id}`, params);
        }
    },
    Order: {
        OrderList: {
            List(params) {
                return get(`/backend/api/v1/order`, params);
            },
        },
        PromoCode: {
            PromoCode(params) {
                return get(`/backend/api/v1/promoCode`, params);
            },
            DestroyMulti(params) {
                return post(`/backend/api/v1/promoCode/delete/multi`, params);
            },
            Create(params) {
                return post(`/backend/api/v1/promoCode`, params)
            },
            CreateMulti(params) {
                return post(`/backend/api/v1/promoCode/generator`, params)
            },
            Import(params) {
                return post(`/backend/api/v1/promoCode/import`, params);
            },
        },
        WithdrawOrders: {
            WithdrawOrders(params) {
                return get(`/backend/api/v1/member/inviteBalance/withdrawOrders`, params);
            },
        },

    },
    Media: {
        Image: {
            List(params) {
                return get(`/backend/api/v1/media/images`, params);
            }
        }
    },
    System: {
        Config: {
            All() {
                return get(`/backend/api/v1/setting`);
            },
            Save(params) {
                return post(`/backend/api/v1/setting`, params);
            }
        },
        Addons: {
            LocalList(params) {
                return get(`/backend/api/v1/addons`, params);
            },
            Repository(params) {
                return get(`/backend/api/v1/addons/repository`, params);
            },
            Install(params) {
                return get(`/backend/api/v1/addons/repository/install`, params);
            },
            Upgrade(params) {
                return get(`/backend/api/v1/addons/repository/upgrade`, params);
            },
            Switch(params) {
                return post(`/backend/api/v1/addons/switch`, params);
            }
        },
        administrator: {
            List(params) {
                return get(`/backend/api/v1/administrator`, params);
            },
            Create() {
                return get(`/backend/api/v1/administrator/create`);
            },
            Store(params) {
                return post(`/backend/api/v1/administrator`, params);
            },
            Destory(id) {
                return destroy(`/backend/api/v1/administrator/${id}`);
            },
            Detail(id) {
                return get(`/backend/api/v1/administrator/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/administrator/${id}`, params);
            }
        },
        adminroles: {
            List(params) {
                return get(`/backend/api/v1/administrator_role`, params);
            },
            Create() {
                return get(`/backend/api/v1/administrator_role/create`);
            },
            Store(params) {
                return post(`/backend/api/v1/administrator_role`, params);
            },
            Destory(id) {
                return destroy(`/backend/api/v1/administrator_role/${id}`);
            },
            Detail(id) {
                return get(`/backend/api/v1/administrator_role/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/administrator_role/${id}`, params);
            }
        },
    },
    Course:{
        Vod:{
            List(params) {
                return get(`/backend/api/v1/course`, params);
            },
            Create() {
                return get(`/backend/api/v1/course/create`);
            },
            Store(params) {
                return post(`/backend/api/v1/course`, params);
            },
            Destory(id) {
                return destroy(`/backend/api/v1/course/${id}`);
            },
            Detail(id) {
                return get(`/backend/api/v1/course/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/course/${id}`, params);
            },
            Categories:{
                List(params) {
                    return get(`/backend/api/v1/courseCategory`, params);
                },
                Store(params) {
                    return post(`/backend/api/v1/courseCategory`, params);
                },
                Destory(id) {
                    return destroy(`/backend/api/v1/courseCategory/${id}`);
                },
                Detail(id) {
                    return get(`/backend/api/v1/courseCategory/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/api/v1/courseCategory/${id}`, params);
                }
            },
            Chapters:{
                List(id,params) {
                    return get(`/backend/api/v1/course_chapter/${id}`, params);
                },
                Store(id,params) {
                    return post(`/backend/api/v1/course_chapter/${id}`, params);
                },
                Destory(id,ids) {
                    return destroy(`/backend/api/v1/course_chapter/${id}/${ids}`);
                },
                Detail(id,ids) {
                    return get(`/backend/api/v1/course_chapter/${id}/${ids}`);
                },
                Update(id,ids, params) {
                    return put(`/backend/api/v1/course_chapter/${id}/${ids}`, params);
                }
            },
            Attach:{
                List(params) {
                    return get(`/backend/api/v1/course_attach`, params);
                },
                Store(params) {
                    return post(`/backend/api/v1/course_attach`, params);
                },
                Destory(id) {
                    return destroy(`/backend/api/v1/course_attach/${id}`);
                },
            },
            Records:{
                List(id,params) {
                    return get(`/backend/api/v1/course/${id}/watch/records`, params);
                },
            },
            Videos:{
                List(params) {
                    return get(`/backend/api/v1/video`, params);
                },
                Create(id,params) {
                    return get(`/backend/api/v1/course_chapter/${id}`, params);
                },
                Store(params) {
                    return post(`/backend/api/v1/video`, params);
                },
                DestoryMulti( params) {
                    return post(`/backend/api/v1/video/delete/multi`, params);
                },
                Detail(id,ids) {
                    return get(`/backend/api/v1/video/${id}/${ids}`);
                },
                Update(id,ids, params) {
                    return put(`/backend/api/v1/video/${id}/${ids}`, params);
                }
            },
        },
    },
    Wechat:{
        Reply:{
            List(params) {
                return get(`/backend/api/v1/mpWechatMessageReply`, params);
            },
            Create(){
                return get(`/backend/api/v1/mpWechatMessageReply/create`);
            },
            Store(params) {
                return post(`/backend/api/v1/mpWechatMessageReply`, params);
            },
            Destory(id) {
                return destroy(`/backend/api/v1/mpWechatMessageReply/${id}`);
            },
            Detail(id) {
                return get(`/backend/api/v1/mpWechatMessageReply/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/mpWechatMessageReply/${id}`, params);
            }
        },
    },
    Wenda:{
        Question:{
            List(params) {
                return get(`/backend/addons/Wenda/question/index`, params);
            },
            Category(){
                return get(`/backend/addons/Wenda/category/index`);
            },
            DestoryMulti(params) {
                return post(`backend/addons/Wenda/question/delete`,params);
            },
            Answer(id){
                return get(`/backend/addons/Wenda/question/${id}/answers`);
            },
            Cate:{
                Destory(id) {
                    return destroy(`/backend/addons/Wenda/category/${id}`);
                },
                Store(params) {
                    return post(`/backend/addons/Wenda/category/create`, params);
                },
                Detail(id) {
                    return get(`/backend/addons/Wenda/category//${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/Wenda/category/${id}`, params);
                }
            }
        },
    },
    Member: {
        List(params) {
            return get(`/backend/api/v1/member`, params);
        },
        Create() {
            return get(`/backend/api/v1/member/create`);
        },
        Store(params) {
            return post(`/backend/api/v1/member`, params);
        },
        Edit(id) {
            return get(`/backend/api/v1/member/${id}`);
        },
        Update(id, params) {
            return put(`/backend/api/v1/member/${id}`, params);
        },
        Import(params) {
            return post(`/backend/api/v1/member/import`, params);
        },
        Detail(id) {
            return get(`/backend/api/v1/member/${id}/detail`);
        },
        UserCourses(id, params) {
            return get(`/backend/api/v1/member/${id}/detail/userCourses`, params);
        },
        UserVideos(id, params) {
            return get(`/backend/api/v1/member/${id}/detail/userVideos`, params);
        },
        UserRoles(id, params) {
            return get(`/backend/api/v1/member/${id}/detail/userRoles`, params);
        },
        UserOrders(id, params) {
            return get(`/backend/api/v1/member/${id}/detail/userOrders`, params);
        },
        UserCredit1(id, params) {
            return get(`/backend/api/v1/member/${id}/detail/credit1Records`, params);
        },
        UserInviteRecords(id, params) {
            return get(`/backend/api/v1/member/${id}/detail/userInvite`, params);
        },
        UserVodWatchRecords(id, params) {
            return get(`/backend/api/v1/member/${id}/detail/userHistory`, params);
        },
        UserVideoWatchRecords(id, params) {
            return get(`/backend/api/v1/member/${id}/detail/videoWatchRecords`, params);
        },
        TagUpdate(id, params) {
            return put(`/backend/api/v1/member/${id}/tags`, params);
        },
        RemarkUpdate(id, params) {
            return put(`/backend/api/v1/member/${id}/remark`, params);
        },
        Credit1Change(params) {
            return post(`/backend/api/v1/member/credit1/change`, params);
        },
        Tag: {
            List(params) {
                return get(`/backend/api/v1/member/tag/index`, params);
            },
            Create() {
                return get(`/backend/api/v1/member/tag/create`);
            },
            Store(params) {
                return post(`/backend/api/v1/member/tag/create`, params);
            },
            Edit(id) {
                return get(`/backend/api/v1/member/tag/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/member/tag/${id}`, params);
            },
            Destroy(id) {
                return destroy(`/backend/api/v1/member/tag/${id}`);
            },
        }
    },
    ViewBlock: {
        List(params) {
            return get(`/backend/api/v1/viewBlock/index`, params);
        },
        Create() {
            return get(`/backend/api/v1/viewBlock/create`);
        },
        Store(params) {
            return post(`/backend/api/v1/viewBlock/create`, params);
        },
        Edit(id) {
            return get(`/backend/api/v1/viewBlock/${id}`);
        },
        Update(id, params) {
            return put(`/backend/api/v1/viewBlock/${id}`, params);
        },
        Destroy(id) {
            return destroy(`/backend/api/v1/viewBlock/${id}`);
        },
    }
}

export default Api;