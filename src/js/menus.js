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
                key: 'DecorationMobile'
            },
            {
                name: 'title.vip',
                key: 'Vip'
            }
        ],
    }
];