import {HTTP} from '../utils/http.js';


class ClassicModel extends HTTP {
  getLatest(cb){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        console.log(res.data)
        cb(res.data)
        this._setLatestIndex(res.data.index)

        wx.setStorageSync(this._getKey(res.data.index), res.data)
      }
    })
  }

  getClassic(index, nextOrPrev, cb){
    let key = nextOrPrev == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)  
    let classic = wx.getStorageSync(key)
    
    if(!classic){
      this.request({
        url: 'classic/' + index + "/" + nextOrPrev,
        success: (res) => {
          console.log('123123', res)
          wx.setStorageSync(this._getKey(res.data.index), res.data)
          cb(res.data)
        }
      })
    }else{
      cb(classic)
    }

  } 


  isFirst(index){ return index == 1 }

  isLatest(index){ return this._getLatestIndex() == index }

  _setLatestIndex(index){
    wx.setStorageSync('latest', index) // 同步写入缓存
  }

  _getLatestIndex(){
    return wx.getStorageSync('latest')
  }

  _getKey(index){
    return 'classic-' + index
  }
}


export default ClassicModel