<template>
    <div id="container">
        <div class="bc_yellow" id="backStageContentForget">
            <img id="loginLogo" src="~/assets/logo.png" alt="">
            <div class="f_h6 noto-sans-tc_r" id="loginForgetText">忘記密碼</div>
            <div id="loginWrongDiv"></div>
            <div id="inputContent">
                <input class="input" type="text" name="" id="account" placeholder="請填入帳號"><br>
                <div id="buttonDiv">
                    <button class="button bc_black c_white" id="backBN" @click="turnToLogin">回上一頁</button>
                    <button class="button bc_red c_white" id="sendBN">重設申請</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'loginLayout'
})

function  turnToLogin(){
    window.location.href = "http://localhost:3000"
}
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
}
.input{
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: 0cap;
    margin: 16px 0px;
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
    margin: 16px 0px;
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