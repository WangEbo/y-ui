<template>
    <div class="y-tree">
        <tree-trunk v-for="(trunk, i) in data" :key="i" :trunk-data="trunk" :childrenPath="childrenPath" :labelPath="labelPath" :valuePath="valuePath" :check-strict="checkStrict" :optional="optional" :checked-value="checkedValue" :node-content="nodeContent"></tree-trunk>
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
            type: String,
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
        checkedValue: {
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
    created() {
        const changeCheckedValue = (value, flag) => {
            if (flag) {
                if (this.checkedValue && Array.isArray(this.checkedValue)) {
                    this.checkedValue.push(value)
                } else if (!this.checkedValue) {
                    this.checkedValue = value
                }
            } else {
                if (this.checkedValue && Array.isArray(this.checkedValue)) {
                    this.checkedValue.splice([this.checkedValue].indexOf(value))
                } else if (typeof this.checkedValue === 'string') {
                    this.checkedValue = undefined
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
                        setDeepParentChecked(parent)
                    }
                }
                setDeepChildChecked(trunk, checked)
                setDeepParentChecked(trunk, checked)
            }


            this.$emit('change', this.checkedValue)
        })
    },
    data() {
        let treeData = this.treeData;
        walkTree(treeData, this.childrenPath, 1, null, (trunk, level, parent) => {
            //在父组件中定义的treedData 已被添加_ob_ 属性，直接添加属性不会添加数据响应式get，set
            this.$set(trunk, 'children', trunk[this.childrenPath])
            this.$set(trunk, 'value', trunk[this.valuePath])
            this.$set(trunk, 'label', trunk[this.labelPath])
            this.$set(trunk, 'level', level)
            this.$set(trunk, 'checked', [this.checkedValue].indexOf(trunk.value) > -1)
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

        }
    }
}
</script>

<style>
</style>