<!-- 供参考的知网学科分类 -->
<!-- 第1步，选择自己感兴趣的分类 -->
<template>
    <div>
        <Tree :data="basic_science" @on-select-change="selectClass"></Tree>
        <Tree :data="engin_tech_one"></Tree>
        <Tree :data="engin_tech_two"></Tree>
        <Tree :data="information_tech"></Tree>
        <Tree :data="agriculture_tech"></Tree>
        <Tree :data="medicine_health"></Tree>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                basic_science: [],
                engin_tech_one: [],
                engin_tech_two: [],
                information_tech: [],
                agriculture_tech: [],
                medicine_health: []
            }
        },
        created() {
            this.axios.get('static/basic_science.json').then(res => {
                this.basic_science.push(res.data[0])
            })
            this.axios.get('static/engin_tech_one.json').then(res => {
                this.engin_tech_one.push(res.data[0])
            })
            this.axios.get('static/engin_tech_two.json').then(res => {
                this.engin_tech_two.push(res.data[0])
            })
            this.axios.get('static/information_tech.json').then(res => {
                this.information_tech.push(res.data[0])
            })
            this.axios.get('static/agriculture_tech.json').then(res => {
                this.agriculture_tech.push(res.data[0])
            })
            this.axios.get('static/medicine_health.json').then(res => {
                this.medicine_health.push(res.data[0])
            })
        },
        methods: {
            selectClass(arr, obj) {
                // console.log(obj);
                // this.$emit('selectedClass', obj);
                // 调用store中的selectClass方法
                this.$store.commit('selectClass', obj);
            }
        },
    }
</script>
