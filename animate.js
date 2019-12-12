/*
* @Author: 27987
* @Date:   2019-12-12 01:16:51
* @Last Modified by:   27987
* @Last Modified time: 2019-12-12 19:12:48
*/
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
	var box=document.getElementById('box');
	var slider=document.getElementById('slider');
	var oNavlist=document.getElementById('nav').children;
     var left=document.getElementById('left');
     var right=document.getElementById('right');
     var tip=document.getElementById('tip');
     var index=1;
     var timer;
     var isMoving=false;
     var tipleft = parseInt(getStyle(tip,"left"));
     var s=2;
    setInterval(function(){
	if(tipleft == -450){
		tipleft=800;
	}
	tipleft = tipleft - s;
	tip.style.left = tipleft + "px";
},50);
     //自动轮播
     function next(){
     if(!isMoving){
     	isMoving=true;
      index++;
      navChange();
      animate(slider,{left:-1200*index},function(){
      	    if(index===6){
      		slider.style.left="-1200px";
      		index=1;
      	}
      	isMoving=false;
      });
     }
   }
     function prev(){
      if(isMoving){
        return;
      }
      isMoving=true;
      index--;
      navChange();
      animate(slider,{left:-1200*index},function(){
      	    if(index === 0){
      		slider.style.left="-6000px";
      		index=5;
      	}
      	isMoving=false;
      });
     }
     var timer=setInterval(next,3000);
     //箭头划入
     box.onmouseover=function(){
     	animate(left, {opacity:50});
     	animate(right,{opacity:50});
     	clearInterval(timer);
     }
     //箭头划出
     box.onmouseout=function(){
     	animate(left, {opacity:0});
     	animate(right,{opacity:0});
     	timer=setInterval(next,3000);
     }
     right.onclick = next;
     left.onclick = prev;
     //五个按钮滑动图片
     for(var i=0;i<oNavlist.length;i++){
     	oNavlist[i].idx=i;

     	oNavlist[i].onclick=function(){
        	index=this.idx+1;
     		animate(slider,{left:-1200*index})
     	}
     }
    function navChange(){
	for(var i = 0;i<oNavlist.length;i++){
		oNavlist[i].className = " ";
	}
	if(index === 6){
		oNavlist[0].className = "active";
	}
	else if(index === 0){
		oNavlist[4].className = "active";
	}
	else{
		oNavlist[index-1].className = "active";
	}
}
    for(var i = 0 ;i<oNavlist.length;i++){
	    oNavlist[i].idx = i;
	    oNavlist[i].onclick=function(){
		index = this.idx + 1;
		navChange();
		animate(slider,{left:-1200*index});
	}
}
