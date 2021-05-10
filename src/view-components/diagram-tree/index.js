import TreeNode from 'tree-node.js'

const tree
class DiagramTree {
    children_key = 'children'
    labelKey = 'label'
    ctx = null//canvas context
    render = null
    children = []
    constructor(ctx, treeData, options){
        this.ctx = ctx;
        this.children_key = 'children' || options.children_key
        if(options.render){
            this.render = options.render
        }
        tree = this;
        this.init(ctx, treeData, options)
    }
    init(treeData, options){
        init(treeData, options, this, 0)
    }
    draw() {

    }
}

// 通过监测 树节点的 data 变化，触发节点draw方法自动更新视图

const init = (ctx, treeData, options)=> {
    //初始化节点树，添加绘制上下文，创建节点实例
    initNodes(ctx, treeData, options, this, 0)

    //计算单个树分支宽度，作用是合理分配节点坐标，使节点位置对称/美观
    init_trunk_width()

    //分别给每个子节点计算宽度
    //依据 todo  来绘制节点

}

const hasChild = (ar)=> {
    return Array.isArray(ar) && ar && ar.length
}

const initStatic = (treeData, parent, level) =>{
    level++
    for(let i =0;i <=treeData.length;i++){
        let cur_data = treeData[i];
        //文字宽度
        let cur_node = new TreeNode(treeData[i], {
            ctx: tree.ctx,//绘制上下文
            label: curData[tree.labelKey],
            root: tree,
            level,
            width: tree.width,
            height: tree.height,
            level_margin: 80,//层级间隔
            child_margin: 30,//子节点横向间隔
        });
        parent.children.push(cur_node)
        if(hasChild(treeData[tree.children_key])){
            initStatic(cur_data, cur_node, level)
        }
    }    
}

const flat_to_level_layers = () =>{

}

const computed_trunk_width = () =>{

}