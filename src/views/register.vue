<!-- 用户注册 -->
<template>
    <div class="sign">
        <div class="main">
            <h4 class="title">
                <div class="normal-title">
                    <router-link to="/login">登陆</router-link>
                    <b>·</b>
                    <router-link to="/register" class="active">注册</router-link>
                </div>
            </h4>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="form">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="你的用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="telephone">
                    <Input type="tel" v-model="formInline.telephone" placeholder="手机号" maxlength="11">
                    <Icon type="ios-call-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="设置密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
            <Button type="primary" @click="handleSubmit('formInline')" style="padding: 0 70px;">注册</Button>
            <!-- <Button type="primary" @click="test" style="padding: 0 70px;">测试</Button> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    telephone: '',
                    password: ''
                },
                // 表单验证规则
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    telephone: [
                        { required: true, message: '请填写手机号', trigger: 'blur' },
                        { type: 'string', min: 11, message: '手机号错误', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请设置密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(this.formInline.user)
                        console.log(this.formInline.telephone)
                        const postData = {
                            "name": this.formInline.user,
                            "telephone": this.formInline.telephone,
                            "password": this.formInline.password
                        };
                        const options = {
                            method: 'post',
                            headers: { 'content-type': 'application/x-www-form-urlencoded' },
                            data: this.$qs.stringify(postData),
                            url: 'http://localhost:8081/user/register'
                        };
                        this.axios(options)
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((e) => {
                                console.log(e)
                            });
                        this.$Message.success('注册成功!');
                        this.$router.push('/graph');
                    } else {
                        this.$Message.error('注册失败!');
                    }
                })
            }
        }
    }
</script>

<style>
    .sign {
        position: relative;
        height: 100%;
        min-height: 650px;
        text-align: center;
        font-size: 14px;
        background-color: #f1f1f1;
    }

    .main {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -200px 0 0 -200px;
        width: 400px;
        padding: 50px 50px 30px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 8px rgba(0, 0, 0, .1);
        vertical-align: middle;
    }

    .title {
        margin: 0 auto 50px;
        padding: 10px;
        font-weight: 400;
        color: #969696;
    }

    .normal-title {
        font-size: large;
    }

    .active {
        font-weight: 700;
        color: #ea6f5a;
        border-bottom: 2px solid #ea6f5a;
    }

    .form {
        margin-top: 50px;
    }
</style>