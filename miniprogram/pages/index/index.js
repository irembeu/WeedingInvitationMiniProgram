//index.js
const app = getApp()
var touchDot = 0;//触摸时的原点
var time = 0;//时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = '';//记录、清理时间记录

Page({
  data: {
    animationData:'',
    userInfo:{},
    music_url:'',
    isPlayingMusic:true
  },

  onLoad: function() {
    //创建动画
    var animation = wx.createAnimation({
      duration:3600,
      timingFunction:'ease',
      delay:600,
      transformOrigin:'50% 50%',
    })

    animation.scale(0.9).translate(10, 10).step();
    //边旋转边放大

    //导出动画数据传递给组件的animation属性
    this.setData({
      animationData:animation.export(),
    })

    var that = this
    wx.showLoading({
      //期间为了显示效果可以添加一个过渡的弹出框提示 ”加载中“
      title: '加载中',
      icon:'loading',
    });

    const db = wx.cloud.database()
    db.collection('weddingInvitation').where({
      // _id:'W9kaidx_Lia3NP5I',
      // done:false
    }).get({
      success(res){
        wx.hideLoading();
        wx.playBackgroundAudio({
          dataUrl: res.data[0].music_url,
          title:'',
          coverImgUrl:''
        })

        that.setData({
          mainInfo: res.data[0].mainInfo,
          music_url: res.data[0].music_url
        });
      }
    })
  },

  //用户点击右上角分享
  onShareAppMessage:function(){
    var that = this;
    return {
      title:that.data.mainInfo.share,
      imageUrl:that.data.mainInfo.thumb,
      path:'pages/index/index',
      success:function(res){
        wx.showToast({
          title: '分享成功',
        })
      },
      fail:function(res){
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },

  callhe:function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.he_tel,
    })
  },

  callshe:function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel,
    })
  },

  play:function(event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title:'',
        coverImgUrl:''
      })
      this.setData({
        isPlayingMusic:true
      })
    }
  },

})
