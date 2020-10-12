<!-- 知识库 -->
<template>
    <div>
        <Row>
            <Col span="4">
                <Tree />
            </Col>
            <Col span="20">
                
            </Col>
        </Row>
    </div>
</template>

<script>
    import Tree from '../decorations/tree.vue'

    export default {
        components: {
            Tree
        },
        name: "knowledgegraph",
        data() {
            return {

            }
        }
    }
</script>

<style>
</style>
