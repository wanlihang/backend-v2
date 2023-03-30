export default [
    {
        name: "title.dashboard",
        key: "Dashboard",
        children: [],
        icon: "icon-icon-study-n",
    },
    {
        name: "title.system",
        key: "System",
        icon: "icon-icon-setting-n",
        children: [
            {
                name: "title.system-dashboard",
                key: "SystemDashboard",
                permission: "super-slug",
            },
            {
                name: "title.system-config",
                key: "SystemIndex",
                permission: "setting",
            },
            {
                name: "title.system-application",
                key: "SystemApplication",
                permission: "super-slug",
            },
        ],
    },
    {
        name: "title.decoration",
        key: "Decoration",
        icon: "icon-icon-decorate",
        children: [
            {
                name: "title.decoration_pc",
                key: "DecorationPC",
                permission: "viewBlock",
            },
            {
                name: "title.decoration_h5",
                key: "DecorationH5",
                permission: "viewBlock",
            },
            {
                name: "title.singlepage.index",
                key: "SinglePage",
                permission: "addons.SinglePage.page.list",
            },
        ],
    },
    {
        name: "title.environment.name",
        key: "Environment",
        icon: "icon-icon-study-h",
        children: [
            {
                name: "title.environment.edit",
                key: "EnvironmentEdit",
                permission: "course",
            },

        ],
    },
    {
        name: "title.template.name",
        key: "Template",
        icon: "icon-icon-exam-n",
        children: [
            {
                name: "title.template.storehouse",
                key: "TemplateEdit",
                permission: "course",
            },
            {
                name: "title.template.load",
                key: "TemplateLoad",
                permission: "course",
            },
        ],
    },
    {
        name: "title.coursename",
        key: "Course",
        icon: "icon-icon-lesson",
        children: [
            {
                name: "title.course.vod.category.index",
                key: "CourseCategories",
                permission: "course",
            },
            {
                name: "title.course.vod.comment",
                key: "CourseComments",
                permission: "course",
            },
            {
                name: "title.course.vod.video.comments",
                key: "VideoComments",
                permission: "course",
            },
            {
                name: "title.course.vod.video-import",
                key: "VodImport",
                permission: "course",
            },
            {
                name: "title.course.vod.index",
                key: "Vod",
                permission: "course",
            },
            {
                name: "title.live.name",
                key: "LiveCourse",
                permission: "addons.Zhibo.course.list",
            },
            {
                name: "title.topic.name",
                key: "Topic",
                permission: "addons.meedu_topics.topic.list",
            },
            {
                name: "title.meedubook.book.index",
                key: "Meedubook",
                permission: "addons.meedu_books.book.list",
            },
            {
                name: "title.course.xiaobanke.course.index",
                key: "K12Course",
                permission: "addons.XiaoBanKe.course.list",
            },
            {
                name: "title.learningpath.path.name",
                key: "LearningPath",
                permission: "addons.learnPaths.path.list",
            },
        ],
    },
    {
        name: "title.exam.name",
        key: "Exam",
        icon: "icon-icon-exam-n",
        children: [
            {
                name: "title.exam.question.name",
                key: "ExamQuestion",
                permission: "addons.Paper.question.list",
            },
            {
                name: "title.exam.paper.index",
                key: "ExamPaper",
                permission: "addons.Paper.paper.list",
            },
            {
                name: "title.exam.mockpaper.name",
                key: "ExamMockpaper",
                permission: "addons.Paper.mock_paper.list",
            },
            {
                name: "title.exam.practice.index",
                key: "ExamPractice",
                permission: "addons.Paper.practice.list",
            },
        ],
    },
    {
        name: "title.member.name",
        key: "Member",
        icon: "icon-icon-me-n",
        children: [
            {
                name: "title.system-adminroles",
                key: "SystemAdminroles",
                permission: "administrator",
            },
            {
                name: "title.system-administrator",
                key: "SystemAdministrator",
                permission: "administrator",
            },
            {
                name: "title.member.index",
                key: "MemberIndex",
                permission: "member",
            },
            {
                name: "title.snapshot.index",
                key: "SnapshotIndex",
                permission: "addons.Snapshot.images",
            },
        ],
    },
    {
        name: "title.finance",
        key: "Finance",
        icon: "icon-icon-money-n",
        children: [
            {
                name: "title.order",
                key: "Orderlist",
                permission: "order",
            },
            {
                name: "title.withdrawOrders",
                key: "WithdrawOrders",
                permission: "member.inviteBalance.withdrawOrders",
            },
        ],
    },
    {
        name: "title.operate",
        key: "Operate",
        icon: "icon-icon-operate",
        children: [
            {
                name: "title.role",
                key: "Role",
                permission: "role",
            },
            {
                name: "title.creditMall.name",
                key: "CreditMall",
                permission: "addons.credit1Mall.goods.list",
            },
            {
                name: "title.tuangou.goods.index",
                key: "TuangouGoods",
                permission: "addons.TuanGou.goods.list",
            },
            {
                name: "title.miaosha.goods.index",
                key: "MiaoshaGoods",
                permission: "addons.MiaoSha.goods.list",
            },
            {
                name: "title.multi_level_share.goods.index",
                key: "ShareGoods",
                permission: "addons.MultiLevelShare.goods.list",
            },
            {
                name: "title.wenda.question.index",
                key: "Question",
                permission: "addons.Wenda.question.list",
            },
            {
                name: "title.codeExchanger.index",
                key: "CodeExchanger",
                permission: "addons.CodeExchanger.goods.list",
            },
            {
                name: "title.promocode",
                key: "Promocode",
                permission: "promoCode",
            },
            {
                name: "title.wechat.messagereply.index",
                key: "MessageReply",
                permission: "mpWechatMessageReply",
            },
        ],
    },

];
