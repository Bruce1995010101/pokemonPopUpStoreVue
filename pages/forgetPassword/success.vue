<template>
    <div id="container">
        <div class="bc_yellow" id="backStageContentForget">
            <img id="loginLogo" src="~/assets/logo.png" alt="">
            <img id="checkIcon" src="~/assets/check3.gif" alt="">

            <div class="f_h6 noto-sans-tc_r" id="loginForgetText">已寄出密碼重設申請至IT人員</div>
            
            <div id="inputContent">
                <div id="buttonDiv">
                    <button class="button bc_black c_white" id="backBNForget">回登入頁面</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'loginLayout'
})
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
    height: 400px;
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
.input{
    width: 280px;
    height: 40px;
    border-radius: 20px;
    border: 0cap;
    margin: 16px 60px;
    padding-left: 20px;
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
    margin: 16px 60px;
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


#checkIcon{
    width: 100px;
    margin-left: 150px;
    margin-top: 10px;
    margin-bottom: 10px;
}
#backBNForget{
    width: 100%;
}
</style>