<!-- 知识库 -->
<template>
    <div>
        <Row>
            <Col span="6">
                <Tree @getCheckedNode="getCheckedNode" @showPatents="showPatents" />
            </Col>
            <Col span="18" v-if="patentArray.length > 0">
                <Input search enter-button placeholder="搜索专利" v-model="value" @on-search="searchByKeyWords"
                    style="width: 300px;" />
                <div v-for="(patent, index) in patentArray">
                    <PatentCard :patent="patent" />
                </div>
            </Col>
            <Col span="18" v-else>
                <Input search enter-button placeholder="搜索文献" v-model="value" @on-search="searchByKeyWords"
                    style="width: 300px;" />
                <p style="font-size: large; margin-top: 4px;">暂无专利</p>
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
                patentArray: [],
                // 输入框的值
                value: '',
                // 关键词
                keyword: ''
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
            },
            /**
             * 根据关键词搜索专利
             */ 
             searchByKeyWords(data) {
                console.log(data);
                this.keyword = data;
                this.axios.get('https://api.itech4u.cn/api/search/doc/patent', {
                    params: {
                        current: 1,
                        size: 6,
                        keyword: this.keyword
                    }
                })
                .then((response) => {
                    // console.log(response)
                    this.patentArray = response.data.dataBean.data;
                    console.log(this.patentArray)
                })
                .catch((error) => {
                    console.log(error)
                })
            },
        },
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