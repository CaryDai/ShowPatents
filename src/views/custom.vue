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
						您可以在下面输入框中输入您自己专题库的描述信息并点击“<span style="color: #2d8cf0;">分析</span>”按钮，<br/>
						我们将为您推荐相关分类。
					</p>
					<Input v-model="analyzeText" maxlength="50" show-word-limit type="textarea" placeholder="输入专题库的描述信息(如：一个关于新能源领域的专题库)" style="width: 550px" />
					<div style="margin-top: 10px; text-align: center;">
						<Button type="primary">分析</Button>
					</div>
					<p style="color: #2d8cf0; font-size: large; margin: 10px 0;">或者</p>
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
				analyzeText: this.$store.state.analyzeText
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
			// selectedClass(obj) {
			// 	this.selectedNodes.push(obj);
			// 	console.log(this.selectedNodes);
			// 	this.currentStep = 1;
			// }
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