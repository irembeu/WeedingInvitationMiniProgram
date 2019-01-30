//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // this.globalData = {}
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb
      (this.globalData.userInfo)
    } else {

    }

  },
  onHide:function(){
    wx.pauseBackgroundAudio();
  },
  onShow:function(){
    wx.playBackgroundAudio();
  },
  globalData:{
    userInfo:null,
    appid:'wx4b12b7afbb85e3af',
  }
});
