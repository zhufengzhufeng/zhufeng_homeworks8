/**
 * Created by ollie on 16/10/15.
 */
/**
 * Created by ollie on 16/10/15.
 */

var util=require('util');
function  EventEmitter() {
    //事件队列
    this._events={};
}
// @param eventName string 事件的名字
EventEmitter.prototype.emit=function (eventName) {
    //去掉函数传入的第一个参数 剩下的是传入的data
    var args= Array.from(arguments).slice(1);
    if(typeof(this._events[eventName])!=='undefined'){
        this._events[eventName].forEach((item)=>{
            item.apply(this,args);
    });
    }

}
// @param eventName string 事件的名字
// @param callBack function 回调函数
EventEmitter.prototype.on=function (eventName,callBack) {
    var arr=this._events[eventName];
    //事件是否已注册
    if(arr){
        //把新事件压入事件队列
        arr.push(callBack);
    }else{
        this._events[eventName]=[callBack];
    }
}
// @param eventName string 事件的名字
// @param callBack function 回调函数
EventEmitter.prototype.off = function (eventName,callBack) {
    // console.log(this._events[eventName]);
    this._events[eventName] = this._events[eventName].filter(function (item) {
        return item!=callBack;
    });
};
EventEmitter.prototype.once=function (eventName) {
    //去掉函数传入的第一个参数 剩下的是传入的data
    var args= Array.from(arguments).slice(1);
    var _this=this;
    if(typeof(this._events[eventName])!=='undefined'){
        this._events[eventName].forEach((item)=>{
            item.apply(this,args);
        delete this._events[eventName];//由于是一次性的 调用完事就给删了
    });
    }

}
function Student() {
    if(this instanceof Student){
        EventEmitter.call(this);
    }else{
        return new Student();
    }
}
util.inherits(Student,EventEmitter);

function ask(qes) {
    console.log(qes);
}
function trouble(tro) {
    console.log(tro);
}
var student=Student();

student.on('question',ask);
student.on('make a trouble',ask)
student.emit('question','how to play nodejs?');  //结果 how to play nodejs?
student.emit('make a trouble','i am a trouble maker');//结果 i am a trouble maker
//console.log(student._events);
student.off('question',ask);
student.emit('question','how to play nodejs?'); //结果 啥也没有
//console.log(student._events);
student.once('make a trouble','i am a trouble maker'); //结果 i am a trouble maker
student.emit('make a trouble','i am a trouble maker'); //结果 啥也没有
