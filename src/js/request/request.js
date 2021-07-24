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
        List(params) {
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
        Detail(id) {
            return get(`/backend/api/v1/order/${id}`);
        },
        SetPaid(id) {
            return get(`/backend/api/v1/order/${id}/finish`);
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
            Submit(params) {
                return post(`/backend/api/v1/member/inviteBalance/withdrawOrders`, params);
            }
        },

    },
    Media: {
        Image: {
            List(params) {
                return get(`/backend/api/v1/media/images`, params);
            }
        },
        Video: {
            List(params) {
                return get(`/backend/api/v1/media/videos/index`, params);
            },
            Store(params) {
                return post(`/backend/api/v1/media/videos/create`, params);
            }
        }
    },
    Miaosha: {
        Orders: {
            List(params) {
                return get(`/backend/addons/MiaoSha/orders/index`, params);
            }
        },
        Goods: {
            List(params) {
                return get(`/backend/addons/MiaoSha/goods/index`, params);
            },
            Destory(id) {
                return destroy(`/backend/addons/MiaoSha/goods//${id}`);
            },
            Store(params) {
                return post(`/backend/addons/MiaoSha/goods/create`, params);
            },
            Create(params) {
                return get(`/backend/addons/MiaoSha/goods/create`, params);
            },
            Detail(id) {
                return get(`/backend/addons/MiaoSha/goods/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/MiaoSha/goods/${id}`, params);
            }
        },
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
        Navs: {
            List(params) {
                return get(`/backend/api/v1/nav`, params);
            },
            Create() {
                return get(`/backend/api/v1/nav/create`);
            },
            Store(params) {
                return post(`/backend/api/v1/nav`, params);
            },
            Destroy(id) {
                return destroy(`/backend/api/v1/nav/${id}`);
            },
            Detail(id) {
                return get(`/backend/api/v1/nav/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/nav/${id}`, params);
            }
        },
        Sliders: {
            List(params) {
                return get(`/backend/api/v1/slider`, params);
            },
            Store(params) {
                return post(`/backend/api/v1/slider`, params);
            },
            Destroy(id) {
                return destroy(`/backend/api/v1/slider/${id}`);
            },
            Detail(id) {
                return get(`/backend/api/v1/slider/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/slider/${id}`, params);
            }
        },
        Links: {
            List(params) {
                return get(`/backend/api/v1/link`, params);
            },
            Store(params) {
                return post(`/backend/api/v1/link`, params);
            },
            Destroy(id) {
                return destroy(`/backend/api/v1/link/${id}`);
            },
            Detail(id) {
                return get(`/backend/api/v1/link/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/link/${id}`, params);
            }
        },
        Announcement: {
            List(params) {
                return get(`/backend/api/v1/announcement`, params);
            },
            Store(params) {
                return post(`/backend/api/v1/announcement`, params);
            },
            Destroy(id) {
                return destroy(`/backend/api/v1/announcement/${id}`);
            },
            Detail(id) {
                return get(`/backend/api/v1/announcement/${id}`);
            },
            Update(id, params) {
                return put(`/backend/api/v1/announcement/${id}`, params);
            }
        },
        VideoUpload: {
            AliyunTokenRefresh(params) {
                return post(`/backend/api/v1/video/token/aliyun/refresh`, params);
            },
            AliyunTokenCreate(params) {
                return post(`/backend/api/v1/video/token/aliyun/create`, params);
            },
            TencentToken(params) {
                return post(`/backend/api/v1/video/token/tencent`, params);
            }
        }
    },
    Course: {
        Vod: {
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
            SubUsers(id, params) {
                return get(`/backend/api/v1/course/${id}/subscribes`, params);
            },
            SubUsersAdd(id, params) {
                return post(`/backend/api/v1/course/${id}/subscribe/create`, params);
            },
            SubUsersDel(id, params) {
                return get(`/backend/api/v1/course/${id}/subscribe/delete`, params);
            },
            Comment: {
                List(params) {
                    return get(`/backend/api/v1/course_comment`, params);
                },
                Destroy(params) {
                    return post(`/backend/api/v1/course_comment/delete`, params);
                }
            },
            Categories: {
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
            Chapters: {
                List(id, params) {
                    return get(`/backend/api/v1/course_chapter/${id}`, params);
                },
                Store(id, params) {
                    return post(`/backend/api/v1/course_chapter/${id}`, params);
                },
                Destory(id, ids) {
                    return destroy(`/backend/api/v1/course_chapter/${id}/${ids}`);
                },
                Detail(id, ids) {
                    return get(`/backend/api/v1/course_chapter/${id}/${ids}`);
                },
                Update(id, ids, params) {
                    return put(`/backend/api/v1/course_chapter/${id}/${ids}`, params);
                }
            },
            Attach: {
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
            Records: {
                List(id, params) {
                    return get(`/backend/api/v1/course/${id}/watch/records`, params);
                },
                Del(id, params) {
                    return post(`/backend/api/v1/course/${id}/watch/records/delete`, params);
                }
            },
            Videos: {
                List(params) {
                    return get(`/backend/api/v1/video`, params);
                },
                Create(id) {
                    return get(`/backend/api/v1/course_chapter/${id}`);
                },
                Store(params) {
                    return post(`/backend/api/v1/video`, params);
                },
                DestoryMulti(params) {
                    return post(`/backend/api/v1/video/delete/multi`, params);
                },
                Detail(id) {
                    return get(`/backend/api/v1/video/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/api/v1/video/${id}`, params);
                },
                Subscribe(id, params) {
                    return get(`/backend/api/v1/video/${id}/subscribes`, params);
                },
                WatchRecords(id, params) {
                    return get(`/backend/api/v1/video/${id}/watch/records`, params);
                },
                ImportAct(params) {
                    return post(`/backend/api/v1/video/import`, params);
                },
                Comment: {
                    List(params) {
                        return get(`/backend/api/v1/video_comment`, params);
                    },
                    Destroy(params) {
                        return post(`/backend/api/v1/video_comment/delete`, params);
                    }
                },
            },
        },
        Live: {
            Course: {
                List(params) {
                    return get(`/backend/addons/zhibo/course/index`, params);
                },
                Create() {
                    return get(`/backend/addons/zhibo/course/create`);
                },
                Store(params) {
                    return post(`/backend/addons/zhibo/course/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/zhibo/course/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/zhibo/course/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/zhibo/course/${id}`, params);
                },
                Comment(params) {
                    return get(`/backend/addons/zhibo/course_comment`, params);
                },
                CommentDestoryMulti(params) {
                    return post(`/backend/addons/zhibo/course_comment/delete`, params);
                },
                CommentCheck(params) {
                    return post(`/backend/addons/zhibo/course_comment/check`, params);
                },
                Category: {
                    List() {
                        return get(`/backend/addons/zhibo/course_category/index`);
                    },
                    Store(params) {
                        return post(`/backend/addons/zhibo/course_category/create`, params);
                    },
                    Destory(id) {
                        return destroy(`/backend/addons/zhibo/course_category/${id}`);
                    },
                    Detail(id) {
                        return get(`/backend/addons/zhibo/course_category/${id}`);
                    },
                    Update(id, params) {
                        return put(`/backend/addons/zhibo/course_category/${id}`, params);
                    },
                },
                Chapter: {
                    List(params) {
                        return get(`/backend/addons/zhibo/course_chapter/index`, params);
                    },
                    Store(params) {
                        return post(`/backend/addons/zhibo/course_chapter/create`, params);
                    },
                    Destory(id) {
                        return destroy(`/backend/addons/zhibo/course_chapter/${id}`);
                    },
                    Detail(id) {
                        return get(`/backend/addons/zhibo/course_chapter/${id}`);
                    },
                    Update(id, params) {
                        return put(`/backend/addons/zhibo/course_chapter/${id}`, params);
                    },
                },
                Users: {
                    List(id, params) {
                        return get(`/backend/addons/zhibo/course/${id}/users`, params);
                    },
                    Add(id, params) {
                        return post(`/backend/addons/zhibo/course/${id}/user/add`, params);
                    },
                    Del(id, params) {
                        return post(`/backend/addons/zhibo/course/${id}/user/del`, params);
                    },
                },
                Video: {
                    List(params) {
                        return get(`/backend/addons/zhibo/course_video/index`, params);
                    },
                    Create() {
                        return get(`/backend/addons/zhibo/course_video/create`);
                    },
                    Store(params) {
                        return post(`/backend/addons/zhibo/course_video/create`, params);
                    },
                    Destory(id) {
                        return destroy(`/backend/addons/zhibo/course_video/${id}`);
                    },
                    Detail(id) {
                        return get(`/backend/addons/zhibo/course_video/${id}`);
                    },
                    Update(id, params) {
                        return put(`/backend/addons/zhibo/course_video/${id}`, params);
                    },
                    Play(params) {
                        return get(`/backend/addons/zhibo/zhibo/getParams`, params);
                    },
                    Stop(params) {
                        return get(`/backend/addons/zhibo/zhibo/stop`, params);
                    },
                    Watch(params) {
                        return get(`/backend/addons/zhibo/course_video/watch/users`, params);
                    },
                    Chat(id, ids, params) {
                        return get(`/backend/addons/zhibo/chat/${id}/${ids}`, params);
                    },
                    ChatDestoryMulti(params) {
                        return post(`/backend/addons/zhibo/chat/delete`, params);
                    },
                },
            },
            Teacher: {
                List(params) {
                    return get(`/backend/addons/zhibo/teacher/index`, params);
                },
                Create() {
                    return get(`/backend/addons/zhibo/teacher/create`);
                },
                Store(params) {
                    return post(`/backend/addons/zhibo/teacher/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/zhibo/teacher/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/zhibo/teacher/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/zhibo/teacher/${id}`, params);
                },
            },
        },
        Book: {
            Book: {
                List(params) {
                    return get(`/backend/addons/meedu_books/book/index`, params);
                },
                Create() {
                    return get(`/backend/addons/meedu_books/book/create`);
                },
                Store(params) {
                    return post(`/backend/addons/meedu_books/book/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/meedu_books/book/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/meedu_books/book/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/meedu_books/book/${id}`, params);
                },
                Users(id, params) {
                    return get(`/backend/addons/meedu_books/book/${id}/users`, params);
                }
            }
        },
        Topic: {
            Topic: {
                List(params) {
                    return get(`/backend/addons/meedu_topics/topic/index`, params);
                },
                Create() {
                    return get(`/backend/addons/meedu_topics/topic/create`);
                },
                Store(params) {
                    return post(`/backend/addons/meedu_topics/topic/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/meedu_topics/topic/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/meedu_topics/topic/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/meedu_topics/topic/${id}`, params);
                },
                Users(id, params) {
                    return get(`/backend/addons/meedu_topics/topic/${id}/users`, params);
                },
                Order(params) {
                    return get(`/backend/addons/meedu_topics/orders`, params);
                },
                Comment(params) {
                    return get(`/backend/addons/meedu_topics/comment`, params);
                },
                DestroyComment(id) {
                    return destroy(`/backend/addons/meedu_topics/comment/${id}`);
                },
                CommentCheck(params) {
                    return post(`/backend/addons/meedu_topics/comment/check`, params);
                },
                AddUser(params) {
                    return post(`/backend/addons/meedu_topics/order/user/add`, params);
                },
                DelUser(params) {
                    return post(`/backend/addons/meedu_topics/order/user/del`, params);
                }
            },
            Category: {
                List() {
                    return get(`/backend/addons/meedu_topics/category/index`);
                },
                Create() {
                    return get(`/backend/addons/meedu_topics/category/create`);
                },
                Store(params) {
                    return post(`/backend/addons/meedu_topics/category/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/meedu_topics/category/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/meedu_topics/category/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/meedu_topics/category/${id}`, params);
                },
            },
        },
        LearnPath: {
            Path: {
                List(params) {
                    return get(`/backend/addons/LearningPaths/path/index`, params);
                },
                Create() {
                    return get(`/backend/addons/LearningPaths/path/create`);
                },
                Store(params) {
                    return post(`/backend/addons/LearningPaths/path/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/LearningPaths/path/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/LearningPaths/path/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/LearningPaths/path/${id}`, params);
                },
                Users(id, params) {
                    return get(`/backend/addons/LearningPaths/path/${id}/users`, params);
                }
            },
            Step: {
                List(params) {
                    return get(`/backend/addons/LearningPaths/step/index`, params);
                },
                Create() {
                    return get(`/backend/addons/LearningPaths/step/create`);
                },
                Store(params) {
                    return post(`/backend/addons/LearningPaths/step/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/LearningPaths/step/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/LearningPaths/step/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/LearningPaths/step/${id}`, params);
                },
                Users(id, params) {
                    return get(`/backend/addons/LearningPaths/step/${id}/users`, params);
                },
                Relation: {
                    List(params) {
                        return get(`/backend/addons/LearningPaths/step/relation/index`, params);
                    },
                    Create() {
                        return get(`/backend/addons/LearningPaths/step/relation/create`);
                    },
                    Store(params) {
                        return post(`/backend/addons/LearningPaths/step/relation/create`, params);
                    },
                    Destory(id) {
                        return destroy(`/backend/addons/LearningPaths/step/relation/${id}`);
                    },
                    Detail(id) {
                        return get(`/backend/addons/LearningPaths/step/relation/${id}`);
                    },
                    Update(id, params) {
                        return put(`/backend/addons/LearningPaths/step/relation/${id}`, params);
                    },
                },
            }
        }
    },
    Singlepage: {
        Page: {
            List(params) {
                return get(`/backend/addons/single_page/page/index`, params);
            },
            Store(params) {
                return post(`/backend/addons/single_page/page/create`, params);
            },
            Destory(id) {
                return destroy(`/backend/addons/single_page/page/${id}`);
            },
            Detail(id) {
                return get(`/backend/addons/single_page/page/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/single_page/page/${id}`, params);
            },
        },

    },
    Meedubook: {
        Book: {
            List(params) {
                return get(`/backend/addons/meedu_books/book/index`, params);
            },
            Create() {
                return get(`/backend/addons/meedu_books/book/create`);
            },
            Store(params) {
                return post(`/backend/addons/meedu_books/book/create`, params);
            },
            Destory(id) {
                return destroy(`/backend/addons/meedu_books/book/${id}`);
            },
            Comments(params) {
                return get(`/backend/addons/meedu_books/book_comment/index`, params);
            },
            Destorycomment(id) {
                return destroy(`/backend/addons/meedu_books/book_comment/${id}`);
            },
            CommentMulti(params) {
                return post(`/backend/addons/meedu_books/book_comment/checked`, params);
            },
            Detail(id) {
                return get(`/backend/addons/meedu_books/book/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/meedu_books/book/${id}`, params);
            },
            Users: {
                List(id, params) {
                    return get(`/backend/addons/meedu_books/book/${id}/users`, params);
                },
                Add(id, params) {
                    return post(`/backend/addons/meedu_books/book/${id}/user/add`, params);
                },
                Del(id, params) {
                    return post(`/backend/addons/meedu_books/book/${id}/user/del`, params);
                },
            },
            Categories: {
                List() {
                    return get(`/backend/addons/meedu_books/book_category/index`);
                },
                Store(params) {
                    return post(`/backend/addons/meedu_books/book_category/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/meedu_books/book_category/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/meedu_books/book_category/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/meedu_books/book_category/${id}`, params);
                }
            },
            Chapters: {
                List(params) {
                    return get(`/backend/addons/meedu_books/book_chapter/index`, params);
                },
                Store(params) {
                    return post(`/backend/addons/meedu_books/book_chapter/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/meedu_books/book_chapter/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/meedu_books/book_chapter/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/meedu_books/book_chapter/${id}`, params);
                }
            },
            Article: {
                List(params) {
                    return get(`/backend/addons/meedu_books/book_article/index`, params);
                },
                Create() {
                    return get(`/backend/addons/meedu_books/book_article/create`);
                },
                Store(params) {
                    return post(`/backend/addons/meedu_books/book_article/create`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/meedu_books/book_article/${id}`);
                },
                Detail(id) {
                    return get(`/backend/addons/meedu_books/book_article/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/meedu_books/book_article/${id}`, params);
                },
                Comments(params) {
                    return get(`/backend/addons/meedu_books/article_comment/index`, params);
                },
                Destorycomment(id) {
                    return destroy(`/backend/addons/meedu_books/article_comment/${id}`);
                },
                CommentMulti(params) {
                    return post(`/backend/addons/meedu_books/article_comment/checked`, params);
                },
            },
        },
    },
    Wechat: {
        Reply: {
            List(params) {
                return get(`/backend/api/v1/mpWechatMessageReply`, params);
            },
            Create() {
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
        Menu: {
            Index() {
                return get(`/backend/api/v1/mpWechat/menu`)
            },
            Update(params) {
                return put(`/backend/api/v1/mpWechat/menu`, params)
            },
            Destroy() {
                return destroy(`/backend/api/v1/mpWechat/menu`);
            }
        }
    },
    CodeExchanger: {
        List(params) {
            return get(`/backend/addons/CodeExchanger/goods`, params);
        },
        Create(params) {
            return get(`/backend/addons/CodeExchanger/goods/create`, params);
        },
        Store(params) {
            return post(`/backend/addons/CodeExchanger/goods/create`, params);
        },
        Destory(id) {
            return destroy(`/backend/addons/CodeExchanger/goods/${id}`);
        },
        Detail(id) {
            return get(`/backend/addons/CodeExchanger/goods/${id}`);
        },
        Update(id, params) {
            return put(`/backend/addons/CodeExchanger/goods/${id}`, params);
        },
        Codes: {
            List(params) {
                return get(`/backend/addons/CodeExchanger/codes`, params);
            },
            DestoryMulti(params) {
                return post(`/backend/addons/CodeExchanger/code/delete/multi`, params);
            },
            Generate(params) {
                return post(`/backend/addons/CodeExchanger/code/generate`, params);
            },
            Export() {
                return get(`/backend/addons/CodeExchanger/code/export`);
            },
        },
    },

    Wenda: {
        Question: {
            List(params) {
                return get(`/backend/addons/Wenda/question/index`, params);
            },
            Category() {
                return get(`/backend/addons/Wenda/category/index`);
            },
            DestoryMulti(params) {
                return post(`backend/addons/Wenda/question/delete`, params);
            },
            Answer(id) {
                return get(`/backend/addons/Wenda/question/${id}/answers`);
            },
            DestoryAnswer(id, ids) {
                return destroy(`/backend/addons/Wenda/question/${id}/answers/${ids}`);
            },
            Comment(id) {
                return get(`/backend/addons/Wenda/question/answers/${id}/comments`);
            },
            DestoryComment(id) {
                return destroy(`/backend/addons/Wenda/question/answers/comments/${id}`);
            },
            SetAnswer(questionId, answerId) {
                return get(`backend/addons/Wenda/question/${questionId}/answers/${answerId}/selected`);
            },
            Cate: {
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
    },
    MiaoSha: {
        List(params) {
            return get(`/backend/addons/MiaoSha/goods/index`, params);
        },
        Create() {
            return get(`/backend/addons/MiaoSha/goods/create`);
        },
        Store(params) {
            return post(`/backend/addons/MiaoSha/goods/create`, params);
        },
        Edit(id) {
            return get(`/backend/addons/MiaoSha/goods/${id}`);
        },
        Update(id, params) {
            return put(`/backend/addons/MiaoSha/goods/${id}`, params);
        },
        Destroy(id) {
            return destroy(`/backend/addons/MiaoSha/goods/${id}`);
        },
    },
    Multishare: {
        Poster: {
            List() {
                return get(`/backend/addons/multi_level_share/poster/index`,);
            },
            Store(params) {
                return post(`/backend/addons/multi_level_share/poster/create`, params);
            },
            Detail(id) {
                return get(`/backend/addons/multi_level_share/poster/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/multi_level_share/poster/${id}`, params);
            },
            Destory(id) {
                return destroy(`/backend/addons/multi_level_share/poster/${id}`);
            },
        },
        Goods: {
            List(params) {
                return get(`/backend/addons/multi_level_share/goods/index`, params);
            },
            Create() {
                return get(`/backend/addons/multi_level_share/goods/create`);
            },
            Store(params) {
                return post(`/backend/addons/multi_level_share/goods/create`, params);
            },
            Detail(id) {
                return get(`/backend/addons/multi_level_share/goods/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/multi_level_share/goods/${id}`, params);
            },
            Destory(id) {
                return destroy(`/backend/addons/multi_level_share/goods/${id}`);
            },
        },
    },
    TuanGou: {
        List(params) {
            return get(`/backend/addons/TuanGou/goods/index`, params);
        },
        Create() {
            return get(`/backend/addons/TuanGou/goods/create`);
        },
        Store(params) {
            return post(`/backend/addons/TuanGou/goods/create`, params);
        },
        Detail(id) {
            return get(`/backend/addons/TuanGou/goods/${id}`);
        },
        Update(id, params) {
            return put(`/backend/addons/TuanGou/goods/${id}`, params);
        },
        Destroy(id) {
            return destroy(`/backend/addons/TuanGou/goods/${id}`);
        },
        Order: {
            List(params) {
                return get(`/backend/addons/TuanGou/orders/index`, params);
            },
        },
        Refund: {
            List(params) {
                return get(`/backend/addons/TuanGou/refunds/index`, params);
            },
            Complete(id, params) {
                return get(`/backend/addons/TuanGou/refunds/${id}/handler`, params);
            },
        },
        Tuan: {
            List(id, params) {
                return get(`/backend/addons/TuanGou/goods/${id}/items`, params);
            },
            Complete(params) {
                return get(`/backend/addons/TuanGou/goods/item/complete`, params);
            },
        },
    },
    Exam: {
        Paper: {
            List(params) {
                return get(`/backend/addons/Paper/paper/index`, params);
            },
            Create() {
                return get(`/backend/addons/Paper/paper/create`);
            },
            Store(params) {
                return post(`/backend/addons/Paper/paper/create`, params);
            },
            Detail(id) {
                return get(`/backend/addons/Paper/paper/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/Paper/paper/${id}`, params);
            },
            Destroy(id) {
                return destroy(`/backend/addons/Paper/paper/${id}`);
            },
            Userpaper(id, params) {
                return get(`/backend/addons/Paper/paper/${id}/userPaper`, params);
            },
            Stat(id, params) {
                return get(`/backend/addons/Paper/paper/${id}/statistics`, params);
            },
            User(id, params) {
                return get(`/backend/addons/Paper/paper/${id}/user`, params);
            },
            Add(id, params) {
                return post(`/backend/addons/Paper/paper/${id}/user`, params);
            },
            DestoryUser(id, ids) {
                return destroy(`/backend/addons/Paper/paper/${id}/user/${ids}`);
            },
            Category: {
                List(params) {
                    return get(`/backend/addons/Paper/paper_category/index`, params);
                },
                Create() {
                    return get(`/backend/addons/Paper/paper_category/create`);
                },
                Store(params) {
                    return post(`/backend/addons/Paper/paper_category/create`, params);
                },
                Detail(id) {
                    return get(`/backend/addons/Paper/paper_category/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/Paper/paper_category/${id}`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/Paper/paper_category/${id}`);
                },
            },
        },
        Mockpaper: {
            List(params) {
                return get(`/backend/addons/Paper/mock_paper/index`, params);
            },
            Create() {
                return get(`/backend/addons/Paper/mock_paper/create`);
            },
            Store(params) {
                return post(`/backend/addons/Paper/mock_paper/create`, params);
            },
            Detail(id) {
                return get(`/backend/addons/Paper/mock_paper/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/Paper/mock_paper/${id}`, params);
            },
            Destory(id) {
                return destroy(`/backend/addons/Paper/mock_paper/${id}`);
            },
            Userpaper(id, params) {
                return get(`/backend/addons/Paper/mock_paper/${id}/records`, params);
            },
            Stat(id, params) {
                return get(`/backend/addons/Paper/mock_paper/${id}/statistics`, params);
            },
            User(id, params) {
                return get(`/backend/addons/Paper/mock_paper/${id}/users`, params);
            },
            Add(id, params) {
                return post(`/backend/addons/Paper/mock_paper/${id}/user/insert`, params);
            },
            DestoryUser(id, params) {
                return post(`/backend/addons/Paper/mock_paper/${id}/user/delete`, params);
            },
            Category: {
                List(params) {
                    return get(`/backend/addons/Paper/paper_category/index`, params);
                },
                Create() {
                    return get(`/backend/addons/Paper/paper_category/create`);
                },
                Store(params) {
                    return post(`/backend/addons/Paper/paper_category/create`, params);
                },
                Detail(id) {
                    return get(`/backend/addons/Paper/paper_category/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/Paper/paper_category/${id}`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/Paper/paper_category/${id}`);
                },

            },
        },
        Question: {
            List(params) {
                return get(`/backend/addons/Paper/question/index`, params);
            },
            Create() {
                return get(`/backend/addons/Paper/question/create`);
            },
            Store(params) {
                return post(`/backend/addons/Paper/question/create`, params);
            },
            Detail(id) {
                return get(`/backend/addons/Paper/question/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/Paper/question/${id}`, params);
            },
            DestoryMulti(params) {
                return post(`/backend/addons/Paper/question/destroy/multi`, params);
            },
            Import(param) {
                return post('/backend/addons/Paper/question/import/csv', param);
            }
        },
        Practice: {
            List(params) {
                return get(`/backend/addons/Paper/practice/index`, params);
            },
            Create() {
                return get(`/backend/addons/Paper/practice/create`);
            },
            Store(params) {
                return post(`/backend/addons/Paper/practice/create`, params);
            },
            Detail(id) {
                return get(`/backend/addons/Paper/practice/${id}`);
            },
            Update(id, params) {
                return put(`/backend/addons/Paper/practice/${id}`, params);
            },
            Destroy(params) {
                return post(`/backend/addons/Paper/practice/delete/multi`, params);
            },
            User(id, params) {
                return get(`/backend/addons/Paper/practice/${id}/users`, params);
            },
            Add(id, params) {
                return post(`/backend/addons/Paper/practice/${id}/user/insert`, params);
            },
            Progress(id, ids) {
                return get(`/backend/addons/Paper/practice/${id}/user/${ids}/progress`);
            },
            DestoryUser(id, params) {
                return post(`/backend/addons/Paper/practice/${id}/user/delete`, params);
            },

            Category: {
                List(params) {
                    return get(`/backend/addons/Paper/paper_category/index`, params);
                },
                Create() {
                    return get(`/backend/addons/Paper/paper_category/create`);
                },
                Store(params) {
                    return post(`/backend/addons/Paper/paper_category/create`, params);
                },
                Detail(id) {
                    return get(`/backend/addons/Paper/paper_category/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/Paper/paper_category/${id}`, params);
                },
                Destory(id) {
                    return destroy(`/backend/addons/Paper/paper_category/${id}`);
                },
            },
            Chapter: {
                List(params) {
                    return get(`/backend/addons/Paper/practice_chapter/index`, params);
                },
                Create() {
                    return get(`/backend/addons/Paper/practice_chapter/create`);
                },
                Store(params) {
                    return post(`/backend/addons/Paper/practice_chapter/create`, params);
                },
                Detail(id) {
                    return get(`/backend/addons/Paper/practice_chapter/${id}`);
                },
                Update(id, params) {
                    return put(`/backend/addons/Paper/practice_chapter/${id}`, params);
                },
                DestoryMulti(params) {
                    return post(`/backend/addons/Paper/practice_chapter/delete/multi`, params);
                },
                Question: {
                    List(id, params) {
                        return get(`/backend/addons/Paper/practice_chapter/${id}/questions`, params);
                    },
                    Create(id, params) {
                        return get(`/backend/addons/Paper/practice_chapter/${id}/questions/params`, params);
                    },
                    StoreMulti(id, params) {
                        return post(`/backend/addons/Paper/practice_chapter/${id}/questions`, params);
                    },
                    DestoryMulti(id, params) {
                        return post(`/backend/addons/Paper/practice_chapter/${id}/questions/delete`, params);
                    },
                },
            },

        },

    },
    SinglePage: {
        List(params) {
            return get(`/backend/addons/single_page/page/index`, params);
        },
        Create() {
            return get(`/backend/addons/single_page/page/create`);
        },
        Store(params) {
            return post(`/backend/addons/single_page/page/create`, params);
        },
        Edit(id) {
            return get(`/backend/addons/single_page/page/${id}`);
        },
        Update(id, params) {
            return put(`/backend/addons/single_page/page/${id}`, params);
        },
        Destroy(id) {
            return destroy(`/backend/addons/single_page/page/${id}`);
        },
    },

}

export default Api;