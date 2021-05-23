<template>
    <div>
        <Row>
            <Col span="24">
                <Row>
                    <Col span="24">
                        <h2 style="color: rgb(100, 143, 237);">平台构建的专题库</h2>
                        <Row type="flex" justify="space-between" style="margin-top: 30px;">
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;" @click="gotoSubject()">海洋学</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">材料</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">化工</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">物理学</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">地质学</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between" style="margin-top: 30px;">
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">力学</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">农业</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">航天</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">能源</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">林业</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between" style="margin-top: 30px;">
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">水利</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">中医</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">环境工程</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">地震</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">机械制造</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between" style="margin-top: 30px;">
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">医药卫生</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">武器工业</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">铁路</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">汽车</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">船舶</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start" style="margin-top: 30px;" :gutter="86">
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">建筑学</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">电力工业</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">营养健康</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr style="margin: 20px 0; border:0; background-color:rgb(207, 205, 48); height:3px;" />
                <Row>
                    <Col span="24">
                        <h2 style="color: rgb(100, 143, 237);">其他用户构建的专题库</h2>
                        <Row type="flex" justify="start" style="margin-top: 30px;" :gutter="86">
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">admin的专题库1</Button>
                                </div>
                            </Col>
                            <Col span="4.8">
                                <div style="width: 150px; margin: 0 auto;">
                                    <Button style="width: 150px; border-color: black;">admin的专题库2</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            gotoSubject() {
                this.$router.push('/subjectone')
            }
        },
    }
</script>

<style>
    .bgImg {
        background-image: url("../images/bg.jpg");
        height: 100%;
        background-size: 100% 100%;
    }
</style>