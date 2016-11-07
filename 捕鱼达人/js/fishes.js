var Animation=require('./animation.js');
var util=require('./util.js');
var classCompre=require('./classComprehensive.js');
var screenWidth=document.documentElement.clientWidth;
var screenHeight=document.documentElement.clientHeight;
var player={
	score:666,
	level:0,
	ele:document.getElementsByClassName('num'),
	//分数资源
	sources:{
		0:'-3,-220',
		1:'-3,-196',
		2:'-3,-172',
		3:'-3,-148',
		4:'-3,-124',
		5:'-3,-100',
		6:'-3,-76',
		7:'-3,-52',
		8:'-3,-27',
		9:'-3,-4'
	},
	cannonLevel:[0,-84,-168,-252,-337,-420,-504],
	//屏幕分数
	screenScore:{
		goldCoin:{size:'60,61',sources:["0,0","0,-61","0,-122","0,-183","0,-244","0,-305","0,-366","0,-427","0,-488","0,-549","0,-610","0,-671"]},
		numCoin:{size:'33,42',sources:["-1,-3","-37,-3","-73,-3","-110,-3","-145,-3","-181,-3","-216,-3","-253,-3","-288,-3","-325,-3","-361,-3"]}
	},
	update:function(){
		var a=player.score+'';
		var arr=a.split('').reverse();
		//console.log(player.ele.length);
		for (var i = 0; i < player.ele.length; i++) {
		//console.log(player.ele[5-i])
			if(i<arr.length){
				player.ele[5-i].style.backgroundPosition=player.sources[arr[i]].split(',')[0]+'px '+player.sources[arr[i]].split(',')[1]+'px';
			}else{
				player.ele[5-i].style.backgroundPosition=player.sources['0'].split(',')[0]+'px '+player.sources['0'].split(',')[1]+'px';
			}
		};
	},
	showAnimation:function(index,obj){
		var coinAudio=document.getElementById('coinMusic');
		coinAudio.play();
		var scoreDiv=document.createElement('div');
		var leftXiushi=document.createElement('div');
		var rightScore=document.createElement('div');
		scoreDiv.setAttribute('style','position:absolute;width:76px;height:42px;color:#000;left:'+obj.offsetLeft+'px;top:'+obj.offsetTop+'px');
		leftXiushi.setAttribute('style','position:absolute;width:33px;height:42px;left:0;top:0;background:url(images/coinText.png) no-repeat '+this.screenScore.numCoin.sources[10].split(',')[0]+'px '+this.screenScore.numCoin.sources[10].split(',')[1]+'px');
		rightScore.setAttribute('style','position:absolute;width:33px;height:42px;right:0;top:0;background:url(images/coinText.png) no-repeat '+this.screenScore.numCoin.sources[index].split(',')[0]+'px '+this.screenScore.numCoin.sources[index].split(',')[1]+'px');
		document.body.appendChild(scoreDiv);
		scoreDiv.appendChild(leftXiushi);
		scoreDiv.appendChild(rightScore);
		setTimeout(function(){
			coinAudio.pause();
			document.body.removeChild(scoreDiv);
		},500);
	}
}
/**
鱼类
*/
var Fishes=classCompre.create(function(type){
	this.type=type;
	this.typeSize=type;
	this.blood=this.typeSize*1.5;
	this.score=10*type;
	this._init();
},{
	_init:function(){
		this.fishDiv=document.createElement('div');
		this.fishDiv.className='fishes';
		document.body.appendChild(this.fishDiv);
		//console.log(this.typeSize);
		this.start(this.typeSize);
	},
	start:function(typeSize){
		var me=this;	
		me.images=[];		
		for(var i in util.sources){
			me.images.push(util.sources[i]);
		}
		
		// for (var i = 1; i <= images.length-2; i++) {
			!function(i){
					var initW=2;
					var rTag=true;	
					var left=0;
					var inter=60;
					var speed=3;
					me.ani=new Animation();
					me.fishMapName=i<me.images.length-1?'fish'+i:'shark'+i;
					//console.log(fishMapName);
					me.fishDiv.index=i-1;
					me.fishDiv.style.width=util.type[me.fishMapName].split(',')[0]+'px';
					me.fishDiv.style.height=util.type[me.fishMapName].split(',')[1]+'px';
					me.fishDiv.style.top=Math.floor(Math.random()*document.body.clientHeight-me.fishDiv.offsetHeight-80)+'px';
					var finalLeft=document.body.clientWidth-me.fishDiv.offsetWidth;
					me.ani.loadImage(me.images).enterFrame(function(next,time){
							var r;
							var po;
							var ratio=time/inter;
							if(rTag){
								me.fishDiv.style.transform='rotate(0)';
								r=Math.min(left+speed*ratio,finalLeft);
								po=util.fishLive[me.fishMapName+'Map'][initW].split(" ");
								//console.log(po);
								if(r==finalLeft){
									next();
									rTag=false;
									initW=2;
									return;
								}
								
							}else{
								me.fishDiv.style.transform='rotate(180deg)';
								r=Math.max(finalLeft-speed*ratio,left);
								po=util.fishLive[me.fishMapName+'Map'][initW].split(" ");
								
								if(r==left){
									next();
									rTag=true;
									initW=2;
									return;
								}
							}	
							if(++initW==util.fishLive[me.fishMapName+'Map'].length-1){
								initW=0;
							}
							
							me.fishDiv.style.backgroundImage="url("+me.images[me.fishDiv.index]+")";
							me.fishDiv.style.backgroundPosition=po[0]+"px "+po[1]+"px";
							//console.log(div.style.backgroundPosition);
							me.fishDiv.style.left=r+"px";
							
						}).repeat().start(100);

					}(typeSize)
		// }
	},
	over:function(){
		var me=this;
		this.ani.dispose();
		var a1=new Animation();
		a1.changePosition(this.fishDiv,util.fishDead[me.fishMapName+'Map'],this.images[this.fishDiv.index]).repeat().start(100);
		setTimeout(function(){
			$(me.fishDiv).remove();
		},1000);
	}
});
/**
网类
*/
function Web(size,x,y,fishData){
	this.size='web'+size;
	this.left=x;
	this.top=y;
	this.power=size;
	this.fishData=fishData;
	this._init();
}
Web.prototype._init=function(){
	//console.log(this.left,this.top);
	this.webDiv=document.createElement('div');
	var size=this.sources[this.size]['size'].split(',');
	this.webDiv.setAttribute('style','left:'+(this.left-size[0]/2)+'px;top:'+(this.top-size[1]/2)+'px;width:'+this.sources[this.size]['size'].split(',')[0]+'px;height:'+this.sources[this.size]['size'].split(',')[1]+'px;position:absolute;background:url('+this.sources[this.size]['img']+') no-repeat');
	document.body.appendChild(this.webDiv);
	var me=this;
	me.webDiv.power=me.power;
	me.checkArea(me.webDiv,me.fishData);
	setTimeout(function(){
		$(me.webDiv).remove();
	},500);
}
Web.prototype.checkArea=function(obj,fishData){
		var me=this;
		for (var i = 0; i < fishData.length; i++) {
			if(fishData[i].fishDiv.offsetLeft>obj.offsetLeft&&fishData[i].fishDiv.offsetLeft+fishData[i].fishDiv.offsetWidth<obj.offsetLeft+obj.offsetWidth){
				if(fishData[i].fishDiv.offsetTop>obj.offsetTop&&fishData[i].fishDiv.offsetTop+fishData[i].fishDiv.offsetHeight<obj.offsetTop+obj.offsetHeight){
					fishData[i].blood-=obj.power;
					if(fishData[i].blood<=0){
						player.score+=me.fishData[i].score;
						player.update();
						player.showAnimation(me.fishData[i].typeSize,me.fishData[i].fishDiv);
						me.fishData[i].over();
						Fishes.removeOne(i);
						i--; 
					}
				}
			}
		}
}
Web.prototype.sources={
	web1:{img:'images/web1.png',size:'116,118'},
	web2:{img:'images/web2.png',size:'137,142'},
	web3:{img:'images/web3.png',size:'156,162'},
	web4:{img:'images/web4.png',size:'180,174'},
	web5:{img:'images/web5.png',size:'163,155'},
	web6:{img:'images/web6.png',size:'191,181'},
	web7:{img:'images/web7.png',size:'242,244'},
}


var Bullet=classCompre.create(function(type,xS,yS,cannonX,angel){
	//console.log(cannonX);
	this.type='b'+type;
	this.size=type;
	this.speed=10;
	this.speedX=xS;
	this.speedY=yS;
	if(xS>0){
		this.left=cannonX.left+55;
	}else{
		this.left=cannonX.left+25;
	}
	this.top=cannonX.top+20;
	this.angel=angel;
	this._init();
},{
	_init:function(){
		this.bDiv=document.createElement('div');
		var dbBullet=this.sources[this.type]['size'].split(',');
		//console.log(this.left,$(window).height()-79)
		this.bDiv.setAttribute('style','transform:rotate('+this.angel+'deg);width:'+dbBullet[0]+'px;height:'+dbBullet[1]+'px;position:absolute;left:'+
			this.left+'px;top:'+this.top+'px;background:url('+this.sources[this.type]['img']+') no-repeat');
		document.body.appendChild(this.bDiv);
		this.start();
	},
	sources:{
		b1:{img:'images/bullet1.png',size:'24,26'},
		b2:{img:'images/bullet2.png',size:'25,29'},
		b3:{img:'images/bullet3.png',size:'27,31'},
		b4:{img:'images/bullet4.png',size:'29,33'},
		b5:{img:'images/bullet5.png',size:'30,34'},
		b6:{img:'images/bullet6.png',size:'31,35'},
		b7:{img:'images/bullet7.png',size:'32,38'},
		b8:{img:'images/bullet8.png',size:'30,34'}
	},
	start:function(){
		var me=this;
		me.fishData=Fishes.getInstances();
		this.timer=setInterval(function(){
			me.bDiv.style.left=me.bDiv.offsetLeft+me.speedX+'px';
			me.bDiv.style.top=me.bDiv.offsetTop+me.speedY+'px';
			if(me.fishData){
				for (var i = 0; i < me.fishData.length; i++) {
					// console.log(me.fishData[i]);
					if(me.fishData[i]){
						/*if(me.fishData[i].blood<=0){
							player.score+=me.fishData[i].score;
							// console.log(player.score);
							player.update();
							player.showAnimation(me.fishData[i].typeSize,me.fishData[i].fishDiv);
//							!function(i){
//								var ani=new Animation();
//								ani.changePosition(me.fishData[i].fishDiv,util.fishDead[me.fishData[i].fishMapName+'Map'],util.sources['fish'+(me.fishData[i].fishDiv.index+1)]);
//								setTimeout(function(){
//									
//								},500);
//							}(i);
							me.fishData[i].over();
							//$(me.fishData[i].fishDiv).remove();
							Fishes.removeOne(i);
							i--;
							continue;
						}*/
						if(util.pz(me.bDiv,me.fishData[i].fishDiv)){
							new Web(me.size,me.bDiv.offsetLeft,me.bDiv.offsetTop,me.fishData);
							$(me.bDiv).remove();
							//me.bDiv.parentNode.removeChild(me.bDiv);
							//console.log(me.bDiv);
							clearInterval(me.timer);
						}else if(me.bDiv.offsetTop<=0){
							$(me.bDiv).remove();
							//me.bDiv.parentNode.removeChild(me.bDiv);
							clearInterval(me.timer);
						}
					}
					
				};
				
			}
			
		},100);
	}
});
var tanchu=document.getElementById('tanchu');
var gameoverDiv=document.getElementById('gameover');
var Game={
	shipei:function(x,y){
		this.cannonX=Math.round(screenWidth*0.515+$('.cannon').width()/2);
		this.ratio=(-this.cannonX+y)/x;
		this.angel=Math.atan((y-this.cannonX)/x)*180/Math.PI;
	},
	start:function(){
		$('.fishes').remove();
		Fishes.empty();
		clearInterval(this.timer);
		var wraperheight=screenHeight-72;
		$('#wraper').css('height',wraperheight+'px');
		//player.score=300;
		player.update();
		//console.log(screenHeight,screenWidth);
		this.timer=setInterval(function(){
			if(Fishes.getCount()<30){
				Fishes.getInstance(Math.floor(Math.random()*7+1));
			}
		},1000);
		
		//console.log(Bullet.getInstance());
	//var arrCannon=[0,-84,-168,-252,-337,-420,-504],lev=0;
	
	$('#restart').click(function(){
		tanchu.style.display='none';
		gameoverDiv.style.display='none';
		location.reload();
		//Game.start();
	});


	$('.right').on('tap',function(e){
		e.stopPropagation();
		player.level==6?player.level=0:player.level++;
		$(this).addClass('activeRight');
		var me=this;
		$('.cannon').css('background-position','0 '+player.cannonLevel[player.level]+'px');
		setTimeout(function(){
			$(me).removeClass('activeRight');
		},50);
	});
	// $('.right').mouseup(function(){
	// 	$(this).removeClass('activeRight');
	// });
	$('.left').on('tap',function(e){
		e.stopPropagation();
		var me=this;
		player.level==0?player.level=6:player.level--;
		$(this).addClass('activeLeft');
		$('.cannon').css('background-position','0 '+player.cannonLevel[player.level]+'px');
		setTimeout(function(){
			$(me).removeClass('activeLeft');
		},50);
	});
	// $('.left').mouseup(function(){
	// 	$(this).removeClass('activeLeft');
	// });
	
	$('#wraper').on('touchend',function(e){
		//console.log(e.changedTouches[0].clientX+"pingmu",e.changedTouches[0].clientY);
		if(isClick){
			if(player.score>=(player.level+1)*5){
				player.score-=(player.level+1)*5;
				player.update();
				isClick=false;
				var cannonX=Math.round(screenWidth*0.515+$('.cannon').width()/2);
				var x=e.changedTouches[0].clientX-cannonX;
				var y=screenHeight-e.changedTouches[0].clientY;
				var angel=Math.atan(x/y);
				//Game.shipei(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
				angel=angel*180/Math.PI;
				//Game.shipei(x,y);
				Bullet.getInstance(player.level+1,10*x/y,-10,$('.cannon').offset(),angel);
				$('.cannon').css('transform','rotate('+angel+'deg)');
				/*
				alert(angel);
				alert(e.changedTouches[0].clientX);
				alert(e.changedTouches[0].clientY);
				alert(screenWidth);
				alert(screenHeight);*/
				// Bullet.getInstance(player.level+1,10*Game.ratio,-10,$('.cannon').offset(),Game.angel);
				// $('.cannon').css('transform','rotate('+Game.angel+'deg)');
				setTimeout(function(){isClick=true},500);
			}else{
				if(player.score<=0){
					tanchu.style.display='block';
					gameoverDiv.style.display='block';
				}else{
					alert('请更换炮台');
				}
			}
		}
	});
	}
}

module.exports=Game;




