<script lang="jsx">
import YtabNavs from './YTabNavs.vue'
import YTabPanel from './YTabPanel.vue'
export default {
    name: 'YTabs',
    componentName: 'YTabs',
    components:{
        YtabNavs,
        YTabPanel,
    },
    props: {
        tabs: {
            type: Array,
            require: true
        },
        activeName: {
            type: String
        }
    },
    data(){
        return {
            navs: []
        }
    },
    render() {
        console.log(this.$slots);
        let navs = [],panels = [];
        const panelSlots = this.$slots.default.map(p=> p.tag == 'y-panel');
        for(let i = 0;i < panelSlots.length;i++){
            const item = panelSlots[i];
            navs.push({
                name: item.key,
                label: item.label
            })

            let curPanelClass = {
                'y-panel': true,
                active: item.name === this.activeName
            }
            panels.push(<div class={curPanelClass}>{item.$slots.default}</div>)
        }
        this.navs = nvas;

        return (<div class="y-tabs">
            <y-tab-navs 
                navs={this.navs}
                changeTab={this.changeTab}
            ></y-tab-navs>
            <div class="tab-content">
                {panels}
            </div>
        </div>)
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

        },
        changeTab(tab){

        }
    }
}
</script>

<style>

</style>