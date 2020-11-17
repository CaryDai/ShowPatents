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
    state: {
        currentStep: 0,    // 记录当前的步骤
        selectedNodes: [],  // 记录用户选择的分类
        editNodes: []   // 记录用户编辑好的分类
    },
    mutations: {
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
            state.currentStep = 2;
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
