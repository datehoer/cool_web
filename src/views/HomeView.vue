<template>
    <div class="table-container">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
const visible = ref(false)
@Options({
    components: {
        HelloWorld
    }
})
export default class HomeView extends Vue { }
</script>
<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    /* 防止出现滚动条 */
}

.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}</style>