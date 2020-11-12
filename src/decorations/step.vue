<template>
    <Steps :current="currentStep">
        <Step v-if="currentStep == 0" title="进行中" content="选择感兴趣的分类"></Step>
        <Step v-else title="已完成" content="选择感兴趣的分类"></Step>

        <Step v-if="currentStep < 1" title="待进行" content="编辑自己的分类"></Step>
        <Step v-else-if="currentStep == 1" title="进行中" content="编辑自己的分类"></Step>
        <Step v-else title="已完成" content="编辑自己的分类"></Step>

        <Step v-if="currentStep < 2" title="待进行" content="添加专利"></Step>
        <Step v-else-if="currentStep == 2" title="进行中" content="添加专利"></Step>
        <Step v-else title="已完成" content="添加专利"></Step>

        <Step v-if="currentStep < 3" title="待进行" content="命名你的专题库"></Step>
        <Step v-else title="进行中" content="命名你的专题库"></Step>
    </Steps>
</template>

<script>
    export default {
        props: {
            currentStep: {
                type: Number,
                required: true,
                default: 0
            }
        }
    }
</script>