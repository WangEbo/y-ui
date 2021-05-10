<template>
    <canvas class="tree-diagram" ref="canvas" style="height: 100%;width: 100%"></canvas>
</template>

<script>
import TreeDiagramNode from './node'

function RegisterResizeEvent(el) {
    var observer = new ResizeObserver(function elResizeChange(entries) {
        for (var entry of entries) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent('resize');
            entry.target.dispatchEvent(event);
        }
    })
    observer.observe(el);
}

var addEventListener = EventTarget.prototype.addEventListener;
HTMLElement.prototype.addEventListener = function _wrapper(type) {
    if (type === 'resize') {//resize事件走绑定的注册事件
        RegisterResizeEvent(this)
    }
    addEventListener.apply(this, arguments)
}
export default {
    props: {
        options: {
            type: Object,
            default: function () {
                return {
                    width: 60,
                    height: 90,
                    marginTop: 20,
                    childMargin: 90,//子节点的横向间距,
                    lineHeight: 100,
                }
            }
        },
        nodeKey: {
            type: String,
            default: 'children'
        },
        treeData: {
            type: Array | Object,
            default: function () {
                return [
                    {
                        text: '户主',
                        iconUrl: '/public/imgs/header.png',
                        children: [
                            {
                                text: '李丽',
                                iconUrl: '/public/imgs/women.png'
                            }, {
                                text: '张三',
                                iconUrl: '/public/imgs/man.png'
                            }
                        ]
                    }
                ]
            }
        }
    },
    data: function () {
        return {
            ctx: null,
            canvasEle: null,
            flatNodes: []
        }
    },
    watch: {
        treeData: {
            handler: function (nval) {
                this.renderTree()
            },
            deep: true
        }
    },
    mounted: function () {
        this.canvasEle = this.$refs.canvas;
        this.canvasEle.addEventListener('resize', this.renderTree.bind(this));
        this.renderTree();
    },
    methods: {
        renderTree: function () {
            this.canvasEle.width = this.canvasEle.offsetWidth;
            this.canvasEle.height = this.canvasEle.offsetHeight;
            this.ctx = this.canvasEle.getContext('2d');
            this.ctx.clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);
            if (Array.isArray(this.treeData) && this.treeData instanceof Array) {
                this.draw(this.treeData, null)
            } else if (typeof this.treeData == 'object') {
                this.draw([this.treeData], null)
            }
        },
        draw(nodes, parent) {
            var self = this;
            nodes.forEach(function (node, i) {
                node.parent = parent;
                node.position = {};
                node.labelWidth = 90;
                self.getCurNodePosition(node, i);
                new TreeDiagramNode(self.options, node, self.ctx);

                var children = node[self.nodeKey];
                if (children && children.length) {
                    self.draw(children, node)
                }
            })
        },
        getCurNodePosition: function (node, index) {//节点本身     节点在父节点的子节点的索引
            var propOpt = this.options;
            if (!node.parent) {
                var canvasEle = this.$refs.canvas;
                var width = canvasEle.offsetWidth;
                var height = canvasEle.offsetHeight;
                node.position.x = (width - propOpt.width) / 2;
                node.position.y = this.options.marginTop
            } else {
                var parent = node.parent,
                    parentX = parent.position.x,
                    parentY = parent.position.y;
                var children = parent[this.nodeKey]
                var childsNum = children.length;

                var childrenBeginX = parentX + this.options.width / 2 - (propOpt.width * childsNum + propOpt.childMargin * (childsNum - 1)) / 2;
                node.position.x = Math.ceil(childrenBeginX + index * (propOpt.width + propOpt.childMargin));
                node.position.y = Math.ceil(parentY + propOpt.height + propOpt.levelBetHeight);
            }
        }
    }
}
</script>

<style>
</style>