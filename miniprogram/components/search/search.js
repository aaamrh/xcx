import KeywordModel  from '../../models/keyword.js';
import {BookModel}  from '../../models/book.js';

import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [ paginationBev ],
  properties: {
    more: {
      type: String,
      observer: 'loadMore', // 注意这种书写方式， fn在methods中
    }
  },  

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [], // hehavior 中有了
    searching: false,
    q: '',
    loading: false, // 锁，是否正在请求API， 上一个请求未完成时，禁止后面的请求
    loadingCenter: false,

  },


  attached(){
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()


    this.setData({
      historyWords
    })

    hotWords.then(res=>{
      this.setData({hotWords: res.hot})
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
    
      if (!this.data.q) { return }

      if (this.isLocked()) { return }

      // const length = this.data.dataArray.length;
      if(this.hasMore()){
        this.locked();  
        bookModel.search(this.getCurrentStart() , this.data.q).then(res=>{
          this.setMoreData(res.books)
          this.unLocked()
        }, (err) => { 
          this.unLocked() // 防止死锁， 当断网后请求失败， 会产生死锁
        })
      }
    },

    onCancel(event){
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    onConfirm(event){
      this._showResult()
      this._showLoadingCenter()

      const q = event.detail.value || event.detail.text; // event.detail.text 是tag组件自定义事件携带的数据
      
      bookModel.search(0, q).then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          // dataArray: res.books,
          q,
        })
        keywordModel.addToHistory(q);
        this._hideLoadingCenter()
      })
    },   

    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },

    _showResult(){
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        q: ''
      })
    },
  }
})
