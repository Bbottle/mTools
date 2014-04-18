/**
 * Created by Nunn on 14-4-8.
 */
var mTools = function(element){
        //创建一个对象并且反回
        return new mTools.fn.init(element);

}
var $ =mTools;

//构造函数mTools
mTools.fn = mTools.prototype = {
    //相关信息
    version : "0.1.1",
    update : "2014年4月8日 17:25:53",
    //方法列表
    //初始化
    init : function(){},
    //长度
    size : function(){},
    //选择器
    selector : function(){}
};
//初始化
mTools.prototype.init = function(element){
    //创建节点数组
    this.elements = [];
    if(element != undefined){
        this.elements[0] = element;
    }

    //识别参数类型
    switch (typeof element){
        case "string":
            this.selector(element);
            break;
        case "function":
            console.log("function");
            break;
        case "object":
            console.log("object");
            break;
    }
    //返回
    return this;
}
mTools.fn.init.prototype = mTools.prototype;
mTools.prototype.size = function(){
    return this.elements.length;
}
mTools.prototype.selector = function(element){
    //正则相关
    var idReg,classReg,tagReg,textReg,objname;
    //选择器相关
    var selecttag;
    textReg = /\w+/g;
    idReg = /^#\w+/;
    classReg = /^\.\w+/;
    tagReg = /\w+/;
    objname = element.match(textReg);
    if(idReg.test(element)){
        this.elements[0] = document.getElementById(objname);
        return this;
    }else if(classReg.test(element)){
        this.elements = [];
        selecttag = document.getElementsByTagName("*");
        for(i=0;i<selecttag.length;i++){
            if(selecttag[i].className == objname){
                this.elements.push(selecttag[i]);
            }
        }
    }else if(tagReg.test(element)){
        this.elements = document.getElementsByTagName(element);
    }
    return this;
}
//设置CSS
mTools.prototype.css = function(attr, value){
    if(arguments.length == 1){
        for(var i=0;i<this.elements.length;i++){
            if(typeof window.getComputedStyle != "undefined"){
                return window.getComputedStyle(this.elements[i], null)[attr]
            }else if(this.elements[i].currentStyle != 'undefined'){

                return this.elements[i].currentStyle[attr];
            }
        }
    }else if(arguments.length == 2){
        for(var i=0;i<this.elements.length;i++){
                this.elements[i].style[attr] = value;
        }
    }
    return this;
}
//绑定事件
mTools.prototype.on = function(type, handler){
    if(this.elements[0].addEventListener){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].addEventListener(type, handler, false);
        }
    }else if(this.elements[0].attachEvent){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].attachEvent("on" + type, handler);
        }
    }
}

//移除事件
mTools.prototype.off = function(type, handler){
    if(this.elements[0].removeEventListener){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].removeEventListener(type, handler, false);
        }
    }else if(this.elements[0].detachEvent){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].detachEvent("on" + type, handler);
        }
    }
}
//DOM加载


//获取值
mTools.prototype.val = function(value){
    if(arguments.length == 0){
        var val = [];
        for(var i=0;i<this.elements.length;i++){
            val.push(this.elements[i].value);
        }
        return val;
    }else if(arguments.length == 1){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].value = value;
        }
        return this;
    }
}

//添加类
mTools.prototype.addClass = function(){

}


//更改文本
mTools.prototype.html = function(value){
    var html = [];
    if(arguments.length == 0){
        for(var i=0;i<this.elements.length;i++){
            html.push(this.elements[i].innerHTML);
        }
        return html;
    }else if(arguments.length ==1){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].innerHTML = value;
        }
        return this;
    }
}
//求和
mTools.prototype.sum = function(){
    var arr = this.val();
    var sum =0;
    for(var i=0;i<arr.length;i++){
        if(arr[i] != "" && arr[i] != null){
            sum += parseInt(arr[i]);
        }
    }
    return sum;
}
//获取元素子节点，只获取元素节点
mTools.prototype.child = function(element){
    var elearr =[];

    for(var i=0;i<this.elements.length;i++){

        for(var j=0;j<this.elements[i].childNodes.length;j++){
            if(this.elements[i].childNodes[j].nodeType == 1){
                elearr.push(this.elements[i].childNodes[j]);
            }
        }

    }
    console.log(elearr);
//    for(k in elearr){
//        console.log(elearr[k]);
//    }
    //this.elements = elearr;
    //return this;
}

/*数量*/
mTools.size =  function(){
    return this.elements.length;
}
/*隐藏与显示*/
mTools.prototype.hide = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = "none";
    }
}
mTools.prototype.show = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = "block";
    }
}
mTools.prototype.toggle = function(){
    for(var i =0;i < this.elements.length; i++){
        this.elements[i].style.display = this.elements[i].style.display == "none" ? "block" : "none";
    }
}

/*设置html*/
mTools.prototype.html = function(text){
    if(arguments.length == 0){
        if(this.elements.length == 1){
            return this.elements[0].innerHTML;
        }else{
            var arr = [];
            for(var i=0;i<this.elements.length;i++){
                arr.push(this.elements[i].innerHTML);
            }
            return arr;
        }
    }else{
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].innerHTML = text;
        }
        return this;
    }
}