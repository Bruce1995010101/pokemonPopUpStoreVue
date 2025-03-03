<template>
  <div class="conditionDiv">
    <select
      class="selectSomething"
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
    <div  v-for="dataCol in dataList" :key="dataCol">
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

      <div class="selectLittleDiv" v-else-if="filterConditionComp === dataCol.title.eng & dataCol.type.includes('time')">
        <input type="date" class="selectInput selectSomething" v-model="date" @input="changeCondition(false)">
        <select class="selectInput selectSomething" v-model="time" @change="changeCondition(false)">
          <option value=""  selected>不分時段</option>
          <option v-for="timeOption in dataCol.timeOption" :key="timeOption" :value="timeOption.value"  >{{ timeOption.text }}</option>
        </select>
      </div>

      <input
          v-else-if="filterConditionComp === dataCol.title.eng"
          class="selectInput marginLeft"
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
  defaultSelected: String,
});
const emit = defineEmits(["updateData"]);

let filterCondition = ref(props.defaultSelected);
const filterConditionType= ref('')
const filterConditionComp = computed(() => {
  filterValue.value = "";
  date.value = ""
  time.value = ""
  return filterCondition.value;
});
const filterValue = ref("");

const date = ref('')
const time = ref('')

function changeCondition(isConditionChanged) {
  // 找到被選擇的條件的欄位類型
  filterConditionType.value = props.dataList.filter( (dataCol) => dataCol.title.eng === filterCondition.value)[0].type
  
  if (isConditionChanged) {
    emit("updateData", { condition: "", value: "" });
    return;
  }
  if(filterConditionType.value.includes('time')){
    filterValue.value = date.value + ' ' + time.value
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
  margin: 10px 0px 10px 10px;
}


.selectSomething {
  width: 200px;
  height: 20px;
  border-radius: 20px;
  border: 0cap;
  padding: 0px 10px;
}



.selectInput {
  /* width: 200px; */
  width: 100%;
  height: 20px;
  padding-left: 10px;
  border-radius: 20px;
  border: 0cap;
}
#conditionInput {
  padding-left: 10px;
}

.selectInput::placeholder {
  font-size: var(--p);
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

.selectLittleDiv{
  width: 100%;
  display: flex;
}

.marginLeft{
  margin-left: 20px;
}
</style>