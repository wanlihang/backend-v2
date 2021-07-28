export default [{
        name: 'title.dashboard',
        key: 'Dashboard',
        children: [],
        icon: 'icon-icon-study-n',
    },
    {
        name: 'title.decoration',
        key: 'Decoration',
        icon: 'icon-icon-decorate',
        children: [{
                name: 'title.decoration_pc',
                key: 'DecorationPC',
                permission: 'viewBlock',
            },
            {
                name: 'title.decoration_h5',
                key: 'DecorationH5',
                permission: 'viewBlock',
            },
            {
                name: 'title.singlepage.index',
                key: 'SinglePage',
                permission: 'addons.SinglePage.page.list',
            },
            {
                name: 'title.mp-wechat-menu',
                key: 'MpWechatMenu',
                permission: 'mpWechat.menu',
            },
        ],
    },
    {
        name: 'title.coursename',
        key: 'Course',
        icon: 'icon-icon-lesson',
        children: [{
                name: 'title.course.vod.index',
                key: 'Vod',
                permission: 'course'
            },
            {
                name: 'title.live.name',
                key: 'LiveCourse',
                permission: 'addons.Zhibo.course.list'
            },
            {
                name: 'title.topic.name',
                key: 'Topic',
                permission: 'addons.meedu_topics.topic.list'
            },
            {
                name: 'title.meedubook.book.index',
                key: 'Meedubook',
                permission: 'addons.meedu_books.book.list'
            },
            {
                name: 'title.learningpath.path.name',
                key: 'LearningPath',
                permission: 'addons.learnPaths.path.list'
            },
        ]
    },
    {
        name: 'title.exam.name',
        key: 'Exam',
        icon: 'icon-icon-exam-n',
        children: [{
                name: 'title.exam.paper.index',
                key: 'ExamPaper',
                permission: 'addons.Paper.paper.list'
            },
            {
                name: 'title.exam.mockpaper.name',
                key: 'ExamMockpaper',
                permission: 'addons.Paper.mock_paper.list'
            },
            {
                name: 'title.exam.practice.index',
                key: 'ExamPractice',
                permission: 'addons.Paper.practice.list'
            },
            {
                name: 'title.exam.question.name',
                key: 'ExamQuestion',
                permission: 'addons.Paper.question.list'
            },
        ]
    },
    {
        name: 'title.member.name',
        key: 'Member',
        icon: 'icon-icon-me-n',
        children: [{
            name: 'title.member.index',
            key: 'MemberIndex',
            permission: 'member'
        }]
    },
    {
        name: 'title.snapshot.name',
        key: 'Snapshot',
        icon: 'icon-icon-me-n',
        children: [{
            name: 'title.snapshot.index',
            key: 'SnapshotIndex',
            permission: 'SnapshotI'
        }]
    },
    {
        name: 'title.finance',
        key: 'Finance',
        icon: 'icon-icon-money-n',
        children: [{
                name: 'title.order',
                key: 'Orderlist',
                permission: 'order'
            },
            {
                name: 'title.miaosha.orders.index',
                key: 'MiaoshaOrders',
                permission: 'addons.MiaoSha.orders'
            },
            {
                name: 'title.tuangou.orders',
                key: 'TuangouGoodsOrder',
                permission: 'addons.TuanGou.orders'
            },
            {
                name: 'title.withdrawOrders',
                key: 'WithdrawOrders',
                permission: 'member.inviteBalance.withdrawOrders'
            },
        ]
    },
    {
        name: 'title.operate',
        key: 'Operate',
        icon: 'icon-icon-operate',
        children: [{
                name: 'title.role',
                key: 'Role',
                permission: 'role'
            },
            {
                name: 'title.tuangou.goods.index',
                key: 'TuangouGoods',
                permission: 'addons.TuanGou.goods.list'
            },
            {
                name: 'title.miaosha.goods.index',
                key: 'MiaoshaGoods',
                permission: 'addons.MiaoSha.goods.list'
            },
            {
                name: 'title.multi_level_share.goods.index',
                key: 'ShareGoods',
                permission: 'addons.MultiLevelShare.goods.list'
            },
            {
                name: 'title.codeExchanger.index',
                key: 'CodeExchanger',
                permission: 'addons.CodeExchanger.goods.list'
            },
            {
                name: 'title.promocode',
                key: 'Promocode',
                permission: 'promoCode'
            },
            {
                name: 'title.wenda.question.index',
                key: 'Question',
                permission: 'addons.Wenda.question.list'
            },
            {
                name: 'title.wechat.messagereply.index',
                key: 'MessageReply',
                permission: 'mpWechatMessageReply'
            },
        ]
    },
    {
        name: 'title.system',
        key: 'System',
        icon: 'icon-icon-setting-n',
        children: [{
                name: 'title.system-administrator',
                key: 'SystemAdministrator',
                permission: 'administrator',
            },
            {
                name: 'title.system-config',
                key: 'SystemConfig',
                permission: 'setting'
            },
            {
                name: 'title.system-application',
                key: 'SystemApplication',
                permission: 'super-slug',
            }
        ]
    },

];