function TreeDiagramNode(options, node, ctx){
    //树节点 基础配置
    this.width = options.width || 60;
    this.iconSquareWidth = this.width;//图标的正方形边长
    this.height = options.height || 90; 
    this.levelBetHeight = options.levelBetHeight;
    this.lineColor = options.lineColor;//关系线颜色

    this.position = node.position;
    this.x = this.position.x;
    this.y = this.position.y;

    this.iconUrl = node.iconUrl;//图标url
    this.labelColor = node.labelColor;
    this.labelWidth = node.labelWidth;//文本宽度
    this.font = node.font;
    this.label = node.label;//文本
    this.backgroundColor = node.backgroundColor;
    this.relationName = node.relationName;

    this.ctx = ctx;

    this.node = node;
    if(this.position){
        this.draw()
    }
    if(!ctx){
        throw('tree diagram node must have ctx,plaese check your config')
    }
}

TreeDiagramNode.prototype.draw = function () {
    var self = this;
    var ctx = this.ctx;
    console.log(this.text, this.position);

    //画图标
    var icon = new Image();
    
    icon.onload = function(){
        var iconWidth = icon.width,
            iconHeight = icon.height;
        if(iconWidth > iconHeight){
            var drawWidth = self.iconSquareWidth;
            var drawHeight = drawWidth * (iconWidth / iconHeight);//icon 的实际绘制高度
            var marginTop = Math.ceil( (self.iconSquareWidth - drawHeight) / 2 )
            ctx.drawImage(icon, self.x, self.y + marginTop, drawWidth, drawHeight)
        }else if(iconHeight >= iconWidth){
            var drawHeight = self.iconSquareWidth;
            var drawWidth = drawHeight * (iconHeight / iconWidth);//icon 的实际绘制高度
            var marginLeft = Math.ceil( (self.iconSquareWidth - drawWidth) / 2 )
            ctx.drawImage(icon, self.x + marginLeft, self.y, drawWidth, drawHeight)
        }
    }
    icon.src = this.iconUrl;


    //画文字背景
    ctx.strokeStyle = 'RGBA(245, 246, 247, 1)';
    ctx.lineJoin = "round";
    ctx.lineWidth = 20;

    ctx.strokeRect(this.x + this.width / 2 - this.labelWidth / 2, this.y + this.iconSquareWidth + 15, this.labelWidth, 0);


    //画文字
    if (this.font) {
        ctx.font = 'normal normal 600 12px/20px ngFangSC-Medium, PingFang SC'
    } else {
        ctx.font = 'normal normal 400 12px/20px ngFangSC-Medium, PingFang SC';
    }
    ctx.fillStyle = this.labelColor || 'rgba(27, 40, 51, 1)';
    ctx.textAlign = 'center';
    ctx.fillText(this.label, this.x + this.width / 2, this.y + this.iconSquareWidth + 18, this.labelWidth)

    if (!this.node.parent) {//画与父节点的连接线条
        var lineStartX = this.x + this.width / 2,
            lineStartY = this.y + this.height + 2;
        ctx.moveTo(lineStartX, lineStartY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.lineColor;
        ctx.lineTo(lineStartX, lineStartY + this.levelBetHeight / 2);
        ctx.stroke();
    } else {//画延展子节点的线条
        var lineStartX = this.x + this.width / 2,
            lineStartY = this.y - 2;
        ctx.moveTo(lineStartX, lineStartY);

        var parent = this.node.parent;
        var endX, endY;
        endX = parent.position.x + this.width / 2,
            endY = this.y - this.levelBetHeight / 2;
        ctx.lineTo(lineStartX, endY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.lineColor;
        ctx.stroke();
        //画关系文字
        //画文字背景
        ctx.strokeStyle = 'RGBA(255, 255, 255, 1)';
        ctx.lineJoin = "round";
        ctx.lineWidth = 20;

        ctx.strokeRect(this.x + this.width / 2 - this.labelWidth / 2, this.y - this.levelBetHeight / 4, this.labelWidth, 0);

        //画文字
        ctx.font = 'normal normal 400 12px/20px ngFangSC-Medium, PingFang SC';

        ctx.fillStyle = 'rgba(163, 166, 171, 1)';
        ctx.textAlign = 'center';
        ctx.fillText(this.relationName, this.x + this.width / 2, this.y - this.levelBetHeight / 4 + 2, this.labelWidth)
    }
}

export default TreeDiagramNode 