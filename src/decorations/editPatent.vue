<!-- 增删专利 -->
<template>
    <div class="editPatent">
        <Tree :data="editNodes" />
        <Input search enter-button placeholder="搜索文献" style="width: 300px;" />
        <!-- <PatentCard /> -->
    </div>
</template>

<script>
    import PatentCard from './patentcard.vue'

    export default {
        data() {
            return {
                editNodes: this.$store.state.editNodes
            }
        },
        components: {
            PatentCard
        }
    }
</script>

<style scoped>
    .editPatent {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 80%;
    }
</style>