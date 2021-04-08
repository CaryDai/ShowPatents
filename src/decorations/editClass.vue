<!-- 第2步，编辑自己的分类 -->
<template>
    <Row>
        <Col span="24">
            <Tree :data="editNodes" :render="renderContent" class="demo-tree-render"></Tree>
            <Button v-if="editNodes.length > 0" type="primary" class="button" @click="submitCustomClass">
                编辑完成
            </Button>
        </Col>
        <!-- <Col span="8">
            <Tree :data="editNodes" :render="renderContent" class="demo-tree-render"></Tree>
            <Button v-if="editNodes.length > 0" type="primary" class="button" @click="submitCustomClass">
                编辑完成
            </Button>
        </Col>
        <Col span="8">
            <Tree :data="editNodes2" :render="renderContent" class="demo-tree-render"></Tree>
            <Button v-if="editNodes2.length > 0" type="primary" class="button" @click="submitCustomClass">
                编辑完成
            </Button>
        </Col>
        <Col span="8">
            <Tree :data="editNodes3" :render="renderContent" class="demo-tree-render"></Tree>
            <Button v-if="editNodes3.length > 0" type="primary" class="button" @click="submitCustomClass">
                编辑完成
            </Button>
        </Col> -->
    </Row>
    <!-- <div style="position: relative;">
        
        
        
    </div> -->
</template>
<script>
    export default {
        data () {
            return {
                editNodes: this.$store.state.editNodes,
                editNodes2: [],
                editNodes3: [],
                buttonProps: {
                    type: 'default',
                    size: 'small',
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
				}
            }
        },
        mounted() {
            this.editNodes2.push(this.newEnergy02)
            this.editNodes3.push(this.newEnergy03)
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('Input', {
                            props: {
                                type: 'text',
                                value: data.title,
                                size: 'small',
                                maxlength: '18'
                            },
                            style: {
                                width: '50%'
                            },
                            on: {
                                'on-blur': (event) => {
                                    // console.log(event.target.value)
                                    data.title = event.target.value
                                    console.log(data.title)
                                    console.log(this.editNodes)
                                }
                            }
                        })
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-remove'
                            }),
                            // style: {
                            //     marginRight: '8px'
                            // },
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                        // h('Input', {
                        //     props: Object.assign({}, {
                        //         placeholder: '请输入专题描述信息'
                        //     })
                        // })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: '自定义分类',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            },
            submitCustomClass () {
                this.$store.commit('submitCustomClass', this.editNodes);
            }
        }
    }
</script>
<style>
    .demo-tree-render .ivu-tree-title{
        width: 100%;
    }

    .button {
        /*绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>*/
        position: absolute;
        bottom: -40px;
        left: 40%;
        /* width: 40%; */
    }
</style>