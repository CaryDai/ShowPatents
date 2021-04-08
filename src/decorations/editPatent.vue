<!-- 3.增删专利 -->
<template>
    <div style="min-height: 520px;">
        <Row>
            <Col span="6">
                <Tree :data="editNodes" @on-select-change="searchPatents" />
            </Col>
            <Col span="18">
                <Row>
                    <Col span="12">
                        <Input search enter-button placeholder="搜索文献进行添加" v-model="value" @on-search="searchByKeyWords"
                            style="width: 300px;" />
                    </Col>
                    <Col span="12">
                        <Button type="default"  shape="circle" style="width: 100px; float: right;" @click="gotoConstruct">
                            一键添加
                        </Button>
                    </Col>
                </Row>
                <div v-if="!searching">
                    <div v-if="patentArray.length > 0">
                        <div v-for="(patent, index) in patentArray">
                            <DeletePatentCard :patent="patent" :patentCheckNodesMap="patentCheckNodesMap" />
                        </div>
                        <div style="margin-top: 75px;">
                            <Page :total="100" show-total class="page" @on-change="handlePageChange" />
                        </div>
                    </div>
                    <div v-else style="margin-top: 40px;">
                        <p style="font-size: large;">
                            当前所有分类下还没有专利数据，您可以通过上方搜索框输入关键词搜索专利进行添加。
                        </p>
                    </div>
                </div>
                <div v-else>
                    <div v-if="searchResults.length > 0">
                        <div v-for="(patent, index) in searchResults">
                            <SearchPatentCard :patent="patent" :patentCheckNodesMap="patentCheckNodesMap" />
                        </div>
                        <div style="margin-top: 75px;">
                            <Page :total="100" show-total class="page" @on-change="handlePageChange" />
                        </div>
                    </div>
                    <div v-else style="margin-top: 40px;">
                        <p style="font-size: large;">
                            当前关键词没有相关文献，请换个关键词试试。
                        </p>
                    </div>
                </div>
                <Button v-show="patentArray.length > 0 || searchResults.length > 0" type="primary" class="btn" @click="updateUserPatents">
                    添加完毕
                </Button>
            </Col>
            <Modal
                v-model="modal"
                title="命名专题库"
                @on-ok="finish">
                <Input v-model="subjectName" clearable placeholder="请输入专题库名称" />
            </Modal>
        </Row>
    </div>
</template>

<script>
    import DeletePatentCard from './deletepatentcard.vue'
    import SearchPatentCard from './searchpatentcard.vue'

    export default {
        data() {
            return {
                editNodes: this.$store.state.editNodes,
                // 搜数据库得到的专利列表
                patentArray: [],
                // 输入框的值
                value: '',
                // 当前是否在搜索
                searching: false,
                // 关键词
                keyword: '',
                // 当前的搜索页
                currentPage: '',
                // 搜索得到的专利列表
                searchResults: [],
                // 专利和待添加节点的映射
                patentCheckNodesMap: new Map(),
                // 用来控制是否显示对话框
                modal: false,
                // 专题库名称
                subjectName: '',
                // 用户关于专题库的描述信息
                analyzeText: this.$store.state.analyzeText
                // analyzeText: '第一个专题库'
            }
        },
        components: {
            DeletePatentCard,
            SearchPatentCard
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
            /**
             * 页码变化时的搜索
             */ 
            handlePageChange(data) {
                if (!this.searching) {
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
                } else {
                    // 搜索框的搜索
                    this.axios.get('https://api.itech4u.cn/api/search/doc/patent', {
                        params: {
                            current: data,
                            size: 6,
                            keyword: this.keyword
                        }
                    })
                    .then((response) => {
                        // console.log(response)
                        this.searchResults = response.data.dataBean.data;
                        console.log(this.searchResults)
                        this.searching = true;
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
                this.searching = true;
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
                    this.searchResults = response.data.dataBean.data;
                    console.log(this.searchResults)
                    this.searching = true;
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            /**
             * 根据点击的节点搜索专利
             */ 
            searchPatents(TreeNode) {
                this.searching = false;
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
            },
            /**
             * 用户向节点中添加完专利后，更新user_patents数据表
             */
            updateUserPatents() {
                console.log(this.patentCheckNodesMap);
                const map = this.patentCheckNodesMap;
                let list = [];
                for (let [patentBriefDO,nodeDOS] of map) {
                    list.push({patentBriefDO,nodeDOS})
                }
                // 发送请求...
                // debugger
                const options = {
                    method: 'post',
                    headers: { 'content-type': 'application/json' },
                    data: JSON.stringify(list),
                    url: 'http://localhost:8081/user/updateUserPatents'
                };
                this.axios(options)
                    .then((res) => {
                        console.log(res);
                        if (res.data == "True") {
                            this.$Message.success('ok!');
                        } else {
                            this.$Message.error('false!');
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Message.error('false!');
                    });
                this.modal = true;
            },
            /**
             * 构建最后一步
             */
            finish() {
                this.$Message.success('构建完成！');
                let requestData = {
                    "subjectName": this.subjectName,
                    "subjectDescription": this.analyzeText
                }
                const options = {
                    method: 'post',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: this.$qs.stringify(requestData),
                    url: 'http://localhost:8081/user/writeSubjectNameAndDescription'
                };
                this.axios(options)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                this.$router.push('/mysubjects');
            }
        },
    }
</script>

<style scoped>
    .page {
        position: absolute;
        left: 50%;
        bottom: 60px;
        transform: translateX(-50%);
    }

    /*button居中写法*/
    .btn {
        display: block;
        margin: 10px auto;
    }
</style>