<template>
    <transition name="y-slide-top">
        <div :class="['y-message', type]" v-show="visible">
            <div class="message-div">{{message}}</div>
            <y-icon :icon="type"></y-icon>
        </div>
    </transition>
    
</template>

<script>
const typeMap = {
    info: 'info',
    success: 'success',
    danger: 'danger',
    error: 'error'
}
export default {
    data(){
        return {
            message: '',
            duration: 2000,
            type: 'info',
            visible: false
        }
    },
    mounted(){
        this.visible = true;
        this.countToDisappear()
    },
    methods:{
        countToDisappear(){
            setTimeout(()=>{
                this.doDestory()
            }, this.duration + 600) //加上两倍动画的时间
        },
        doDestory(){
            this.visible = false;
            setTimeout(()=>{
                this.$destroy();
                document.body.removeChild(this.$el);
            }, 300)
        }
    }
}
</script>

<style lang="scss">
    .y-message{
        height: 40px;
        line-height: 40px;
        border-radius: 3px;
        position: fixed;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        min-width: 200px;
        text-align: left;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        &.info{
            background-color: #e0e7ff;
            color: #191d22;
        }
        &.success{
            background-color: #e7f8dc;
            color: #60f800;
        }
        &.warn{
            background-color: #fcf5df;
            color: #ffc100;
        }
        &.error{
            background-color: #ffc0b6;
            color: #ff2300;
        }
        .message-div{
            display: inline-block;
        }
        .y-icon{
            font-size: 20px;
        }
        transition: top .5s;
    }

    .y-slide-top-enter-active,
    .y-slide-top-leave-active{
        top: 20px;
        transition: top .5s;
    }
    .y-slide-top-enter,
    .y-slide-top-leave-to{
        top: -40px;
    }
</style>