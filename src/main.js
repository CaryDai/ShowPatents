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
import VueAxios from 'vue-axios'
// import VueResource from 'vue-resource'

Vue.prototype.$echarts = echarts
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(VueAxios, axios);
// Vue.use(VueResource);

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

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
