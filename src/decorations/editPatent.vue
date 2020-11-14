<!-- 增删专利 -->
<template>
    <div style="min-height: 520px;">
        <Row>
            <Col span="6">
                <Tree :data="editNodes" @on-select-change="searchPatents" />
            </Col>
            <Col span="18">
                <Input search enter-button placeholder="搜索文献手动添加" v-model="value" @on-search="searchByKeyWords" style="width: 300px;" />
                <div v-if="patentArray.length > 0">
                    <div v-for="(patent, index) in patentArray">
                        <DeletePatentCard :patent="patent" />
                    </div>
                    <div style="margin-top: 60px;">
                        <Page :total="100" show-total class="page" @on-change="handlePageChange" />
                    </div>
                </div>
                <div v-else style="margin-top: 40px;">
                    <p style="font-size: large;">
                        当前所有分类下还没有专利数据，您可以通过上方搜索框输入关键词搜索专利进行添加。
                    </p>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import DeletePatentCard from './deletepatentcard.vue'

    export default {
        data() {
            return {
                editNodes: this.$store.state.editNodes,
                patentArray: [],
                value: ''
            }
        },
        components: {
            DeletePatentCard
        },
        mounted() {
            let classCode = this.editNodes[0].classCode;
            if (this.editNodes[0].children) {
                this.axios.get('http://localhost:8081/classcodes/getPatentsByClassIdPrefix', {
                    params: {
                        classId: classCode,
                        pageNo: 1,
                        queryNum: 6
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
                        pageNo: 1,
                        queryNum: 6
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
        },
        methods: {
            handlePageChange(data) {
                let classCode = this.editNodes[0].classCode;
                if (this.editNodes[0].children) {
                    // 请求不同的接口
                    this.axios.get('http://localhost:8081/classcodes/getPatentsByClassIdPrefix', {
                        params: {
                            classId: classCode,
                            pageNo: data,
                            queryNum: 6
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
                            queryNum: 6
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
            },
            searchByKeyWords(data) {
                console.log(data);
            },
            searchPatents(TreeNode) {
                console.log(TreeNode[0].classCode);
                let classCode = TreeNode[0].classCode;
                if (TreeNode[0].children) {
                    // 请求不同的接口
                    this.axios.get('http://localhost:8081/classcodes/getPatentsByClassIdPrefix', {
                        params: {
                            classId: classCode,
                            pageNo: 1,
                            queryNum: 6
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
                            pageNo: 1,
                            queryNum: 6
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

<style scoped>
    .showPage {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        /* height: 100vh; */
    }
</style>