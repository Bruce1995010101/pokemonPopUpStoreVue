<template>
  <div class="UIDiv">
    <div class="UIText">{{ dataUI.titleText }}</div>
    <div id="UIBnDiv">
      <button id="UICancelBn" @click="closeUI">取消</button>
      <button id="UISubmit" @click="removeData">確定</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dataUI: Object,
  currentPage: String,
});
const emit = defineEmits(["closeUI", "removeData"])
function closeUI(){
  emit("closeUI")
}

const UIData = inject("UIData");
async function removeData() {
  const data = UIData.value.remove;
  // console.log(data);
  let payload = null;
  if (props.currentPage === "menuitem") {
    payload = {
      itemID: data.itemID,
      menuExist: 0,
    };
  } else if (props.currentPage === "product") {
    payload = {
      productID: data.productID,
      productExist: 0,
    };
  }

  emit('removeData', payload)
}
</script>


<style scoped>

.UIDiv {
  margin: 50px 40px 40px 40px;
  text-align: center;
}
.UIText {
  text-align:center;
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