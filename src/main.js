// main.js是逻辑的入口文件
// main.js中的组件是全局组件，在任何组件中都能直接使用
import Vue from 'vue';
import ViewUI from 'view-design';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'view-design/dist/styles/iview.css';
import echarts from 'echarts';
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.prototype.$echarts = echarts
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.prototype.$qs = qs;


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});

const store = new Vuex.Store({
    // state保存组件的公共状态
    state: {
        // 用户关于专题库的描述信息
        analyzeText: '',
        // 记录当前的步骤
        currentStep: 0,
        // 记录用户选择的分类
        selectedNodes: [],
        // 记录用户编辑好的分类
        editNodes: [],
        // 记录用户状态
        userState: {
            telephone: '',
            isLogin: false
        },
        // 记录被选中的专利
        selectedPatent: ''
    },
    // state只能由mutations进行更改
    mutations: {
        login(state, loginData) {
            const options = {
                method: 'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                // 以application/x-www-form-urlencoded格式发送数据，可以使用qs库编码数据
                data: qs.stringify(loginData),
                url: 'http://localhost:8081/user/login'
            };
            axios(options)
                .then((res) => {
                    console.log(res);
                    if (res.data == "True") {
                        state.userState.telephone = loginData.telephone;
                        state.userState.isLogin = true;
                        ViewUI.Message.success('登陆成功!');
                        router.push('/graph');
                    } else {
                        ViewUI.Message.error('验证失败!');
                    }
                })
                .catch((e) => {
                    console.log(e);
                    ViewUI.Message.error('验证失败!');
                });
        },
        // 本方法在用户点击要选择的分类时被触发
        selectClass(state, obj) {
            state.selectedNodes.push(obj);
            state.editNodes = state.selectedNodes;
            state.currentStep = 1;
        },
        // 本方法在用户点击编辑完成按钮时被触发
        submitCustomClass(state, nodes) {
            state.editNodes = nodes;
            console.log(state.editNodes);
            console.log(typeof(state.editNodes[0]));
            // 用户专题号 = 手机号后四位 + 顶层节点分类号
            const user_subject = state.userState.telephone.slice(-4) + nodes[0].classCode;
            const updateData = {
                "telephone": state.userState.telephone,
                "userSubject": user_subject
            };
            const options = {
                method: 'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(updateData),
                url: 'http://localhost:8081/user/addSubject'
            };
            // 更新user_info表的user_subject字段
            axios(options)
                .then((res) => {
                    console.log(res);
                    if (res.data == "True") {
                        ViewUI.Message.success('添加成功');
                    } else {
                        ViewUI.Message.error('添加失败');
                    }
                })
                .catch((e) => {
                    console.log(e);
                    ViewUI.Message.error('添加失败');
                });
            
            const requestEditNode = {};
            requestEditNode.classCode = state.editNodes[0].classCode;
            requestEditNode.parentCode = state.editNodes[0].parentCode;
            requestEditNode.title = state.editNodes[0].title;
            requestEditNode.children = state.editNodes[0].children;
            const requestData = JSON.stringify(requestEditNode);
            const secoptions = {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                data: requestData,
                url: 'http://localhost:8081/user/updateUserSubjects'
            };
            // 更新user_subjects表
            axios(secoptions)
                .then((res) => {
                    console.log(res);
                    if (res.data == "True") {
                        ViewUI.Message.success('添加成功');
                    } else {
                        ViewUI.Message.error('添加失败');
                    }
                })
                .catch((e) => {
                    console.log(e);
                    ViewUI.Message.error('添加失败');
                });
            
            state.currentStep = 2;
        },
        // 查看专利详细信息，必须传state参数
        gotoPatentDetail(state, patent) {
            console.log(patent)
            router.push({
                path: '/patentDetail',
                query: {
                    publicationNO: patent.publicationNO
                }
            });
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
