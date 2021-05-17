<script lang="jsx">
export default {
    name: 'y-tabs',
    componentName: 'y-tabs',
    props: {
        tabs: {
            type: Array,
            require: true
        },
        activeTab: {
            type: String,
            default(){
                return this.tabs[0].value
            }
        }
    },
    render() {
        console.log(this.$slots);
        return <div>xxxx</div>
    },
    watch: {
        activeTab: {
            handler(nVal){
                this.renderContent()
            }
        }
    },
    computed: {
        slotsEles() {
            return this.$slots && Array.isArray(this.$slots) && this.$slots.length && this.$slots.map(slotVNode=> {
                return this.$createElement(slotVNode)
            })
        }
    },
    created(){
    },
    mounted(){
    },
    methods: {
        renderContent() {

        }
    }
}
</script>

<style>

</style>