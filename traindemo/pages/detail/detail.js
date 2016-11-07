Page({
  data:{
    arrInfo:[],
    startandend:{
      start:'beijingbei',
      end:'guangzhou'
    }
  },
  onLoad:function(options){
    var me=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'trainInfo',
      success: function(res){
        // success
        console.log(res);
        me.setData({
          arrInfo:res.data.info,
          startandend:res.data.startandend,
          selectDate:res.data.selectDate
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
 
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})