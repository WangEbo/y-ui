<template>
    <transition name="y-fade">
        <div class="y-loading" v-show="visible">
            <div class="y-loding-wrap">
                <ul v-if="type == 'normal'">
                    <li v-for="i in 6" :key="i" :style="{'--line-index': i}"></li>
                </ul>
                <ul v-else-if="type == 'heart'" class="heart-ul">
                    <li v-for="i in 9" :class="'li' + i" :key="i" :style="{'--line-index': i}"></li>
                </ul>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props:{
        type:{
            type: String,
            default: 'normal'
        }
    },
    data() {
        return {
            visible: false
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss">
@keyframes loading {
    0%,
    100% {
        transform: scaleY(1);
    }
    50% {
        transform: scaleY(2);
    }
}
.y-loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    .y-loding-wrap{
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        text-align: center;
    }
    ul {
        display: inline-block;
        > li {
            --time: calc((var(--line-index) -1) * 200ms);
            height: 10px;
            width: 5px;
            border-radius: 2px;
            background-color: #3091fd;
            // animation: name duration timing-function delay iteration-count direction fill-mode;
            animation: loading 1.5s ease-in-out var(--time) infinite;
            display: inline-block;
            transform-origin: center center;
        }
        li + li{
            margin-left: 5px;
        }
    }

    @keyframes line-move1 {
        0%,
        100% {
            transform: scaleY(1);
        }
        0% {
            transform: scaleY(1.1);
        }
    }
    @keyframes line-move2 {
        0%,
        100% {
            transform: scaleY(1);
        }
        0% {
            transform: scaleY(1.3);
        }
    }
    @keyframes line-move3 {
        0%,
        100% {
            transform: scaleY(1);
        }
        0% {
            transform: scaleY(1.5);
        }
    }
    @keyframes line-move4 {
        0%,
        100% {
            transform: scaleY(1);
        }
        0% {
            transform: scaleY(1.7);
        }
    }
    @keyframes line-move5 {
        0%,
        100% {
            transform: scaleY(1);
        }
        0% {
            transform: scaleY(2);
        }
    }
    .heart-ul{
        > li {
            --time: calc((var(--line-index) -1) * 160ms);
            height: 10px;
            width: 5px;
            border-radius: 2px;
            background-color: #3c9;
            filter: hue-rotate(var(--Θ));
            animation: loading 1.5s ease-in-out var(--time) infinite;
            display: inline-block;
            transform-origin: center center;
        }
        &.li0, &.li8{
            animation-name: line-move1;
        }
        &.li1, &.li7{
            animation-name: line-move2;
        }
        &.li2, &.li6{
            animation-name: line-move3;
        }
        &.li3, &.li5{
            animation-name: line-move4;
        }
        &.li4{
            animation-name: line-move5;
        }
    }

}
</style>