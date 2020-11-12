<!-- 编辑自己的分类 -->
<template>
    <div style="position: relative;">
        <Tree :data="selectedNodes" :render="renderContent" class="demo-tree-render"></Tree>
        <Button v-if="selectedNodes.length > 0" type="primary" class="button" @click="submitCustomClass">
            编辑完成
        </Button>
    </div>
</template>
<script>
    export default {
        props: {
            selectedNodes: {
                type: Array
            }
        },
        data () {
            return {
                data5: [
                    {
                        title: 'parent 1',
                        expand: true,
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
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
                                            icon: 'ios-add',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '56px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    })
                                ])
                            ]);
                        },
                        children: [
                            {
                                title: 'child 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: 'child 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                }
            }
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
                                    console.log(this.selectedNodes)
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
                this.$emit('')
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
    }
</style>