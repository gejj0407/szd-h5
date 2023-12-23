if (navigator.userAgent.indexOf('AliApp') > -1) {
  document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>');
}
// 客户端请求
var userAgent = window.navigator.userAgent
var WebViewJavascriptBridge

// 判断设备信息
function isIOS() {
  if (userAgent.indexOf('Mac OS X') > -1) {
    return true
  }
}

function isAndroid() {
  if (userAgent.indexOf('Android') > -1) {
    return true
  }
}

function isApp() {
  if (userAgent.includes('szd_SZGov')) {
    return true;
  } else {
    return false;
  }
}

function gotoOauth(appid, scope, pageName, pageImg, pageUrl) {
  if (navigator.userAgent.indexOf('AliApp') > -1) {
    // 支付宝中
    my.postMessage({
      action: "authorize"
    });
    my.onMessage = function (e) {
      if (e.type == 'authorizeResult') {
        if (e.data) {
          let baseUrl = 'https://szdh5.suzhou.gov.cn/#';
          let urlLink = baseUrl + '/authorization/auth2?' + 'authCode=' + e.data + "&appid=" + appid + "&scope=" + scope + '&pageName=' + pageName + '&pageImg=' + pageImg + '&pageUrl=' + encodeURIComponent(pageUrl);
          location.replace(urlLink);
        }
      }
    };
  } else {
    // 苏周到中
    let urlLink = 'https://szdh5.suzhou.gov.cn/#' + '/authorization/auth?' + "appid=" + appid + "&scope=" + scope + '&pageName=' + pageName + '&pageImg=' + pageImg + '&pageUrl=' + pageUrl;
    location.replace(urlLink);
  }
}