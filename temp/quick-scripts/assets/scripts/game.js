(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd202b2zG6tLcY/eOQcr8Oox', 'game', __filename);
// scripts/game.js

'use strict';

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
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        bg1: null,
        bg2: null,
        curBg: null,
        bgSpeed: 10
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // this.score = 0;

        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        // // 生成一个新的星星
        // this.spawnNewStar();


        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化计分
        this.score = 0;

        this.bg1 = this.node.getChildByName('background1');
        this.bg2 = this.node.getChildByName('background2');
        this.cur_bg = this.bg1;

        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndCallback, this, true);
    },
    start: function start() {},
    update: function update(dt) {
        if (this.timer > this.starDuration) {
            // this.gameOver();
            // return;
        }
        this.timer += dt;

        var s = dt * this.bgSpeed;
        this.bg1.x -= s;
        this.bg2.x -= s;

        if (this.cur_bg.x <= -1360) {
            // 地图切换
            if (this.cur_bg == this.bg2) {
                this.bg2.x = this.bg1.x + 1360;
                this.cur_bg = this.bg1;
            } else {
                this.bg1.x = this.bg2.x + 1360;
                this.cur_bg = this.bg2;
            }
        }
    },


    spawnNewStar: function spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());

        newStar.getComponent('star').game = this;

        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },
    gainScore: function gainScore() {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    gameOver: function gameOver() {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    },
    onTouchEndCallback: function onTouchEndCallback() {
        this.player.getComponent('player').setJumpAction();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=game.js.map
        