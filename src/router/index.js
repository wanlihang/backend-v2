import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/js/i18n';
import AppLayout from '@/views/layouts/app'
import index from '@/views/index/index'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: 'title.login'
    }
  },
  {
    path: '/Home',
    component: AppLayout,
    children: [{
        path: '/dashboard',
        component: index,
        name: 'Dashboard',
        meta: {
          title: 'title.dashboard'
        }
      },
      {
        path: '/role',
        component: () => import('@/views/role/role'),
        name: 'Role',
        meta: {
          title: 'title.role'
        }
      },
      {
        path: '/addrole',
        component: () => import('@/views/role/create'),
        name: 'Addrole',
        meta: {
          title: 'title.role'
        }
      },
      {
        path: '/editrole',
        component: () => import('@/views/role/update'),
        name: 'Editrole',
        meta: {
          title: 'title.role'
        }
      },
      {
        path: '/order/index',
        component: () => import('@/views/order/index'),
        name: 'Orderlist',
        meta: {
          title: 'title.order'
        }
      },
      {
        path: '/promocode',
        component: () => import('@/views/order/promocode'),
        name: 'Promocode',
        meta: {
          title: 'title.promocode'
        }
      },
      {
        path: '/createcode',
        component: () => import('@/views/order/create_code'),
        name: 'Createcode',
        meta: {
          title: 'title.promocode'
        }
      },
      {
        path: '/createmulticode',
        component: () => import('@/views/order/createmulti_code'),
        name: 'CreateMulticode',
        meta: {
          title: 'title.promocode'
        }
      },
      {
        path: '/order/code-import',
        component: () => import('@/views/order/code-import'),
        name: 'CodeImport',
        meta: {
          title: 'title.promocode_import'
        }
      },
      {
        path: '/withdrawOrders',
        component: () => import('@/views/order/withdrawOrders'),
        name: 'WithdrawOrders',
        meta: {
          title: 'title.withdrawOrders'
        }
      },
      {
        path: '/system/config',
        component: () => import('@/views/system/config'),
        name: 'SystemConfig',
        meta: {
          title: 'title.system-config'
        }
      },
      {
        path: '/system/application',
        component: () => import('@/views/system/application'),
        name: 'SystemApplication',
        meta: {
          title: 'title.system-application'
        }
      },
      {
        path: '/administrator/change-password',
        component: () => import('@/views/administrator/change-password'),
        name: 'AdministratorChangePassword',
        meta: {
          title: 'title.administrator.change-password'
        }
      },
      {
        path: '/system/administrator',
        component: () => import('@/views/system/administrator/index'),
        name: 'SystemAdministrator',
        meta: {
          title: 'title.system-administrator'
        }
      },
      {
        path: '/system/administrator/create',
        component: () => import('@/views/system/administrator/create'),
        name: 'AdministratorCreate',
        meta: {
          title: 'title.createadmin'
        }
      },
      {
        path: '/system/administrator/update',
        component: () => import('@/views/system/administrator/update'),
        name: 'AdministratorUpdate',
        meta: {
          title: 'title.updateadmin'
        }
      },
      {
        path: '/system/adminroles',
        component: () => import('@/views/system/adminroles/index'),
        name: 'SystemAdminroles',
        meta: {
          title: 'title.system-adminroles'
        }
      },
      {
        path: '/system/adminroles/create',
        component: () => import('@/views/system/adminroles/create'),
        name: 'AdminrolesCreate',
        meta: {
          title: 'title.createadminroles'
        }
      },
      {
        path: '/system/adminroles/update',
        component: () => import('@/views/system/adminroles/update'),
        name: 'AdminrolesUpdate',
        meta: {
          title: 'title.updateadminroles'
        }
      },
      {
        path: '/course/vod/index',
        component: () => import('@/views/course/vod/index'),
        name: 'Vod',
        meta: {
          title: 'title.course.vod.index'
        }
      },
      {
        path: '/course/vod/video-import',
        component: () => import('@/views/course/vod/video/import.vue'),
        name: 'VodImport',
        meta: {
          title: 'title.course.vod.video-import'
        }
      },
      {
        path: '/course/vod/create',
        component: () => import('@/views/course/vod/create'),
        name: 'VodCreate',
        meta: {
          title: 'title.course.vod.create'
        }
      },
      {
        path: '/course/vod/update',
        component: () => import('@/views/course/vod/update'),
        name: 'VodUpdate',
        meta: {
          title: 'title.course.vod.update'
        }
      },
      {
        path: '/course/vod/:id/view',
        component: () => import('@/views/course/vod/detail'),
        name: 'VodView',
        meta: {
          title: 'title.course.vod.detail'
        }
      },
      {
        path: '/course/vod/category/index',
        component: () => import('@/views/course/vod/category/index'),
        name: 'CourseCategories',
        meta: {
          title: 'title.course.vod.category.index'
        }
      },
      {
        path: '/course/vod/category/create',
        component: () => import('@/views/course/vod/category/create'),
        name: 'CategoriesCreate',
        meta: {
          title: 'title.course.vod.category.create'
        }
      },
      {
        path: '/course/vod/category/update',
        component: () => import('@/views/course/vod/category/update'),
        name: 'CategoriesUpdate',
        meta: {
          title: 'title.course.vod.category.update'
        }
      },
      {
        path: '/course/vod/chapter/index',
        component: () => import('@/views/course/vod/chapter/index'),
        name: 'CourseChapters',
        meta: {
          title: 'title.course.vod.chapter.index'
        }
      },
      {
        path: '/course/vod/chapter/create',
        component: () => import('@/views/course/vod/chapter/create'),
        name: 'ChaptersCreate',
        meta: {
          title: 'title.course.vod.chapter.create'
        }
      },
      {
        path: '/course/vod/chapter/update',
        component: () => import('@/views/course/vod/chapter/update'),
        name: 'ChaptersUpdate',
        meta: {
          title: 'title.course.vod.chapter.update'
        }
      },
      {
        path: '/course/vod/attach/index',
        component: () => import('@/views/course/vod/attach/index'),
        name: 'CourseAttach',
        meta: {
          title: 'title.course.vod.attach.index'
        }
      },
      {
        path: '/course/vod/attach/create',
        component: () => import('@/views/course/vod/attach/create'),
        name: 'AttachCreate',
        meta: {
          title: 'title.course.vod.attach.create'
        }
      },
      {
        path: '/course/vod/video/index',
        component: () => import('@/views/course/vod/video/index'),
        name: 'CourseVideos',
        meta: {
          title: 'title.course.vod.video.index'
        }
      },
      {
        path: '/course/vod/video/create',
        component: () => import('@/views/course/vod/video/create'),
        name: 'VideosCreate',
        meta: {
          title: 'title.course.vod.video.create'
        }
      },
      {
        path: '/course/vod/video/update',
        component: () => import('@/views/course/vod/video/update'),
        name: 'VideosUpdate',
        meta: {
          title: 'title.course.vod.video.update'
        }
      },
      {
        path: '/course/vod/video/subscribe',
        component: () => import('@/views/course/vod/video/subscribe'),
        name: 'VideoSubscribe',
        meta: {
          title: 'title.course.vod.video.subscribe'
        }
      },
      {
        path: '/course/vod/video/watch-records',
        component: () => import('@/views/course/vod/video/watch-records'),
        name: 'VideoWatchRecords',
        meta: {
          title: 'title.course.vod.video.watch-records'
        }
      },
      {
        path: '/course/vod/video/comments',
        component: () => import('@/views/course/vod/video/comments'),
        name: 'VideoComments',
        meta: {
          title: 'title.course.vod.video.comments'
        }
      },
      {
        path: '/singlepage/index',
        component: () => import('@/views/singlepage/page/index'),
        name: 'SinglePage',
        meta: {
          title: 'title.singlepage.index'
        }
      },
      {
        path: '/singlepage/create',
        component: () => import('@/views/singlepage/page/create'),
        name: 'SinglePageCreate',
        meta: {
          title: 'title.singlepage.create'
        }
      },
      {
        path: '/singlepage/update',
        component: () => import('@/views/singlepage/page/update'),
        name: 'SinglePageUpdate',
        meta: {
          title: 'title.singlepage.update'
        }
      },
      {
        path: '/meedubook/book/index',
        component: () => import('@/views/meedubook/book/index'),
        name: 'Meedubook',
        meta: {
          title: 'title.meedubook.book.index'
        }
      },
      {
        path: '/meedubook/book/create',
        component: () => import('@/views/meedubook/book/create'),
        name: 'MeedubookCreate',
        meta: {
          title: 'title.meedubook.book.create'
        }
      },
      {
        path: '/meedubook/book/update',
        component: () => import('@/views/meedubook/book/update'),
        name: 'MeedubookUpdate',
        meta: {
          title: 'title.meedubook.book.update'
        }
      },
      {
        path: '/meedubook/book/comment',
        component: () => import('@/views/meedubook/book/comment'),
        name: 'MeedubookComment',
        meta: {
          title: 'title.meedubook.book.comment'
        }
      },
      {
        path: '/meedubook/category/index',
        component: () => import('@/views/meedubook/book/category/index'),
        name: 'MeedubookCategory',
        meta: {
          title: 'title.meedubook.book.category.index'
        }
      },
      {
        path: '/meedubook/category/create',
        component: () => import('@/views/meedubook/book/category/create'),
        name: 'MeedubookCategoryCreate',
        meta: {
          title: 'title.meedubook.book.category.create'
        }
      },
      {
        path: '/meedubook/category/update',
        component: () => import('@/views/meedubook/book/category/update'),
        name: 'MeedubookCategoryUpdate',
        meta: {
          title: 'title.meedubook.book.category.update'
        }
      },
      {
        path: '/meedubook/chapter/index',
        component: () => import('@/views/meedubook/book/chapter/index'),
        name: 'MeedubookChapter',
        meta: {
          title: 'title.meedubook.book.chapter.index'
        }
      },
      {
        path: '/meedubook/chapter/create',
        component: () => import('@/views/meedubook/book/chapter/create'),
        name: 'MeedubookChapterCreate',
        meta: {
          title: 'title.meedubook.book.chapter.create'
        }
      },
      {
        path: '/meedubook/chapter/update',
        component: () => import('@/views/meedubook/book/chapter/update'),
        name: 'MeedubookChapterUpdate',
        meta: {
          title: 'title.meedubook.book.chapter.update'
        }
      },
      {
        path: '/meedubook/article/index',
        component: () => import('@/views/meedubook/book/article/index'),
        name: 'MeedubookArticle',
        meta: {
          title: 'title.meedubook.book.article.index'
        }
      },
      {
        path: '/meedubook/article/create',
        component: () => import('@/views/meedubook/book/article/create'),
        name: 'MeedubookArticleCreate',
        meta: {
          title: 'title.meedubook.book.article.create'
        }
      },
      {
        path: '/meedubook/article/update',
        component: () => import('@/views/meedubook/book/article/update'),
        name: 'MeedubookArticleUpdate',
        meta: {
          title: 'title.meedubook.book.article.update'
        }
      },
      {
        path: '/meedubook/article/comment',
        component: () => import('@/views/meedubook/book/article/comment'),
        name: 'MeedubookArticleComment',
        meta: {
          title: 'title.meedubook.book.article.comment'
        }
      },
      {
        path: '/member/index',
        component: () => import('@/views/member/index'),
        name: 'MemberIndex',
        meta: {
          title: 'title.member.index'
        }
      },
      {
        path: '/member/create',
        component: () => import('@/views/member/create'),
        name: 'MemberCreate',
        meta: {
          title: 'title.member.create'
        }
      },
      {
        path: '/member/import',
        component: () => import('@/views/member/user-import'),
        name: 'MemberImport',
        meta: {
          title: 'title.member.import'
        }
      },
      {
        path: '/member/:userId',
        component: () => import('@/views/member/detail'),
        name: 'MemberDetail',
        meta: {
          title: 'title.member.detail'
        }
      },
      {
        path: '/member/:userId/edit',
        component: () => import('@/views/member/edit'),
        name: 'MemberEdit',
        meta: {
          title: 'title.member.edit'
        }
      },
      {
        path: '/member/:userId/tags',
        component: () => import('@/views/member/tag'),
        name: 'MemberTag',
        meta: {
          title: 'title.member.tags'
        }
      },
      {
        path: '/member/:userId/remark',
        component: () => import('@/views/member/remark'),
        name: 'MemberRemark',
        meta: {
          title: 'title.member.remark'
        }
      },
      {
        path: '/member/:userId/credit1',
        component: () => import('@/views/member/credit1'),
        name: 'MemberCredit1',
        meta: {
          title: 'title.member.credit1'
        }
      },
      {
        path: '/member/tag/index',
        component: () => import('@/views/member/tag/index'),
        name: 'MemberTagIndex',
        meta: {
          title: 'title.member.tag.index'
        }
      },
      {
        path: '/member/tag/create',
        component: () => import('@/views/member/tag/create'),
        name: 'MemberTagCreate',
        meta: {
          title: 'title.member.tag.create'
        }
      },
      {
        path: '/member/tag/:id',
        component: () => import('@/views/member/tag/edit'),
        name: 'MemberTagEdit',
        meta: {
          title: 'title.member.tag.edit'
        }
      },
      {
        path: '/wechat/messagereply/index',
        component: () => import('@/views/wechat/messagereply/index'),
        name: 'MessageReply',
        meta: {
          title: 'title.wechat.messagereply.index'
        }
      },
      {
        path: '/wechat/messagereply/create',
        component: () => import('@/views/wechat/messagereply/create'),
        name: 'ReplyCreate',
        meta: {
          title: 'title.wechat.messagereply.create'
        }
      },
      {
        path: '/wechat/messagereply/update',
        component: () => import('@/views/wechat/messagereply/update'),
        name: 'ReplyUpdate',
        meta: {
          title: 'title.wechat.messagereply.update'
        }
      },
      {
        path: '/wenda/question/index',
        component: () => import('@/views/wenda/question/index'),
        name: 'Question',
        meta: {
          title: 'title.wenda.question.index'
        }
      },
      {
        path: '/wenda/question/answer',
        component: () => import('@/views/wenda/question/answer'),
        name: 'QuestionAnswer',
        meta: {
          title: 'title.wenda.question.answer'
        }
      },
      {
        path: '/wenda/question/comment',
        component: () => import('@/views/wenda/question/comment'),
        name: 'QuestionComment',
        meta: {
          title: 'title.wenda.question.comment'
        }
      },
      {
        path: '/wenda/question/category/index',
        component: () => import('@/views/wenda/question/category/index'),
        name: 'QuestionCategory',
        meta: {
          title: 'title.wenda.question.category.index'
        }
      },
      {
        path: '/wenda/question/category/create',
        component: () => import('@/views/wenda/question/category/create'),
        name: 'QuestionCategoryCreate',
        meta: {
          title: 'title.wenda.question.category.create'
        }
      },
      {
        path: '/wenda/question/category/update',
        component: () => import('@/views/wenda/question/category/update'),
        name: 'QuestionCategoryUpdate',
        meta: {
          title: 'title.wenda.question.category.update'
        }
      },
      {
        path: '/miaosha/orders/index',
        component: () => import('@/views/miaosha/orders/index'),
        name: 'MiaoshaOrders',
        meta: {
          title: 'title.miaosha.orders.index'
        }
      },
      {
        path: '/miaosha/goods/index',
        component: () => import('@/views/miaosha/goods/index'),
        name: 'MiaoshaGoods',
        meta: {
          title: 'title.miaosha.goods.index'
        }
      },
      {
        path: '/miaosha/goods/create',
        component: () => import('@/views/miaosha/goods/create'),
        name: 'MiaoshaGoodsCreate',
        meta: {
          title: 'title.miaosha.goods.create'
        }
      },
      {
        path: '/miaosha/goods/update',
        component: () => import('@/views/miaosha/goods/update'),
        name: 'MiaoshaGoodsUpdate',
        meta: {
          title: 'title.miaosha.goods.update'
        }
      },
      {
        path: '/tuangou/goods/index',
        component: () => import('@/views/tuangou/goods/index'),
        name: 'TuangouGoods',
        meta: {
          title: 'title.tuangou.goods.index'
        }
      },
      {
        path: '/tuangou/goods/create',
        component: () => import('@/views/tuangou/goods/create'),
        name: 'TuangouGoodsCreate',
        meta: {
          title: 'title.tuangou.goods.create'
        }
      },
      {
        path: '/tuangou/goods/update',
        component: () => import('@/views/tuangou/goods/update'),
        name: 'TuangouMoodsUpdate',
        meta: {
          title: 'title.tuangou.goods.update'
        }
      },
      {
        path: '/tuangou/goods/order',
        component: () => import('@/views/tuangou/goods/order'),
        name: 'TuangouGoodsOrder',
        meta: {
          title: 'title.tuangou.goods.order'
        }
      },
      {
        path: '/tuangou/goods/refund',
        component: () => import('@/views/tuangou/goods/refund'),
        name: 'TuangouGoodsRefund',
        meta: {
          title: 'title.tuangou.goods.refund'
        }
      },
      {
        path: '/tuangou/goods/tuanorder',
        component: () => import('@/views/tuangou/goods/tuanorder'),
        name: 'TuangouGoodsTuanorder',
        meta: {
          title: 'title.tuangou.goods.tuanorder'
        }
      },
      {
        path: '/learningpath/path/index',
        component: () => import('@/views/learningpath/path/index'),
        name: 'LearningPath',
        meta: {
          title: 'title.learningpath.path.index'
        }
      },
      {
        path: '/learningpath/path/create',
        component: () => import('@/views/learningpath/path/create'),
        name: 'LearningPathCreate',
        meta: {
          title: 'title.learningpath.path.create'
        }
      },
      {
        path: '/learningpath/path/update',
        component: () => import('@/views/learningpath/path/update'),
        name: 'LearningPathUpdate',
        meta: {
          title: 'title.learningpath.path.update'
        }
      },
      {
        path: '/learningpath/step/index',
        component: () => import('@/views/learningpath/step/index'),
        name: 'LearningStep',
        meta: {
          title: 'title.learningpath.step.index'
        }
      },
      {
        path: '/learningpath/step/create',
        component: () => import('@/views/learningpath/step/create'),
        name: 'LearningStepCreate',
        meta: {
          title: 'title.learningpath.step.create'
        }
      },
      {
        path: '/learningpath/step/update',
        component: () => import('@/views/learningpath/step/update'),
        name: 'LearningStepUpdate',
        meta: {
          title: 'title.learningpath.step.update'
        }
      },
      {
        path: '/learningpath/step/relation/index',
        component: () => import('@/views/learningpath/step/relation/index'),
        name: 'Steprelation',
        meta: {
          title: 'title.learningpath.step.relation.index'
        }
      },
      {
        path: '/learningpath/step/relation/create',
        component: () => import('@/views/learningpath/step/relation/create'),
        name: 'SteprelationCreate',
        meta: {
          title: 'title.learningpath.step.relation.create'
        }
      },
      {
        path: '/learningpath/step/relation/update',
        component: () => import('@/views/learningpath/step/relation/update'),
        name: 'SteprelationUpdate',
        meta: {
          title: 'title.learningpath.step.relation.update'
        }
      },
      {
        path: '/multi_level_share/poster/index',
        component: () => import('@/views/multi_level_share/poster/index'),
        name: 'MultiPoster',
        meta: {
          title: 'title.multi_level_share.poster.index'
        }
      },
      {
        path: '/multi_level_share/poster/create',
        component: () => import('@/views/multi_level_share/poster/create'),
        name: 'MultiPosterCreate',
        meta: {
          title: 'title.multi_level_share.poster.create'
        }
      },
      {
        path: '/multi_level_share/poster/update',
        component: () => import('@/views/multi_level_share/poster/update'),
        name: 'MultiPosterUpdate',
        meta: {
          title: 'title.multi_level_share.poster.update'
        }
      },
      {
        path: '/multi_level_share/goods/index',
        component: () => import('@/views/multi_level_share/goods/index'),
        name: 'ShareGoods',
        meta: {
          title: 'title.multi_level_share.goods.index'
        }
      },
      {
        path: '/multi_level_share/goods/create',
        component: () => import('@/views/multi_level_share/goods/create'),
        name: 'ShareGoodsCreate',
        meta: {
          title: 'title.multi_level_share.goods.create'
        }
      },
      {
        path: '/multi_level_share/goods/update',
        component: () => import('@/views/multi_level_share/goods/update'),
        name: 'ShareGoodsUpdate',
        meta: {
          title: 'title.multi_level_share.goods.update'
        }
      },
      {
        path: '/live/teacher/index',
        component: () => import('@/views/live/teacher/index'),
        name: 'LiveTeacher',
        meta: {
          title: 'title.live.teacher.index'
        }
      },
      {
        path: '/live/teacher/create',
        component: () => import('@/views/live/teacher/create'),
        name: 'LiveTeacherCreate',
        meta: {
          title: 'title.live.teacher.create'
        }
      },
      {
        path: '/live/teacher/update',
        component: () => import('@/views/live/teacher/update'),
        name: 'LiveTeacherUpdate',
        meta: {
          title: 'title.live.teacher.update'
        }
      },
      {
        path: '/live/course/index',
        component: () => import('@/views/live/course/index'),
        name: 'LiveCourse',
        meta: {
          title: 'title.live.course.index'
        }
      },
      {
        path: '/live/course/create',
        component: () => import('@/views/live/course/create'),
        name: 'LiveCourseCreate',
        meta: {
          title: 'title.live.course.create'
        }
      },
      {
        path: '/live/course/update',
        component: () => import('@/views/live/course/update'),
        name: 'LiveCourseUpdate',
        meta: {
          title: 'title.live.course.update'
        }
      },
      {
        path: '/live/course/comment',
        component: () => import('@/views/live/course/comment'),
        name: 'LiveCourseComment',
        meta: {
          title: 'title.live.course.comment'
        }
      },
      {
        path: '/live/course/category/index',
        component: () => import('@/views/live/course/category/index'),
        name: 'LiveCourseCategory',
        meta: {
          title: 'title.live.course.category.index'
        }
      },
      {
        path: '/live/course/category/create',
        component: () => import('@/views/live/course/category/create'),
        name: 'LiveCourseCategoryCreate',
        meta: {
          title: 'title.live.course.category.create'
        }
      },
      {
        path: '/live/course/category/update',
        component: () => import('@/views/live/course/category/update'),
        name: 'LiveCourseCategoryUpdate',
        meta: {
          title: 'title.live.course.category.update'
        }
      },
      {
        path: '/live/course/chapter/index',
        component: () => import('@/views/live/course/chapter/index'),
        name: 'LiveCourseChapter',
        meta: {
          title: 'title.live.course.chapter.index'
        }
      },
      {
        path: '/live/course/chapter/create',
        component: () => import('@/views/live/course/chapter/create'),
        name: 'LiveCourseChapterCreate',
        meta: {
          title: 'title.live.course.chapter.create'
        }
      },
      {
        path: '/live/course/chapter/update',
        component: () => import('@/views/live/course/chapter/update'),
        name: 'LiveCourseChapterUpdate',
        meta: {
          title: 'title.live.course.chapter.update'
        }
      },
      {
        path: '/live/course/users/index',
        component: () => import('@/views/live/course/users/index'),
        name: 'LiveCourseUsers',
        meta: {
          title: 'title.live.course.users.index'
        }
      },
      {
        path: '/live/course/video/index',
        component: () => import('@/views/live/course/video/index'),
        name: 'LiveCourseVideo',
        meta: {
          title: 'title.live.course.video.index'
        }
      },
      {
        path: '/live/course/video/create',
        component: () => import('@/views/live/course/video/create'),
        name: 'LiveCourseVideoCreate',
        meta: {
          title: 'title.live.course.video.create'
        }
      },
      {
        path: '/live/course/video/update',
        component: () => import('@/views/live/course/video/update'),
        name: 'LiveCourseVideoUpdate',
        meta: {
          title: 'title.live.course.video.update'
        }
      },
      {
        path: '/live/course/video/play',
        component: () => import('@/views/live/course/video/play'),
        name: 'LiveCourseVideoPlay',
        meta: {
          title: 'title.live.course.video.play'
        }
      },
      {
        path: '/codeExchanger/index',
        component: () => import('@/views/codeExchanger/index'),
        name: 'CodeExchanger',
        meta: {
          title: 'title.codeExchanger.index'
        }
      },
      {
        path: '/codeExchanger/create',
        component: () => import('@/views/codeExchanger/create'),
        name: 'CodeExchangerCreate',
        meta: {
          title: 'title.codeExchanger.create'
        }
      },
      {
        path: '/codeExchanger/update',
        component: () => import('@/views/codeExchanger/update'),
        name: 'CodeExchangerUpdate',
        meta: {
          title: 'title.codeExchanger.update'
        }
      },
      {
        path: '/codeExchanger/codes',
        component: () => import('@/views/codeExchanger/codes'),
        name: 'CodeExchangerCodes',
        meta: {
          title: 'title.codeExchanger.codes'
        }
      },
      {
        path: '/topic/index',
        component: () => import('@/views/topic/index'),
        name: 'Topic',
        meta: {
          title: 'title.topic.index'
        }
      },
      {
        path: '/topic/create',
        component: () => import('@/views/topic/create'),
        name: 'TopicCreate',
        meta: {
          title: 'title.topic.create'
        }
      },
      {
        path: '/topic/update',
        component: () => import('@/views/topic/update'),
        name: 'TopicUpdate',
        meta: {
          title: 'title.topic.update'
        }
      },
      {
        path: '/topic/category/index',
        component: () => import('@/views/topic/category/index'),
        name: 'TopicCategory',
        meta: {
          title: 'title.topic.category.index'
        }
      },
      {
        path: '/topic/category/create',
        component: () => import('@/views/topic/category/create'),
        name: 'TopicCategoryCreate',
        meta: {
          title: 'title.topic.category.create'
        }
      },
      {
        path: '/topic/category/update',
        component: () => import('@/views/topic/category/update'),
        name: 'TopicCategoryUpdate',
        meta: {
          title: 'title.topic.category.update'
        }
      },
      {
        path: '/topic/comment',
        component: () => import('@/views/topic/comment'),
        name: 'TopicComment',
        meta: {
          title: 'title.topic.comment'
        }
      },
      {
        path: '/topic/order',
        component: () => import('@/views/topic/order'),
        name: 'TopicOrder',
        meta: {
          title: 'title.topic.order'
        }
      },
    ]
  },
  {
    path: '/decoration/h5',
    name: 'DecorationH5',
    component: () => import('@/views/decoration/h5.vue'),
    meta: {
      title: '移动端装修'
    }
  },
  {
    path: '/decoration/pc',
    name: 'DecorationPC',
    component: () => import('@/views/decoration/pc.vue'),
    meta: {
      title: '电脑端装修'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test/test.vue'),
    meta: {
      title: 'Test'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 设置标题
  document.title = i18n.t(to.meta.title);
  next();
});

export default router