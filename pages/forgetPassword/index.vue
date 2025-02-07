<template>
  <div>
    <div class="f_h6 noto-sans-tc_r" id="loginForgetText">忘記密碼</div>
    <div>
      <div v-if="wrongLoginSignCom" id="loginWrong">查無此帳號</div>
    </div>
    <div id="inputContent">
      <input
        class="input"
        type="text"
        name=""
        placeholder="請填入帳號"
        v-model="account"
      /><br />
      <div id="buttonDiv">
        <button
          class="button bc_black c_white"
          id="backBN"
          @click="turnToLogin"
        >
          回上一頁
        </button>
        <button
          class="button bc_red c_white"
          id="sendBN"
          @click="verifyAccountAndSentEmail"
        >
          重設申請
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login-layout",
});

const account = ref("");
let wrongLoginSign = ref(false);
const wrongLoginSignCom = computed(() => wrongLoginSign.value);

async function verifyAccountAndSentEmail() {
//   console.log(account.value);
//   console.log(typeof account.value);

  if (account.value === "") {
    wrongLoginSign.value = true;
    return;
  }

  //撈使用者的資料
  const payload = { account: account.value };
  const result = await useAsyncData("loginForgetSearchUserData", () =>
    $fetch("http://localhost:3000/loginForgetApi", {
      method: "POST",
      body: payload,
    })
  );
//   console.log(result);
  const userData = JSON.parse(result.data.value)[0];
//   console.log(userData);
  if (userData === undefined) {
    wrongLoginSign.value = true;
    return;
  }

  // 撈IT帳號
  const { data, ITReqError } = await useAsyncData(
    "loginForgetGetITAccount",
    () => $fetch("http://localhost:3000/getITAccount")
  );
  const [ITData] = JSON.parse(data.value);
//   console.log(ITData);

  //寄信給IT
  const mailPayload = {
    mail: ITData.userEmail,
    subject: "職員申請修改密碼",
    text: `申請人帳號：${userData.userAccount}`,
  };
  if (userData !== null) {
    console.log("寄信");
    const mailResult = await useAsyncData("loginForgetMailITApi", () =>
      $fetch("http://localhost:3000/mailSomeone", {
        method: "POST",
        body: mailPayload,
      })
    );
    window.location.href = "http://localhost:3000/forgetPassword/success"
    console.log(mailResult);
  } else {
    console.log("無資料");
    wrongLoginSign.value = true;
  }
}

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