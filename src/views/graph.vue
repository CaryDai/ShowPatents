<!-- 知识地图 -->
<template>
    <div>
        <Row>
            <Col span="24">
                <!-- 选择器，showClassCodes事件触发，调用getClassCodes方法 -->
                <Select v-on:showClassCodes="getClassCodes($event)" />
            </Col>
        </Row>
        <Row>
            <!-- <Col span="3">
                <Select />
            </Col> -->
            <Col span="24">
                <!-- 阻止鼠标右击事件 -->
                <div id="myChart" :style="{height: '100vh', margin: '0 auto'}" @contextmenu.prevent></div>
            </Col>
        </Row>
        <Modal
            v-model="showModal"
            @on-ok="ok"
            @on-cancel="cancel">
            <p slot="header" style="text-align:center">
                <span>{{nodeName}}下专利信息（10条）</span>
            </p>
            <p v-if="patentArray.length == 0">暂无专利数据</p>
            <div v-for="(patent, index) in patentArray">
                <a href="javascript:void(0);" @click="gotoPatentDetail(patent)">{{index+1}}. {{patent.name}}</a>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Select from '../decorations/select.vue'

    export default {
        components: {
            Select
        },
        name: "knowledgegraph",
        data() {
            return {
                // 存从服务端拿到的列表
                codesList: [],
                legendNames: [
                    "一级主题",
                    "二级主题",
                    "三级主题",
                    "四级主题",
                    "五级主题"
                ],
                // 节点分类的类目，可选
                categories: [
                    {"name": "一级主题"},
                    {"name": "二级主题"},
                    {"name": "三级主题"},
                    {"name": "四级主题"},
                    {"name": "五级主题"}
                ],
                // 存储所有节点
                allNodes: [],
                // 存储所有边
                allLinks: [],
                // 右击的节点名
                nodeName: "",
                // 右击事件后得到的专利数组
                patentArray: [],
                // 是否显示对话框
                showModal: false
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let echarts = this.$echarts;
                // 基于准备好的dom，初始化echarts实例。每个 echarts 实例独占一个 DOM 节点。
                this.myChart = echarts.init(document.getElementById("myChart"));
            },
            // 查看专利详情
            gotoPatentDetail(patent) {
                this.$store.commit('gotoPatentDetail', patent);
            },
            getClassCodes(classCodes) {
                this.codesList = classCodes
                // console.log(this.codesList)
                // 赋值前先清空
                this.allNodes.splice(0, this.allNodes.length);
                this.allLinks.splice(0, this.allLinks.length);
                this.handleData(this.codesList)
                console.log(this.allNodes)
                console.log(this.allLinks)
                this.draw();
            },
            handleData(codesList) {
                for (var i = 0; i < codesList.length; i++) {
                    var node = new Object();
                    // 添加echarts画图需要的属性
                    node.name = codesList[i].className;
                    node.value = codesList[i].className;
                    node.draggable = true;
                    node.nodeType = 1;
                    var level = codesList[i].itemLevel;
                    node.legendName = this.legendNames[level-1];
                    node.category = (level == 1 ? 0 : -(level-1));
                    node.symbolSize = 80 - (level-1) * 15;
                    // 另外需要添加的属性
                    node.classCode = codesList[i].classCode;
                    node.parentCode = codesList[i].parentCode;
                    this.allNodes.push(node)

                    // 当前节点的parent_code
                    var parent_code = node.parentCode
                    // 根节点不需要有边
                    if (parent_code == "") {
                        continue;
                    }
                    var source = ""
                    // 遍历每个节点
                    for (var each in this.allNodes) {
                        // 如果有一个节点的classCode是当前节点的parent_code，说明那个节点就是当前节点的父节点
                        if (this.allNodes[each].classCode == parent_code) {
                            source = this.allNodes[each].name;
                            break;
                        }
                    }
                    var link = new Object();
                    link.source = source;
                    link.target = node.name;
                    this.allLinks.push(link);
                }
            },
            draw() {
                let myChart = this.myChart;
                let that = this;
                // 指定图表的配置项和数据。（option中存储各个组件）
                let option = {
                    // 提示框组件
                    tooltip: {
                        show: true,
                        formatter: '{b}<br />- 左键展开或收起节点<br />- 右键查看专利信息'
                    },
                    // 系列（series）是指：一组数值以及他们映射成的图。
                    // echarts 里系列类型（series.type）就是图表类型。系列类型（series.type）至少有：line（折线图）、bar（柱状图）、pie（饼图）、scatter（散点图）、graph（关系图）、tree（树图）
                    series: [{
                        "itemStyle": {
                            // 默认的样式
                            "normal": {
                                "label": {
                                    "show": true
                                },
                                "borderType": "solid",
                                "borderWidth": 2,
                                "opacity": 1
                            }
                        },
                        "lineStyle": {
                            "normal": {
                                "color": "rgba(128,128,128,0.5)",
                                "width": "2",
                                "opacity": 1
                            }
                        },
                        "layout": "force",  // 图的布局
                        "roam": true,   // 开启鼠标缩放和平移漫游
                        // 边两端的标记大小
                        "edgeSymbolSize": [
                            8,
                            10
                        ],
                        "focusNodeAdjacency": false,    // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
                        // 力引导布局相关的配置项
                        "force": {
                            "repulsion": 300,
                            "edgeLength": 60
                        },
                        // 节点间的关系数据
                        "links": this.allLinks,
                        "categories": this.categories,
                        "name": "知识地图",
                        "type": "graph",
                        "showSymbol": true,
                        "yAxisIndex": 0,
                        "z": 2,     // 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
                        // 关系图的节点数据列表
                        "data": this.allNodes
                    }],
                    "legend": {
                        "data": [
                            "一级主题",
                            "二级主题",
                            "三级主题",
                            "四级主题",
                            "五级主题"
                        ]
                    }
                };
                // 使用指定的配置项和数据显示图表。
                myChart.setOption(option, true);
                this.bindChartClickEvent(myChart);
            },
            /**
             * 绑定图表的点击事件
             */
            bindChartClickEvent(chart) {
                let that = this;
                // 鼠标点击事件
                chart.on('click', function (params) {
                    var category = params.data.category,
                        nodeType = params.data.nodeType;
                    if (category === 0 || nodeType === 1) {
                        that.toggleShowNodes(chart, params);
                    }
                });

                // 鼠标右击事件，显示专利信息
                chart.on('contextmenu', function (params) {
                    console.log(params);
                    that.nodeName = params.name;
                    that.showModal = true;
                    let classCode = params.data.classCode;
                    that.axios.get('http://localhost:8081/classcodes/getPatentsByClassIdPrefix', {
                        params: {
                            classId: classCode,
                            pageNo: 1,
                            queryNum: 10
                        }
                    })
                    .then((response) => {
                        that.patentArray = response.data;
                        console.log(that.patentArray);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                });
            },
            /**
             * 展开或关闭节点
             */
            toggleShowNodes(chart, params) {
                var open = !!params.data.open,
                    options = chart.getOption(),
                    seriesIndex = params.seriesIndex,
                    srcLinkName = params.name,
                    serieLinks = options.series[seriesIndex].links,
                    serieData = options.series[seriesIndex].data,
                    serieDataMap = new Map(),
                    serieLinkArr = [];
                // 当前根节点是展开的，那么就需要关闭所有的根节点  
                if (open) {
                    // 递归找到所有的link节点的target的值  
                    this.findLinks(serieLinkArr, srcLinkName, serieLinks, true);
                    if (serieLinkArr.length) {
                        serieData.forEach(sd => serieDataMap.set(sd.name, sd));
                        for (var i = 0; i < serieLinkArr.length; i++) {
                            if (serieDataMap.has(serieLinkArr[i])) {
                                var currentData = serieDataMap.get(serieLinkArr[i]);
                                currentData.category = -Math.abs(currentData.category);
                                if (currentData.nodeType === 1) {
                                    currentData.open = false;
                                }
                            }
                        }
                        serieDataMap.get(srcLinkName).open = false;
                        chart.setOption(options);
                    }
                } else {
                    // 当前根节点是关闭的，那么就需要展开第一层根节点
                    this.findLinks(serieLinkArr, srcLinkName, serieLinks, false);
                    if (serieLinkArr.length) {
                        serieData.forEach(sd => serieDataMap.set(sd.name, sd));
                        for (var j = 0; j < serieLinkArr.length; j++) {
                            if (serieDataMap.has(serieLinkArr[j])) {
                                var currentData = serieDataMap.get(serieLinkArr[j]);
                                currentData.category = Math.abs(currentData.category);
                            }
                        }
                        serieDataMap.get(srcLinkName).open = true;
                        chart.setOption(options);
                    }
                }
            },
            findLinks(links, srcLinkName, serieLinks, deep) {
                var targetLinks = [];
                serieLinks.filter(link => link.source === srcLinkName).forEach(link => {
                    targetLinks.push(link.target);
                    links.push(link.target)
                });
                if (deep) {
                    for (var i = 0; i < targetLinks.length; i++) {
                        this.findLinks(links, targetLinks[i], serieLinks, deep);
                    }
                }
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }
    }
</script>

<style scoped>
    a:hover {
        color:#000000;
    }
</style>