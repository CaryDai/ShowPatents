<!-- 我的专题库 -->
<template>
	<div>
		<Row type="flex" justify="start" :gutter="16">
			<Col span="8" v-show="subjectOneName != ''">
				<Card style="height: 200px;">
					<p slot="title" style="text-align:center">{{subjectOneName}}</p>
					<p>{{subjectOneDescription}}</p>
					<span class="detail" @click="showSubject(subjectOneName,'01')">详情</span>
				</Card>
			</Col>
			<Col span="8" v-show="subjectTwoName != ''">
				<Card style="height: 200px;">
					<p slot="title" style="text-align:center">{{subjectTwoName}}</p>
					<p>{{subjectTwoDescription}}</p>
					<span class="detail" @click="showSubject(subjectTwoName,'02')">详情</span>
				</Card style="height: 200px;">
			</Col>
			<Col span="8" v-show="subjectThreeName != ''">
				<Card style="max-height: 200px;">
					<p slot="title" style="text-align:center">{{subjectThreeName}}</p>
					<p>{{subjectThreeDescription}}</p>
				</Card>
				<span class="detail" @click="showSubject(subjectThreeName,'03')">详情</span>
			</Col>
		</Row>
		<Modal v-model="modal" fullscreen footer-hide>
			<p slot="header" style="text-align:center">
                <span>{{subjectName}}</span>
            </p>
			<div>
				<Row>
					<Col span="8" style="padding-right: 10px;">
						<Row>
							<Col span="24" style="height: 40vh; overflow: auto;">
								<Tree :data="subjectTree" show-checkbox check-directly @on-check-change="getPatents"></Tree>
							</Col>
						</Row>
						<Row>
							<Col span="24">
								<div id="myChart" style="height: 50vh; margin: 0 auto;"></div>
							</Col>
						</Row>
					</Col>
					<Col span="8" v-if="userPatentsArray.length > 0">
						<div v-for="(patent, index) in userPatentsArray">
							<PatentCard :patent="patent" />
						</div>
					</Col>
					<Col span="8" v-else>
						<p style="font-size: large; margin-top: 4px;">该节点下暂无专利数据</p>
					</Col>
					<Col span="8" class="patent-right">
						<h4 class="h4">为您推荐</h4>
						<div v-if="recommendPatents.length > 0" v-for="(patent,index) in recommendPatents" class="astyle">
							<a href="javascript:void(0);" @click="showPatent(patent)">
								{{index+1}}. {{patent.name}}
							</a>
						</div>
						<div v-else>暂无推荐</div>
					</Col>
				</Row>
			</div>
		</Modal>
		<Modal 
			v-model="modal2" 
			okText="添加到我的专题"
			@on-ok="addToMySubject(recommendPatent)">
            <p slot="header" style="text-align:center">
                {{recommendPatent.name}}
            </p>
            <p><b>发明人</b>：{{recommendPatent.member}}</p>
            <p><b>发明单位</b>：{{recommendPatent.unit}}</p>
            <p><b>公开号：</b>{{recommendPatent.publicationNo}}</p>
            <p><b>公开日期：</b>{{recommendPatent.year}}</p>
            <p><b>所属主题：</b>{{recommendPatent.subject}}</p>
            <p>
                <b>摘要</b>：{{recommendPatent.abstracts}}
            </p>
        </Modal>
	</div>
</template>

<script>
	import PatentCard from '../decorations/patentcard.vue'

	export default {
		data() {
			return {
				modal: false,
				// 显示专利信息
				modal2: false,
				subjectName: '',
				subjectOneName: '',
				subjectOneDescription: '',
				subjectTwoName: '',
				subjectTwoDescription: '',
				subjectThreeName: '',
				subjectThreeDescription: '',
				subjectFourName: '',
				subjectFourDescription: '',
				subjectFiveName: '',
				subjectFiveDescription: '',
				subjectTree: [],
				// 用户的所有专利
				userPatentsArray: [],
				// 存储所有节点
                allNodes: [],
                // 存储所有边
				allLinks: [],
				maxLevel: 0,
				legendNames: [
                    "一级主题",
                    "二级主题",
                    "三级主题",
                    "四级主题",
                    "五级主题"
				],
				// 节点分类的类目，可选
				categories: [],
				// 推荐的专利列表
				recommendPatents: [],
				// 点开的推荐专利
				recommendPatent: '',
				// 专题根节点号
				rootClassCode: ''
			}
		},
		components: {
			PatentCard
		},
		mounted() {
			this.axios.get('http://localhost:8081/user/getSubjectNameAndDescription')
				.then((response) => {
					let res = response.data;
					this.subjectOneName = res.subject1Name;
					this.subjectOneDescription = res.subject1Discription;
					this.subjectTwoName = res.subject2Name;
					this.subjectTwoDescription = res.subject2Discription;
					this.subjectThreeName = res.subject3Name;
					this.subjectThreeDescription = res.subject3Discription;
					this.subjectFourName = res.subject4Name;
					this.subjectFourDescription = res.subject4Discription;
					this.subjectFiveName = res.subject5Name;
					this.subjectFiveDescription = res.subject5Discription;
				})
				.catch((error) => {
					console.log(error)
				})
		},
		methods: {
			/**
			 * 查看专题库详细信息
			 */
			showSubject(subjectName,num) {
				// 1.构建用户节点树且画图
				console.log(subjectName)
				console.log(num)
				this.modal = true;
				// 获取专题名
				this.subjectName = subjectName;
				this.axios.get('http://localhost:8081/user/getUserSubjectTree', {
					params: {
						num: num
					}
				})
				.then((response) => {
					console.log(response.data);
					this.subjectTree = response.data;
					this.rootClassCode = response.data[0].classCode;
					// 赋值前先清空
					this.allNodes.splice(0, this.allNodes.length);
					this.allLinks.splice(0, this.allLinks.length);
					this.handleData(this.subjectTree[0],1);
					for (var i = 0; i < this.maxLevel; i++) {
						this.categories[i] = {
							name: i+1 + '级主题'
						};
					}
					console.log(this.allNodes)
					console.log(this.allLinks)
					this.draw();
				})
				.catch((error) => {
					console.log(error);
				})

				// 2.获取专题库中的专利
				this.axios.get('http://localhost:8081/user/getUserPatents', {
					params: {
						num: num
					}
				})
				.then((response) => {
					// console.log(response.data);
					this.userPatentsArray = response.data;
				})
				.catch((error) => {
					console.log(error)
				})

				// 3.推荐专利
				let keyword = ''
				// console.log(this.subjectTwoDescription);
				// debugger
				switch (num) {
					case '01':
						keyword = this.subjectOneDescription
						break;
					case '02':
						keyword = this.subjectTwoDescription
						break;
					case '03':
						keyword = this.subjectThreeDescription
						break;
					case '04':
						keyword = this.subjectFourDescription
						break;
					case '05':
						keyword = this.subjectFiveDescription
						break;
				
					default:
						break;
				}
				let requestParams = {
					method: 'POST',
                    headers: { 'content-type': 'application/json; charset=UTF-8' },
                    data: JSON.stringify({
						keyword: keyword,
						// keyword: "新能源",
						literatureType: -1,
						type: "patent",
						unitType: -1
					}),
                    url: 'https://www.itech4u.cn/api/h5/recommendSearch'
				}
				this.axios(requestParams)
					.then((res) => {
						// console.log(res)
						this.recommendPatents = res.data.data.list
						console.log(this.recommendPatents);
					})
					.catch((e) => {
                        console.log(e);
                    });
			},
			handleData(root,level) {
				// debugger
				this.maxLevel = (level > this.maxLevel) ? level : this.maxLevel;
				var node = new Object();
				// 添加echarts画图需要的属性
				node.name = root.title;
				node.value = root.title;
				node.draggable = true;
				node.legendName = this.legendNames[level-1];
				node.category = level-1;
				node.symbolSize = 60 - (level-1) * 15;
				// 另外需要添加的属性
				node.classCode = root.classCode;
				node.parentCode = root.parentCode;
				this.allNodes.push(node);

				if (root.children) {
					for (var i in root.children) {
						var link = new Object();
						link.source = root.title;
						link.target = root.children[i].title;
						this.allLinks.push(link);
						this.handleData(root.children[i],level+1);
					}
				}
			},
			/**
			 * 勾选节点查看专利
			 */
			getPatents(arr, obj) {
				console.log(obj);
				let classCode = obj.classCode;
				console.log(classCode);
				let choiceAll = obj;
				if (choiceAll.children) {
					// 当前层不是最下层节点
                    this.axios.get('http://localhost:8081/user/getUserPatentsByClassIdPrefix', {
                        params: {
                            classCode: classCode
                        }
                    })
                    .then((response) => {
                        this.userPatentsArray = response.data;
                        console.log(this.patentArray);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
				} else {
					// 当前层就是最下层节点，直接取专利数据
                    this.axios.get('http://localhost:8081/user/getUserPatentsByClassId', {
                        params: {
                            classCode: classCode
                        }
                    })
                    .then((response) => {
						this.userPatentsArray = response.data;
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
				}
			},
			draw() {
                let echarts = this.$echarts;
                // 基于准备好的dom，初始化echarts实例。每个 echarts 实例独占一个 DOM 节点。
				let myChart = echarts.init(document.getElementById("myChart"));
                // 指定图表的配置项和数据。（option中存储各个组件）
                let option = {
					title: {
						text: this.subjectName + '关系图',
						subtext: 'Default layout',
						top: 'bottom',
						left: 'right'
					},
                    // 提示框组件
					tooltip: {},
					legend: {
                        data: this.categories.map(function (a) {
							return a.name;
						})
					},
					// 全局调色盘。
    				color: ['#588dd5','#f5994e', '#c05050', '#59678c', '#c9ab00','#7eb00a',  '#6f5553', '#c14089','#6e7074', '#546570', '#c4ccd3'],
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
						// 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
                        "focusNodeAdjacency": true,
                        // 力引导布局相关的配置项
                        "force": {
							"repulsion": 300,
							"gravity": 0.05,
                            "edgeLength": 30
                        },
                        "data": this.allNodes,
                        "links": this.allLinks,
                        "categories": this.categories,
                        "name": this.subjectName,
                        "type": "graph",
                        "showSymbol": true
					}]
                };
                // 使用指定的配置项和数据显示图表。
                myChart.setOption(option, true);
			},
			/**
			 * 查看推荐的专利
			 */
			showPatent(patent) {
				this.modal2 = true;
				this.recommendPatent = patent;
			},
			/**
			 * 添加当前专利到我的专题
			 */ 
			addToMySubject(patent) {
				console.log(patent);
				const postData = {
					"rootClassCode": this.rootClassCode,
					"patentName": this.recommendPatent.name,
					"publicationNo": this.recommendPatent.publicationNo
				};
				let requestParams = {
					method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: this.$qs.stringify(postData),
                    url: 'http://localhost:8081/user/addToMySubject'
				}
				this.axios(requestParams)
					.then((res) => {
						console.log(res)
						if (res.data === 'True') {
							this.$Message.success('添加成功!');
						} else {
							this.$Message.error('添加失败!');
						}
					})
					.catch((e) => {
						console.log(e);
						this.$Message.error('添加失败!');
                    });
			}
		},
	}
</script>

<style scoped>
	.detail {
		color: #3b87d2f7;
		cursor:pointer;
		position: absolute;
		bottom: 2px;
		right: 8px;
	}

	.patent-right {
        padding: 45px 30px 25px;
        margin-bottom: 90px;
    }

	.h4 {
        border-left: 3px solid #2bb3ee;
        padding-left: 1.14rem;
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 20px;
    }
</style>