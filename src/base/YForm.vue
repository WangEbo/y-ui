<template>
    <div class="y-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'YForm',
    componentName: 'YForm',
    provide: {
        YForm: this,
    },
    props:{
        model:{
            type: Object,
            require: true
        },
        rules: {
            type: Object
        }
    },
    data(){
        return {

        }
    },
    watch: {
        rules:{
            handler(rules, oldRules){
                let names = Object.keys(rules);
                let ruleFormItems = this.formItems.filter(item=> item.rules && item.rules.length)
                names.forEach(name=> {
                    if(JSON.stringify(rules[name]) !== JSON.stringify(oldRules[name])){
                        ruleFormItems.updateRules()
                    }
                })   
            }
        }
    },
    computed: {
        formItems() {
            if(!this.$children)return []
            return this.$children.filter(componentInstanc=>{
                return componentInstanc.$options.componentName === 'YFormItem'
            })
        }
    },
    created(){

    },
    mounted() {

    },
    methods:{
        validate() {
            return new Promise(resolve =>{
                //获取form 的所有 formitem 子组件
                let ruleFormItems = this.formItems.filter(item=> item.rules && item.rules.length)
                var validatedStates = {}, pass = true, errors = {};
                //子组件校验并返回状态 存储
                ruleFormItems.forEach(ruleItem=>{
                    ruleItem.validate()
                    let itemState = ruleItem.validatedState;
                    validatedStates[ruleItem.prop] = itemState;
                    if(itemState.error){
                        pass = false;
                        errors[ruleItem.prop] = itemState
                    }
                })
                resolve(pass, errors, validatedStates)
            })
        },
        clearValidatedState() {
            let ruleFormItems = formItems.filter(item=> item.rules && item.rules.length)
            ruleFormItems.forEach(item=> item.clearValidatedState())
        },
        getFormItems(){
            
        }
    }
}
</script>

<style lang="scss">
    .form-item{
        margin-bottom: 12px;
    }
</style>