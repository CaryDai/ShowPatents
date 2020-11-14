<template>
    <div class="card">
        <h3 style="color: #3b87d2f7;">{{patent.name}}</h3>
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
</template>

<script>
    export default {
        props: {
            patent: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    .card {
        height: 120px;
        padding-top: 10px;
        border-bottom: 1px solid #eee;
    }

    .line-limit-length {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>