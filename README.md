# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## key

  ZolUY9G95CACsRtV

## 单位

    设计稿 750px (iphone6为标准) , 元素如果是100px, 则在小程序中需要设置成 100rpx 活 50px

`rpx` 可以自适应, 不同屏幕尺寸也能自己放大缩小


## 组件中 Properties 

    要判断组件中哪些数据是从服务器中获取的， 将从服务器中获取的数据挟到properties中

## 组件共有属性继承

    `Behavior`

## 条件渲染

    `wx:if` `hidden`[hidden不会触发组件detached生命周期]

## 背景音频

    `wx.getBackgroundAudioManager()` 

    `title`是必须设置的


## 自定义事件

`bind:like` 参考pages/classic/.wxml like组件， like组件中 使用`wx.triggerEvent`触发事件


## slot tag.xwml & book-detail 

``` html
  <!-- a.component --> 
  options:{
    multipleSlots: true
  },

  <view>
    <h1>使用插槽</h1>
    <slot name="ctnt"></slot>
  </view>

  <!-- page --> 
  <a>
    <text slot="ctnt"> this is content </text>
  </a>
```

## 组件引入外部样式

在 组件的 js 中设置 externalClasses: ['external']
在 组件的 wxml 中: <view class="external"></view>
在 page的 wxss 中: .ex{ color: red; }
在 page的 wxml 中: <comp external="ex" ></comp>

## 下滑加载数据

Page: `onReachBottom`

## 跳转页面 components/book

wx.navigateTo({
  url: `/pages/book-detail/book-detail?bid=${bookId}`,
})


## 展示用户信息

用于展示微信开放的数据 `<open-data type="userAvatarUrl"></open-data>` 
只能用于显示用户信息， 如果想在js中获取用户信息就很困难； 因此要使用button组件： `<button open-type="getUserInfo" bindgetuserinfo="getUserInfo">授权</button>`

## 小程序之间的跳转 

`navigator`