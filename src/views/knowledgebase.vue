<!-- 知识库 -->
<template>
    <div>
        <Row>
            <Col span="6">
                <Tree />
            </Col>
            <Col span="18">
                <patentCard />
            </Col>
        </Row>
        <Page :total="100" show-total class="page"/>
    </div>
</template>

<script>
    import Tree from '../decorations/tree.vue'
    import patentCard from '../decorations/patentcard.vue'

    export default {
        components: {
            Tree,
            patentCard
        },
        name: "knowledgegraph",
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .page {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
    }
</style>
