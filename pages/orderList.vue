<template>
  <NuxtLayout
    name="default"
    :editBlack="editBlackCom"
    @closeEditBlack="closeAllEditUI"
  >
    <template #default>
      <div class="f_h4 c_white" id="title">交易紀錄管理</div>

      <article class="tabs">
        <data-filter-all
          :currentPage="page"
          :dataList="dataList"
          :defaultSelected="defaultSelected"
          @updateData="handleUpdateData"
        ></data-filter-all>

        <input
          class="bookmark"
          checked
          id="one"
          name="tabs"
          type="radio"
          value="exist"
          @change="changePanal('exist')"
        />
        <label class="bookMarkLabel" for="one">有效訂單</label>

        <input
          class="bookmark"
          id="two"
          name="tabs"
          type="radio"
          value="noExist"
          @change="changePanal('noExist')"
        />
        <label class="bookMarkLabel" for="two">無效訂單</label>

        <table-slot :panelActive="panelActiveValueCom">
          <template #tableHead>
            <table-head
              :currentPage="page"
              :dataTitleList="tableDataTitle"
            ></table-head>
          </template>
          <template #tableBody>
            <table-body
              :currentPage="page"
              :panelActive="panelActiveValueCom"
              :dataTitleList="tableDataTitle"
              :data="data"
              @openEditUI="openEditUI"
              @openRemoveUI="openRemoveUI"
              @openOnUI="openOnUI"
            ></table-body>
          </template>
        </table-slot>
        <div class="addDiv">
          <button title="新增資料" class="add" @click="openAddDataUI"></button>
        </div>
      </article>
    </template>

    <template #create>
      <div class="createEditUI" v-if="createUICom">
        <ui-create
          :currentPage="page"
          :dataTitleUI="dataList"
          @closeUI="closeAllEditUI"
          @createData="createData"
        ></ui-create>
      </div>
    </template>
    <template #edit>
      <div class="createEditUI" v-if="editUICom">
        <ui-edit
          :currentPage="page"
          :dataTitleUI="dataList"
          @closeUI="closeAllEditUI"
          @editData="editData"
        ></ui-edit>
      </div>
    </template>
    <template #remove>
      <div class="comfirmUI" v-if="removeUICom">
        <ui-remove
          :currentPage="page"
          :dataUI="removeUIText"
          @closeUI="closeAllEditUI"
          @removeData="removeData"
        ></ui-remove>
      </div>
    </template>
    <template #on>
      <div class="comfirmUI" v-if="onUICom">
        <ui-on
          :currentPage="page"
          :dataUI="onUIText"
          @closeUI="closeAllEditUI"
          @onData="onData"
        ></ui-on>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
});

// 取得目前頁面並存入pinia
import { usePagesData } from "~/stores/pagesData";
const pagesData = usePagesData();

const route = useRoute();
const path = ref(route.path);
  // 取得最後一段路由
const page = computed(() => {
  const segments = path.value.split("/");
  // console.log(segments[segments.length - 1] || "");

  return segments[segments.length - 1] || "";
});


onMounted(async () => {
  if (process.client) {
    pagesData.changePage(page.value);
    // console.log(pagesData.currentPage);
  }
});

//導入頁面資訊
import {orderList} from '../constants.js'
const tableDataTitle = orderList.tableDataTitle
const dataList = orderList.dataList
const removeUIText = orderList.removeUIText
const onUIText = orderList.onUIText

//有效無效資料頁切控制
let panelActiveValue = ref("exist");
async function changePanal(panalName) {
  panelActiveValue.value = panalName;
  refresh();
}
const panelActiveValueCom = computed(() => panelActiveValue.value);

//預設篩選
const defaultSelected = "orderStatus";
//篩選器控制
let condition = ref({ condition: "", value: "" });
function handleUpdateData(data) {
  // console.log(data);
  condition.value = data;
  refresh();
}

const { data, pending, error, refresh } = useAsyncData(
  "orderListData",
  async () => {
    let url = "http://localhost:3000/api/orderList?";
    url +=
      panelActiveValueCom.value === "exist" ? "orderExist=1" : "orderExist=0";
    if (condition.value.value !== "") {
      url += "&";
      url += condition.value.condition;
      url += "=";
      url += condition.value.value;
    }

    return await $fetch(url);
  }
);
// console.log(data.value);

provide("refreshData", refresh);

//增刪修UI控制
let editBlack = ref(false);
const editBlackCom = computed(() => editBlack.value);
function openEditBlack() {
  editBlack.value = true;
}
let createUI = ref(false);
const createUICom = computed(() => createUI.value);
let editUI = ref(false);
const editUICom = computed(() => editUI.value);
let removeUI = ref(false);
const removeUICom = computed(() => removeUI.value);
let onUI = ref(false);
const onUICom = computed(() => onUI.value);
function closeAllEditUI() {
  editBlack.value = false;
  createUI.value = false;
  editUI.value = false;
  removeUI.value = false;
  onUI.value = false;
}

const UIData = ref({ edit: null, remove: null, on: null });
provide("UIData", UIData);
function openAddDataUI() {
  openEditBlack();
  createUI.value = true;
}
function openEditUI() {
  openEditBlack();
  editUI.value = true;
}
function openRemoveUI() {
  openEditBlack();
  removeUI.value = true;
}
function openOnUI() {
  openEditBlack();
  onUI.value = true;
}

//增刪修Api
async function createData(data) {
  const result = await useAsyncData("orderListDataCreate", async () => {
    let url = "http://localhost:3000/api/orderList";
    $fetch(url, {
      method: "POST",
      body: data,
    });
  });
  // console.log(data);
  refresh();
  refresh();
  closeAllEditUI();
}
async function editData(data) {
  const result = await useAsyncData("orderListDataEdit", async () => {
    let url = "http://localhost:3000/api/orderList";
    $fetch(url, {
      method: "PUT",
      body: data,
    });
  });
  // console.log(result);
  refresh();
  refresh();
  closeAllEditUI();
}
async function removeData(data) {
  const result = await useAsyncData("orderListDataRemove", async () => {
    let url = "http://localhost:3000/api/orderList";
    $fetch(url, {
      method: "PATCH",
      body: data,
    });
  });
  // console.log(result);
  refresh();
  refresh();
  closeAllEditUI();
}
async function onData(data) {
  const result = await useAsyncData("orderListDataOn", async () => {
    let url = "http://localhost:3000/api/orderList";
    $fetch(url, {
      method: "PATCH",
      body: data,
    });
  });
  // console.log(result);
  refresh();
  refresh();
  closeAllEditUI();
}
</script>



<style scoped>
#title {
  margin: 30px;
  padding-left: 40px;
  background-color: var(--black);
  border-radius: 30px;
  letter-spacing: 2px;
}

.tabs {
  margin: 30px;
  position: relative;
  height: 85%;
}
/* 有無資料標籤 */
.bookmark {
  visibility: hidden;
}

.bookMarkLabel {
  cursor: pointer;
  background-color: var(--black);
  color: var(--white);
  border-radius: 20px 20px 0 0;
  padding: 10px;
  float: left;
  margin-right: 2px;
}

.bookMarkLabel:hover {
  background: var(--black-l1);
}

input:checked + .bookMarkLabel {
  background: var(--yellow);
  color: var(--black);
}

/* 加號 新增資料按鈕--------------------- */

.addDiv {
  position: absolute;
  right: 20px;
  bottom: 10px;
  opacity: 0.6;
  transition: all 0.5s;
}
.addDiv:hover {
  opacity: 1;
}
.add {
  background-image: url("~/assets/plus-circle-fill.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;

  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 0cap;
  padding: 0px 0px;
}

/* edit--------------------------- */

#editBlack {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 50%);

  z-index: 4;

  display: none;
}

.createEditUI {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 510px;
  height: 460px;
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;
}

.comfirmUI {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;
}

::-webkit-scrollbar {
  display: none;
}
</style>

