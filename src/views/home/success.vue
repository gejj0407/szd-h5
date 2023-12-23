<template>
  <div class="main-big-box">
    <span v-if="loginFlag">登录成功！！！</span>
    <span v-else>请重新扫码</span>
  </div>
</template>

<script setup>
import { saveCodeAndUuid } from "@/service/index";
const route = useRoute();
const router = useRouter();
const loginFlag = ref(false);
const code = route.query.code;
const uuid = route.query.uuid;
console.log(code);
console.log(uuid);
if (code && uuid) {
  /* saveCodeAndUuid({ Code: code, uuid }).then((res) => {
    loginFlag.value = true;
    setTimeout(() => {
      loginFlag.value = false;
      router.go(-1);
    }, 3000);
  }); */
}
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
