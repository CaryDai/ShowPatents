<template>
    <div>
        <Tree :data="basic_science" show-checkbox ref="TreeOne" @on-check-change="getPatents"></Tree>
        <Tree :data="engin_tech_one" show-checkbox></Tree>
        <Tree :data="engin_tech_two" show-checkbox></Tree>
        <Tree :data="information_tech" show-checkbox></Tree>
        <Tree :data="agriculture_tech" show-checkbox></Tree>
        <Tree :data="medicine_health" show-checkbox></Tree>
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
            getPatents() {
                let choiceAll = this.$refs.TreeOne.getCheckedNodes()[0];
                console.log(choiceAll);
                let classCode = choiceAll.classCode
                if (choiceAll.children) {

                } else {
                    // 当前层就是最下层节点，直接取专利数据
                    this.axios.get('http://localhost:8081/classcodes/getPatentsByClassId', {
                        params: {
                            classId: classCode
                        }
                    })
                        .then((response) => {
                            console.log(response.data)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            }
        }
    }
</script>