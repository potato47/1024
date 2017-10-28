cc.Class({
    extends: cc.Component,

    properties: {
        tilePrefab: cc.Prefab,
        tileLayer: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        cc.map = this;
        this.mapWidth = this.node.width;
        this.tileWidth = this.mapWidth / 4;
        this.g = this.getComponent(cc.Graphics);
        this.touchStartPosition = cc.v2();
        this.touchEndPosition = cc.v2();
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.touchStartPosition = event.getLocation();
        });
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.touchEndPosition = event.getLocation();
            let offsetX = this.touchEndPosition.x - this.touchStartPosition.x;
            let offsetY = this.touchEndPosition.y - this.touchStartPosition.y;
            if (Math.abs(offsetX) > Math.abs(offsetY)) {
                if (offsetX > 30) {
                    this.onRightSlide();
                } else if (offsetX < -30) {
                    this.onLeftSlide();
                }
            } else {
                if (offsetY > 30) {
                    this.onUpSlide();
                } else if (offsetY < -30) {
                    this.onDownSlide();
                }
            }
        });
        this.drawBg();
        this.initTiles();
    },

    onLeftSlide() {
        //左滑F
        //合并
        let isMove = false;
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.tiles[x][y].number == 0) {
                    continue;
                }
                for (let x0 = x + 1; x0 < 4; x0++) {
                    // if (this.tiles[x0][y].number == 0) {
                    //     continue;
                    // } else if (this.tiles[x][y].number === this.tiles[x0][y].number) {
                    //     this.tiles[x][y].number = this.tiles[x][y].number * 2;
                    //     this.tiles[x0][y].number = 0;
                    //     isMove = true;
                    //     break;
                    // } else {
                    //     break;
                    // }
                    if (this.tiles[x0][y].number == 0) {
                        continue;
                    } else if (this.tiles[x][y].number + this.tiles[x0][y].number === 0) {
                        this.tiles[x][y].number *= 2;
                        this.tiles[x0][y].number = 0;
                        isMove = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        //移动
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.tiles[x][y].number !== 0) {
                    continue;
                }
                for (let x0 = x + 1; x0 < 4; x0++) {
                    if (this.tiles[x0][y].number === 0) {
                        continue;
                    } else {
                        this.tiles[x][y].number = this.tiles[x0][y].number;
                        this.tiles[x0][y].number = 0;
                        isMove = true;
                        break;
                    }
                }
            }
        }
        if (isMove) {
            this.newTile();
            this.judgeOver();
        }
    },

    onRightSlide() {
        //右滑
        //合并
        let isMove = false; //判断是否有tile移动
        for (let y = 0; y < 4; y++) {
            for (let x = 3; x >= 0; x--) {
                if (this.tiles[x][y].number === 0) {
                    continue;
                }
                for (let x0 = x - 1; x0 >= 0; x0--) {
                    // if (this.tiles[x0][y].number === 0) {
                    //     continue;
                    // } else if (this.tiles[x][y].number === this.tiles[x0][y].number) {
                    //     this.tiles[x][y].number = this.tiles[x][y].number * 2;
                    //     this.tiles[x0][y].number = 0;
                    //     isMove = true;
                    //     break;
                    // } else {
                    //     break;
                    // }
                    if (this.tiles[x0][y].number === 0) {
                        continue;
                    } else if (this.tiles[x][y].number + this.tiles[x0][y].number === 0) {
                        this.tiles[x][y].number *= 2;
                        this.tiles[x0][y].number = 0;
                        isMove = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        //移动
        for (let y = 0; y < 4; y++) {
            for (let x = 3; x >= 0; x--) {
                if (this.tiles[x][y].number != 0) {
                    continue;
                }
                for (let x0 = x - 1; x0 >= 0; x0--) {
                    if (this.tiles[x0][y].number == 0) {
                        continue;
                    } else {
                        this.tiles[x][y].number = this.tiles[x0][y].number;
                        this.tiles[x0][y].number = 0;
                        isMove = true;
                        break;
                    }
                }
            }
        }
        //有tile移动才添加新的tile
        if (isMove) {
            this.newTile();
            this.judgeOver();
        }
    },

    onDownSlide() {
        //下滑
        //合并
        let isMove = false;
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (this.tiles[x][y].number == 0) {
                    continue;
                }
                for (let y0 = y + 1; y0 < 4; y0++) {
                    // if (this.tiles[x][y0].number == 0) {
                    //     continue;
                    // } else if (this.tiles[x][y].number === this.tiles[x][y0].number) {
                    //     this.tiles[x][y].number = this.tiles[x][y].number * 2;
                    //     this.tiles[x][y0].number = 0;
                    //     isMove = true;
                    //     break;
                    // } else {
                    //     break;
                    // }
                    if (this.tiles[x][y0].number == 0) {
                        continue;
                    } else if (this.tiles[x][y].number + this.tiles[x][y0].number === 0) {
                        this.tiles[x][y].number *= 2;
                        this.tiles[x][y0].number = 0;
                        isMove = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        //移动
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (this.tiles[x][y].number != 0) {
                    continue;
                }
                for (let y0 = y + 1; y0 < 4; y0++) {
                    if (this.tiles[x][y0].number === 0) {
                        continue;
                    } else {
                        this.tiles[x][y].number = this.tiles[x][y0].number;
                        this.tiles[x][y0].number = 0;
                        isMove = true;
                        break;
                    }
                }
            }
        }
        if (isMove) {
            this.newTile();
            this.judgeOver();
        }
    },

    onUpSlide() {
        //上滑
        //合并
        let isMove = false;
        for (let x = 0; x < 4; x++) {
            for (let y = 3; y >= 0; y--) {
                if (this.tiles[x][y].number === 0) {
                    continue;
                }
                // for (let y0 = y - 1; y0 >= 0; y0--) {
                //     if (this.tiles[x][y0].number == 0) {
                //         continue;
                //     } else if (this.tiles[x][y].number === this.tiles[x][y0].number) {
                //         this.tiles[x][y].number = this.tiles[x][y].number * 2;
                //         this.tiles[x][y0].number = 0;
                //         isMove = true;
                //         break;
                //     } else {
                //         break;
                //     }
                // }
                for (let y0 = y - 1; y0 >= 0; y0--) {
                    if (this.tiles[x][y0].number == 0) {
                        continue;
                    } else if (this.tiles[x][y].number + this.tiles[x][y0].number === 0) {
                        this.tiles[x][y].number *= 2;
                        this.tiles[x][y0].number = 0;
                        isMove = true;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        //移动
        for (let x = 0; x < 4; x++) {
            for (let y = 3; y >= 0; y--) {
                if (this.tiles[x][y].number != 0) {
                    continue;
                }
                for (let y0 = y - 1; y0 >= 0; y0--) {
                    if (this.tiles[x][y0].number == 0) {
                        continue;
                    } else {
                        this.tiles[x][y].number = this.tiles[x][y0].number;
                        this.tiles[x][y0].number = 0;
                        isMove = true;
                        break;
                    }
                }
            }
        }
        if (isMove) {
            this.newTile();
            this.judgeOver();
        }
    },

    drawBg() {
        this.g.rect(0, 0, this.node.width, this.node.height);
        this.g.fillColor = cc.hexToColor('#ffffff');
        this.g.stroke();
        this.g.fill();
        this.g.strokeColor = cc.Color.BLACK;
        this.g.lineWidth = 10;
        for (let x = 0; x < 5; x++) {
            this.g.moveTo(x * this.tileWidth, 0);
            this.g.lineTo(x * this.tileWidth, this.mapWidth);
        }
        for (let y = 0; y < 5; y++) {
            this.g.moveTo(0, y * this.tileWidth);
            this.g.lineTo(this.mapWidth, y * this.tileWidth);
        }
        this.g.stroke();
    },

    judgeOver() {
        for(let x = 0; x < 4;x++){
            for(let y = 0; y < 4; y++) {
                if(this.tiles[x][y].number === 1024) {
                    cc.director.loadScene('success');
                }
            }
        }
    },

    initTiles(tileWidth) {
        this.tileLayer.removeAllChildren();
        this.tiles = [];
        this.zeroTiles = [];
        this.zeroTiles = [];
        for (let x = 0; x < 4; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < 4; y++) {
                let tileNode = cc.instantiate(this.tilePrefab);
                this.tileLayer.addChild(tileNode);
                tileNode.x = x * this.tileWidth + this.tileWidth / 2;
                tileNode.y = y * this.tileWidth + this.tileWidth / 2;
                let tile = tileNode.getComponent('Tile');
                tile.init(x, y, 0);
                this.tiles[x][y] = tile;
                this.zeroTiles.push(tile);
            }
        }
        for (let i = 0; i < 2; i++) {
            this.newTile();
        }
    },

    newTile() {
        this.zeroTiles = [];
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (this.tiles[x][y].number === 0) {
                    this.zeroTiles.push(this.tiles[x][y]);
                }
            }
        }
        let n = Math.floor(Math.random() * this.zeroTiles.length);
        this.zeroTiles[n].randomNumber();
        this.zeroTiles.splice(n, 1);
    },

    onBtnRetry() {
        cc.director.loadScene('game');
    },

    onBtnSleep() {
        cc.director.loadScene('sleep');
    }

});