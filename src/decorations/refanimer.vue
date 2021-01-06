<!-- 供参考的知网学科分类 -->
<!-- 第1步，选择自己感兴趣的分类 -->
<template>
    <div>
        <Tree :data="de" @on-select-change="selectClass"></Tree>
        <Tree :data="dm" @on-select-change="selectClass"></Tree>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                de: [],
                dm: []
            }
        },
        created() {
            this.axios.get('static/Aminer/data_engineering.json').then(res => {
                this.de.push(res.data[0])
            })
            this.axios.get('static/Aminer/data_mining.json').then(res => {
                this.dm.push(res.data[0])
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