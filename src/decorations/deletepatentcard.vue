<!-- 编辑专利的卡片 -->
<template>
    <div class="card">
        <div class="titleAndBtn">
            <h3 style="color: #3b87d2f7; cursor:pointer;" @click="modal = true">
                {{patent.name}}
            </h3>
            <Button v-if="!patentCheckNodesMap.has(patentBriefDO) || patentCheckNodesMap.get(patentBriefDO).length == 0" type="default" shape="circle" style="width: 100px;" @click="addToSubject">
                添加到
            </Button>
            <Button v-if="patentCheckNodesMap.has(patentBriefDO) && patentCheckNodesMap.get(patentBriefDO).length > 0" type="primary" shape="circle" style="width: 100px;" @click="recover">
                已添加
            </Button>
        </div>
        <div>
            <p>
                <b>发明人</b>：{{patent.inventors}}
            </p>
            <p v-if="patent.applicant != null">
                <b>申请人</b>：{{patent.applicant}}
            </p>
            <p v-if="patent.patentAbstract.length > 105">
                <b>摘要</b>：{{patent.patentAbstract.substring(0, 190) + '...'}}
            </p>
            <p v-else class="line-limit-length">
                <b>摘要</b>：{{patent.patentAbstract}}
            </p>
        </div>
        <Modal v-model="modal">
            <p slot="header" style="text-align:center">
                <span v-html="patent.name"></span>
            </p>
            <p><b>发明人</b>：{{patent.inventors}}</p>
            <p><b>申请人</b>：{{patent.applicant}}</p>
            <p><b>申请号：</b>{{patent.applicationNo}}</p>
            <p><b>申请日期：</b>{{patent.applicationDate}}</p>
            <p><b>公开号：</b>{{patent.publicationNo}}</p>
            <p><b>公开日期：</b>{{patent.publicationDate}}</p>
            <p>
                <b>摘要</b>：{{patent.patentAbstract}}
            </p>
        </Modal>
        <Modal v-model="modal2" @on-ok="ok">
            <Tree :data="editNodes" show-checkbox check-directly ref="tree"></Tree>
        </Modal>
    </div>
</template>

<script>
    export default {
        props: [
            'patent',
            'patentCheckNodesMap'
        ],
        data() {
            return {
                editNodes: this.$store.state.editNodes,
                modal: false,
                modal2: false,
                selectedNodes: [],
                patentBriefDO: {}
            }
        },
        methods: {
            /**
             * 添加感兴趣的专利
             */
             addToSubject() {
                this.modal2 = true;
            },
            recover() {
                this.modal2 = true;
            },
            /**
             * 把专利添加到具体的节点下
             */
            ok() {
                // debugger
                // console.log(this.$refs.tree.getCheckedNodes());
                this.selectedNodes = this.$refs.tree.getCheckedNodes();
                if (this.selectedNodes.length > 0) {
                    // 构建后端对象
                    // this.patentBriefDO = new Object();
                    this.patentBriefDO.name = this.patent.name;
                    this.patentBriefDO.inventors = this.patent.inventors;
                    this.patentBriefDO.applicant = this.patent.applicant;
                    this.patentBriefDO.patentAbstract = this.patent.patentAbstract;
                    this.patentBriefDO.publicationNO = this.patent.publicationNO;

                    let nodeDOS = [];
                    this.selectedNodes.forEach(node => {
                        let nodeDO = new Object();
                        nodeDO.classCode = node.classCode;
                        nodeDO.parentCode = node.parentCode;
                        nodeDO.title = node.title;
                        nodeDOS.push(nodeDO);
                    });
                    this.patentCheckNodesMap.set(this.patentBriefDO,nodeDOS);
                } else if (this.selectedNodes.length == 0 && this.patentCheckNodesMap.has(this.patentBriefDO)) {
                    // 什么节点都没勾选，从map中删除
                    this.patentCheckNodesMap.delete(this.patentBriefDO);
                }
                console.log(this.patentCheckNodesMap)
                this.$Message.success('操作完成');
            }
        },
    }
</script>

<style scoped>
    .card {
        min-height: 120px;
        height:auto !important;
        margin-top: 5px;
        border-bottom: 1px solid #eee;
    }

    .line-limit-length {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .titleAndBtn {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>