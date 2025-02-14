<template>
  <div class="selectDiv">
    <div v-if="currentPage === 'menuItem'">
      <select
        class="selectSomething"
        id="condition"
        v-model="filterCondition"
        @change="changeCondition(true)"
      >
        <option
          v-for="dataCol in pageDataList"
          :key="dataCol"
          :value="dataCol.eng"
          class="selectOption"
        >
          {{ dataCol.cht }}
        </option>
      </select>

      <!-- change here -->
      <select
        v-if="filterConditionComp === 'itemType'"
        class="selectInput selectSomething"
        v-model="filterValue"
        @change="changeCondition(false)"
      >
        <option value="" selected>不分類</option>
        <option value="飲品">飲品</option>
        <option value="主餐">主餐</option>
        <option value="甜點">甜點</option>
      </select>
      <select
        v-else-if="filterConditionComp === 'itemMain'"
        class="selectInput selectSomething"
        v-model="filterValue"
        @change="changeCondition(false)"
      >
        <option value="" selected>不分類</option>
        <option value="1">是</option>
        <option value="0">否</option>
      </select>
      <input
        v-else
        class="selectInput"
        type="text"
        placeholder="請輸入值"
        v-model="filterValue"
        @input="changeCondition(false)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: String,
  pageDataList: Array,
});
const emit = defineEmits(["updateData"])

let filterCondition = ref('itemType');
const filterConditionComp = computed(() => {
  filterValue.value = ''
  return filterCondition.value
});
const filterValue = ref("");
function changeCondition(conditionChanged) {
  if(conditionChanged){
    filterValue.value = ''
    emit("updateData", {condition : '', value : ''})
    return
  }
  console.log(filterCondition.value);
  console.log(filterValue.value);
  emit("updateData", {condition : filterCondition.value, value : filterValue.value})
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
  height: 20px;
  border-radius: 20px;
  border: 0cap;
  padding: 0px 10px;
}

.selectInput {
  width: 200px;
  height: 20px;
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