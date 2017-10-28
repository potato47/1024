cc.Class({
    extends: cc.Component,

    properties: {
        x: 0,
        y: 0,
        _number: 0,
        number: {
            set(number) {
                if (number === this._number) return;
                this._number = number;
                if (number === 0) {
                    this.numberLabel.string = '';
                } else {
                    this.numberLabel.string = number + '';
                    // let colorHex = Math.floor(Math.random() * 16777215) + 1;
                    // let color = cc.hexToColor('#' + colorHex.toString(16));
                    // this.node.color = color;
                    if(this.number > 0) {
                        this.node.color = cc.Color.RED;
                    }else{
                        this.node.color = cc.Color.BLUE;
                    }
                }
            },
            get() {
                return this._number;
            }
        },
        numberLabel: cc.Label,
    },

    // use this for initialization
    onLoad: function () {

    },

    init(x, y, n) {
        this.x = x;
        this.y = y;
        this.number = n;
    },

    randomNumber() {
        // this.number = 2;
        let n = Math.ceil(Math.random() * 2);
        if(n === 1) {
            this.number = 64;
        }else {
            this.number = -64;
        }
    }
});