<template>
    <div>
        <Tree :data="basic_science" show-checkbox></Tree>
        <Tree :data="engin_tech_one" show-checkbox></Tree>
        <Tree :data="engin_tech_two" show-checkbox></Tree>
        <Tree :data="information_tech" show-checkbox></Tree>
        <Tree :data="agriculture_tech" show-checkbox></Tree>
        <Tree :data="medicine_health" show-checkbox></Tree>
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
        }
    }
</script>
