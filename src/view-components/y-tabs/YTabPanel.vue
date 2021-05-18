<template>
    <div class="y-tab-panel">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'YTabPanel',
    props:{
        name: {

        },
        label: {
            require: true
        }
    },

}
</script>

<style>

</style>