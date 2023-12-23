<template>
  <div class="main-big-box">
    <div class="main-content-box">
      <div>首页</div>
      <van-button type="primary" v-if="!userInfo.token && !changeQrcodeFlag" @click="createQrcode">扫码登录</van-button>

      <div v-if="userInfo.token">
        登陆人：{{ userInfo.nickName }} <br />
        手机号：{{ userInfo.phonenumber }}
      </div>
      <van-button type="primary" v-if="userInfo.token" @click="logout">退出系统</van-button>
      <div v-if="!userInfo.token && changeQrcodeFlag" class="qrcode-box">
        <qrcode-vue :value="url" :size="256" level="H" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import QrcodeVue from "qrcode.vue";
import { v4 as uuidv4 } from "uuid";
import { getUserInfoByUuid } from "@/service/index";

let userInfo = ref({
  nickName: sessionStorage.getItem("nickName") || '',
  phonenumber: sessionStorage.getItem("phonenumber") || '',
  token: sessionStorage.getItem("token") || ''
});
let uuid = ref("");
let url = ref("");
let changeQrcodeFlag = ref(false);
// 二维码有效时间
let effectiveTime = 60;

watch(
  () => uuid.value,
  (newVal) => {
    if (newVal) {
      checkQrcode();
    }
  }
);
// 生成二维码
function createQrcode() {
  changeQrcodeFlag.value = false;
  effectiveTime = 60;
  uuid.value = uuidv4();
  url.value = import.meta.env.VITE_BASE_HREF + "/qrcode?uuid=" + uuid.value;
  changeQrcodeFlag.value = !changeQrcodeFlag.value;
}

// 验证有效期内二维码是否状态改变
function checkQrcode() {
  const timer = setInterval(() => {
    // 调后端接口获取uuid状态下面是否有用户信息
    getUserInfoByUuid({ uuid: uuid.value }).then((res) => {
      console.log(res);
      if (res) {
        userInfo.value = res;
        sessionStorage.setItem("nickName", res.nickName);
        sessionStorage.setItem("phonenumber", res.phonenumber);
        sessionStorage.setItem("token", res.token);
        clearInterval(timer);
      } else {
        if (effectiveTime <= 0) {
          console.log("二维码失效");
          clearInterval(timer);
          changeQrcodeFlag.value = false;
        }
      }
    });
    effectiveTime--;
  }, 1000);
}
function logout() {
  changeQrcodeFlag.value = false;
  sessionStorage.clear();
  userInfo.value = {
    nickName: "",
    phonenumber: "",
    token: ""
  };
}
onMounted(() => {
  console.log("首页mounted");
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
.qrcode-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
