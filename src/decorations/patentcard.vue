<!-- 原始的专利展示卡片 -->
<template>
    <div class="card">
        <a href="javascript:void(0);" @click="gotoPatentDetail(patent)" style="font-size: large;">
            {{patent.name}}
        </a>
        <p>
            <b>发明人</b>：{{patent.inventors}}
        </p>
        <p v-if="patent.applicant != null">
            <b>申请人</b>：{{patent.applicant}}
        </p>
        <p>
            <b>摘要</b>：{{patent.patentAbstract}}
        </p>
        <!-- <p v-if="patent.patentAbstract.length > 105">
            <b>摘要</b>：{{patent.patentAbstract.substring(0, 105) + '...'}}
        </p>
        <p v-else class="line-limit-length">
            <b>摘要</b>：{{patent.patentAbstract}}
        </p> -->
    </div>
</template>

<script>
    export default {
        props: {
            patent: {
                type: Object
            }
        },
        methods: {
            gotoPatentDetail(patent) {
                this.$store.commit('gotoPatentDetail', patent);
            }
        },
    }
</script>

<style scoped>
    .card {
        height: 120px;
        padding-top: 10px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
    }

    .line-limit-length {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>