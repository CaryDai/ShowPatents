const routers = [
    {
        path: '/',
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
    }
];
export default routers;