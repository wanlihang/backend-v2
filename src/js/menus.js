export default [
    {
        name: '首页概览',
        key: 'Dashboard',
        icon: '@/assets/commen/indexlogo.png',
        children: [],
    },
    {
        name: '装修',
        key: 'Decoration',
        children: [
            {
                name: '电脑端',
                key: 'DecorationPC',
            },
            {
                name: '移动端',
                key: 'DecorationMobile'
            }
        ],
    }
];