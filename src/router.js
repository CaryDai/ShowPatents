// 每个路由应该映射一个组件。
const routers = [
    {
        path: '/',
        redirect: 'home',
        meta: {
            title: ''
        },
        children: [
            {
                path: '/domainsubjects',
                component: (resolve) => require(['./views/domainsubjects.vue'], resolve)
            },
            {
                path: '/subjectone',
                component: (resolve) => require(['./subjects/subjectone.vue'], resolve)
            },
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
                path: '/mysubjects',
                component: (resolve) => require(['./views/mysubjects.vue'], resolve)
            },
            {
                path: '/patentDetail',
                component: (resolve) => require(['./decorations/patentDetail.vue'], resolve)
            }
        ],
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/home',
        component: (resolve) => require(['./views/home.vue'], resolve)
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