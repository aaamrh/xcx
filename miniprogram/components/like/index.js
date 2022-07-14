// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type: Boolean,
      value: false,
      observer: function(){}
    },
    count:{
      type: Number
    }
  },

  /**
   * 组件的初始数据  数据绑定
   */
  data: {
    likePng: '../images/like.png',
    dislikePng: "../images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event){
      let {like, count} = this.properties
      
      count = like ? count - 1 : count+1

      this.setData({
        count: count,
        like: !like
      })

      // 触发自定义事件 like
      let behavior = this.properties.like ? "like" : "cancel"
      this.triggerEvent("like", {
        behavior: behavior
      }, {})
    }
  }
})
