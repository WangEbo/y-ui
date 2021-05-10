class TreeNode {
    position = {//坐标
        x: Number,
        y: Number
    }
    width = 'auto'//宽度
    height = 'auto'//高度
    children = []//子节点
    parent = null//父节点
    trunk_width = undefined//分支宽度
    level = undefined//节点层级
    root = null
    data = null
    constructor(data, options){
        this.data = data
        this.root = options.root
        this.level = options.level
    }
    draw(){
        
    }
}

export default TreeNode