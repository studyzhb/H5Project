var classCompre=function(){
	var create=function(fn,methods,parent){
		var _initlizable,_instances=[],_unique;
		_initlizable=function(args){
			fn.apply(this,args);
		}
		
		if(parent){
			_initlizable.prototype=parent;	
		}
		
		for (var proName in methods) {
			_initlizable.prototype[proName]=methods[proName];
		}
		
		var getInstance=function(){
			var args=Array.prototype.slice.call(arguments,0);
			_instances[_unique++]=new _initlizable(args);
			return _instances[_unique-1];
		}
		
		var getCount=function(){
			return _unique;
		}
		
		return {
			getCount:getCount,
			getInstance:getInstance
		}
	}
	
	return {
		create:create
	}
}();
