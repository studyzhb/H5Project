var snake=classCompre.create(function(ele,cax,speed,size,initlen){
	this.speed=speed;
	this.size=size;
	this.ele=ele;
	this.len=initlen;
	this.x=size;
	this.y=size;
	this.cax=cax;
	this.map=[];
	this.dir=2;
	this.init();
},{
	init:function(){
		var me=this;
		/*document.onkeydown=function(e){
			var evt=e||event;
			switch(evt.keyCode){
				//左
				case 37:
					me.dir=4;
					//me.x+=me.size;
					break;
				//右
				case 39:
					me.dir=2
					//me.x-=me.size;
					break;
				//上
				case 38:
					me.dir=1;
					//me.y-=me.size;
					break;
				//下
				case 40:
					me.dir=3;
					//me.y+=me.size;
					break;
			}
		}*/
		document.addEventListener('touchstart',function(e){
			me.startX=e.touches[0].clientX;
			me.startY=e.touches[0].clientY;
			
		});
		document.addEventListener('touchend',function(e){
			me.endX=e.changedTouches[0].clientX;
			me.endY=e.changedTouches[0].clientY;
			me.absX=me.endX-me.startX;
			me.absY=me.endY-me.startY;
			//水平方向
			if(Math.abs(me.absX)>Math.abs(me.absY)){
				//右
				if(me.absX>0){
					if(me.dir!=4){
						me.dir=2;
					}
				}else{
					if(me.dir!=2){
						me.dir=4;
					}
				}
			}else{
				//xia
				if(me.absY>0){
					if(me.dir!=1){
						me.dir=3;
					}
				}else{
					if(me.dir!=3){
						me.dir=1;
					}
				}
			}
			
			
		});
		this.startGame();
	},
	startGame:function(){
		var me=this;
		clearInterval(this.timer);
		me.cax.beginPath();
		me.suijiFood();
		this.timer=setInterval(function(){
			switch(me.dir){
				case 1:
					me.y-=me.size;
					break;
				case 2:
					me.x+=me.size;
					break;
				case 3:
					me.y+=me.size;
					break;
				case 4:
					me.x-=me.size;
					break;
			}
			
			me.cax.fillStyle='#840000';
			me.cax.fillRect(me.x,me.y,me.size,me.size);
			me.collision();
			me.map.push({x:me.x,y:me.y});
			me.move();
		},this.speed);
	},
	collision:function(){
		var me=this;
		for (var i=0;i<me.map.length;i++) {
				if(me.x==me.map[i].x&&me.y==me.map[i].y){
					alert('zhuangdao ziji');
					location.reload();
				}
		}
		if(me.food==me.x&&me.food==me.y){
			me.len++;
			me.suijiFood();
		}
		
		if(me.x>me.ele.width-me.size||me.x<0||me.y<0||me.y>me.ele.height-me.size){
			alert('siwang');
			location.reload();
		}
	},
	move:function(){
		var me=this;
		if(me.map.length>=me.len){
				me.deleEle=me.map.shift();
				me.cax.clearRect(me.deleEle.x,me.deleEle.y,me.size,me.size);
		}
	},
	suijiFood:function(){
		this.food=Math.floor(Math.random()*this.ele.width/this.size)*this.size;
		this.cax.beginPath();
		this.cax.fillRect(this.food,this.food,this.size,this.size);
		this.cax.closePath();
	}
	
});