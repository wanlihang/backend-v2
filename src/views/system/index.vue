<template>
    <div class="config-box" v-loading="loading">
        <div class="options">
            <div class="title">基本配置</div>
            <div class="body">
                <div class="item" v-for="(item, index) in groups" :key="index" @click="$router.push({name: 'SystemConfig',query: { key: item.value },})">
                    <img :src="item.images" />
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="options">
            <div class="title">课程配置</div>
            <div class="body">
                <div class="item" v-for="(item, index) in courses" :key="index" @click="$router.push({name: 'SystemConfig',query: { key: item.value },})">
                    <img :src="item.images" />
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="options">
            <div class="title">营销配置</div>
            <div class="body">
                <div class="item" v-for="(item, index) in market" :key="index" @click="$router.push({name: 'SystemConfig',query: { key: item.value },})">
                    <img :src="item.images" />
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            groups: [
                {
                    name: "网站信息",
                    value: "系统",
                    images: require("../../assets/images/config/system.png"),
                },
                {
                    name: "移动端H5",
                    value: "立春模板",
                    images: require("../../assets/images/config/h5.png"),
                },
                {
                    name: "支付配置",
                    value: "支付",
                    images: require("../../assets/images/config/payment.png"),
                },
                {
                    name: "用户注册",
                    value: "会员",
                    images: require("../../assets/images/config/role.png"),
                },
                {
                    name: "登录方式",
                    value: "登录",
                    images: require("../../assets/images/config/login.png"),
                },
                {
                    name: "微信公众号",
                    value: "微信公众号",
                    images: require("../../assets/images/config/wechat.png"),
                },
                {
                    name: "短信服务",
                    value: "短信",
                    images: require("../../assets/images/config/message.png"),
                },
                {
                    name: "视频存储",
                    value: "视频",
                    images: require("../../assets/images/config/video.png"),
                },
                {
                    name: "图片存储",
                    value: "图片存储",
                    images: require("../../assets/images/config/pic.png"),
                },
                {
                    name: "阿里云HLS加密",
                    value: "阿里云HLS加密",
                    images: require("../../assets/images/config/ali.png"),
                },
                {
                    name: "腾讯云HLS加密",
                    value: "腾讯云HLS加密",
                    images: require("../../assets/images/config/tecent.png"),
                },
                {
                    name: "微信小程序",
                    value: "微信小程序",
                    images: require("../../assets/images/config/weixin.png"),
                },
                {
                    name: "单点登录",
                    value: "单点登录",
                    images: require("../../assets/images/config/clicklogin.png"),
                },
                {
                    name: "课程有效期",
                    value: "课程有效期",
                    images: require("../../assets/images/config/coursetime.png"),
                },
                {
                    name: "随机拍照",
                    value: "随机拍照",
                    images: require("../../assets/images/config/camera.png"),
                },
                {
                    name: "高德地图",
                    value: "高德地图",
                    images: require("../../assets/images/config/gaode.png"),
                },
                 {
                    name: "K12配置",
                    value: "K12",
                    images: require("../../assets/images/config/k12.png"),
                },
                {
                    name: "全局搜索",
                    value: "全文搜索",
                    images: require("../../assets/images/config/search.png"),
                },
                {
                    name: "插件配置",
                    value: "插件配置",
                    images: require("../../assets/images/config/import.png"),
                },

            ],
            courses: [
                {
                    name: "播放器配置",
                    value: "播放器配置",
                    images: require("../../assets/images/config/player.png"),
                },
                {
                    name: "直播服务配置",
                    value: "直播",
                    images: require("../../assets/images/config/live.png"),
                },
                {
                    name: "电子书推荐",
                    value: "电子书",
                    images: require("../../assets/images/config/book.png"),
                },
                {
                    name: "图文推荐",
                    value: "图文",
                    images: require("../../assets/images/config/topic.png"),
                },
                {
                    name: "问答配置",
                    value: "问答",
                    images: require("../../assets/images/config/wenda.png"),
                },
                {
                    name: "考试练习",
                    value: "考试练习",
                    images: require("../../assets/images/config/exam.png"),
                },
            ],
            market: [
                {
                    name: "注册送会员",
                    value: "注册送VIP",
                    images: require("../../assets/images/config/sendvip.png"),
                },
                {
                    name: "邀请送会员",
                    value: "邀请",
                    images: require("../../assets/images/config/invitevip.png"),
                },
                {
                    name: "邀请奖励",
                    value: "邀请",
                    images: require("../../assets/images/config/invite.png"),
                },
                {
                    name: "三级分销",
                    value: "三级分销",
                    images: require("../../assets/images/config/multishare.png"),
                },
                {
                    name: "团购配置",
                    value: "团购",
                    images: require("../../assets/images/config/tg.png"),
                },
                {
                    name: "积分奖励",
                    value: "积分",
                    images: require("../../assets/images/config/credict.png"),
                },
            ],
        };
    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.config-box {
    width: 100%;
    height: auto;
    float: left;
    border: 1px solid rgb(227, 227, 227);
    border-radius: 3px;
    .options {
        width: 100%;
        height: auto;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
        float: left;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 20px;
        margin-bottom: 20px;
        .title {
            width: 100%;
            height: 16px;
            font-size: 16px;
            font-weight: 500;
            color: #333333;
            line-height: 16px;
            margin-bottom: 20px;
        }
        .body {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            .item {
                width: 100%;
                height: 88px;
                background: #F3F4F5;
                box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
                border-radius: 8px;
                display: flex;
                flex-direction: row;
                align-items: center;
                box-sizing: border-box;
                padding-left: 30px;
                cursor: pointer;
                &:hover {
                    opacity: 0.8;
                }
                img {
                    width: 48px;
                    height: 48px;
                    margin-right: 20px;
                }
                span {
                    height: 16px;
                    font-size: 16px;
                    font-weight: 400;
                    color: #333333;
                    line-height: 16px;
                }
            }
        }
    }
}
</style>
