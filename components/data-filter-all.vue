<template>
  <div class="conditionDiv">
    <select
      class="selectSomething"
      id="condition"
      v-model="filterCondition"
      @change="changeCondition(true)"
    >
      <option
        v-for="dataCol in dataList"
        :key="dataCol"
        :value="dataCol.title.eng"
        class="selectOption"
        :class="{displayNone : !dataCol.display.filter}"
      >
      
        {{ dataCol.title.cht }}
      </option>
    </select>
    <div v-for="dataCol in dataList" :key="dataCol">
      <select
        v-if="filterConditionComp === dataCol.title.eng & dataCol.type === 'select'"
        class="selectInput selectSomething"
        :class="{displayNone : !dataCol.display.filter}"
        v-model="filterValue"
        @change="changeCondition(false)"
      >
        <option value="" selected>不分類</option>
        <option v-for="option in dataCol.option" :key="option" :value="option.value">{{ option.text }}</option>
      </select>

      <input
          v-else-if="filterConditionComp === dataCol.title.eng"
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
  dataList: Array,
});
const emit = defineEmits(["updateData"]);

let filterCondition = ref("itemType");
const filterConditionComp = computed(() => {
  filterValue.value = "";
  return filterCondition.value;
});
const filterValue = ref("");
function changeCondition(conditionChanged) {
  if (conditionChanged) {
    filterValue.value = "";
    emit("updateData", { condition: "", value: "" });
    return;
  }
  // console.log(filterCondition.value);
  // console.log(filterValue.value);
  emit("updateData", {
    condition: filterCondition.value,
    value: filterValue.value,
  });
}
</script>

<style scoped>
.conditionDiv {
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

.displayNone{
  display: none;
}
</style>