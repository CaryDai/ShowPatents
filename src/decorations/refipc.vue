<!-- 供参考的ipc分类 -->
<template>
    <div>
        <Tree :data="ipc_a"></Tree>
        <Tree :data="ipc_b"></Tree>
        <Tree :data="ipc_c"></Tree>
        <Tree :data="ipc_d"></Tree>
        <Tree :data="ipc_e"></Tree>
        <Tree :data="ipc_f"></Tree>
        <Tree :data="ipc_g"></Tree>
        <Tree :data="ipc_h"></Tree>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                ipc_a: [],
                ipc_b: [],
                ipc_c: [],
                ipc_d: [],
                ipc_e: [],
                ipc_f: [],
                ipc_g: [],
                ipc_h: []
            }
        },
        created() {
            this.axios.get('static/ipc_a.json').then(res => {
                this.ipc_a.push(res.data[0])
            })
            this.axios.get('static/ipc_b.json').then(res => {
                this.ipc_b.push(res.data[0])
            })
            this.axios.get('static/ipc_c.json').then(res => {
                this.ipc_c.push(res.data[0])
            })
            this.axios.get('static/ipc_d.json').then(res => {
                this.ipc_d.push(res.data[0])
            })
            this.axios.get('static/ipc_e.json').then(res => {
                this.ipc_e.push(res.data[0])
            })
            this.axios.get('static/ipc_f.json').then(res => {
                this.ipc_f.push(res.data[0])
            })
            this.axios.get('static/ipc_g.json').then(res => {
                this.ipc_g.push(res.data[0])
            })
            this.axios.get('static/ipc_h.json').then(res => {
                this.ipc_h.push(res.data[0])
            })
        }
    }
</script>
