<template>
    <div id="app">
        <y-form ref="form" v-loading="loading" :model="main" :rules="rules">
            <y-form-item label="姓名：" prop="name">
                <y-input v-model="main.name" type="text" placeholder="请输入"></y-input>
            </y-form-item>
            <y-form-item label="性别：" prop="sex">
                <y-select :options="sexOpts" v-model="main.sex"></y-select>
            </y-form-item>
            <y-form-item label="所报级别：" prop="class">
                <y-tree 
                    :treeData="treeData"
                    :optional="true"
                    :value-path="'id'"
                    :node-content="nodeContent"
                    :checked-value="checkedValue"
                    @change="treeSelectChange"
                    :check-strict="true"
                    >
                </y-tree>
            </y-form-item>
        </y-form>
        <button @click="submit">提交</button>
        <!-- <div style="width: 800px;height: 500px">
            <tree-diagram></tree-diagram>
        </div> -->
        
    </div>
</template>

<script>
const treeData = [
    {
        id: 1,
        label: '一级 1',
        children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
                id: 9,
                label: '三级 1-1-1'
            }, {
                id: 10,
                label: '三级 1-1-2'
            }]
        }]
    },
    {
        id: 2,
        label: '一级 2',
        children: [{
            id: 5,
            label: '二级 2-1'
        }, {
            id: 6,
            label: '二级 2-2'
        }]
    },
    {
        id: 3,
        label: '一级 3',
        children: [{
            id: 7,
            label: '二级 3-1'
        }, {
            id: 8,
            label: '二级 3-2'
        }]
    }
]

export default {
    name: 'App',
    data() {
        return {
            main: {
                name: '',
                sex: '1',
                class: []
            },
            sexOpts: [
                { text: '男', value: '1' },
                { text: '女', value: '2' }
            ],
            treeData,
            loading: true,
            nodeContent: function (h, node) {
                return h('span', {}, [
                    h('span', node.label)
                ])
            },
            checkedValue: [],
            rules: {
                name: [
                    {required: true, message: '姓名为必填项'}
                ],
                sex: [
                    {required: true, message: '性别为必填项'}
                ],
                class: [
                    {required: true, message: '所选课程为必填项'},
                    {max: 2, message: '最多可选2门课程'}
                ]
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.loading = false
        }, 500)
    },
    methods: {
        submit() {
            this.$refs.form.validate().then((flag, errors, states)=> {
                if(flag){
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false
                        this.$message({
                            type: 'success',
                            message: '哈哈哈哈哈哈哈哈哈哈'
                        })
                    }, 2000);
                }
            })
        },
        treeSelectChange(value){
            this.checkedValue = value
        }
    }
}
</script>

<style lang="scss">
.y-form {
    position: relative;
}
</style>