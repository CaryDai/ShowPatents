<!-- 供参考的知网学科分类 -->
<!-- 第1步，选择自己感兴趣的分类 -->
<template>
    <div>
        <Tree :data="energy" @on-select-change="selectClass"></Tree>
        <Tree :data="it" @on-select-change="selectClass"></Tree>
        <Tree :data="material" @on-select-change="selectClass"></Tree>
        <Tree :data="medical" @on-select-change="selectClass"></Tree>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                energy: [],
                it: [],
                material: [],
                medical: []
            }
        },
        created() {
            this.axios.get('static/ckcest/energy.json').then(res => {
                this.energy.push(res.data[0])
            })
            this.axios.get('static/ckcest/it.json').then(res => {
                this.it.push(res.data[0])
            })
            this.axios.get('static/ckcest/material.json').then(res => {
                this.material.push(res.data[0])
            })
            this.axios.get('static/ckcest/medical.json').then(res => {
                this.medical.push(res.data[0])
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