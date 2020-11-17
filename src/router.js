// 每个路由应该映射一个组件。
const routers = [
    {
        path: '/',
        redirect: 'login',
        meta: {
            title: ''
        },
        children: [
            {
                path: '/graph',
                component: (resolve) => require(['./views/graph.vue'], resolve)
            },
            {
                path: '/custom',
                component: (resolve) => require(['./views/custom.vue'], resolve)
            },
            {
                path: '/knowledgebase',
                component: (resolve) => require(['./views/knowledgebase.vue'], resolve)
            },
            {
                path: '/mysubject',
                component: (resolve) => require(['./views/mysubject.vue'], resolve)
            }
        ],
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/register',
        component: (resolve) => require(['./views/register.vue'], resolve)
    },
    {
        path: '/login',
        component: (resolve) => require(['./views/login.vue'], resolve)
    }
];
export default routers;