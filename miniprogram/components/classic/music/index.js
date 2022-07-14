import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  properties: {
    // img: String,
    // content: String
    src: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png'
  },

  attached: function(){
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event){
      if(!this.data.playing){
        this.setData({
          playing: true
        })

        mMgr.title = "test"
        mMgr.src = this.properties.src 
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus: function(){
      if(mMgr.paused){
        this.setData({
          playing: false 
        })
        return 
      }

      if (mMgr.src === this.properties.src ){
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function(){
      mMgr.onPlay(() => { this._recoverStatus()})
      mMgr.onPause(() => { this._recoverStatus()})
      mMgr.onStop(() => { this._recoverStatus()})
      mMgr.onEnded(() => { this._recoverStatus()})
    }
  }
})
