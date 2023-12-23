<template>
  <div class="main-big-box">
  {{messgae}}
  </div>
</template>

<script setup>
const route = useRoute();
const messgae = ref('跳转中。。。');
// 客户端请求
const userAgent = window.navigator.userAgent
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
function isApp() {
  if (userAgent.includes('szd_SZGov')) {
    return true;
  } else {
    return false;
  }
}
onMounted(() => {
  if (!isApp()) {
    messgae.value = '请在苏周到中扫码打开';
    return
  }
  const uuid = route.query.uuid || '';
  const authUrl = import.meta.env.VITE_BASE_HREF+"/success?uuid=" + uuid;
  gotoOauth("193E4E93C7E61DDA", "snsapi_userinfo", "苏会E", '', authUrl);
});
</script>

<style lang="scss" scoped>
.banner-swipe {
  .van-swipe-item {
    height: 40vw;
    background: rgb(44 192 142);
    color: #fff;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.menu-box {
  padding: 10px 0px;
}
</style>
<style lang="scss">
.menu-box {
  .van-grid-item__content--horizontal {
    align-items: center;
  }
}
</style>
