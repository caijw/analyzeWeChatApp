function ie(i) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
        n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
    t = Object.assign({}, t);
    var s = {};
    Object.keys(t).forEach(function(e) {
        "function" == typeof t[e] && (s[e] = Reporter.surroundThirdByTryCatch(t[e], "at api " + i + " " + e + " callback function"), delete t[e])
    });
    var c = {};
    Object.keys(n).forEach(function(e) {
        "function" == typeof n[e] && (c[e] = oe(n[e], "at api " + i + " " + e + " callback function"), c[e]._argumentsLength = n[e].length)
    });
    J(i, t, function(e) {
        e.errMsg = e.errMsg || i + ":ok";
        var t = 0 === e.errMsg.indexOf(i + ":ok"),
            n = 0 === e.errMsg.indexOf(i + ":cancel"),
            r = 0 === e.errMsg.indexOf(i + ":fail");
        if ("function" == typeof c.beforeAll && c.beforeAll(e), t) {
            var o = function() {
                "function" == typeof s.success && s.success(e), "function" == typeof c.afterSuccess && c.afterSuccess(e)
            };
            "function" == typeof c.beforeSuccess ? 2 === c.beforeSuccess._argumentsLength ? c.beforeSuccess(e, o) : (c.beforeSuccess(e), o()) : o()
        } else if (n) e.errMsg = e.errMsg.replace(i + ":cancel", i + ":fail cancel"), "function" == typeof s.fail && s.fail(e), "function" == typeof c.beforeCancel && c.beforeCancel(e), "function" == typeof s.cancel && s.cancel(e), "function" == typeof c.afterCancel && c.afterCancel(e);
        else if (r) {
            "function" == typeof c.beforeFail && c.beforeFail(e), "function" == typeof s.fail && s.fail(e);
            var a = !0;
            "function" == typeof c.afterFail && (a = c.afterFail(e)), !1 !== a && Reporter.reportIDKey({
                key: i + "_fail"
            })
        }
        "function" == typeof s.complete && s.complete(e), "function" == typeof c.afterAll && c.afterAll(e), re(i, t, r, n, e.errMsg)
    }), Reporter.reportIDKey({
        key: i
    })
}

      /**
       * apiName: api name
       * apiParams: api params
       * webviewIds: webviewIds
       */
      function ce(apiName, apiParams, webviewIds) {
        var publishParams = {
          data: apiParams,
          options: {
            timestamp: Date.now()
          }
        };
        var apiParamsCallbacks = {};
        Object.keys(apiParams).forEach(function (key) {
          if (typeof apiParams[key] === 'function') {
            apiParamsCallbacks[key] = Reporter.surroundThirdByTryCatch(apiParams[key], "at api " + apiName + " " + key + " callback function");
            delete apiParams[key];
          }
        });
        /*增加回调函数给publish*/
        var callback = function (res) {
          res.errMsg = res.errMsg || apiName + ":ok";
          var isOk = res.errMsg.indexOf(apiName + ":ok") === 0,
            isCancel = res.errMsg.indexOf(apiName + ":cancel") === 0,
            isFail = res.errMsg.indexOf(apiName + ":fail") === 0;
          if (isOk) {
            typeof apiParamsCallbacks.success === "function" && apiParamsCallbacks.success(res);
          } else if (isCancel) {
            res.errMsg = res.errMsg.replace(apiName + ":cancel", apiName + ":fail cancel");
            typeof apiParamsCallbacks.fail === "function" && apiParamsCallbacks.fail(res);
          } else if (isFail) {
            typeof apiParamsCallbacks.fail === "function" && apiParamsCallbacks.fail(res);
          }
          typeof apiParamsCallbacks.complete === "function" && apiParamsCallbacks.complete(res);
        };
        __safeway__.bridge.publish(apiName, publishParams, webviewIds, callback)
      }


yl = function (e) {
  var t = bta.getCurrentPagesByDomain(""),
    n = t[t.length - 1].__wxWebviewId__;
  e.hasOwnProperty("page") && e.page.hasOwnProperty("__wxWebviewId__") && (n = e.page.__wxWebviewId__), ce("pageScrollTo", e, [n])
},

/*发布*/
var Ku = function(e) {
    var t = hta.getCurrentPagesByDomain("")
      , n = t[t.length - 1].__wxWebviewId__;
    ot(e, "page") && ot(e.page, "__wxWebviewId__") && (n = e.page.__wxWebviewId__);
    var r = {};
    for (var o in e)
        "function" == typeof e[o] && (r[o] = e[o],
        delete e[o]);
    e.callbackId = qu,
    Hu[qu] = r,
    qu++,
    Ke("pageScrollTo", e, [n])
}



/*订阅*/
function Ge(e, s) {
    var t, n;
    t = e,
    n = function(e, t) {
        var n = e.data
          , r = e.options
          , o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
          , a = r && r.timestamp || 0
          , i = Date.now();
        "function" == typeof s && s(n, t),
        Reporter.speedReport({
            key: "webview2AppService",
            data: n || {},
            timeMark: {
                startTime: a,
                endTime: i,
                nativeTime: o.nativeTime || 0
            }
        })
    }
    ,
    __safeway__.bridge.subscribe(t, n)
}


var qu = 1;
var Hu = {};

Ge("pageScrollDone", function(e) {
    if (!(e.callbackId < 0 || void 0 === Hu[e.callbackId])) {
        var t = Hu[e.callbackId];
        delete Hu[e.callbackId],
        delete e.callbackId;
        var n = "pageScrollTo";
        e.errMsg = e.errMsg || "scrollWebviewTo:ok",
        e.errMsg = e.errMsg.replace("scrollWebviewTo", n);
        var r = 0 === e.errMsg.indexOf(n + ":ok")
          , o = 0 === e.errMsg.indexOf(n + ":fail");
        r ? "function" == typeof t.success && t.success(e) : o && "function" == typeof t.fail && t.success(e),
        "function" == typeof t.complete && t.complete(e)
    }
});


/*改造逻辑*/

var pageScrollToCallbackId = 1;
var pageScrollToCallbacks = {};

/*订阅*/
function subscribe(eventName, handle) {
  var subscribeCallBack = function (e, t) {
     var data = e.data;
     "function" == typeof handle && handle(data, t);
  }
  __safeway__.bridge.subscribe(eventName, subscribeCallBack);
}

subscribe("pageScrollDone", function (params) {
  if (!(params.callbackId < 0 || void 0 === pageScrollToCallbacks[params.callbackId])) {
      var callbacks = pageScrollToCallbacks[e.callbackId];
      delete pageScrollToCallbacks[params.callbackId];
      delete params.callbackId;
      var apiName = "pageScrollTo";
      params.errMsg = params.errMsg || "scrollWebviewTo:ok",
      params.errMsg = params.errMsg.replace("scrollWebviewTo", apiName);
      var isOk = 0 === params.errMsg.indexOf(apiName + ":ok")
        , isFail = 0 === params.errMsg.indexOf(apiName + ":fail");
      if(isOk){
        "function" == typeof callbacks.success && callbacks.success(params);
      }else if(isFail){
        "function" == typeof callbacks.fail && callbacks.fail(params);
      }
      "function" == typeof callbacks.complete && callbacks.fail(params);
  }
});

/*发布*/
yl = function (param) {
  var currentPagesByDomain = bta.getCurrentPagesByDomain(""),
    webviewId = currentPagesByDomain[currentPagesByDomain.length - 1].__wxWebviewId__;

  if(param.hasOwnProperty("page") && param.page.hasOwnProperty("__wxWebviewId__")){
    webviewId = param.page.__wxWebviewId__;
  }

  var paramsCallbacks = {};
  for (var key in param){
    if(typeof param[key] == 'function'){
      paramsCallbacks[key] = param[key];
      delete param[key];
    }
  }

  param.callbackId = pageScrollToCallbackId;
  pageScrollToCallbacks[pageScrollToCallbackId] = paramsCallbacks;
  pageScrollToCallbackId++;

  ce("pageScrollTo", e, [n]);
}



/*view 的改造*/


wx.onPageScrollTo(d(function (e) {
    /*onPageScrollTo 处理函数*/
    var t = document.body,
      n = Number.isNaN(Number(e.duration)) ? 300 : Math.max(0, Number(e.duration)),
      i = e.scrollTop;
    if (void 0 !== i) {
      i < 0 && (i = 0);
      var o = l(),
        r = c();
      if (r - o < i && (i = r - o), 0 === n) return t.scrollTop = i, void(document.documentElement.scrollTop = i);
      if ("qqdevtools" !== wx.getPlatform()) {
        wx.invoke("scrollWebviewTo", {
          duration: n,
          scrollTop: i
        });
      } else {
        var a = function e() {
            t.style.transition = "", t.style.webkitTransition = "", t.style.transform = "", t.style.webkitTransform = "", t.scrollTop = i, document.documentElement.scrollTop = i, t.removeEventListener("transitionend", e), t.removeEventListener("webkitTransitionEnd", e)
          },
          s = "translateY(" + ((t.scrollTop || document.documentElement.scrollTop) - i) + "px) translateZ(0)";
        t.style.transition = "transform " + n + "ms ease-out", t.style.webkitTransition = "-webkit-transform " + n + "ms ease-out", t.addEventListener("transitionend", a), t.addEventListener("webkitTransitionEnd", a), t.style.transform = s, t.style.webkitTransform = s
      }

    }
  }))

