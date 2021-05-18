<template>
    <div class="y-tab-bars">
        <ul>
            <li v-for="(item, i) in nvas" :key="i" @click="handlerTabClick(item)" >{{item.label}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        navs:{
            type: Array,
            require: true
        }
    },
    methods:{
        handlerTabClick(tab){
            this.$emit('changeTab', tab)
        }
    }
}
</script>

<style>

</style>