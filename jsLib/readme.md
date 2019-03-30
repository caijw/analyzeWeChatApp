
invoke: 

  ie函数，用变量s收集fail、success等回调，供闭包函数J访问
  J函数，__safeway__.bridge.invoke(e, t, n)
    e: api名称，t: api参数，n: 闭包回调函数
  __safeway__.bridge.invoke函数，调用 WeixinJsbridge.invoke(e, t, n)
  WeixinJsbridge.invoke

publish:

  yl函数，生成__wxWebviewId__，调用ce("pageScrollTo", e, [n])
    e: api调用参数，包含success、fail回调。n: __wxWebviewId__
  ce函数，调用__safeway__.bridge.publish(r, o, a)
    r: api名称，o: api调用参数，包含success，fail回调， a: webviewid数组
  __safeway__.bridge.publish函数，调用n.send(command: 'APPSERVICE_PUBLISH', data: {eventName: e, data: o, webviewIds: s})
    e: api名称，o: api调用参数，包含success，fail回调， s: webviewid数组。s: webssocket对象
    __safeway__.bridge.publish通过214: function (e, t, o)暴露出来