<template>
    <input 
        class="y-input"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :min="min"
        :max="max"
        :readonly="readonly"
        @input="input"
        @blur="hanlderBlur"
    >
</template>

<script>
export default {
    name: 'YInput',
    props:{
        type:{
            type: String,
            default: 'text'
        },
        placeholder:{
            type: String,
            default: '请选择'
        },
        value:{
            type: String,
        },
        min:{
            type: String,
            default: ''
        },
        max:{
            type: String,
            default: ''
        },
        readonly: {
            type: Boolean,
            default: false
        },
    },
    data(){
        return {
            valueText: ''
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        input(e){
            this.valueText = e.target.value
            this.$emit('input', this.valueText)
        },
        hanlderBlur(e){
            this.valueText = e.target.value
            this.$emit('blur', this.valueText)
        }
    }

}
</script>

<style lang="scss">
    .y-input{
        width: 200px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 30px;
        outline: 0;
        padding-left:5px;
        box-sizing: border-box;
        &:hover{
            border-color: $bdColor;
        }
    }
</style>