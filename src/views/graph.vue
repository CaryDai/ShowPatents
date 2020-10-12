<!-- 知识地图 -->
<template>
    <div>
        <Row>
            <Col span="24">
            <Select v-on:showClassCodes="getClassCodes($event)" />
            </Col>
        </Row>
        <Row>
            <!-- <Col span="3">
                <Select />
            </Col> -->
            <Col span="24">
                <div id="myChart" :style="{height: '100vh', margin: '0 auto'}"></div>
            </Col>
        </Row>
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
                allLinks: []
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
                    // echarts画图需要的属性
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
                // 指定图表的配置项和数据。（option中存储各个组件）
                let option = {
                    // 提示框组件
                    tooltip: {
                        show: false
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
                                "color": "rgba(182,0,255,0.5)",
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
                        // "links": [
                        //     {
                        //         "source": "基础科学",
                        //         "target": "自然科学理论与方法"
                        //     },
                        //     {
                        //         "source": "自然科学理论与方法",
                        //         "target": "自然科学研究的方针政策"
                        //     }
                        // ],
                        "categories": this.categories,
                        "name": "知识地图",
                        "type": "graph",
                        "showSymbol": true,
                        "yAxisIndex": 0,
                        "z": 2,     // 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
                        // 关系图的节点数据列表
                        "data": this.allNodes,
                        // "data": [
                        //     {
                        //         "name": "基础科学",
                        //         "symbolSize": 60,
                        //         "value": "基础科学",
                        //         "category": 0,
                        //         "draggable": true,      // 节点是否可拖拽，只在使用力引导布局的时候有用。
                        //         "legendName": "一级主题",
                        //         "nodeType": 1
                        //     },
                        //     {
                        //         "name": "自然科学理论与方法",
                        //         "symbolSize": 40,
                        //         "value": "自然科学理论与方法",
                        //         "category": -1,
                        //         "draggable": true,
                        //         "legendName": "二级主题",
                        //         "nodeType": 1
                        //     },
                        //     {
                        //         "name": "自然科学研究的方针政策",
                        //         "symbolSize": 20,
                        //         "value": "自然科学研究的方针政策",
                        //         "category": -2,
                        //         "draggable": true,
                        //         "legendName": "三级主题",
                        //         "nodeType": 1
                        //     }
                        // ]
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
                bindChartClickEvent(myChart);

                /**
                 * 绑定图表的点击事件
                 * @param chart
                 */
                function bindChartClickEvent(chart) {
                    chart.on('click', function (params) {
                        var category = params.data.category,
                            nodeType = params.data.nodeType;
                        if (category === 0 || nodeType === 1) {
                            toggleShowNodes(chart, params);
                        }
                    });
                }

                // 展开或关闭节点
                function toggleShowNodes(chart, params) {
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
                        findLinks(serieLinkArr, srcLinkName, serieLinks, true);
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
                        findLinks(serieLinkArr, srcLinkName, serieLinks, false);
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
                }

                function findLinks(links, srcLinkName, serieLinks, deep) {
                    var targetLinks = [];
                    serieLinks.filter(link => link.source === srcLinkName).forEach(link => {
                        targetLinks.push(link.target);
                        links.push(link.target)
                    });
                    if (deep) {
                        for (var i = 0; i < targetLinks.length; i++) {
                            findLinks(links, targetLinks[i], serieLinks, deep);
                        }
                    }
                }
            }
        }
    }
</script>

<style>

</style>