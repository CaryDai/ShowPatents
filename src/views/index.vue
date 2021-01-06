<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .ivu-layout-header {
        background: #fbfbfc;
        padding-left: 15px;
        height: 64px;
        line-height: 64px;
    }

    .menu-item span {
        display: inline-block;
        /* overflow: hidden; */
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .layout-footer-center {
        text-align: center;
    }

    .ivu-layout-footer {
        background: #f5f7f9;
        padding: 5px 15px;
        color: #515a6e;
        font-size: 14px;
    }

    .layout-title {
        float: left;
        position: relative;
        font-size: 32px;
    }

    .menu-item span[data-v-4e4331d8] {
        display: inline-block;
        overflow: visible;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .footer {
        position: fixed;
        bottom: 20px;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem router-link to="/graph" name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span v-if="!isCollapsed">知识地图</span>
                    </MenuItem>
                    <MenuItem router-link to="/knowledgebase" name="1-2">
                        <Icon type="ios-paper"></Icon>
                        <span v-if="!isCollapsed">知识库</span>
                    </MenuItem>
                    <MenuItem router-link to="/custom" name="1-3">
                        <Icon type="ios-analytics"></Icon>
                        <span v-if="!isCollapsed">专题库构建</span>
                    </MenuItem>
                    <MenuItem router-link to="/mysubjects" name="1-4">
                        <Icon type="ios-keypad"></Icon>
                        <span v-if="!isCollapsed">我的专题库</span>
                    </MenuItem>
                </Menu>
                <!-- <div slot="trigger"></div> -->
                <div class="footer">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24" color="#ccc"></Icon>
                </div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                    <div class="layout-title">知识导航平台</div>
                    <div style="float: right;">
                        <Dropdown @on-click="routerToMySubject">
                            <a href="javascript:void(0)">
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="mysubject">我的专题库</DropdownItem>
                                <DropdownItem>退出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div style="float: right; vertical-align: middle;">
                        <Avatar style="background-color: rgb(104, 148, 208)" icon="ios-person" size="large" />
                    </div>
                </Header>
                <Content :style="{margin: '10px', background: '#fff'}">
                    <Card>
                        <div style="min-height: 520px;">
                            <router-view />
                        </div>
                    </Card>
                </Content>
                <Footer class="layout-footer-center ivu-layout-footer">2017-2020 &copy; 佐创智推</Footer>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isCollapsed: false
            };
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            routerToMySubject(itemName) {
                console.log(itemName);
                this.$router.push('/mysubjects');
            }
        }
    }
</script>