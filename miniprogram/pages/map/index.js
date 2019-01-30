// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //点击标记点时触发
  markertap(e) {
    const db = wx.cloud.database()
    db.collection('weddingInvitation').where({

    }).get({
      success(res) {
        var lng = res.data[0].mainInfo.lng
        var lat = res.data[0].mainInfo.lat
        console.log(lng, lat)
        wx.openLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          scale:18,
          name:res.data[0].mainInfo.hotel,
          address:res.data[0].mainInfo.address
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.showLoading({
      title: '加载中',
      icon:'loading',
    });

    const db = wx.cloud.database()

    db.collection('weddingInvitation').where({

    }).get({
      success(res) {
        wx.hideLoading();
        var lng = res.data[0].mainInfo.lng
        var lat = res.data[0].mainInfo.lat
        that.setData({
          mainInfo:res.data[0].mainInfo,
          lng:lng,
          lat:lat,
          markers:[{
            iconPath:'/images/nav.png',
            id:0,
            latitude:lat,
            longitude:lng,
            width:40,
            height:40
          }],
        });
      }
    })

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
    return {
      title:that.data.mainInfo.share,
      imageUrl:that.data.mainInfo.thumb,
      path:'pages/index/index',
      success:function(res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail:function(res) {
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },


  callhe:function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.he_tel,
    })
  },

  callshe:function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel,
    })
  }

})