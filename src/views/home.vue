<template>
    <div>
        <div class="kgo-head-new ckecest-head-index">
            <div class="head-left">
                <!-- <div>
                    <Icon type="ios-cog" size="40" color="#2981dc"></Icon>
                </div> -->
                <h1>开放式专题知识库智能构建平台</h1>
            </div>
            <div class="head-right">
                <router-link to="/login" style="margin-right: 10px;">登陆</router-link>
                <router-link to="/register">注册</router-link>
            </div>
        </div>
        <div style="position: absolute;">
            <img src="../images/bg3.png" class="bg">
            <Input search enter-button placeholder="搜索专利、专题库" v-model="value" @on-search="searchByKeyWords"
                style="width: 500px; position: absolute; margin: 50px 420px;" />
            <div style="position: absolute; margin: -480px 280px; text-align: center;">
                <ul class="dataQuantily-list clearfix">
                    <li>
                        <p>
                            <img src="../images/patent-ico-615516604.png">
                            <b>2000w+专利</b>
                        </p>
                    </li>
                    <li>
                        <p>
                            <img src="../images/apply-ico-615516602.png">
                            <b>6131个知识分类</b>
                        </p>
                    </li>
                    <li>
                        <p>
                            <img src="../images/video-ico-615516604.png">
                            <b>多视图知识导航</b>
                        </p>
                    </li>
                    <li>
                        <p>
                            <img src="../images/policy-ico-615516604.png">
                            <b>专题库智能构建</b>
                        </p>
                    </li>
                    <li>
                        <p>
                            <img src="../images/baogao-ico-615516602.png">
                            <b>专题库智能维护</b>
                        </p>
                    </li>
                </ul>
            </div>
            <div style="position: absolute;">
                <div style="position: absolute; margin: -400px 350px;" @click="gotoDomainsubjects">
                    <Icon type="ios-flask" size="60" color="#2981dc"></Icon>
                    <p style="width: 100px;">
                        <b style="margin-left: -4px;">专题知识库</b>
                    </p>
                </div>
                <div style="position: absolute; margin: -400px 650px;" @click="gotoGraph">
                    <Icon type="ios-navigate" size="60" color="#2981dc"></Icon>
                    <p style="width: 100px;">
                        <b style="margin-left: -4px;">关系图导航</b>
                    </p>
                </div>
                <div style="position: absolute; margin: -400px 950px;" @click="gotoKnowledgebase">
                    <Icon type="ios-paper" size="60" color="#2981dc"></Icon>
                    <p style="width: 100px;">
                        <b style="margin-left: -4px;">树状图导航</b>
                    </p>
                </div>
                <div style="position: absolute; margin: -260px 500px;" @click="gotoCustom">
                    <Icon type="ios-analytics" size="60" color="#2981dc"></Icon>
                    <p style="width: 100px;">
                        <b style="margin-left: -4px;">专题库构建</b>
                    </p>
                </div>
                <div style="position: absolute; margin: -260px 800px;" @click="gotoMysubjects">
                    <Icon type="ios-keypad" size="60" color="#2981dc"></Icon>
                    <p style="width: 100px;">
                        <b style="margin-left: -4px;">我的专题库</b>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                
            }
        },
        methods: {
            gotoDomainsubjects() {
                this.$router.push('/domainsubjects')
            },
            gotoGraph() {
                this.$router.push('/graph')
            },
            gotoKnowledgebase() {
                this.$router.push('/knowledgebase')
            },
            gotoCustom() {
                this.$router.push('/custom')
            },
            gotoMysubjects() {
                this.$router.push('/mysubjects')
            }
        },
    }
</script>

<style scoped>
    .ckecest-head-index {
        padding: 16px 0;
    }

    .kgo-head-new {
        height: 78px;
        line-height: 78px;
        font-size: 13px;
        background: #f4f6f9;
        color: #797979;
    }

    .head-left {
        float: left;
        margin: -15px 20px;
        color: #202021;
    }

    .head-right {
        float: right;
        margin: -15px 50px;
        font-size: 18px;
    }

    .bg {
        width: 100%;
        height: 600px;
        position: relative;
        z-index: -1;
    }

    .dataQuantily-list {
        display: inline-block;
    }

    .clearfix {
        zoom: 1;
    }

    .dataQuantily-list>li {
        color: #666666;
        /* color: #FFFFFF; */
        float: left;
        border-left: solid 1px #e9e9e8;
        padding: 0 20px;
        /* cursor: pointer; */
    }

    .dataQuantily-list>li b {
        font-size: 14px;
        /* color: #FFFFFF; */
        color: #999999;
    }

    .dataQuantily-list>li p img {
        margin-right: 3px;
    }

    img {
        vertical-align: middle;
        border: none;
    }

    .dataQuantily-list>li:first-child {
        border-left: none;
    }

    li {
        list-style: none;
    }
</style>