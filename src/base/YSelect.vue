<template>
    <div :class="{
        'y-select': true,
        'is-focus': optsVisible
    }"  @click="showPopper" v-clickoutside="closePopper">
        <y-input ref="reference" :readonly="true" :class="{}" :value="selectOptText" type="text"></y-input>
        <y-icon icon="arrowdown"></y-icon>
        <transition class="select-top-popper" name="y-zoom-in-top">
            <y-popper ref="popper" v-show="optsVisible" @popperMounted="popperMounted">
                <ul class="opt-wrap">
                    <li class="opt-item" @click="selectOpts(item)" v-for="(item, i) in options" :key="i">
                        {{item && item.text}}
                    </li>
                </ul>
            </y-popper>
        </transition>
    </div>
</template>

<script>
import Clickoutside from 'utils/clickoutside'

export default {
    directives:{
        Clickoutside
    },
    props:{
        options:{
            type: Array,
            require: true,
            defautl: true
        },
        value: {
            default: ''
        },

    },
    data(){
        return {
            optsVisible: false,
            selectedValue: ''
        }
    },
    mounted(){
        console.log(Clickoutside);
    },
    watch:{
        options:{
            
        }
    },
    computed:{
        selectOptText:{
            get(){
                let selectedOpt = this.options.find(item=> item.value == this.value);
                return selectedOpt.text
            },
            set(){

            }
        }
    },
    methods:{
        selectOpts(opt){
            this.selectedValue = opt.value;
            this.$emit('input', opt.value);
            this.closePopper();
        },
        showPopper(){
            this.optsVisible = true;
            this.$refs.reference.$el.focus();
        },
        closePopper(){
            this.optsVisible = false;
            this.$emit('blur', this.selectedValue)
        },
        popperMounted(ele){
            this.popElement = ele
        }
    },
    
}
</script>

<style lang="scss">
.y-select{
    display: inline-block;
    width: 200px;
    height: 30px;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    .y-input{
        width: 100%;
        line-height: 28px;
        cursor: pointer;
    }
    .y-icon,.icon-arrowdown{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        height: 12px;
        width: 12px;
        font-size: 12px;
        transition: ease-in .3s;
    }
    .icon-arrowdown::before{
        transition: ease-in .3s;
    }
    &.is-focus{
        .y-input{
            border-color: $bdColor;
        }
        .y-icon,.icon-arrowdown{
            color:  $color;
        }
        .icon-arrowdown{
            transform: translateY(-50%) rotateZ(180deg);
        }
    }
}
.opt-wrap{
    max-height: 400px;
    overflow: auto;
    .opt-item{
        cursor: pointer;
    }
}
.y-popper{
    background-color: #fff;
}
</style>