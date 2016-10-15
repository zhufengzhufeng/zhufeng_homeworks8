function EventEmitter() {
    this._events = {};
}
EventEmitter.prototype.on = function (eventName, callBack) {
    var arr = this._events[eventName];
    if (arr) {
        arr.push(callBack);
    } else {
        this._events[eventName] = [callBack];
    }
};
EventEmitter.prototype.off = function (eventName, callBack) {
    this._events[eventName] = this._events[eventName].filter(function (item) {
        return item != callBack;
    });
};
EventEmitter.prototype.emit = function (eventName) {
    this._events[eventName].forEach(function(item){
          item()
    })
};
EventEmitter.prototype.once=function (eventName){
    var ary=Array.prototype.slice.call(arguments,1);
    var ary1=this._events[eventName];
    for(var  i=0;i<ary1.length;i++){
        var cur=ary1[i];
        ary.forEach((item)=>{
                    if(item==cur){
                        cur();
                        this._events[eventName].splice(i,1);
                        i--;
                    }
                })
    }
};
function Girl() {
    EventEmitter.call(this);
}
var util = require('util');
util.inherits(Girl, EventEmitter);
function boy1() {
    console.log('boy1');
}
function boy2() {
    console.log('boy2');
}
function boy3() {
    console.log('boy3');
}
var girl = new Girl();
girl.on('找男朋友',boy1);
girl.on('找男朋友',boy2);
girl.on('找男朋友',boy3);
girl.once('找男朋友',boy1,boy2);
girl.once('找男朋友',boy1,boy2,boy3);
girl.once('找男朋友',boy1);