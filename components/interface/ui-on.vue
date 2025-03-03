<template>
  <div class="UIDiv">
    <div class="UIText">{{ dataUI.titleText }}</div>
    <div id="UIBnDiv">
      <button id="UICancelBn" @click="closeUI">取消</button>
      <button id="UISubmit" @click="onData">確定</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dataUI: Object,
  currentPage: String,
});
const emit = defineEmits(["closeUI", "onData"]);
function closeUI() {
  emit("closeUI");
}

const UIData = inject("UIData");
async function onData() {
  const data = UIData.value.on;
  // console.log(data);
  let payload = null;
  if (props.currentPage === "menuitem") {
    payload = {
      itemID: data.itemID,
      menuExist: 1,
    };
  } else if (props.currentPage === "product") {
    payload = {
      productID: data.productID,
      productExist: 1,
    };
  } else if (props.currentPage === "orderlist") {
    payload = {
      orderID: data.orderID,
      orderExist: 1,
    };
  } else if (props.currentPage === "cafebooking") {
    payload = {
      cafeBookingID: data.cafeBookingID,
      bookingExist: 1,
    };
  }
  emit("onData", payload);
}
</script>


<style scoped>
.UIDiv {
  margin: 50px 40px 40px 40px;
  text-align: center;
}
.UIText {
  text-align: center;
  font-size: var(--h6);
}

#UIBnDiv {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}

#UICancelBn {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--black);
  color: var(--white);
  /* float: left; */
}
#UISubmit {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--red);
  color: var(--white);
  /* float: right; */
}
</style>