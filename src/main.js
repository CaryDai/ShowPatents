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
        // graph中右击节点的节点classCode，这个参数用户查找相似专利
        nodeClassCode: "",
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
                        router.push('/domainsubjects');
                    } else {
                        ViewUI.Message.error('验证失败!');
                    }
                })
                .catch((e) => {
                    console.log(e);
                    ViewUI.Message.error('验证失败!');
                });
        },
        /**
         * 本方法在用户点击要选择的分类时被触发，手工选取分类
         * @param {*} state 
         * @param {*} obj 
         */
        selectClass(state, obj) {
            state.selectedNodes.push(obj);
            state.editNodes = state.selectedNodes;
            state.currentStep = 1;
        },
        /**
         * 本方法在用户点击分析按钮时被触发，智能推荐分类
         * @param {*} state 
         * @param {*} obj 
         */
        goAnalyzing(state, obj) {
            state.analyzeText = obj.text
            console.log(obj.text);
            state.editNodes.push(obj.recommendClassCode1)
            state.currentStep = 1;
        },
        /**
         * 本方法在第二步用户点击编辑完成按钮时被触发
         * @param {*} state 
         * @param {*} nodes 
         */
        submitCustomClass(state, nodes) {
            state.editNodes = nodes;
            console.log(state.editNodes);
            state.currentStep = 2;
            console.log(typeof(state.editNodes[0]));
            // 用户专题号 = 第几个专题（后端加） + 手机号后四位 + 顶层节点分类号
            const user_subject = state.userState.telephone.slice(-4) + nodes[0].classCode;
            const updateData = {
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
            
            setTimeout(function () {
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
            }, 1000);
        },
        /**
         * 得到右击节点的classCode
         * @param {*} state 
         * @param {从graph传递过来的右击节点号} nodeClassCode 
         */
        getRightClickClassCode(state, nodeClassCode) {
            state.nodeClassCode = nodeClassCode;
            console.log(state.nodeClassCode)
        },
        /**
         * 查看专利详细信息，必须传state参数
         * @param {*} state 
         * @param {从graph传递过来的专利} patent 
         */
        gotoPatentDetail(state, patent) {
            console.log(patent);
            router.push({
                path: '/patentDetail',
                query: {
                    publicationNO: patent.publicationNO,
                    classCode: state.nodeClassCode
                }
            });
        },
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
