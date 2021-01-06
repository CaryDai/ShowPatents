<!-- 编辑专利的卡片 -->
<template>
    <div class="card">
        <div v-if="!deleted" class="titleAndBtn">
            <h3 style="color: #3b87d2f7;">{{patent.name}}</h3>
            <Button type="error" shape="circle" @click="deleteNotInterestPatent">我不感兴趣</Button>
        </div>
        <div v-else class="titleAndBtn">
            <h3 style="color:darkgray;">{{patent.name}}</h3>
            <Button type="error" shape="circle" ghost @click="recover" style="padding-left: 36px;
            padding-right: 36px;">撤销</Button>
        </div>
        <div v-if="!deleted">
            <p>
                <b>发明人</b>：{{patent.inventors}}
            </p>
            <p v-if="patent.applicant != null">
                <b>申请人</b>：{{patent.applicant}}
            </p>
            <p v-if="patent.patentAbstract.length > 105">
                <b>摘要</b>：{{patent.patentAbstract.substring(0, 105) + '...'}}
            </p>
            <p v-else class="line-limit-length">
                <b>摘要</b>：{{patent.patentAbstract}}
            </p>
        </div>
        <div v-else style="color: darkgray;">
            <p>
                <b>发明人</b>：{{patent.inventors}}
            </p>
            <p v-if="patent.applicant != null">
                <b>申请人</b>：{{patent.applicant}}
            </p>
            <p v-if="patent.patentAbstract.length > 105">
                <b>摘要</b>：{{patent.patentAbstract.substring(0, 105) + '...'}}
            </p>
            <p v-else class="line-limit-length">
                <b>摘要</b>：{{patent.patentAbstract}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            patent: {
                type: Object
            }
        },
        data() {
            return {
                deleted: false
            }
        },
        methods: {
            /**
             * 删除不感兴趣的专利
             */ 
            deleteNotInterestPatent() {
                this.deleted = true;
            },
            recover() {
                this.deleted = false;
            }
        },
    }
</script>

<style scoped>
    .card {
        height: 120px;
        margin-top: 5px;
        border-bottom: 1px solid #eee;
    }

    .line-limit-length {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .titleAndBtn {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>