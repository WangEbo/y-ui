<script lang="jsx">
import YTabNavs from './YTabNavs.vue'
import YTabPanel from './YTabPanel.vue'
export default {
    name: 'YTabs',
    componentName: 'YTabs',
    components:{
        YTabNavs,
        YTabPanel,
    },
    props: {
        tabs: {
            type: Array,
            require: true
        },
        activeName: {}
    },
    data(){
        return {
            activeNameProxy: ''
        }
    },
    render() {
        let navs = [],panels = [], activeIndex, panelContentStyle={};
        
        //获取slots 中的panel vnode
        const panelSlots = this.$slots.default.filter(p=> p.tag == 'y-panel');
        
        this.activeNameProxy = this.activeNameProxy || panelSlots[0].data.attrs.name;
        
        for(let i = 0;i < panelSlots.length;i++){
            const item = panelSlots[i];
            const { attrs } = item.data;
            //提取navs
            navs.push({
                name: attrs.name,
                label: attrs.label
            })
            
            let curPanelClass = {
                'y-panel': true,
            }
            if(attrs.name === this.activeNameProxy){
                activeIndex = i;
                curPanelClass.active = true
            }
            const panelContent = item.children[0];
            panels.push(<div class={curPanelClass}>{panelContent}</div>)
        }

        panelContentStyle['margin-left'] = `-${activeIndex * 100}%`;
        
        return (<div class="y-tabs">
            <y-tab-navs
                navs={navs}
                activeName={this.activeNameProxy}
                onChangeTab={this.change}
            ></y-tab-navs>
            <div class="tab-content" style={panelContentStyle}>
                {panels}
            </div>
        </div>)
    },
    watch: {
        activeName: {
            handler(nVal){
                this.activeNameProxy = this.nVal
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
        change(tab){
            this.activeNameProxy = tab.name;
            this.$emit('change', tab);
        }
    }
}
</script>

<style lang="scss">
.y-tabs{
    overflow: hidden;
    .tab-content{
        display: flex;
        transition: margin-left .4s ease-in-out;
        width: 100%;
        .y-panel{
            flex-shrink: 0;
            width: 100%;
        }
    }
}
    
</style>