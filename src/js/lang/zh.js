import zhLocale from 'element-ui/lib/locale/lang/zh-CN' //引入element语言包

const zh = {
    title: {
        login: '登录',
        dashboard: '首页概览',
        renovation: '装修',
        computer_terminal: "电脑端",
        mobile_terminal: "移动端",
        role: 'VIP会员',
        order: '订单列表',
        promocode: '优惠码',
        promocode_import: '批量导入',
        withdrawOrders: '余额提现',
        system: '系统',
        wendaname: '问答',
        config: '系统配置',
        wechatname: '微信公众号',
        'system-administrator': '管理员',
        'system-adminroles': '管理员角色',
        createadmin: '添加管理员',
        updateadmin: '编辑管理员',
        createadminroles: '添加管理员角色',
        updateadminroles: '编辑管理员角色',
        administrator: {
            'change-password': '修改密码'
        },
        'system-application': '应用商城',
        member: {
            index: '用户',
            create: '创建用户',
            import: '批量导入',
            detail: '用户详情',
            edit: '用户编辑',
            tags: '用户标签',
            remark: '用户备注',
            credit1: '用户积分',
            tag: {
                index: '用户标签列表',
                create: '创建用户标签',
                edit: '编辑用户标签'
            }
        },
        miaosha: {
            name: '秒杀',
            orders: {
                name: '订单',
                index: '秒杀订单'
            },
            goods: {
                name: '商品',
                index: '秒杀商品',
                create: '创建秒杀商品',
                update: '编辑秒杀商品'
            },
        },
        tuangou: {
            name: '团购',
            goods: {
                name: '商品',
                index: '团购商品',
                create: '创建团购商品',
                update: '编辑团购商品',
                order: '团购商品订单',
                refund: '团购商品退款订单',
                tuanorder: '团列表',
            },
        },
        learningpath: {
            name: '学习路径',
            path: {
                name: '路径',
                index: '学习路径',
                create: '创建学习路径',
                update: '编辑学习路径'
            },
            step: {
                name: '步骤',
                index: '学习步骤',
                create: '创建学习步骤',
                update: '编辑学习步骤',
                relation: {
                    index: '学习步骤关联',
                    create: '创建步骤关联',
                    update: '编辑步骤关联',
                }
            },
        },
        multi_level_share: {
            name: '三级分销',
            poster: {
                name: '海报',
                index: '海报',
                create: '创建海报',
                update: '编辑海报'
            },
            goods: {
                name: '分销商品',
                index: '分销商品',
                create: '创建分销商品',
                update: '编辑分销商品'
            },
        },
        live: {
            name: '直播',
            course: {
                name: '课程',
                index: '直播课程',
                create: '创建直播课程',
                update: '编辑直播课程',
                comment: '直播课程评论',
                category: {
                    index: '直播课程分类',
                    create: '创建直播课程分类',
                    update: '编辑直播课程分类',
                },
                chapter: {
                    index: '直播课程章节',
                    create: '创建直播课程章节',
                    update: '编辑直播课程章节',
                },
                users: {
                    index: '直播课程订阅用户',
                },
                video:{
                    index: '直播课程内容安排',
                    create: '创建直播课程内容安排',
                    update: '编辑直播课程内容安排',
                },
            },
            teacher: {
                name: '讲师',
                index: '直播讲师',
                create: '创建直播讲师',
                update: '编辑直播讲师'
            },
        },
        wechat: {
            messagereply: {
                index: '微信公众号消息回复',
                create: '微信公众号添加规则',
                update: '微信公众号编辑规则',
            },
        },
        wenda: {
            question: {
                index: '问题',
                answer: '问题回答',
                comment: '问题评论',
                category: {
                    index: '问题分类',
                    create: '添加分类',
                    update: '编辑分类',
                }
            },
        },
        course: {
            vod: {
                index: '录播',
                create: '添加录播课程',
                update: '编辑录播课程',
                detail: '录播课程详情',
                category: {
                    index: '课程分类管理',
                    create: '创建课程分类',
                    update: '编辑课程分类'
                },
                chapter: {
                    index: '课程章节管理',
                    create: '创建课程章节',
                    update: '编辑课程章节'
                },
                attach: {
                    index: '课程附件管理',
                    create: '添加课程附件',
                },
                record: {
                    index: '观看记录',
                },
                video: {
                    index: '视频管理',
                    create: '创建视频',
                    update: '编辑视频',
                    subscribe: '视频销售记录',
                    'watch-records': '视频观看记录',
                    comments: "视频评论"
                },
            },
        },
        singlepage: {
            index: '单页',
            create: '添加电子书',
            update: '编辑电子书',
        },
        meedubook: {
            book: {
                index: '电子书',
                create: '添加电子书',
                update: '编辑电子书',
                comment: '电子书评论',
                category: {
                    index: '电子书分类管理',
                    create: '添加电子书分类',
                    update: '编辑电子书分类',
                },
                chapter: {
                    index: '电子书章节管理',
                    create: '创建电子书章节',
                    update: '编辑电子书章节'
                },
                article: {
                    index: '电子书文章管理',
                    create: '创建电子书文章',
                    update: '编辑电子书文章',
                    comment: '电子书文章评论'
                }
            }
        },
        coursename: '课程',
        finance: '财务'
    },
    commen: {
        Locale: "zhLocale",
        logintitle: '首页',
        indextitle: "首页概览",
        operation_management: "运营管理",
        computer_terminal: "电脑端",
        mobile_terminal: "移动端",
        micro_page: "微页面",
        comment_management: "评论管理",
        system_configuration: "系统配置",
        course_management: "课程管理",
        exam_practice: "考试练习",
        marketing_center: "营销中心",
        user_management: '用户管理',
        vip: 'VIP会员',
        transaction_management: "交易管理",
    },
    login: {
        login: '立即登录',
        tipmes1: '请输入管理员账号',
        tipmes2: '请输入账户密码',
        title: '登录后台',
        langtext: "简体中文",
        username_required: '请您输入管理员账号',
        password_required: '请您输入密码',
    },
    rightmenu: {
        dropdown_editpassword: "修改密码",
        dropdown_logout: "退出",
        oldpassword: "旧密码",
        newpassword: "新密码",
        confirm_password: "确认密码",
        submit: "提交",
    },
    index: {
        day_income: '今日收入',
        yes_income: '昨天收入',
        day_paid: '今日付费用户',
        yes_paid: '昨天付费用户',
        compared_yesterday: '较昨日',
        allnum: '总用户',
        month_income: '本月总收益',
        day_increase: '今日新增',
        month_increase: '较上月',
        quick_acsess: '快速访问',
        demand_course: '录播课程',
        live_course: '直播课程',
        graphic_course: '图文课程',
        ebook: '电子书',
        curriculum_path: '课程路径',
        testpaper: '试卷',
        statistical_analysis: '统计分析',
        query: '查询',
        new_registered_users: '新注册用户',
        daily_order_creation: '每日创建订单量',
        daily_order_payment: "每日支付订单量",
        total_dailypayment_orders: "每日支付订单总额",
        start_time: '开始',
        end_time: '结束时间',
    },
    computer_terminal: {
        tab1: "首页展示",
        tab2: "幻灯片",
        tab3: "公告",
    },
    common: {
        success: '成功',
        fail: '失败',
        image: {
            select: '选择图片',
            upload: '上传图片',
            format_alert: '只能上传jpg,png,jpeg,git图文文件'
        },
        cancel: '取消',
        confirm: '确定',
        group: '分组',
        none: '暂无数据'
    },
    member: {
        btn_add: '添加',
        btn_edit: '编辑',
        btn_del: '删除',
        day: '天',
        currency: '￥',
        addpage: {
            display: '显示',
            rolename: '角色名',
            days: '天数',
            charge: '价格',
            placeholder: "如年度会员",
            textplaceholder: "一行一个描述",
            des: '描述',
            btn_back: '返回',
            name_notice: '角色名不能为空',
            day_notice: '天数不能为空',
            charge_notice: '价格不能为空',
            des_notice: '描述不能为空',
            btn_save: '保存',
        },
    },
    ...zhLocale
}
export default zh;