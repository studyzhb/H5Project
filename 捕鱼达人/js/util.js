
var util={
	/**
	 * @param {Object} obj1需要检测的物体对象1
	 * @param {Object} obj2需要检测的物体对象2
	 */
	pz:function(obj1,obj2){  //碰撞检测
		var L1 = obj1.offsetLeft;
		var R1 = obj1.offsetLeft + obj1.offsetWidth;
		var T1 = obj1.offsetTop;
		var B1 = obj1.offsetTop + obj1.offsetHeight;
		var L2 = obj2.offsetLeft;
		var R2 = obj2.offsetLeft + obj2.offsetWidth ;
		var T2 = obj2.offsetTop;
		var B2 = obj2.offsetTop + obj2.offsetHeight;
		// var L2 = obj2.offsetLeft+obj2.parentNode.offsetLeft;
		// var R2 = obj2.offsetLeft + obj2.offsetWidth + obj2.parentNode.offsetLeft;
		// var T2 = obj2.offsetTop + obj2.parentNode.offsetTop;
		// var B2 = obj2.offsetTop + obj2.offsetHeight + obj2.parentNode.offsetTop;
		
		if( R1<L2 || L1>R2 || T1>B2 || B1<T2 ){
			return false;
		}
		else{
			return true;
		}
	},
	/*checkArea:function(obj,fishData){
		console.log(fishData);
		for (var i = 0; i < fishData.length; i++) {
			if(fishData[i].fishDiv.offsetLeft>obj.offsetLeft&&fishData[i].fishDiv.offsetLeft+fishData[i].fishDiv.offsetWidth<obj.offsetLeft+obj.offsetWidth){
				if(fishData[i].fishDiv.offsetTop>obj.offsetTop&&fishData[i].fishDiv.offsetTop+fishData[i].fishDiv.offsetHeight<obj.offsetTop+obj.offsetHeight){
					fishData[i].blood-=obj.power;
					if(fishData[i].blood<=0){
						$(fishData[i].fishDiv).remove();
						alert(fishData.length);
						fishData.splice(i,1);
						i--; 
					}
				}
			}
		}
	},*/
	sources:{fish1:'images/fish1.png',
			fish2:'images/fish2.png',
			fish3:'images/fish3.png',
			fish4:'images/fish4.png',
			fish5:'images/fish5.png',
			fish6:'images/fish6.png',
			fish7:'images/fish7.png',
			fish8:'images/fish8.png',
			fish9:'images/fish9.png',
			fish10:'images/fish10.png',
			shark11:'images/shark1.png',
			shark12:'images/shark2.png',
		},
	type:{fish1:"51,31",fish2:"72,55",fish3:"68,52",fish4:"77,55",fish5:"107,112",fish6:"105,77",
			fish7:"81,142",fish8:"167,121",fish9:"149,172",fish10:"163,183",shark11:"509,265",shark12:"516,265"},
	fishes:{
			fish1Map:['-3 -1','-3 -38','-3 -76','-3 -113','-3 -155','-3 -191','-3 -227','-3 -265'],
			fish2Map:['-5 -5','-5 -67','-5 -129','-5 -195','-5 -257','-5 -321','-5 -385','-5 -448'],
			fish3Map:['-3 -1','-3 -56','-3 -113','-3 -168','-3 -224','-3 -278','-3 -335','-3 -390'],
			fish4Map:['0 -2','0 -61','0 -120','0 -179','0 -238','0 -296','0 -356','0 -415'],
			fish5Map:['0 -18','0 -140','0 -264','0 -376','0 -491','0 -612','0 -735','0 -857'],
			fish6Map:['0 -1','0 -80','0 -160','0 -240','0 -317','0 -396','0 -475','0 -554','0 -622','0 -713','0 -790','0 -872'],
			fish7Map:['-5 -3','-8 -156','-9 -305','-10 -454','-6 -614','-6 -755','-4 -907','-5 -1060','-4 -1210','-5 -1362'],
			fish8Map:['-4 0','-4 -127','-4 -254','-4 -381','-4 -508','-4 -632','-4 -757','-4 -884','-4 -1010','-4 -1135','-4 -1262','-4 -1386'],
			fish9Map:['-16 -6','-16 -191','-16 -381','-16 -574','-16 -757','-16 -929','-16 -1105','-16 -1284','-16 -1467','-16 -1662','-16 -1831','-16 -2028'],
			fish10Map:['-10 -11','-10 -187','-10 -381','-10 -561','-10 -770','-10 -954','-10 -1142','-10 -1329','-10 -1512','-10 -1692'],
			shark11Map:["0 0","0 -265","0 -530","0 -808", "0 -1087","0 -1352", "0 -1620", "0 -1885", "0 -2150","0 -2431","0 -2705","0 -2975"],
			shark12Map:["0 0","0 -265","0 -555","0 -835", "0 -1100","0 -1365", "0 -1630", "0 -1920", "0 -2185","0 -2460","0 -2735","0 -3010"]
		},
	fishLive:{
			fish1Map:['-3 -1','-3 -38','-3 -76','-3 -113'],
			fish2Map:['-5 -5','-5 -67','-5 -129','-5 -195'],
			fish3Map:['-3 -1','-3 -56','-3 -113','-3 -168'],
			fish4Map:['0 -2','0 -61','0 -120','0 -179'],
			fish5Map:['0 -18','0 -140','0 -264','0 -376'],
			fish6Map:['0 -1','0 -80','0 -160','0 -240','0 -317','0 -396','0 -475','0 -554'],
			fish7Map:['-5 -3','-8 -156','-9 -305','-10 -454','-6 -614','-6 -755'],
			fish8Map:['-4 0','-4 -127','-4 -254','-4 -381','-4 -508','-4 -632','-4 -757','-4 -884'],
			fish9Map:['-16 -6','-16 -191','-16 -381','-16 -574','-16 -757','-16 -929','-16 -1105','-16 -1284'],
			fish10Map:['-10 -11','-10 -187','-10 -381','-10 -561','-10 -770','-10 -954'],
			shark11Map:["0 0","0 -265","0 -530","0 -808", "0 -1087","0 -1352", "0 -1620", "0 -1885"],
			shark12Map:["0 0","0 -265","0 -555","0 -835", "0 -1100","0 -1365", "0 -1630", "0 -1920"]
		},
		fishDead:{
			fish1Map:['-3 -155','-3 -191','-3 -227','-3 -265'],
			fish2Map:['-5 -257','-5 -321','-5 -385','-5 -448'],
			fish3Map:['-3 -224','-3 -278','-3 -335','-3 -390'],
			fish4Map:['0 -238','0 -296','0 -356','0 -415'],
			fish5Map:['0 -491','0 -612','0 -735','0 -857'],
			fish6Map:['0 -622','0 -713','0 -790','0 -872'],
			fish7Map:['-4 -907','-5 -1060','-4 -1210','-5 -1362'],
			fish8Map:['-4 -1010','-4 -1135','-4 -1262','-4 -1386'],
			fish9Map:['-16 -1467','-16 -1662','-16 -1831','-16 -2028'],
			fish10Map:['-10 -1142','-10 -1329','-10 -1512','-10 -1692'],
			shark11Map:["0 -2150","0 -2431","0 -2705","0 -2975"],
			shark12Map:["0 -2185","0 -2460","0 -2735","0 -3010"]
		}

}
module.exports=util;
/*
type:[{fish10:"163,183"}],
	fish10Map:['-10 -11','-10 -187','-10 -381','-10 -561','-10 -770','-10 -954','-10 -1142','-10 -1329','-10 -1512','-10 -1692'],
*/