<!-- 用户登陆 -->
<template>
    <div class="login">
        <div class="main">
            <h4 class="title">
                <div class="normal-title">
                    <router-link to="/login" class="active">登陆</router-link>
                    <b>·</b>
                    <router-link to="/register">注册</router-link>
                </div>
            </h4>
            <Form ref="formInline" :model="formInline" inline class="form">
                <FormItem prop="user">
                    <Input type="tel" v-model="formInline.telephone" placeholder="手机号">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
            <Button type="primary" @click="login" class="btn" style="padding: 0 70px;">登陆</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {
                    telephone: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                const data = {
                    "telephone": this.formInline.telephone,
                    "password": this.formInline.password
                };
                this.$store.commit('login', data);
            }
        }
    }
</script>

<style scoped>
    .login {
        position: relative;
        height: 100%;
        min-height: 650px;
        text-align: center;
        font-size: 14px;
        background-color: #f1f1f1;
    }
</style>