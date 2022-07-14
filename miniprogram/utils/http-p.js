import { config } from '../config.js'

const tips = {
  1: '出了一些错误',
  1005: 'appkey无效',
  3000: "期刊不存在"
}

class HTTP {
  request({url, data={}, method='GET'}){
    return new Promise((resolve, reject)=>{
      this._request(url, resolve, reject, data, method)
    })
  }


  _request(url, resolve, reject, data={}, method='GET') {
    wx.request({
      url: config.apiBaseUrl + url,
      method: method,
      data: data,
      header: {
        'appkey': config.appkey,
        'content-type': 'application/json'
      },
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          // 服务器异常
          this._showErr(res.data.code)
          reject(res)
        }
      },
      fail: (err) => {
        // API调用失败
        reject()
        this._showErr(1)
      }
    })
  }

  _showErr(code) {
    if (!code) {
      code = 1
    }

    const tip = tips[code]


    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP }