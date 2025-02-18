<template>
  <div class="UIDiv">
    <div class="UIText">確定使該品項上架？</div>
    <div id="UIBnDiv">
      <button id="UICancelBn" @click="closeUI">取消</button>
      <button id="UISubmit">確定</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeUI"])
function closeUI(){
  emit("closeUI")
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