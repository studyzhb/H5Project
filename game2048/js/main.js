var board=new Array();
var score=0;
var hasCollide=new Array();
$(function(){
	prepareForMobile();
	newgame();
	$(document).keydown(function(e){
		switch(e.keyCode){
			//上38
			case 38:
			e.preventDefault();
				if(!moveTop()){
					isGameOver();
				}else{
					updateBoarderNum();
				}
				break;
			//下40
			case 40:
			e.preventDefault();
				if(!moveBottom()){
					isGameOver();
				}else{
					updateBoarderNum();
				}
				break;
			//左37
			case 37:
			e.preventDefault();
				if(!moveLeft()){
					isGameOver();
				}else{
					updateBoarderNum();
				}
				break;
			//右39
			case 39:
			e.preventDefault();
				if(!moveRight()){
					isGameOver();
				}else{
					updateBoarderNum();
				}
				break;
			default:
				break;
		}
	});
});

document.addEventListener('touchmove',function(e){
	e.preventDefault();
});
/**
 * 移动端触摸事件
 */
document.addEventListener('touchstart',function(e){
	startX=e.touches[0].pageX;//触摸事件中获取的触摸位置的横纵坐标
	startY=e.touches[0].pageY;
});

document.addEventListener('touchend',function(e){
	//获取触摸位置改变时的位置信息（即离开屏幕时的坐标信息）
	endX=e.changedTouches[0].pageX;
	endY=e.changedTouches[0].pageY;
	
	var deltax=endX-startX;
	var deltay=endY-startY;
	
	if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
		return;
	}
	
	//x轴方向滑动
	if(Math.abs(deltax)>=Math.abs(deltay)){
		//向右
		if(deltax>0){
			if(!moveRight()){
					isGameOver();
				}else{
					updateBoarderNum();
				}
		}else{
			if(!moveLeft()){
					isGameOver();
				}else{
					updateBoarderNum();
				}
		}
	}else{
		//向下
		if(deltay>0){
			if(!moveBottom()){
					isGameOver();
				}else{
					updateBoarderNum();
				}
		}else{
			if(!moveTop()){
					isGameOver();
				}else{
					updateBoarderNum();
				}
		}
	}
	
});


function prepareForMobile () {
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSideLength=100;
		cellSpace=20;
	}
	$('#grid-container').css({
		width:gridContainerWidth-2*cellSpace,
		height:gridContainerWidth-2*cellSpace,
		padding:cellSpace
	});
	$('.grid-cell').css({
		width:cellSideLength,
		height:cellSideLength,
	});
}

function newgame () {
	init();
}


function isGameOver () {
	console.log("aaa");
	if(!hasEmpty()){
		console.log("jishu");
		alert('游戏结束');
		newgame();
	}
}

function init () {
	score=0;
	for (var i=0;i<4;i++) {
		board[i]=[];
		hasCollide[i]=[];
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasCollide[i][j]=false;
			var $gridCell=$('#gird-cell-'+i+'-'+j);
			$gridCell.css({
				left:getPositionX(i,j)+'px',
				top:getPositionY(i,j)+'px'
			});
		}
	}
	updateBoarderNum();
	updateBoarderNum();
}

function updateBoardView () {
	$('.number-cell').remove();
	$('#score').html(score);
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			hasCollide[i][j]=false;
			var $li=$("<li class='number-cell' id='number-cell-'"+i+"-"+j+" ></li>").appendTo($('#grid-container'));
			$li.css({
				left:getPositionX(i,j)+'px',
				top:getPositionY(i,j)+'px'
			});
			if(board[i][j]==0){
				$li.css({
					width:0,
					height:0,
				});
			}else{
				$li.html(board[i][j]);
				$li.css({
					width:cellSideLength,
					height:cellSideLength,
				});
				
				
			}
		}
	}
	$('.number-cell').css({
		'line-height':cellSideLength+'px',
		'font-size':0.6*cellSideLength+'px'
	});
}


function updateBoarderNum() {
	var num=Math.random()<0.5?2:4;
	chooseBoarderSeat(num);
}

function chooseBoarderSeat (num) {
	if(!hasEmpty()){
		return;
	}
	var times=0;
	var x=Math.floor(Math.random()*4);
	var y=Math.floor(Math.random()*4);
	while(times<50){
		if(board[x][y]==0){
			board[x][y]=num;
			updateBoardView();
			break;
		}
		x=Math.floor(Math.random()*4);
		y=Math.floor(Math.random()*4);
	}
	if(times==50){
		for (var i=1;i<4;i++) {
			for (var j=0;j<4;j++) {
				if(board[i][j]==0){
					board[x][y]=num;
					updateBoardView();
					return;
				}
			}
		}
	}
	
}


function moveTop(){
	if(!canMoveTop(board)){
		return false;
	}
	for (var i=1;i<4;i++) {
		for (var j=0;j<4;j++) {
			if(board[i][j]!=0){
				for (var k=0;k<i;k++) {
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasCollide[k][j]){
						board[k][j]+=board[i][j];
						score+=board[i][j];
						board[i][j]=0;
						hasCollide[k][j]=true;
						continue;
					}
				}
			}
		}
	}	
	updateBoardView();
	return true;
}
function moveBottom(){
	if(!canMoveBottom(board)){
		return false;
	}
	for (var i=0;i<3;i++) {
		for (var j=0;j<4;j++) {
			if(board[i][j]!=0){
				for (var k=3;k>i;k--) {
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockHorizontal(j,k,i,board)&&!hasCollide[k][j]){
						board[k][j]+=board[i][j];
						score+=board[i][j];
						board[i][j]=0;
						hasCollide[k][j]=true;
						continue;
					}
				}
			}
		}
	}	
	updateBoardView();
	return true;
}
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	for (var i=0;i<4;i++) {
		for (var j=0;j<3;j++) {
			if(board[i][j]!=0){
				for (var k=3;k>j;k--) {
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasCollide[i][k]){
						board[i][k]+=board[i][j];
						score+=board[i][j];
						board[i][j]=0;
						hasCollide[i][k]=true;
						continue;
					}
				}
			}
		}
	}	
	updateBoardView();
	return true;
}

function moveLeft () {
	if(!canMoveLeft(board)){
		return false;
	}
	for (var i=0;i<4;i++) {
		for (var j=1;j<4;j++) {
			if(board[i][j]!=0){
				for (var k=0;k<j;k++) {
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasCollide[i][k]){
						board[i][k]+=board[i][j];
						score+=board[i][j];
						board[i][j]=0;
						hasCollide[i][k]=true;
						continue;
					}
				}
			}
		}
	}	
	updateBoardView();
	return true;
}
























/**
 * =========================================================================================================
 */


/*KeyManage: function(){

		var key_fps = Config.key_fps / Config.fps | 0;

		var addEventListener = function( element, e, fn ){
			if( element.addEventListener ){
				element.addEventListener( e, fn, false );
			}else{
				element.attachEvent( 'on' + e, fn );
			}
		}

		return function( keyMap ){

			var self = this, _move = keyMap.move, _mapping = keyMap.mapping, _attack = keyMap.attack, _map = {}, _attack_map = {}, _stack = [], _keydown, _keyup, timer, count = 0, lock = false, event = Event();
			
			var keyQueue = Interfaces.Queue();

			addEventListener( document, 'keydown', function( ev ){
		
				if ( lock ) return;
		
				var keycode = ev.keyCode, key = _mapping[ keycode ];

				if ( !key ) return;

		/*********************** 动作为攻击, 立即触发 ************************/		
/*
				var attackKey = _attack.normal[ key ];

				if ( attackKey ){
					
					if ( _attack_map[ attackKey ] === true ) return;
					
					return setTimeout( function(){
						
						_attack_map[ attackKey ] = true;
						
						if ( keyQueue.isEmpty() ){    //如果队列里没有动作(特殊技能), 加上缓存里的动作(移动键).
							var _moveOp = _move[ getKeyMap() ] || _move[ getKeyMapFirst() ];
							_moveOp && keyQueue.add( _moveOp );
						}

						keyQueue.add( attackKey );

						var keyqueue = keyQueue.get().slice( 0 );

						var keys = keyqueue.join( ',' );   //加上队列里的动作.

						keyQueue.clean();

						return _keydown && _keydown( _attack.special[ keys ] || attackKey );

					}, 50 );
				}
*/
		/************************ 动作为移动, 添加到队列 ************************/
		/*
				_map[ key ] = true;

			})

			addEventListener( document, 'keyup', function( ev ){
				
				if ( lock ) return;
				
				var keycode = ev.keyCode, key = _mapping[ keycode ];
				if ( !key ) return;
				var attackKey = _attack.normal[ key ];
				_attack_map[ attackKey ] = false;
				_map[ key ] = false;
			})

			var getKeyMap = function(){
				var key = '';
				for ( var i in _map ){
					_map[i] && ( key += i );
				}
				return key;
			}

			var getKeyMapFirst = function(){
				for ( var i in _map ){
					return _map[i] && i;
				}
				return '';
			}

			var framefn = function(){   //给move用的
				
				if ( lock ) return;

				var op = _move[ getKeyMap() ] || _move[ getKeyMapFirst() ];
				op ? _keydown( op ) : _keyup();

				if ( op ){
					var last = keyQueue.last();
					if ( !last || op !== last ) keyQueue.add( op );
				}

				if ( ++count % key_fps === 0 ){
					count = 0;
					keyQueue.clean();
				}
			}

			var timer = Timer.add( framefn );

			timer.start();

			var match = function( fn ){
				_keydown = fn;
			}

			var unmatch = function( fn ){
				_keyup = fn;
			}

			var mirror = function( direction ){
				_move = direction === 1 ? keyMap.move : keyMap.move_mirror;
			}

			var start = function(){
				lock = false;
			}
			
			var stop = function(){
			    _map = {};
				keyQueue.clean();
				lock = true;
			}
			
			return {
				event: event,
				match: match,
				unmatch: unmatch,
				mirror: mirror,
				start: start,
				stop: stop
			}	

		}
		
		
	}()*/
























