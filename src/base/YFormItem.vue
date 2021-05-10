<template>
    <div :class="{
        'y-form-item':true,
        'has-error': validatedState.error
    }">
        <div class="form-item-wrap">
            <label :class="{
                'form-item-label': true,
                'form-item-required': isRequired
            }" :style="{
                    'text-align': 'right'
                }"><span v-show="isRequired">*</span>{{label}}</label>
            <div class="form-item-content">
                <slot ref="controler" @input="hanlderInput" @blur="hanlderBlur"></slot>
                <div :class="{
                    'form-item-help': true,
                    'form-item-error': validatedState.error
                }" v-show="validatedState.error">{{validatedState.message}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import validator from 'utils/validator.js'
export default {
    name: 'YFormItem',
    componentName: 'YFormItem',
    inject: ['YForm'],
    props: {
        prop: {
            type: String
        },
        label: {
            type: String
        }
    },
    data() {
        return {
            validatedState: {
            },
            rules: [
                // example: [
                //     { required: true, message: '必填项' },
                //     {
                //         validator: function (val, state) {
                //             if (val > 200) {
                //                 state.error = true;
                //                 state.message = '不可大于200'
                //             }
                //         }
                //     }
                // ]
            ]
        }
    },
    computed: {
        isRequired() {
            return this.rules && this.rules.some(item => item.required)
        },
        form() {
            let parent = this.$parent;
            let parentName = parent.$options.componentName;
            while (parentName !== 'YForm') {
                if (parentName === 'ElFormItem') {
                    this.isNested = true;
                }
                parent = parent.$parent;
                parentName = parent.$options.componentName;
            }
            return parent;
        },
        value() {
            return this.form.model[this.prop]; 
        }
    },
    mounted() {
        this.getRules()
        console.log(validator);
    },
    watch: {
        rules: {
            handler(rules) {
                // rules && this.validate()
            }
        }
    },
    methods: {
        getRules() {
            this.rules = this.form.rules[this.prop]
        },
        updateRules() {
            this.getRules();
        },
        validate() {
            this.validateRules(this.rules)
        },
        validateRules(rules) {
            if (Array.isArray(rules) && rules.length) {
                for (let i = 0; i < rules.length; i++) {
                    let itemState = this.validateItem(rules[i], this.value);
                    if (itemState.error) {
                        return
                    }
                }
            }
        },
        validateItem(rule) {
            let validatedState = {};
            if (rule.required) {
                if (!validator.isRequired(this.value, rule)) {
                    validatedState = {
                        error: true,
                        message: rule.message || '必填项'
                    }
                }
            }
            if (rule.phone) {
                if (!validator.isPhoneNum(this.value)) {
                    validatedState = {
                        error: true,
                        message: rule.message || '请输入正确格式的号码'
                    }
                }
            }
            if (rule.cardNum) {
                if (!validator.isCardNum(this.value)) {
                    validatedState = {
                        error: true,
                        message: rule.message || '请输入正确格式的身份证号'
                    }
                }
            }
            if (rule.max) {
                if (!validator.maxLimit(this.value), rule) {
                    validatedState = {
                        error: true,
                        message: rule.message || `超过最大限制${rule.max}`
                    }
                }
            }
            if (rule.min) {
                if (!validator.maxLimit(this.value), rule) {
                    validatedState = {
                        error: true,
                        message: rule.message || `不可小于最小限制${rule.min}`
                    }
                }
            }
            if (rule.validator) {
                validatedState = validator(this.value)
            }
            this.$set(this, 'validatedState', validatedState)
            return validatedState
        },
        hanlderInput(val) {
            let rules = this.rules;
            let reuiredRule = rules.find(item => item.required)
            if (reuiredRule) {
                this.validateItem(reuiredRule)
            }
        },
        hanlderBlur(val) {
            let rules = this.rules;
            let blurRules = rules.some(item => item.trigger === 'blur');
            if (blurRules && blurRules.length) {
                this.validateRules(blurRules)
            }
        },
        clearValidatedState() {
            this.$set(this, 'validatedState', {})
        }
    }
}
</script>

<style lang="scss">
.y-form-item {
    margin-bottom: 12px;
    .form-item-label {
        display: inline-block;
        width: 100px;
        &.form-item-required {
            span {
                color: red;
            }
        }
    }
    .form-item-wrap {
        display: flex;
        width: 100%;
        .form-item-content{
            flex: 1;
            .form-item-help{
                font-size: 12px;
                line-height: 14px;
                &.form-item-help{
                    color: red;
                }
            }

        }
    }
}
</style>