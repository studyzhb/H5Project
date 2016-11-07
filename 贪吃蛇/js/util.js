var util={
	isFunction:function(fun){
		return typeof fun=='function';
	},
	isArray: function( ary ){
		return Object.prototype.toString.call( ary ) === '[object Array]';
	},
	copy: function( _obj ){
		var obj = {};
		for ( var i in _obj ){
			if ( Util.isArray( _obj[i] ) ){
				obj[ i ] = _obj[ i ].slice( 0 );
			}else{
				obj[ i ] = _obj[ i ];	
			}
		}
		return obj;
	},
	isPlainObject:function(){
		
	},
	extend:function() {
	　　/*
	　　*target被扩展的对象
	　　*length参数的数量
	　　*deep是否深度操作
	　　*/
	　　var options, name, src, copy, copyIsArray, clone,
	　　　　target = arguments[0] || {},
	　　　　i = 1,
	　　　　length = arguments.length,
	　　　　deep = false;
	
	　　// target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
	　　// deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
	　　// 然后把第二个参数赋值给target
	　　if ( typeof target === "boolean" ) {
	　　　　deep = target;
	　　　　target = arguments[1] || {};
	
	　　　　// 将i赋值为2，跳过前两个参数
	　　　　i = 2;
	　　}
	
	　　// target既不是对象也不是函数则把target设置为空对象。
	　　if ( typeof target !== "object" && !this.isFunction(target) ) {
	　　　　target = {};
	　　}
	
	　　// 如果只有一个参数，则把jQuery对象赋值给target，即扩展到jQuery对象上
	　　if ( length === i ) {
	　　　　target = this;
	
	　　　　// i减1，指向被扩展对象
	　　　　--i;
	　　}
	
	　　// 开始遍历需要被扩展到target上的参数
	
	　　for ( ; i < length; i++ ) {
	　　　　// 处理第i个被扩展的对象，即除去deep和target之外的对象
	　　　　if ( (options = arguments[ i ]) != null ) {
	　　　　　　// 遍历第i个对象的所有可遍历的属性
	　　　　　　for ( name in options ) {
	　　　　　　　　// 根据被扩展对象的键获得目标对象相应值，并赋值给src
	　　　　　　　　src = target[ name ];
	　　　　　　　　// 得到被扩展对象的值
	　　　　　　　　copy = options[ name ];
	
	　　　　　　　　// 这里为什么是比较target和copy？不应该是比较src和copy吗？
	　　　　　　　　if ( target === copy ) {
	　　　　　　　　　　continue;
	　　　　　　　　}
	
	　　　　　　　　// 当用户想要深度操作时，递归合并
	　　　　　　　　// copy是纯对象或者是数组
	　　　　　　　　if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
	　　　　　　　　　　// 如果是数组
	　　　　　　　　　　if ( copyIsArray ) {
	　　　　　　　　　　　　// 将copyIsArray重新设置为false，为下次遍历做准备。
	　　　　　　　　　　　　copyIsArray = false;
	　　　　　　　　　　　　// 判断被扩展的对象中src是不是数组
	　　　　　　　　　　　　clone = src && this.isArray(src) ? src : [];
	　　　　　　　　　　} else { 
	　　　　　　　　　　　　// 判断被扩展的对象中src是不是纯对象
	　　　　　　　　　　　　clone = src && this.isPlainObject(src) ? src : {};
	　　　　　　　　　　}
	
	　　　　　　　　　　// 递归调用extend方法，继续进行深度遍历
	　　　　　　　　　　target[ name ] = this.extend( deep, clone, copy );
	
	　　　　　　　　// 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
	　　　　　　　　} else if ( copy !== undefined ) {
	　　　　　　　　　　target[ name ] = copy;
	　　　　　　　　}
	　　　　　　}
	　　　　}
	　　}
	
	　　// 原对象被改变，因此如果不想改变原对象，target可传入{}
	　　return target;
	}
}






// 方法jQuery.isPlainObject( object )用于判断传入的参数是否是“纯粹”的对象，即是否是用对象直接量{}或new Object()创建的对象。相关代码如下所示：
//515     isPlainObject: function( obj ) {
//516         // Must be an Object.
//517         // Because of IE, we also have to check the presence of the constructor property.
//518         // Make sure that DOM nodes and window objects don't pass through, as well
//519         if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
//520             return false;
//521         }
//522
//523         try {
//524             // Not own constructor property must be Object
//525             if ( obj.constructor &&
//526                 !hasOwn.call(obj, "constructor") &&
//527                 !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
//528                 return false;
//529             }
//530         } catch ( e ) {
//531             // IE8,9 Will throw exceptions on certain host objects #9897
//532             return false;
//533         }
//534
//535         // Own properties are enumerated firstly, so to speed up,
//536         // if last one is own, then all properties are own.
//537
//538         var key;
//539         for ( key in obj ) {}
//540
//541         return key === undefined || hasOwn.call( obj, key );
//542     },
//
//第519～521行：如果参数obj满足以下条件之一，则返回false：
//
//参数obj可以转换为false。
//
//Object.prototype.toString.call( obj )返回的不是[object Object]。
//
//参数obj是DOM元素。
//
//参数obj是window对象。
//
//如果参数obj不满足以上所有条件，则至少可以确定参数obj是对象。
//
//第523～533行：检查对象obj是否由构造函数Object()创建。如果对象obj满足以下所有条件，则认为不是由构造函数Object()创建，而是由自定义构造函数创建，返回false：
//
//对象obj含有属性constructor。由构造函数创建的对象都有一个constructor属性，默认引用了该对象的构造函数。如果对象obj没有属性constructor，则说明该对象必然是通过对象字面量{}创建的。
//
//对象obj的属性constructor是非继承属性。默认情况下，属性constructor继承自构造函数的原型对象。如果属性constructor是非继承属性，说明该属性已经在自定义构造函数中被覆盖。
//
//对象obj的原型对象中没有属性isPrototypeOf。属性isPrototypeOf是Object原型对象的特有属性，如果对象obj的原型对象中没有，说明不是由构造函数Object()创建，而是由自定义构造函数创建。
//
//执行以上检测时抛出了异常。在IE 8/9中，在某些浏览器对象上执行以上检测时会抛出异常，也应该返回false。
//
//函数hasOwn()指向Object.prototype.hasOwnProperty( property )，用于检查对象是否含有执行名称的非继承属性。
//
//第539～541行：检查对象obj的属性是否都是非继承属性。如果没有属性，或者所有属性都是非继承属性，则返回true。如果含有继承属性，则返回false。
//
//第539行：执行for-in循环时，JavaScript会先枚举非继承属性，再枚举从原型对象继承的属性。
//
//第541行：如果对象obj的最后一个属性是非继承属性，则认为所有属性都是非继承属性，返回true；如果最后一个属性是继承属性，即含有继承属性，则返回false。
// 
 