<!-- 专题库构建 -->
<template>
	<div style="max-height: 100vh;">
		<Row>
			<Col span="8">
			<Tabs type="card">
				<TabPane label="知网学科分类">
					<Scroll height="600">
						<Refcnki />
					</Scroll>
				</TabPane>
				<TabPane label="专利IPC分类">
					<Scroll height="600">
						<Refipc />
					</Scroll>
				</TabPane>
				<TabPane label="通学的专题">通学的专题</TabPane>
				<TabPane label="李畅的专题">李畅的专题</TabPane>
				<TabPane label="海江的专题">海江的专题</TabPane>
			</Tabs>
			</Col>
			<Divider type="vertical" size="small" />
			<Col span="16">
			</Col>
		</Row>
	</div>
</template>

<script>
	import Refipc from '../decorations/refipc.vue'
	import Refcnki from '../decorations/refcnki.vue'

	export default {
		data() {
			return {

			}
		},
		components: {
			Refipc,
			Refcnki
		}
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
</style>