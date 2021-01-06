<template>
    <div>
        <Tree :data="basic_science" show-checkbox check-directly ref="TreeOne" @on-check-change="getPatents"></Tree>
        <Tree :data="engin_tech_one" show-checkbox check-directly ref="TreeTwo" @on-check-change="getPatents"></Tree>
        <Tree :data="engin_tech_two" show-checkbox check-directly ref="TreeThree" @on-check-change="getPatents"></Tree>
        <Tree :data="information_tech" show-checkbox check-directly ref="TreeFour" @on-check-change="getPatents"></Tree>
        <Tree :data="agriculture_tech" show-checkbox check-directly ref="TreeFive" @on-check-change="getPatents"></Tree>
        <Tree :data="medicine_health" show-checkbox check-directly ref="TreeSix" @on-check-change="getPatents"></Tree>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                basic_science: [],
                engin_tech_one: [],
                engin_tech_two: [],
                information_tech: [],
                agriculture_tech: [],
                medicine_health: [],
                selected: false
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
            getPatents(arr, obj) {
                // arr.forEach(item => {
                //     item.checked = false;
                // });
                // obj.checked = true;

                console.log(obj);
                let choiceAll = obj;
                let classCode = obj.classCode;
                // 将选中的节点传给父组件
                this.$emit('getCheckedNode', choiceAll);
                if (choiceAll.children) {
                    // 请求不同的接口
                    this.axios.get('http://localhost:8081/classcodes/getPatentsByClassIdPrefix', {
                        params: {
                            classId: classCode,
                            pageNo: 1,
                            queryNum: 10
                        }
                    })
                    .then((response) => {
                        // console.log(response.data);
                        this.$emit('showPatents', response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                } else {
                    // 当前层就是最下层节点，直接取专利数据
                    this.axios.get('http://localhost:8081/classcodes/getPatentsByClassId', {
                        params: {
                            classId: classCode,
                            pageNo: 1,
                            queryNum: 10
                        }
                    })
                    .then((response) => {
                        console.log(response.data);
                        this.$emit('showPatents', response.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            }
        }
    }
</script>