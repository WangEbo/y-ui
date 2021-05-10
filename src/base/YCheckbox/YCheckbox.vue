<template>
    <div @click="toogleChecked" :class="['y-checkbox',value ? 'is-checked':'']">
        <div class="y-checked-inner" v-show="value"></div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean
        }
    },
    methods: {
        toogleChecked() {
            this.$emit('input', !this.value)
        }
    }
}
</script>

<style lang="scss">
.y-checkbox {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #ffffff;
    cursor: pointer;
    &.is-checked {
        background-color: $bgColor;
        .y-checked-inner::after{
            box-sizing: content-box;
            content: "";
            border: 1px solid #ffffff;
            border-left: 0;
            border-top: 0;
            height: 7px;
            left: 4px;
            position: absolute;
            top: 1px;
            transform: rotate(45deg) scaleY(1);
            width: 3px;
            transition: transform 0.15s ease-in 0.05s;
            transform-origin: center;
        }
    }
}
</style>