// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */

  options:{
    multipleSlots: true
  },

  externalClasses: ['tag-class'],

  properties: {
    text: String,
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      // 触发父组件传递的自定义事件
      this.triggerEvent('tapping', {
        text: this.properties.text 
      })
    }
  }
})
