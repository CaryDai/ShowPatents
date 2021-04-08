<!-- 专题库构建 -->
<template>
	<div>
		<Row v-if="currentStep == 0">
			<Col span="7">
				<Tabs type="card">
					<TabPane label="知网学科分类">
						<Scroll height="590">
							<Refcnki />
						</Scroll>
					</TabPane>
					<TabPane label="专利IPC分类">
						<Scroll height="590">
							<Refipc />
						</Scroll>
					</TabPane>
					<TabPane label="中国工程科技网分类">
						<Scroll height="590">
							<Refckcest />
						</Scroll>
					</TabPane>
					<TabPane label="Animer网分类">
						<Scroll height="590">
							<Refanimer />
						</Scroll>
					</TabPane>
					<TabPane label="通学的专题">通学的专题</TabPane>
					<TabPane label="李畅的专题">李畅的专题</TabPane>
					<TabPane label="海江的专题">海江的专题</TabPane>
				</Tabs>
			</Col>
			<Col span="1">
				<Divider type="vertical" size="small" />
			</Col>
			<Col span="16" class="editPage">
				<h1>构建你的专题库</h1>
				<div>
					<p style="font-size: large;">
						您可以在下面输入框中输入您自己专题库的关键词并点击“<span style="color: #2d8cf0;">分析</span>”按钮，<br/>
						我们将为您定位到相关分类并推荐相关文献。
					</p>
					<Input v-model="analyzeText" maxlength="50" show-word-limit type="textarea" placeholder="输入专题库的关键词(如：新能源)" style="width: 550px; margin-top: 30px;" />
					<div style="margin-top: 10px; text-align: center;">
						<Button type="primary" @click="analyze">分析</Button>
					</div>
					<p style="color: #2d8cf0; font-size: large; margin: 20px 0;">或者</p>
					<p style="font-size: large;">
						您也可以直接从左侧分类中点击感兴趣的分类进行编辑。
					</p>
				</div>
				<Step :currentStep="currentStep" />
			</Col>
		</Row>
		<Row v-else-if="currentStep == 1">
			<Col span="24" class="editPage">
				<h1>构建你的专题库</h1>
				<EditClass />
				<Step :currentStep="currentStep" />
			</Col>
		</Row>
		<Row v-else-if="currentStep == 2">
			<Col span="24">
				<h1 style="text-align: center;">构建你的专题库</h1>
				<EditPatent />
				<Step :currentStep="currentStep" />
			</Col>
		</Row>
	</div>
</template>

<script>
	import Refipc from '../decorations/refipc.vue'
	import Refcnki from '../decorations/refcnki.vue'
	import Refckcest from '../decorations/refckcest.vue'
	import Refanimer from '../decorations/refanimer.vue'
	import Step from '../decorations/step.vue'
	import EditClass from '../decorations/editClass.vue'
	import EditPatent from '../decorations/editPatent.vue'

	export default {
		data() {
			return {
				selectedNodes: this.$store.state.selectedNodes,
				editNodes: this.$store.state.editNodes,
				analyzeText: this.$store.state.analyzeText,
				state: this.$store.state.currentStep,
				newEnergy01: {
					"classCode": "C041",
					"parentCode": "C",
					"children": [
						{
							"classCode": "C041_1",
							"parentCode": "C041",
							"title": "太阳能"
						},
						{
							"classCode": "C041_2",
							"parentCode": "C041",
							"title": "风能"
						},
						{
							"classCode": "C041_3",
							"parentCode": "C041",
							"title": "生物质能"
						},
						{
							"classCode": "C041_4",
							"parentCode": "C041",
							"title": "地热能"
						},
						{
							"classCode": "C041_5",
							"parentCode": "C041",
							"title": "海洋能"
						},
						{
							"classCode": "C041_6",
							"parentCode": "C041",
							"title": "化学能"
						},
						{
							"classCode": "C041_7",
							"parentCode": "C041",
							"title": "天然气水合物"
						},
						{
							"classCode": "C041_8",
							"parentCode": "C041",
							"title": "原子能"
						}
					],
					"title": "新能源"
				},
				newEnergy02: {
					"classCode": "ene0",
					"parentCode": "ene",
					"children": [
						{
							"classCode": "ene0_0",
							"parentCode": "ene0",
							"title": "综合能源"
						},
						{
							"classCode": "ene0_1",
							"parentCode": "ene0",
							"title": "煤炭"
						},
						{
							"classCode": "ene0_2",
							"parentCode": "ene0",
							"title": "石油"
						},
						{
							"classCode": "ene0_3",
							"parentCode": "ene0",
							"title": "天然气"
						},
						{
							"classCode": "ene0_4",
							"parentCode": "ene0",
							"title": "水能"
						},
						{
							"classCode": "ene0_5",
							"parentCode": "ene0",
							"title": "风能"
						},
						{
							"classCode": "ene0_6",
							"parentCode": "ene0",
							"title": "太阳能"
						},
						{
							"classCode": "ene0_7",
							"parentCode": "ene0",
							"title": "地热能"
						},
						{
							"classCode": "ene0_8",
							"parentCode": "ene0",
							"title": "海洋能"
						},
						{
							"classCode": "ene0_9",
							"parentCode": "ene0",
							"title": "生物质能"
						},
						{
							"classCode": "ene0_10",
							"parentCode": "ene0",
							"title": "核能"
						}
					],
					"title": "一次能源"
				},
				newEnergy03: {
					"classCode": "ene1",
					"parentCode": "ene",
					"children": [
						{
							"classCode": "ene1_0",
							"parentCode": "ene1",
							"title": "固体燃料"
						},
						{
							"classCode": "ene1_1",
							"parentCode": "ene1",
							"title": "液体燃料"
						},
						{
							"classCode": "ene1_2",
							"parentCode": "ene1",
							"title": "气体燃料"
						},
						{
							"classCode": "ene1_3",
							"parentCode": "ene1",
							"title": "电能热能"
						},
						{
							"classCode": "ene1_4",
							"parentCode": "ene1",
							"title": "化工产品"
						},
						{
							"classCode": "ene1_5",
							"parentCode": "ene1",
							"title": "冶金产品"
						},
						{
							"classCode": "ene1_6",
							"parentCode": "ene1",
							"title": "建筑材料"
						},
						{
							"classCode": "ene1_7",
							"parentCode": "ene1",
							"title": "能源材料"
						}
					],
					"title": "二次能源"
				},
				ai: {
                "classCode": "it7",
                "parentCode": "it",
                "children": [
                    {
                        "classCode": "it7_0",
                        "parentCode": "it7",
                        "title": "人工智能技术"
                    },
                    {
                        "classCode": "it7_1",
                        "parentCode": "it7",
                        "title": "人工智能应用"
                    },
                    {
                        "classCode": "it7_2",
                        "parentCode": "it7",
                        "title": "人工智能理论"
                    },
                    {
                        "classCode": "it7_3",
                        "parentCode": "it7",
                        "title": "强人工智能"
                    },
                    {
                        "classCode": "it7_4",
                        "parentCode": "it7",
                        "title": "弱人工智能"
                    },
                    {
                        "classCode": "it7_5",
                        "parentCode": "it7",
                        "title": "超人工智能"
                    },
                    {
                        "classCode": "it7_6",
                        "parentCode": "it7",
                        "title": "第五代计算机"
                    },
                    {
                        "classCode": "it7_7",
                        "parentCode": "it7",
                        "title": "第六代计算机"
                    },
                    {
                        "classCode": "it7_8",
                        "parentCode": "it7",
                        "title": "机器学习"
                    },
                    {
                        "classCode": "it7_9",
                        "parentCode": "it7",
                        "title": "遗传算法"
                    },
                    {
                        "classCode": "it7_10",
                        "parentCode": "it7",
                        "title": "模式识别"
                    },
                    {
                        "classCode": "it7_11",
                        "parentCode": "it7",
                        "title": "知识获取"
                    },
                    {
                        "classCode": "it7_12",
                        "parentCode": "it7",
                        "title": "未来计算"
                    },
                    {
                        "classCode": "it7_13",
                        "parentCode": "it7",
                        "title": "数字基建"
                    },
                    {
                        "classCode": "it7_14",
                        "parentCode": "it7",
                        "title": "通用人工智能"
                    },
                    {
                        "classCode": "it7_15",
                        "parentCode": "it7",
                        "title": "人工智能+5G"
                    },
                    {
                        "classCode": "it7_16",
                        "parentCode": "it7",
                        "title": "人工智能+物联网"
                    },
                    {
                        "classCode": "it7_17",
                        "parentCode": "it7",
                        "title": "智能数据中心"
                    },
                    {
                        "classCode": "it7_18",
                        "parentCode": "it7",
                        "title": "人工神经网络"
                    },
                    {
                        "classCode": "it7_19",
                        "parentCode": "it7",
                        "title": "人工智能算法"
                    }
                ],
                "title": "人工智能"
            }
			}
		},
		computed: {
			// 将currentStep写在计算属性中，当store.state.currentStep发生变化时，这个getter函数才会重新求值
			currentStep: function() {
				return this.$store.state.currentStep;
			}
		},
		components: {
			Refipc,
			Refcnki,
			Refckcest,
			Refanimer,
			Step,
			EditClass,
			EditPatent
		},
		methods: {
			/**
			 * 对专题库的描述信息进行分析，定位到相关分类
			 */
			analyze() {
				let obj = {};
				obj.recommendClassCode1 = this.newEnergy01;
				obj.recommendClassCode2 = this.newEnergy02;
				obj.recommendClassCode3 = this.newEnergy03;
				obj.text = this.analyzeText;
				this.$store.commit('goAnalyzing',obj)
			}
		},
	}
</script>

<style scoped>
	.ivu-divider,
	.ivu-divider-vertical {
		margin: 0 8px;
		display: inline-block;
		height: 44.9em;
		width: 1px;
		vertical-align: middle;
		position: relative;
		top: -.06em;
	}

	.editPage {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100vh;
		/*需要设置height，不然justify-content不起作用*/
	}
</style>