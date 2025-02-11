<template>
  <NuxtLayout name="login-layout">
    <div>
      <div class="f_h6 fredoka_b" id="loginText">LOGIN</div>
      <div id="inputContent">
        <div>
          <div v-if="wrongLoginSignCom" id="loginWrong">帳號或密碼錯誤</div>
        </div>
        <input class="input" type="text" placeholder="帳號" v-model="account" />
        <br />
        <input
          class="input"
          type="password"
          placeholder="密碼"
          v-model="password"
        />

        <div id="buttonDiv">
          <button
            class="button bc_black c_white"
            id="forgetBN"
            @click="turnToForgetPassword"
          >
            忘記密碼
          </button>
          <button class="button bc_red c_white" id="loginBN" @click="login">
            登入
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// definePageMeta({
//   layout: "login-layout",
// });

const account = ref("");
const password = ref("");
let wrongLoginSign = ref(false);

async function login() {
  console.log("Account:", account.value, "Password:", password.value);
  const payload = { account: account.value, password: password.value };
  const { data, error } = await useAsyncData("userLogin", () =>
    $fetch("http://localhost:3000/loginApi", {
      method: "POST",
      body: payload,
    })
  );
  console.log("Result:", data.value);
  console.log("err:", error.value);
  if (data.value ?? false) {
    window.location.href = "http://localhost:3000/overAll";
  } else {
    wrongLoginSign.value = true;
    console.log(wrongLoginSign);
    console.log("登入失敗");
  }
}

function turnToForgetPassword() {
  window.location.href = "http://localhost:3000/forgetPassword";
}

const wrongLoginSignCom = computed(() => wrongLoginSign.value);

// import { usePagesData } from '~/stores/pagesData'
// const pagesData = usePagesData()
// pagesData.changePage('index')
// console.log(pagesData.currentPage);


</script>


<style scoped>
#loginText {
  text-align: center;
  margin: 10px;
  letter-spacing: 2px;
}
#inputContent {
  padding: 0 60px;
}

.input {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 0cap;
  margin: 16px 0;
  padding-left: 20px;
  box-sizing: border-box;
}
.input::placeholder {
  color: var(--black);
  /* border: 1px solid black; */
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
  cursor: pointer;
}
#forgetBN {
  float: left;
}
#loginBN {
  float: right;
}
</style>