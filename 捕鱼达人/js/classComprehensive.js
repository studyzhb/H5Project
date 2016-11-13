var classCompre=function(){
	//创建类
	/*
		fn,被继承的那个函数
		methods，创建的原型上的方法
		parent,原型对象
	*/
	var create=function(fn,methods,parent){
		var _initialize,_instances=[],instance,_unique=0;
		_initialize=function(args){
			fn.apply(this,args);
		}
		if(parent){
			_initialize.prototype=parent;
		}

		for(var proName in methods){
			_initialize.prototype[proName]=methods[proName];
		}
		//do sth
		_initialize.prototype.implement=function(){

		}

		var getInstance=function(){
			var args=Array.prototype.slice.call(arguments,0);
			_instances[_unique++]=new _initialize(args);
			return _instances[_unique-1];
		}
		var empty=function(){
			for(var i=0,c;c=_instances[i++];){
				c= null;
			}
			_instances=[];
			_instances.length=0;
			_unique=0;
		}

		var getCount=function(){
			return _unique;
		}
		
		var removeOne=function(index){
			_unique==0?_unique=0:_unique--;
			_instances.splice(index,1);
			/*var arr=_instances.slice(0);
			_instances=[];
			for (var i = 0; i < arr.length; i++) {
				if(i==index){
					continue;
				}
				_instances.push(arr[i]);
			}*/
		} 

		var getPrototype=function(){
			return _initialize.prototype;
		}

		var subClass=function(){
			var a=classCompre.create(fn,methods,_instances[0]||getInstance());
			return a;
		}
		var interface=function(key,fn){
			if(_initialize){
				_initialize[key]=fn;
			}
		}

		return {
			interface:interface,
			getInstance:getInstance,
			empty:empty,
			subClass:subClass,
			getCount:getCount,
			removeOne:removeOne,
			getPrototype:getPrototype,
			getInstances:function(){
				return _instances;
			}
		}
	};

	return {
		create:create,
		getInstances:function(){
			return _instances;
		}
	}

}();

module.exports=classCompre;