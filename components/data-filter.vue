<template>
  <div class="selectDiv">
    <div v-if="currentPage === 'menuItem'" @change="change">
      <select class="selectSomething" id="condition">
        <option
          v-for="dataCol in pageDataListTW"
          :key="dataCol"
          :value="dataCol"
          class="selectOption"
          id="menuItemCol"
        >
          {{ dataCol }}
        </option>
      </select>

      <!-- change here -->
      <select
        v-if="menuItemColComp === '餐點類型'"
        class="selectInput selectSomething"
        id="conditionSelect1"
      >
        <option value="" selected>不分類</option>
        <option value="飲品">飲品</option>
        <option value="主餐">主餐</option>
        <option value="甜點">甜點</option>
      </select>
      <select
        v-else-if="menuItemColComp === '首頁呈現品項'"
        class="selectInput selectSomething"
        id="conditionSelect2"
      >
        <option value="" selected>不分類</option>
        <option value="1">是</option>
        <option value="0">否</option>
      </select>
      <input
        v-else
        class="selectInput"
        type="text"
        id="conditionInput"
        placeholder="請輸入值"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: String,
  pageDataList: Array,
  pageDataListTW: Array,
});
const tempBool = ref(false);
let menuItemCol = ref("");
const menuItemColComp = computed(() => menuItemCol.value);
function change() {
  menuItemCol.value = document.getElementById("condition").value;
  // console.log(menuItemCol.value);
}
</script>

<style scoped>
.selectDiv {
  width: 450px;
  position: absolute;
  right: 0%;
  top: 0%;
  display: flex;
  padding: 10px;
}

.selectSomething {
  width: 200px;
  border-radius: 20px;
  border: 0cap;
  padding: 0px 10px;
}

.selectInput {
  width: 200px;
  margin-left: 20px;
  border-radius: 20px;
  border: 0cap;
}
#conditionInput {
  padding-left: 10px;
}

.selectInput::placeholder {
  font-size: var(--p);
  padding-left: 10px;
}

.selectOption {
  font-size: var(--p);
}

#conditionSelect {
  display: none;
}
</style>