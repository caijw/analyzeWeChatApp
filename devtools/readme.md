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

需要新建一种新的消息类型A，webview通过websocket把该消息Am发送给nw，nw收到Am，缓存起来。
webview调用prompt把webview线程卡住，nw收到webview的prompt，拿到Am的id，从消息队列里面
查找Am，找到Am后，处理该invoke，把结果返回给prompt调用。

这种方案行不通，发送websocket是异步的，prompt把主线程卡主后，异步的websocket也发不出来

### 分批发送

将prompt的字符串切割成一段一段的小字符串，不断发送给nw

数据格式

要发送的数据
data = 
{
	api: o,
	args: d,
	callbackID: t
};

把datajson化成字符串。
载切割成100个字符大小段dataSeg[n]



{
	command: 'APPSERVICE_INVOKE',
	type: 0, 
	data: 
}