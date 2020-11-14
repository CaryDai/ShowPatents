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
				<p style="color: #2d8cf0; font-size: large;">您可以从左侧分类中选择感兴趣的分类进行编辑</p>
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
	import Step from '../decorations/step.vue'
	import EditClass from '../decorations/editClass.vue'
	import EditPatent from '../decorations/editPatent.vue'

	export default {
		data() {
			return {
				selectedNodes: this.$store.state.selectedNodes,
				editNodes: this.$store.state.editNodes
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