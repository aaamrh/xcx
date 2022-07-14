import { config } from '../config.js'

const tips = {
  1: '出了一些错误',
  1005: 'appkey无效',
  3000: "期刊不存在"
}

class HTTP {
  request(params){
    wx.request({
      url: config.apiBaseUrl + params.url,
      method: params.method || 'GET',
      data: params.data,
      header: {
        'appkey': config.appkey,
        'content-type': 'application/json'
      },
      success: (res)=>{
        let code = res.statusCode.toString();
        if(code.startsWith('2')){
          params.success && params.success(res)
      
        }else{
          // 服务器异常
          this._showErr( res.data.code )
        }
      },
      fail: (err)=>{
        // API调用失败
        this._showErr(1)
      }
    })
  }

  _showErr(code){
    if (!code) { code = 1 }

    const tip = tips[code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}