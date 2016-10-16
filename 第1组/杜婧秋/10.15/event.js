/**
 * Created by Cathy on 2016/10/16.
 */
function EventEmitter() {
    this._events = {};
    this._eventsOnce = {};
    this.smile = '笑'
}

EventEmitter.prototype.on = function (eventName,callBack) {
    var arr = this._events[eventName];
    if(arr){
        arr.push(callBack);
    }else{
        this._events[eventName] = [callBack];
    }
};

EventEmitter.prototype.off = function (eventName,callBack) {
    this._events[eventName] = this._events[eventName].filter(function (item) {
        return item!=callBack;
    });
};

EventEmitter.prototype.once = function(eventName,callBack){
    var arr = this._eventsOnce[eventName];//先看是否能取到对应
    if(arr){
        arr.push(callBack); //取到
    }else{
        this._eventsOnce[eventName] = [callBack]; //以前没有则创建
    }
};

EventEmitter.prototype.emit = function (eventName) {
    var args = Array.from(arguments).slice(1);
    if(this._events[eventName]){
        this._events[eventName].forEach((item)=>{
            item.apply(this,args);
        });
    }
    if(this._eventsOnce[eventName]){
        this._eventsOnce[eventName].forEach((item)=>{
            item.apply(this,args);
        });
        this._eventsOnce = {}
    }
};


function Girl() {EventEmitter.call(this);}
var util = require('util');
util.inherits(Girl,EventEmitter);
function boy1(xxx,b) {console.log(xxx,b,this.smile);}
function boy2(xxx,b) {console.log(xxx,b,'once绑定的');}
var girl = new Girl();

girl.on('找男朋友',boy1);
girl.once('找男朋友',boy2);
girl.emit('找男朋友','xx2','xxx3');
girl.emit('找男朋友','xx2','xxx3');


