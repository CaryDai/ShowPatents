<!-- 我的专题库 -->
<template>
	<div>
		<Row type="flex" justify="space-between">
			<Col span="7" v-show="subjectOneName != ''">
				<Card>
					<p slot="title" style="text-align:center">{{subjectOneName}}</p>
					<p>{{subjectOneDescription}}</p>
					<span class="detail" @click="showSubject(subjectOneName)">详情</span>
				</Card>
			</Col>
			<Col span="7" v-show="subjectTwoName != ''">
				<Card>
					<p slot="title" style="text-align:center">{{subjectTwoName}}</p>
					<p>{{subjectTwoDescription}}</p>
				</Card>
			</Col>
			<Col span="7" v-show="subjectThreeName != ''">
				<Card>
					<p slot="title" style="text-align:center">{{subjectThreeName}}</p>
					<p>{{subjectThreeDescription}}</p>
				</Card>
			</Col>
		</Row>
		<Modal v-model="modal" fullscreen footer-hide>
			<p slot="header" style="text-align:center">
                <span>{{subjectName}}</span>
            </p>
			<div>
				<Row>
					<Col span="8">
						<Row>
							<Col span="24">树状图</Col>
						</Row>
						<Row>
							<Col span="24">节点图</Col>
						</Row>
					</Col>
					<Col span="8">
						<PatentCard />
					</Col>
					<Col span="8">
						推荐
					</Col>
				</Row>
			</div>
		</Modal>
	</div>
</template>

<script>
	import PatentCard from '../decorations/patentcard.vue'

	export default {
		data() {
			return {
				modal: false,
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
				subjectFiveDescription: ''
			}
		},
		components: {
			PatentCard
		},
		mounted() {
			this.axios.get('http://localhost:8081/user/getSubjectNameAndDescription')
				.then((response) => {
					console.log(response.data);
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
			showSubject(subjectName) {
				console.log(subjectName)
				this.modal = true;
				this.subjectName = subjectName;
				
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
</style>