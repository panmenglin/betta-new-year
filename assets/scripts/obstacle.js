// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        collisionRadius: 20,
    },

     // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.move()
    },

    start () {

    },

    update (dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.collisionRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }

        // var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        // var minOpacity = 50;
        // this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
    move: function () {

        var move = this.moveAction()
        var callback = cc.callFunc(this.moveCallback, this);

        var moveAction = cc.sequence(move, callback)
        this.node.runAction(moveAction);
    },
    // 生成随机运动轨迹动画
    moveAction: function (type) {
        var time = cc.visibleRect.width / this.game.bgSpeed
        var target = {
            x: -cc.visibleRect.width - this.node.width,
            y: 0
        }

        return cc.moveBy(time, cc.v2(target.x, target.y))
    },
    moveCallback: function () {
        this.node.destroy();
    },
    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        console.log(dist)

        return dist;
    },

    onPicked: function() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewObstacle();
        // 然后销毁当前星星节点
        this.node.destroy();
    }
});
