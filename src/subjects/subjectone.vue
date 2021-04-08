<template>
    <div>
        <Row>
            <Col span="6">
                <Tree :data="nodes" />
            </Col>
            <Col span="18">
                <Row>
                    <Col span="12">
                        <Input search enter-button placeholder="请输入关键词..." v-model="value" @on-search="searchByKeyWords"
                            style="width: 300px;" />
                    </Col>
                    <Col span="12">
                        <Button type="success" style="width: 150px; float: right;" @click="gotoConstruct">
                            开始构建专题库
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div v-for="(patent, index) in patentArray">
                            <PatentCard :patent="patent" />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <div style="margin-top: 45px;">
            <Page v-if="patentArray.length > 0" :total="100" show-total class="page" @on-change="handlePageChange" />
        </div>
    </div>
</template>

<script>
    import PatentCard from '../decorations/patentcard.vue'

    export default {
        components: {
            PatentCard
        },
        data() {
            return {
                nodes: [],
                patentArray: [],
                oceanography: {
                    "classCode": "A010",
                    "parentCode": "A",
                    "children": [
                    {
                        "classCode": "A010_2",
                        "parentCode": "A010",
                        "title": "海洋调查技术方法与设备"
                    },
                    {
                        "classCode": "A010_3",
                        "parentCode": "A010",
                        "title": "区域海洋学"
                    },
                    {
                        "classCode": "A010_4",
                        "parentCode": "A010",
                        "title": "海洋气象学"
                    },
                    {
                        "classCode": "A010_5",
                        "parentCode": "A010",
                        "title": "海洋水文学"
                    },
                    {
                        "classCode": "A010_6",
                        "parentCode": "A010",
                        "title": "海洋物理学"
                    },
                    {
                        "classCode": "A010_7",
                        "parentCode": "A010",
                        "title": "海洋化学"
                    },
                    {
                        "classCode": "A010_8",
                        "parentCode": "A010",
                        "title": "海洋生物学"
                    },
                    {
                        "classCode": "A010_9",
                        "parentCode": "A010",
                        "title": "海洋地球物理学"
                    },
                    {
                        "classCode": "A010_A",
                        "parentCode": "A010",
                        "title": "海洋地质学、海洋地貌学"
                    },
                    {
                        "classCode": "A010_B",
                        "parentCode": "A010",
                        "title": "海洋资源与开发"
                    },
                    {
                        "classCode": "A010_C",
                        "parentCode": "A010",
                        "children": [
                        {
                            "classCode": "A010_C0",
                            "parentCode": "A010_C",
                            "title": "海洋机器人"
                        },
                        {
                            "classCode": "A010_C1",
                            "parentCode": "A010_C",
                            "title": "潜水装置"
                        },
                        {
                            "classCode": "A010_C2",
                            "parentCode": "A010_C",
                            "title": "水下观测设备"
                        },
                        {
                            "classCode": "A010_C3",
                            "parentCode": "A010_C",
                            "title": "其它"
                        }
                        ],
                        "title": "海洋工程"
                    },
                    {
                        "classCode": "A010_D",
                        "parentCode": "A010",
                        "title": "海洋环境及海洋保护学"
                    },
                    {
                        "classCode": "A010_E",
                        "parentCode": "A010",
                        "title": "海洋灾害"
                    }
                    ],
                    "title": "海洋学"
                }
            }
        },
        mounted() {
            this.nodes.push(this.oceanography);
            let classCode = this.nodes[0].classCode;
            if (this.nodes[0].children) {
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
            gotoConstruct() {
                console.log(111);
                this.$router.push({
                    path: '/custom'
                });
                this.$store.commit('selectClass', this.oceanography);
            },
            handlePageChange(data) {
                console.log(data);
                let classCode = this.nodes[0].classCode;
                if (this.nodes[0].children) {
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