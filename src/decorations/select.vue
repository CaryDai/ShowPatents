<!-- 单选框组件 -->
<template>
    <Select v-model="model8" clearable style="width:150px" placeholder="基础科学" @on-change="sendTableName">
        <Option v-for="item in academicList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
    export default {
        data() {
            return {
                academicList: [
                    {
                        value: 'basic_science',
                        label: '基础科学'
                    },
                    {
                        value: 'engin_tech_one',
                        label: '工程科技I'
                    },
                    {
                        value: 'engin_tech_two',
                        label: '工程科技II'
                    },
                    {
                        value: 'information_tech',
                        label: '信息科技'
                    },
                    {
                        value: 'agriculture_tech',
                        label: '农业科技'
                    },
                    {
                        value: 'medicine_health',
                        label: '医药卫生科技'
                    }
                ],
                model8: '',
            }
        },
        methods: {
            // @on-change: 选中的Option变化时触发，默认返回value
            sendTableName(value) {
                console.log(value)
                this.axios.get('http://localhost:8081/classcodes/getClassCodes', {
                    params: {
                        table: value
                    }
                })
                .then((response) => {
                    // console.log(response.data)
                    this.$emit("showClassCodes", response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>