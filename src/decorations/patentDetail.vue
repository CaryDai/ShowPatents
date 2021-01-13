<!-- 专利详情页 -->
<template>
    <div style="margin-left: 10px;">
        <Row>
            <Col span="16" style="overflow: hidden;">
                <Row>
                    <Col>
                        <div style="margin-bottom: 10px;">
                            <img class="detail-pic" src="../images/patenticon.png" alt="专利">
                            <h2 style="display: inline;">{{patent.name}}</h2>
                        </div>
                        <p><b>发明人：</b>{{patent.inventors}}</p>
                        <p><b>申请人：</b>{{patent.applicant}}</p>
                        <Row>
                            <Col span="12"><p><b>申请号：</b>{{patent.applicationNo}}</p></Col>
                            <Col span="12"><p><b>申请日期：</b>{{patent.applicationDate}}</p></Col>
                        </Row>
                        <Row>
                            <Col span="12"><p><b>公开号：</b>{{patent.publicationNo}}</p></Col>
                            <Col span="12"><p><b>公开日期：</b>{{patent.publicationDate}}</p></Col>
                        </Row>
                        <Row>
                            <Col span="12"><p><b>主分类号：</b>{{patent.mainClassificationNo}}</p></Col>
                            <Col span="12"><p><b>分类号：</b>{{patent.classificationNo}}</p></Col>
                        </Row>
                        <p><b>专利类型：</b>{{patent.patentType}}</p>
                        <p><b>申请人地址：</b>{{patent.applicantAddress}}</p>
                    </Col>
                    <hr class="detail-divide">
                    <Col>
                        <p><b>【摘要】</b>{{patent.abstractCh}}</p>
                    </Col>
                    <hr class="detail-divide">
                    <Col>
                        <p><b>【主权项】</b>{{patent.sovereignty}}</p>
                    </Col>
                </Row>
            </Col>
            <Col span="8" class="patent-right">
                <h4 class="h4">相似专利</h4>
                <div v-if="similarPatents.length > 0" v-for="(patent,index) in similarPatents" class="astyle">
                    <a href="javascript:void(0);" @click="getPatentDetailAndSimilarPatents(patent.publicationNo,currentClassCode)" style="font-size: large;">
                        {{index+1}}. {{patent.name}}
                    </a>
                </div>
                <div v-else>暂无相关专利</div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "patentDetail",
        data() {
            return {
                routerParams: {},
                patent: "",
                similarPatents: [],
                currentClassCode: '',
                isRouterAlive: true
            }
        },
        created() {
            this.getParams();
        },
        methods: {
            /**
             * 接收上一个页面传过来的参数
             */
            getParams() {
                this.routerParams.publicationNO = this.$route.query.publicationNO;
                this.routerParams.classCode = this.$route.query.classCode;
                this.currentClassCode = this.$route.query.classCode;
                console.log(this.routerParams);
                this.getPatentDetailAndSimilarPatents(this.routerParams.publicationNO,this.routerParams.classCode);
            },
            getPatentDetailAndSimilarPatents(publicationNO,classCode) {
                this.getPatentDetail(publicationNO);
                this.getSimilarPatents(publicationNO,classCode);
                this.reload();
            },
            /**
             * 根据公开号查询专利详细信息
             */
            getPatentDetail(publicationNO) {
                this.axios.get('http://localhost:8081/classcodes/getPatentDetail', {
                    params: {
                        publicationNO: publicationNO
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    this.patent = response.data;
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            /**
             * 查询相似专利
             */
            getSimilarPatents(publicationNO,classCode) {
                console.log(classCode);
                this.axios.get('http://localhost:8081/classcodes/getSimilarPatents', {
                    params: {
                        publicationNO: publicationNO,
                        classCode: classCode
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    this.similarPatents = response.data;
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            /**
             * 刷新页面
             */ 
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function(){
                    this.isRouterAlive = true;
                })
            }
        },
    }
</script>

<style scoped>
    .inlineStyle {
        display: inline;
        padding-right: 20px;
    }

    .patent-right {
        padding: 45px 30px 25px;
        margin-bottom: 90px;
    }

    .h4 {
        border-left: 3px solid #2bb3ee;
        padding-left: 1.14rem;
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 20px;
    }

    .detail-pic {
        width: 18px;
        height: 20px;
        position: relative;
        top: 1px;
        margin-right: 6px;
    }

    .detail-divide {
        margin: 30px 0;
    }

    hr {
        border: 0;
        border-top: 1px solid #eee;
    }
</style>