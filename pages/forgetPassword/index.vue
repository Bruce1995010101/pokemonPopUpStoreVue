<template>
  <div>
    <div class="f_h6 noto-sans-tc_r" id="loginForgetText">忘記密碼</div>
    <div id="loginWrongDiv"></div>
    <div id="inputContent">
      <input
        class="input"
        type="text"
        name=""
        placeholder="請填入帳號"
      /><br />
      <div id="buttonDiv">
        <button class="button bc_black c_white" id="backBN" @click="turnToLogin">回上一頁</button>
        <button class="button bc_red c_white" id="sendBN">重設申請</button>
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
}
#inputContent {
  padding: 0 60px;
}
.input {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 0cap;
  margin: 16px 0px;
  padding-left: 20px;
  box-sizing: border-box;
}
.input::placeholder {
  color: var(--black);
  padding-left: 10px;
  font-weight: 600;
}
#loginWrong {
  margin: auto;
  width: 150px;
  text-align: center;
  border-radius: 10px;
  color: var(--white);
  background-color: var(--red);
}
#buttonDiv {
  margin: 16px 0px 80px 0px;
}
.button {
  width: 130px;
  height: 40px;
  border-radius: 20px;
  border: 0cap;
  font-size: var(--p);
}

#backBN {
  float: left;
}
#sendBN {
  float: right;
}
</style>