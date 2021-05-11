<template>
    <div class="y-tree">
        <tree-trunk 
            v-for="(trunk, i) in data"
            :key="i"
            :trunk-data="trunk"
            :childrenPath="childrenPath"
            :labelPath="labelPath"
            :valuePath="valuePath"
            :check-strict="checkStrict" 
            :optional="optional"
            :node-content="nodeContent"
        ></tree-trunk>
    </div>
</template>

<script>
import TreeTrunk from './TreeTrunk.vue'
import Bus from '../../bus'

const walkTree = (tree, childPath, level, parent, fn) => {
    if (Array.isArray(tree) && tree.length) {
        walkArray(tree, childPath, level, parent, fn)
    } else if (typeof tree === 'object') {
        fn(tree, level, parent)
        let children = tree[childPath];
        if (Array.isArray(children) && children.length) {
            walkArray(children, childPath, ++level, tree, fn)
        }
    }
}

const walkArray = (array, childPath, level, parent, fn) => {
    for (let i = 0; i < array.length; i++) {
        let trunk = array[i];
        walkTree(trunk, childPath, level, parent, fn)
    }
}

export default {
    name: 'y-tree',
    componentName: 'y-tree',
    props: {
        treeData: {
            type: [Object, Array]
        },
        childrenPath: {
            type: String,
            default: 'children'
        },
        labelPath: {
            type: String,
            default: 'label'
        },
        valuePath: {
            type: String | Number,
            default: 'value'
        },
        checkStrict: {
            type: Boolean,
            default: false
        },
        optional: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Array],
        },
        nodeContent: {
            type: Function
        }
    },
    components: {
        TreeTrunk,
    },
    provide: {

    },
    mounted() {
        console.log(this);
    },
    watch: {
        value: {
            handler(nVal, oVal){
                this.setCheckedVal(nVal)
            }
        }
    },
    created() {
        const changeCheckedValue = (value, flag) => {
            if (flag) {
                if (this.value && Array.isArray(this.value)) {
                    this.value.push(value)
                } else if (!this.value) {
                    this.value = value
                }
            } else {
                if (this.value && Array.isArray(this.value)) {
                    this.value.splice(this.value.indexOf(value), 1)
                } else if (typeof this.value === 'string') {
                    this.value = undefined
                }
            }
        }
        Bus.$on('select-change', (trunk, checked) => {
            trunk.checked = checked;
            changeCheckedValue(trunk.value, checked);

            if (this.checkStrict) {
                function setDeepChildChecked(trunk, flag) {
                    let children = trunk.children
                    if (children && children.length) {
                        for (let i = 0; i < children.length; i++) {
                            let node = children[i];
                            if (!node.checked == flag) {
                                node.checked = flag;
                                changeCheckedValue(node.value, flag)
                            }
                            setDeepChildChecked(node, flag)
                        }
                    }
                }
                function setDeepParentChecked(trunk, flag) {
                    let parent = trunk.parent
                    if (parent) {
                        let parentCheckedRes = parent.children.every(node => node.checked);
                        if (parent.checked != parentCheckedRes) {
                            parent.checked = parentCheckedRes;
                            changeCheckedValue(parent.value, flag)
                        }
                        setDeepParentChecked(parent, flag)
                    }
                }
                setDeepChildChecked(trunk, checked)
                setDeepParentChecked(trunk, checked)
            }

            this.$emit('change', this.value)
            this.$emit('input', this.value)
        })
    },
    data() {
        let treeData = this.treeData;
        //初始化树节点数据
        walkTree(treeData, this.childrenPath, 1, null, (trunk, level, parent) => {
            //在父组件中定义的treedData 已被添加_ob_ 属性，直接添加属性不会添加数据响应式get，set
            this.$set(trunk, 'children', trunk[this.childrenPath])
            this.$set(trunk, 'value', trunk[this.valuePath])
            this.$set(trunk, 'label', trunk[this.labelPath])
            this.$set(trunk, 'level', level)
            this.$set(trunk, 'checked', [this.value].indexOf(trunk.value) > -1)
            trunk.parent = parent
        });
        if (!treeData instanceof Array) {
            treeData = [treeData]
        }
        return {
            data: treeData
        }
    },
    methods: {
        initTreeData() {

        },
        setCheckedVal(nVal) {
            if(typeof nVal !== 'string' && typeof nVal !== 'number' && !Array.isArray(nVal)){
                throw Error('树节点值必须字符串/数字或数组')
            }
            nVal =  Array.isArray(nVal) ? nVal : [nVal];
            walkTree(this.data, this.childPath, 1, null, (tree, level, parent)=>{
                this.$set(tree, 'checked', nVal.indexOf(tree[this.valuePath]) > -1)
            })
        }
    }
}
</script>

<style>
</style>