// pages/bless/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    actionSheetHidden:true,
    painting:{},
    shareImage:'',
    qrcode:''
  },

  // wx.showActionSheet({
  //   itemList: [],
  // })


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo:userInfo
      })
    }

    // wx.showLoading({
    //   title: '加载中',
    //   icon:'loading'
    // });

    const db = wx.cloud.database()
    db.collection('weddingInvitation').get({
      success(res) {
        that.setData({
          mainInfo: res.data[0].mainInfo,
        });
      }
    });

    db.collection('zanLogs').get({
      success(res) {
        that.setData({
          zanLog:res.data,
          zanNum:res.data.length
        })
      }
    });

  },

  openActionsheet:function(){
    var self = this;
    self.setData({
      actionSheetHidden:!self.data.actionSheetHidden
    });
  },

  listenerActionSheet:function(){
    var self = this;
    self.setData({
      actionSheetHidden:!self.data.actionSheetHidden
    })
  },

  createPoster:function(){
    wx.navigateTo({
      url: '/pages/poster/index',
    })
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

  bindgetuserinfo:function(e) {
    console.log(e.detail.userInfo)
    var that = this;
    if(e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      that.setData({
        userInfo:e.detail.userInfo,
        authBtn:false
      })  
      var userInfo = e.detail.userInfo;
      var name = userInfo.nickName;
      var face = userInfo.avatarUrl;

      const db = wx.cloud.database();
      const zanLogCollect = db.collection('zanLogs');

      zanLogCollect.add({
        data: {
          nickname: name,
          face: face
        }
      });

      zanLogCollect.get({
        success(res) {
          that.setData({
            zanLog: res.data,
            zanNum: res.data.length
          })
        }
      });
    } else {
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },

  zan:function(event) {
    var that = this;

    var userInfo = that.data.userInfo;
    var name = userInfo.nickName;
    var face = userInfo.avatarUrl;

    var count = 0;

    const db = wx.cloud.database();
    const zanLogCollect = db.collection('zanLogs');
  
    zanLogCollect.add({
      data: {
        nickname: name,
        face: face
      }
    });

    zanLogCollect.get({
      success(res) {
        that.setData({
          zanLog: res.data,
          zanNum: res.data.length
        })
      }
    });
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

  }
})