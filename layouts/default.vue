<template>
  <div class="bc_yellow_l2 row">
    <div class="col-2">
      <div class="bc_yellow" id="nav">
        <div id="logoDiv">
          <img id="logo" src="/assets/logo.png" alt="" />
        </div>
        <div class="navList">
          <div class="navTextDiv noto-sans-tc_r" id="navOverAll" @click="turnToOverAllPage">總覽</div>
          <div class="navTextDiv noto-sans-tc_r" id="navProduct" @click="turnToProductPage">商品管理</div>
          <div class="navTextDiv noto-sans-tc_r" id="navOrder" @click="turnToOrderListPage">交易紀錄管理</div>
          <div class="navTextDiv noto-sans-tc_r" id="navMenu" @click="turnToMenuItemPage">咖啡廳品項管理</div>
          <div class="navTextDiv noto-sans-tc_r" id="navCafeBooking" @click="turnToCafeBookingPage">咖啡廳預定管理</div>
          <div class="navTextDiv noto-sans-tc_r" id="navStoreBooking" @click="turnToStoreBookingPage">快閃店預定管理</div>
          <div class="navTextDiv noto-sans-tc_r" id="navAccount" @click="turnToAccountPage">帳號管理</div>
          <button id="logout">LOGOUT</button>
        </div>
      </div>
    </div>

    <div class="col-10">
      <slot></slot>
    </div>

    <div id="editContainer">
      <div id="editBlack" v-if="editBlack" @click="closeEditBlack"></div>
      <div id="webStatusUI">
        <slot name="webStatus"></slot>
      </div>
      <div id="createUI">
        <slot name="create"></slot>
      </div>
      <div id="editUI">
        <slot name="edit"></slot>
      </div>
      <div id="removeUI">
        <slot name="remove"></slot>
      </div>
      <div id="onUI">
        <slot name="on"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  editBlack: Boolean,
});
const emit = defineEmits(["closeEditBlack"]);
function closeEditBlack() {
  emit("closeEditBlack");
}

function turnToOverAllPage(){
  window.location.href = "http://localhost:3000/overAll"
}
function turnToProductPage(){
  window.location.href = "http://localhost:3000/product"
}
function turnToOrderListPage(){
  window.location.href = "http://localhost:3000/orderlist"
}
function turnToMenuItemPage(){
  window.location.href = "http://localhost:3000/menuitem"
}
function turnToCafeBookingPage(){
  window.location.href = "http://localhost:3000/cafebooking"
}
function turnToStoreBookingPage(){
  window.location.href = "http://localhost:3000/storebooking"
}
function turnToAccountPage(){
  window.location.href = "http://localhost:3000/Account"
}
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 16% 84%;
  height: 100%;
  margin: 0%;
}

.col-2 {
  height: 100vh;
}
.col-10 {
  height: 100vh;
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

#editBlack {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 50%);

  z-index: 4;
}
</style>