# devtools

## 同步接口设计

同步，需要卡住js执行线程，浏览器中，渲染和js执行是在同一线程的，
BOM接口prompt能卡住主线程，阻塞ui和js执行

## 存在的问题

https://github.com/nwjs/nw.js/issues/7025

prompt的字符串过长，在某些版本的nw中会被截断

## 解决思路

### 借助异步

1. 先通过socket把字符串消息发送给nw
2. 再调用prompt卡住主线程等待nw返回

### 分批发送

将prompt的字符串切割成一段一段的小字符串，不断发送给nw