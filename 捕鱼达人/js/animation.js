"use strict";

var DEFAULT_INTERVAL=1000/60;

/**
 * animation
 */
//初始化状态
var STATE_INITIAL=0;
//开始状态
var STATE_START=1;
//停止状态
var STATE_STOP=2;
//同步任务
var TASK_SYNC=0;
//异步任务
var TASK_ASYNC=1;

/**
 * timeline
 */
//初始化状态
var STATE_INTERVAL_TIME=0;
//开始状态
var STATE_START_TIME=1;
//停止状态
var STATE_STOP_TIME=2;


/**
 * 
 * @param {Function} callback
 */
function next(callback){
	callback&&callback();
}

/**
 * 
 */
function Animation(){
	this.taskQueue=[];
	this.index=0;
	this.timeline=new Timeline();
	this.state=STATE_INITIAL;
}

/**
 * 预加载图片，同步任务
 * @param {Array} imglist 图片数组
 */
Animation.prototype.loadImage=function(imglist){
	var taskFn=function(next){
		loadImages(imglist.slice(),next);
	};
	var type=TASK_SYNC;
	
	return this._add(taskFn,type);
};


/**
 * 异步任务改变背景图片的position
 * @param {Object} ele 对象名
 * @param {Array} positions 改变的位置的坐标数组
 * @param {String} imgUrl 图片的路径
 */
Animation.prototype.changePosition=function(ele,positions,imgUrl){
	var len=positions.length;
	var taskFn;
	var type;
	if(len){
		var me=this;
		taskFn=function(next,time){
			if(imgUrl){
				ele.style.backgroundImage="url("+imgUrl+")";
			}
			//获得当前背景图片位置索引
			var minIndex=Math.min(Math.floor(time/me.interval),len-1);
			//console.log(minIndex);
			var position=positions[minIndex].split(" ");
			//改变demo对象背景图片的位置
			ele.style.backgroundPosition=position[0]+"px "+position[1]+"px";
			if(minIndex===len-1){
				next();
			}
		};
		type=TASK_ASYNC;
	}else{
		taskFn=next;
		type=TASK_SYNC;
	}
	
	return this._add(taskFn,type);
	
};


/**
 * 添加一个异步任务，通过改图片的src来实现帧动画
 * @param {Object} ele img标签
 * @param {Array} imglist 图片数组
 */
Animation.prototype.changeSrc=function(ele,imglist){
	var len=imglist.length;
	var taskFn;
	var type;
	if (len) {
		var me=this;
		taskFn=function(next,time){
			//获取当前图片索引
			var index=Math.min(Math.floor(time/me.interval),len-1);
			//改变image对象的图片地址
			ele.src=imglist[index];
			if(index===len-1){
				next();
			}
		};
		type=TASK_ASYNC;
	}else{
		taskFn=next;
		type=TASK_SYNC;
	}
	return this._add(taskFn,type);
};

/**
 * 异步任务
 * 自定义动画每帧执行的函数
 * @param {Function} taskFn
 */
Animation.prototype.enterFrame=function(taskFn){
	return this._add(taskFn,TASK_ASYNC);
};

/**
 *同步任务 上一个任务完成后执行的回调函数
 * @param {Function} callback
 */
Animation.prototype.then=function(callback){
	var taskFn=function(next){
		callback();
		next();
	};
	var type=TASK_SYNC;
	return this._add(taskFn,type);
};

/**
 * 开始执行任务，异步执行的间隔
 * @param {Number} interval
 */
Animation.prototype.start=function(interval){
	if(this.state===STATE_START){
		return this;
	}
	if(!this.taskQueue.length){
		return this;
	}
	this.state=STATE_START;
	this.interval=interval;
	this._runTask();
	return this;
};

/**
 * 添加一个同步任务，回退到上一个任务
 * @param {Number} times 重复的次数
 */
Animation.prototype.repeat=function(times){
	var me=this;
	var taskFn=function(){
		if(typeof times==='undefined'){
			//无限回退到上一个任务
			me.index--;
			me._runTask();
			return;
		}
		if(times){
			times--;
			me.index--;
			me._runTask();
		}else{
			//达到重复次数，跳转下一个
			var task=me.taskQueue[me.index];
			me._next(task);
		}
	};
	var type=TASK_SYNC;
	
	return this._add(taskFn,type);
};

/**
 * 
 */
Animation.prototype.repeatForever=function(){
	return this.repeat();
};

/**
 * 设置当前任务执行完到下次任务开始的等待时间
 * @param {Object} time
 */
Animation.prototype.wait=function(time){
	if(this.taskQueue&&this.taskQueue.length>0){
		this.taskQueue[this.taskQueue.length-1].wait=time;
	}
	return this;
};

/**
 * 暂停当前执行的异步任务
 */
Animation.prototype.pause=function(){
	if(this.state===STATE_START){
		this.state=STATE_STOP;
		this.timeline.stop();
		return this;
	}
	return this;
};

/**
 * 重新执行上一次暂停的异步任务
 */
Animation.prototype.restart=function(){
	if(this.state===STATE_STOP){
		this.state=STATE_START;
		this.timeline.restart();
		return this;
	}
	return this;
};

/**
 * 释放资源
 */
Animation.prototype.dispose=function(){
	if(this.state!==STATE_INITIAL){
		this.state=STATE_INITIAL;
		this.taskQueue=null;
		this.timeline.stop();
		this.timeline=null;
		return this;
	}
	return this;
};

/**
 * 添加一个任务到任务队列中
 * @param {Function} taskFn 任务方法
 * @param {Number} type 任务类型
 */
Animation.prototype._add=function(taskFn,type){
	this.taskQueue.push({taskFn:taskFn,type:type});
	return this;
}

/**
 * 执行任务
 */
Animation.prototype._runTask=function(){
	if(!this.taskQueue||this.state!==STATE_START){
		return;
	}
	
	if(this.index===this.taskQueue.length){
		this.dispose();
		return;
	}
	//获得任务链上的当前任务
	var task=this.taskQueue[this.index];
	
	if(task.type===TASK_SYNC){
		this._syncTask(task);
	}else{
		this._asyncTask(task);
	}
};

/**
 * 同步任务
 * @param {Object}  task 执行的任务对象
 */
Animation.prototype._syncTask=function(task){
	var me=this;
	var next=function(){
		//下一个任务
		me._next(task);
	};
	
	var taskFn=task.taskFn;
	taskFn(next);
};

/**
 * 异步任务
 * @param {Object} task 执行的任务对象
 */
Animation.prototype._asyncTask=function(task){
	var me=this;
	//定义每一帧执行的回调函数
	var enterFrame=function(time){
		var taskFn=task.taskFn;
		var next=function(){
			//停止当前任务
			me.timeline.stop();
			//执行下一个任务
			me._next(task);
		};
		taskFn(next,time);
	};
	this.timeline.onenterframe=enterFrame;
	this.timeline.start(this.interval);
};


Animation.prototype._next=function(task) {
	var me=this;
	this.index++;
	task.wait?setTimeout(function(){
		me._runTask();
	},task.wait):this._runTask();
}


/**
 * ==========================================================================================================================
 */


/**
 * 
 * 执行异步任务
 * 
 * 
 */

function Timeline () {
	this.animationHandler=0;
	this.state=STATE_INTERVAL_TIME;
}

/**
 * 时间轴上每一次回调执行的函数
 * @param {Number} time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe=function(time){
	
};

/**
 * 动画开始
 * @param {Number} interval 每一次回调的时间间隔
 */
Timeline.prototype.start=function(interval){
	if(this.state===STATE_START_TIME){
		return;
	}
	this.state=STATE_START_TIME;
	this.interval=interval||DEFAULT_INTERVAL;
	startTimeline(this,new Date().getTime());
};

Timeline.prototype.stop=function(){
	if(this.state!==STATE_START_TIME){
		return;
	}
	this.state=STATE_STOP_TIME;
	
	//如果动画开始过，则记录动画从开始到现在所经历的时间
	if(this.startTime){
		this.dur=new Date().getTime()-this.startTime;
	}
//	cancelAnimationFrame(this.animationHandler);
	clearTimeout(this.animationHandler);
};

Timeline.prototype.restart=function(){
	if(this.state===STATE_START_TIME){
		return;
	}
	if(!this.dur||!this.interval){
		return;
	}
	this.state=STATE_START_TIME;
	
	startTimeline(this,new Date().getTime()-this.dur);
};

/**
 * 时间轴动画启动函数
 * @param {Object} timeline 实例对象
 * @param {Object} startTime 动画开始的时间戳
 */
function startTimeline (timeline,startTime) {
	timeline.startTime=startTime;
	nextTick.interval=timeline.interval;
	
	//记录上一次回调的时间戳
	var lastTick=new Date().getTime();
	nextTick();
	/**
	 * 每一帧执行的函数
	 */
	function nextTick () {
		var now=new Date().getTime();
		timeline.animationHandler=setTimeout(nextTick,nextTick.interval||DEFAULT_INTERVAL);
		//如果当前时间与上次回调函数的时间戳大于设置的时间
		//表示这一次可以执行回调
		if(now-lastTick>=timeline.interval){
			timeline.onenterframe(now-startTime);
			lastTick=now;
		}
	}
	
}

/**
 * ==========================================================================================================================
 */


/**
 * 预加载图片（第一步）
 */

var __id=0;

function getId(){
	return ++__id;
}

/**
 * 
 * @param {Array} images
 * @param {Function} callback 图片加载完成后的回调
 * @param Number timeout 超时的时长
 */
function loadImages(images,callback,timeout){
	//完成图片的计数器
	var count=0;
	//加载成功与否的标志位
	var tagSuccess=true;
	//超时的图片ID
	var imgTimeoutId=0;
	//加载图片是否超时
	var isTimeout=false;
	//图片数组、对象 进行遍历
	for (var key in images) {
		if(!images.hasOwnProperty(key)){
			continue;
		}
		//获得每个图片元素
		//期望格式 是个对象{src:xxx}
		var item=images[key];
		
		if(typeof item==='string'){
			
			item=images[key]={src:item};
			
		}
		//
		if(!item||!item.src){
			continue;
		}
		
		//计数器+1
		count++;
		
		//设置图片元素的id
		item.id="__img__"+key+getId();
		
		item.img=window[item.id]=new Image();
		
		doLoad(item);
		
	}
	
	if(!count){
		callback(tagSuccess);
	}else if(timeout){
		imgTimeoutId=setTimeout(onTimeout,timeout);
	}
	
	
	
	
	/**
	 * 真正去加载图片的函数
	 * @param {Object} item
	 */
	function doLoad(item){
		item.status='loading';
		var img=item.img;
		//定义图片加载成功的回调函数
		img.onload=function(){
			tagSuccess=tagSuccess&&true;
			item.status="loaded";
			done();
		};
		
		//定义图片加载失败的回调函数
		img.onerror=function(){
			tagSuccess=false;
			item.status="error";
			done();
		};
		
		img.src=item.src;
		
		/**
		 *
		 * 每张图片加载完成后的回调
		 * 加载完成后计数器-1
		 */
		function done () {
			img.onload=img.onerror=null;
			
			delete window[item.id];
			
			if(!--count&&!isTimeout){
				callback(tagSuccess);
				clearTimeout(imgTimeoutId);
			}
		}

		
	}
	
	function onTimeout(){
		isTimeout=true;
		callback(false);
	}
	
}



module.exports=function(){
	return new Animation();
}























