<template>
  <div>
    <img id="checkIcon" src="~/assets/check3.gif" alt="" />
    <div class="f_h6 noto-sans-tc_r" id="loginForgetText">
      已寄出密碼重設申請至IT人員
    </div>

    <div id="inputContent">
      <div id="buttonDiv">
        <button class="button bc_black c_white" id="backBNForget" @click="turnToLogin">
          回登入頁面
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login-layout",
});

function turnToLogin() {
  window.location.href = "http://localhost:3000";
}
</script>

<style scoped>
#loginForgetText {
  text-align: center;
  margin: 10px;
  font-weight: 600;
  /* letter-spacing: 2px; */
  /* border: 3px solid black; */
}
#checkIcon {
  width: 100px;
  margin-left: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
}

#buttonDiv {
  /* border: 1px black solid; */
  margin: 16px 60px;
}
.button {
  width: 130px;
  height: 40px;
  border-radius: 20px;
  border: 0cap;
  font-size: var(--p);
  cursor: pointer;
}
#backBNForget {
  width: 100%;
}
</style>