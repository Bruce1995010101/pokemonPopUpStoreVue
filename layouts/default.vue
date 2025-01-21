<template>
  <div class="container">
    <div class="bc_yellow_l2 row">
      <div class="col-2" id="overAllContainer">
        <div class="bc_yellow" id="nav">
          <div id="logoDiv">
            <img id="logo" src="/assets/logo.png" alt="" />
          </div>
          <div class="navList">
            <div class="navTextDiv noto-sans-tc_r" id="navOverAll">總覽</div>
            <div class="navTextDiv noto-sans-tc_r" id="navProduct">
              商品管理
            </div>
            <div class="navTextDiv noto-sans-tc_r" id="navOrder">
              交易紀錄管理
            </div>
            
            <div class="navTextDiv noto-sans-tc_r" id="navOrder">
              交易紀錄管理
            </div>
            <div class="navTextDiv noto-sans-tc_r" id="navMenu">
              咖啡廳品項管理
            </div>
            <div class="navTextDiv noto-sans-tc_r" id="navCafeBooking">
              咖啡廳預定管理
            </div>
            <div class="navTextDiv noto-sans-tc_r" id="navStoreBooking">
              快閃店預定管理
            </div>
            <div class="navTextDiv noto-sans-tc_r" id="navAccount">
              帳號管理
            </div>
            <button id="logout">LOGOUT</button>
          </div>
        </div>
      </div>
      <div class="col-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
    height: 100vh;

}
.row {
  display: grid;
  grid-template-columns: 16% 84%;
  height: 100%;
      margin: 0%;
}

/* nav--------------------- */
.navContent {
  padding-right: 0%;
}

#nav {
  width: 100%;
  height: 100%;
}

#logo {
  width: 120px;
}
#logoDiv {
  margin: auto;
  padding-left: 30px;
  padding-top: 50px;
  /* margin-top: 50px; */
  padding-bottom: 30px;
}
.navTextDiv {
  padding: 10px;
  padding-left: 30px;
  margin-right: 0%;
  color: var(--black);
  letter-spacing: 2px;
  cursor: pointer;
}
.navTextDiv:hover {
  background-color: var(--yellow-l2);
}

#logout {
  margin-right: 2%;
  margin-left: 2%;
  width: 10%;
  height: 30px;
  border: 0cap;
  border-radius: 20px;
  background-color: var(--red);
  color: var(--white);

  position: absolute;
  bottom: 20px;
}

/*  */

#title {
  margin: 30px;
  padding-left: 40px;
  background-color: var(--black);
  border-radius: 30px;
  letter-spacing: 2px;
}
</style>