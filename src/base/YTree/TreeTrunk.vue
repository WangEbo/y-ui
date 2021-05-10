<template>
    <div :style="{'padding-left': trunkData.level == 1 ? '0' : hasChild ? '20px' : '40px'}" :class="['y-tree-trunk', 'y-tree-trunk' + trunkData.level]">
        <y-icon 
            icon="previewright"
            v-if="hasChild"
            :class="{expand: trunkData.expand}"
            @click.native="toggleExpand"
            >
        </y-icon>
        <y-checkbox v-if="optional" @input="input" :value="trunkData.checked"></y-checkbox>
        <node-content></node-content>
        <transition name="y-zoom-in-top">
            <div class="trunk-children" v-show="trunkData.expand" v-if="hasChild">
                <tree-trunk 
                    v-for="(childTrunk, i) in trunkData[childrenPath]"
                    :key="i"
                    :trunk-data="childTrunk"
                    :childrenPath="childrenPath"
                    :labelPath="labelPath"
                    :valuePath="valuePath"
                    :check-strict="checkStrict"
                    :optional="optional"
                    :node-content="nodeContent"
                    >
                </tree-trunk>
            </div>
        </transition>
    </div>
</template>

<script>
import Bus from '../../bus'
export default {
    name: 'tree-trunk',
    props:{
        trunkData:{
            type: Object,
        },
        childrenPath:{
            type: String,
            default: 'children'
        },
        labelPath:{
            type: String,
            default: 'label'
        },
        valuePath:{
            type: String,
            default: 'value'
        },
        checkStrict:{
            type: Boolean,
            default: false
        },
        optional:{
            type: Boolean,
            default: false
        },
        nodeContent:{
            type: Function,
            default(h, node){
                return h('span', node.label)
            }
        }
    },
    data(){
        return{
            valueProxy: []
        }
    },
    computed:{
        hasChild(){
            return this.trunkData[this.childrenPath] && this.trunkData[this.childrenPath].length
        }
    },
    components:{
        nodeContent:{
            render(h) {
                let parent = this.$parent;
                let rnderFn =  parent.nodeContent;
                return rnderFn(h, parent.trunkData)
            },
        }
    },
    methods:{
        toggleExpand(trunkData){
            this.$set(this.trunkData, 'expand', !this.trunkData.expand)
        },
        input(val){
            Bus.$emit('select-change', this.trunkData, val)
        }
    }
}
</script>

<style lang="scss">
.y-tree-trunk{
    .icon-previewright{
        transition: transform .3s;
        transform-origin: center center;
        transform: rotateZ(0);
        cursor: pointer;
    }
    .icon-previewright.expand{
        transform: rotateZ(90deg);
    }
    .trunk-children{
        transform-origin: center top;
        transition: all .3s;
    }
}
</style>