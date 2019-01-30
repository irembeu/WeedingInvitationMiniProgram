// pages/photos/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    slideList:[]
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
    db.collection('weddingInvitation').get({
      success(res) {
        wx.hideLoading();
        that.setData({
          mainInfo: res.data[0].mainInfo,
          slideList:res.data[0].slideList
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

  previewImage:function(e) {
    var imgsurl = []
    var imgObj = this.data.slideList
    for (var i = 0; i < imgObj.length; i++) {
      imgsurl[i] = imgObj[i]['image']
    }
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: imgsurl
    })
  },
})