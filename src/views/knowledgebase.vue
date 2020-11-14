<!-- 知识库 -->
<template>
    <div>
        <Row>
            <Col span="6">
                <Tree @getCheckedNode="getCheckedNode" @showPatents="showPatents" />
            </Col>
            <Col span="18">
                <div v-for="(patent, index) in patentArray">
                    <PatentCard :patent="patent" />
                </div>
            </Col>
        </Row>
        <div style="margin-top: 45px;">
            <Page v-if="patentArray.length > 0" :total="100" show-total class="page" @on-change="handlePageChange" />
        </div>
    </div>
</template>

<script>
    import Tree from '../decorations/tree.vue'
    import PatentCard from '../decorations/patentcard.vue'

    export default {
        components: {
            Tree,
            PatentCard
        },
        name: "knowledgegraph",
        data() {
            return {
                // 获取选中的节点信息
                checkedNodes: "",
                patentArray: []
            }
        },
        methods: {
            getCheckedNode(choiceAll) {
                this.checkedNodes = choiceAll;
                console.log(this.checkedNodes.classCode);
            },
            showPatents(data) {
                // console.log(data);
                this.patentArray = data;
            },
            handlePageChange(data) {
                console.log(data);
                let classCode = this.checkedNodes.classCode;
                if (this.checkedNodes.children) {
                    // 请求不同的接口
                    this.axios.get('http://localhost:8081/classcodes/getPatentsByClassIdPrefix', {
                        params: {
                            classId: classCode,
                            pageNo: data,
                            queryNum: 10
                        }
                    })
                    .then((response) => {
                        this.patentArray = response.data
                        console.log(this.patentArray);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                } else {
                    // 当前层就是最下层节点，直接取专利数据
                    this.axios.get('http://localhost:8081/classcodes/getPatentsByClassId', {
                        params: {
                            classId: classCode,
                            pageNo: data,
                            queryNum: 10
                        }
                    })
                    .then((response) => {
                        console.log(response.data)
                        this.patentArray = response.data;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            }
        },
    }
</script>

<style>
    .page {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
    }
</style>