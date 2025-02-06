<template>
    <div id="container">
        <div class="bc_yellow" id="backStageContent">
            <img id="loginLogo" src="/assets/logo.png" alt="">
            <div class="f_h6 fredoka_b" id="loginText">LOGIN</div>
            <div id="inputContent">
                <div  id="loginWrongDiv">
                    <div v-if="wrongLoginSignCom.value" id="loginWrong">帳號或密碼錯誤</div>
                </div>
                <!-- <div id="loginWrong">帳號或密碼錯誤</div> -->
                <input class="input" type="text" name="" id="account" placeholder="帳號" v-model="account">
                <br>
                <input class="input" type="password" name="" id="password" placeholder="密碼" v-model="password">
                
                <div id="buttonDiv">
                    <button class="button bc_black c_white" id="forgetBN">忘記密碼</button>
                    <button class="button bc_red c_white" id="loginBN" @click="login">登入</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'loginLayout'
})

const account = ref('')
const password = ref('')
let wrongLoginSign = ref(false)

async function login(){
    console.log("Account:", account.value, "Password:", password.value);
    const payload = {"account": account.value, "password": password.value}
    const { data, error } = await useAsyncData("userLogin",()=>
        $fetch("http://localhost:3000/loginApi",{
            method: "POST",
            body: payload
        })
    )
    console.log('Result:', data.value)
    console.log('err:', error.value)
    if(data.value?? false){
        window.location.href = 'http://localhost:3000/overAll'
    }else{
        wrongLoginSign.value = true
        console.log(wrongLoginSign);
        console.log('登入失敗');
    }
}

const wrongLoginSignCom = computed(()=>wrongLoginSign)



</script>


<style scoped>
    


#container{
    display: flex;
    justify-self: center;
    width: 100%;
    height: 100vh;
    background-color: var(--white);
    /* background-color: chocolate; */
}

#backStageContent{
    width: 400px;
    height: 390px;
    margin: auto;
    border-radius: 20px;
}


#loginLogo{

    width: 250px;
    margin: 16px 75px;
    margin-top: 40px;

}

#loginText{
    text-align: center;
    margin: 10px;
    letter-spacing: 2px;
    /* border: 3px solid black; */
}
#inputContent {
    padding: 0 60px;
    box-sizing: border-box;
}

.input{
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: 0cap;
    margin: 16px 0;
    padding-left: 20px;
    box-sizing: border-box
}
.input::placeholder{
    color: var(--black);
    /* border: 1px solid black; */
    padding-left: 10px;
    font-weight: 600;
    
}
#loginWrong{
    margin: auto;
    width: 150px;
    text-align: center;
    border-radius: 10px;
    color: var(--white);
    background-color: var(--red);
}
#buttonDiv{
    /* border: 1px black solid; */
    margin: 16px 0;
}
.button{
    width: 130px;
    height: 40px;
    border-radius: 20px;
    border: 0cap;
    font-size: var(--p);
}
#forgetBN{
    float: left;
}
#loginBN{
    float: right;
}




/* ----------- */
#backStageContentForget{
    width: 400px;
    height: 330px;
    margin: auto;
    border-radius: 20px;
}
#loginForgetText{
    text-align: center;
    margin: 10px;
    font-weight: 600;
    /* letter-spacing: 2px; */
    /* border: 3px solid black; */
}
.buttonForget{
    width: 130px;
    height: 40px;
    border-radius: 20px;
    border: 0cap;
    font-size: var(--p);
}
#backBN{
    float: left;
}
#sendBN{
    float: right;
}


/* 設定新密碼頁面 */
#backStageChangePW{
    width: 400px;
    height: 400px;
    margin: auto;
    border-radius: 20px;
}
</style>