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
                name: 'title.role',
                key: 'Role'
            },
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
        ],
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
            },
            {
                name: 'title.system-adminroles',
                key: 'SystemAdminroles',
            }
        ]
    },
    
];