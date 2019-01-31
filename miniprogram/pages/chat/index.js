// pages/chat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    inputValue:'',
    auth:false,
    msgSta:false,
    signSta:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let userInfo = wx.getStorageInfoSync('userInfo')
    if(userInfo) {
      that.setData({
        auth:true,
        userInfo:userInfo
      })
    }
    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    });

    const db = wx.cloud.database()
    db.collection('weddingInvitation').get({
      success(res){
        wx.hideLoading();
        that.setData({
          mainInfo:res.data[0].mainInfo
        })
      }
    });

    db.collection('chatLists').get({
      success(res) {
        wx.hideLoading();
        that.setData({
          chatList:res.data,
          chatNum:res.data.length
        })
      }
    });

  },

  leaveMsg:function(){
    this.setData({
      msgSta:true,
      signSta:false
    })
  },

  signIn:function(){
    this.setData({
      signSta:true,
      msgSta:false
    })
  },

  cancelMsg:function(){
    this.setData({
      signSta:false,
      msgSta:false
    })
  },

  bindKeyInput:function(e) {
    this.setData({
      inputValue:e.detail.value
    })
  },

  bindgetuserinfo:function(e) {
    console.log(e.detail.userInfo)
    var that = this;
    if(e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      that.setData({
        userInfo:e.detail.userInfo,
        auth:true
      })  
      console.log(1, e.detail.userInfo)
      that.foo()
    } else {
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },

  foo:function(){
    var that = this

    console.log(2, that.data.inputValue)

    if(that.data.inputValue) {
      var userInfo = that.data.userInfo;
      var name = userInfo.nickName;
      var face = userInfo.avatarUrl;
      var words = that.data.inputValue;
      var newDate = new Date();

      const db = wx.cloud.database()
      db.collection('chatLists').add({
        data:{
          nickname:name,
          face:face,
          words:words,
          time: newDate,
        },
        success(res){
          db.collection('chatLists').get({
            success(res) {
              that.setData({
                chatList:res.data,
                chatNum:res.data.length
              })
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '您还没有填写内容',
        icon: 'none'
      })
      return;
    }
    that.setData({
      inputValue:''
    });
    return;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
})