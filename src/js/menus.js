export default [
    {
        name: 'title.dashboard',
        key: 'Dashboard',
        icon: '@/assets/common/indexlogo.png',
        children: [],
    },
    {
        name: 'title.renovation',
        key: 'Decoration',
        children: [
            {
                name: 'title.computer_terminal',
                key: 'DecorationPC',
            },
            {
                name: 'title.mobile_terminal',
                key: 'DecorationH5'
            },
            {
                name: 'title.role',
                key: 'Role'
            },
            {
                name: 'title.singlepage.index',
                key: 'SinglePage'
            },
        ],
    },
    {
        name: 'title.finance',
        key: 'Finance',
        children: [
            {
                name: 'title.order',
                key: 'Orderlist'
            },
            {
                name: 'title.promocode',
                key: 'Promocode'
            },
            {
                name: 'title.withdrawOrders',
                key: 'WithdrawOrders'
            },
        ]
    },
    {
        name: 'title.member.index',
        key: 'Member',
        children: [
            {
                name: 'title.member.index',
                key: 'MemberIndex',
            }
        ]
    },
    {
        name: 'title.wechatname',
        key: 'Wechat',
        children: [
            {
                name: 'title.wechat.messagereply.index',
                key: 'MessageReply'
            },

        ]
    },
    {
        name: 'title.coursename',
        key: 'Course',
        children: [
            {
                name: 'title.course.vod.index',
                key: 'Vod'
            },
            {
                name: 'title.meedubook.book.index',
                key: 'Meedubook'
            },
        ]
    },
    {
        name: 'title.miaosha.name',
        key: 'Miaosha',
        children: [
            {
                name: 'title.miaosha.goods.name',
                key: 'MiaoshaGoods'
            },
            {
                name: 'title.miaosha.orders.name',
                key: 'MiaoshaOrders'
            },
        ]
    },
    {
        name: 'title.tuangou.name',
        key: 'Tuangou',
        children: [
            {
                name: 'title.tuangou.goods.name',
                key: 'TuangouGoods'
            },
            
        ]
    },
    {
        name: 'title.learningpath.name',
        key: 'Learning',
        children: [
            {
                name: 'title.learningpath.path.name',
                key: 'LearningPath'
            },
            {
                name: 'title.learningpath.step.name',
                key: 'LearningStep'
            },
            
        ]
    },
    {
        name: 'title.multi_level_share.name',
        key: 'Multi_level_share',
        children: [
            {
                name: 'title.multi_level_share.poster.name',
                key: 'MultiPoster'
            },
            {
                name: 'title.multi_level_share.goods.name',
                key: 'ShareGoods'
            },
        ]
    },
    {
        name: 'title.live.name',
        key: 'Live',
        children: [
            {
                name: 'title.live.course.name',
                key: 'LiveCourse'
            },
            {
                name: 'title.live.teacher.name',
                key: 'LiveTeacher'
            },
        ]
    },
    {
        name: 'title.wendaname',
        key: 'Wenda',
        children: [
            {
                name: 'title.wenda.question.index',
                key: 'Question'
            },

        ]
    },
    {
        name: 'title.system',
        key: 'System',
        children: [
            {
                name: 'title.config',
                key: 'SystemConfig',
            },
            {
                name: 'title.system-application',
                key: 'SystemApplication',
            },
            {
                name: 'title.system-administrator',
                key: 'SystemAdministrator',
            }
        ]
    },

];