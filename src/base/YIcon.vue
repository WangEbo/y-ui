<template>
    <span v-if="icon" :class="['y-icon', 'icon', 'iconfont', 'icon-'+icon]"></span>
</template>

<script>
export default {
    props:{
        icon:{
            type: String
        }
    }
}
</script>

<style>
    .y-icon{
        display: inline-block;
    }
</style>