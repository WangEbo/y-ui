<template>
    <div class="y-tab-bars">
        <ul>
            <li v-for="(item, i) in navs" 
                :key="i" 
                :class="{
                    'nav-item': true,
                    active: item.name === activeName
                }"
                @click="handlerTabClick(item)" 
            >{{item.label}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'YTabNavs',
    props:{
        navs:{
            type: Array,
            require: true
        },
        activeName: {}
    },
    methods:{
        handlerTabClick(tab){
            this.$emit('changeTab', tab)
        }
    }
}
</script>

<style lang="scss">
    .y-tab-bars{
        ul{
            border-bottom: 0;
            font-size: 0;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                z-index: -1;
                background-color: #ccc;
            }
            li{
                display: inline-block;
                font-size: 14px;
                padding: 5px 10px;
                border: 1px solid #ccc;
                color: #1f1f1f;
                border-radius: 6px 6px 0 0;
                cursor: pointer;
                &.active{
                    color: $color;
                    border-color: $bdColor;
                }
            }
            li + li{
                margin-left: 12px;
            }
        }
    }
</style>