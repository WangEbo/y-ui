<template>
    <div id="app">
        <y-form ref="form" v-loading="loading" :model="main" :rules="rules">
            <y-form-item label="姓名：" prop="name">
                <y-input v-model="main.name" type="text" placeholder="请输入"></y-input>
            </y-form-item>
            <y-form-item label="年龄：" prop="age">
                <y-input v-model="main.age" type="text" placeholder="请输入"></y-input>
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
                    v-model="main.class"
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
        <y-tabs>
            <y-panel name="1" label="全部订单">
                <div>全部东西</div>
            </y-panel>
            <y-panel name="2" label="待收货">
                <div>待收货东西</div>
            </y-panel>
            <y-panel name="3" label="已完成">
                <div>已完成商品</div>
            </y-panel>
        </y-tabs>
    </div>
</template>

<script>
const treeData = [
    {
        id: '1',
        label: '音乐',
        children: [
            {
                id: '1-1',
                label: '管弦乐',
                children: [
                    {
                        id: '1-1-1',
                        label: '古典-二胡'
                    }, 
                    {
                        id: '1-1-2',
                        label: '古典-古筝'
                    },
                    {
                        id: '1-1-3',
                        label: '古典-葫芦丝'
                    },
                    {
                        id: '1-1-4',
                        label: '吉他'
                    },
                ]
            },
            {
                id: '1-2',
                label: '打击乐',
                children: [
                    {
                        id: '1-2-1',
                        label: '架子鼓'
                    }, 
                    {
                        id: '1-2-2',
                        label: '大锣'
                    },
                    {
                        id: '1-2-3',
                        label: '板鼓'
                    },
                ]
            }
        ],
    },
    {
        id: '2',
        label: '美术',
        children: [
            {
                id: '2-1',
                label: '抽象派',
                children: [
                    {
                        id: '2-1-1',
                        label: '梵高',
                    }, {
                        id: '2-1-2',
                        label: '蒙克'
                    }
                ]
            },
            {
                id: '2-2',
                label: '印象派'
            }
        ]
    },
]

export default {
    name: 'App',
    data() {
        let ageValidator = (age)=> {
            if(this.sex == '1'){
                return age < 20 ? {
                    error: true,
                    message: '男性须达到20岁才可报名'
                } : {}
            }else if(this.sex == '2'){
                return age < 22 ? {
                    error: true,
                    message: '女性须达到22岁才可报名'
                } : {}
            }
        }
        return {
            main: {
                name: '',
                age: '',
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
                age: [
                    {required: true, message: '年龄为必填项'},
                ],
                sex: [
                    {required: true, message: '性别为必填项'},
                    {
                        validator: ageValidator,
                        trigger: 'input'
                    }
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