<template>
  <NuxtLayout
    name="default"
    :editBlack="editBlackCom"
    @closeEditBlack="closeAllEditUI"
  >
    <template #default>
      <!-- 改這 -->
      <div class="f_h4 c_white" id="title">咖啡廳品項管理</div>

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
        <!-- 改這 -->
        <label class="bookMarkLabel" for="one">上架餐點</label>

        <input
          class="bookmark"
          id="two"
          name="tabs"
          type="radio"
          value="noExist"
          @change="changePanal('noExist')"
        />
        <!-- 改這 -->
        <label class="bookMarkLabel" for="two">下架餐點</label>

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
        <!-- <ui-create-menu @closeUI="closeAllEditUI"></ui-create-menu> -->
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

//預設篩選
const defaultSelected = "itemType";

onMounted(async () => {
  if (process.client) {
    pagesData.changePage(page.value);
  }
});

//改這
const tableDataTitle = [
  {
    title: { eng: "itemID", cht: "餐點編號" },
    type: "number",
    style: { align: "center" },
  },
  {
    title: { eng: "itemImg", cht: "餐點圖片" },
    type: "image",
    style: { align: "center" },
  },
  {
    title: { eng: "itemName", cht: "餐點名稱" },
    type: "string",
    style: { align: "left" },
  },
  {
    title: { eng: "itemType", cht: "餐點類型" },
    type: "select",
    style: { align: "center" },
    option: [
      { value: "飲品", text: "飲品" },
      { value: "主餐", text: "主餐" },
      { value: "甜點", text: "甜點" },
    ],
  },
  {
    title: { eng: "itemMain", cht: "首頁呈現品項" },
    type: "select",
    style: { align: "center" },
    option: [
      { value: 1, text: "首頁呈現品項" },
      { value: 0, text: "非首頁呈現品項" },
    ],
  },
  {
    title: { eng: "itemPrice", cht: "餐點價格" },
    type: "number",
    style: { align: "center" },
  },
  {
    title: { eng: "itemDescribe", cht: "餐點描述" },
    type: "string",
    style: { align: "left" },
  },
];
const dataList = [
  {
    type: "inputTextID",
    title: { eng: "itemID", cht: "餐點編號" },
    display: { filter: true, UICreate: false, UIEdit: true, table: true },
  },
  {
    type: "select",
    title: { eng: "menuExist", cht: "餐點狀況" },
    option: [
      { value: 1, text: "上架餐點" },
      { value: 0, text: "下架餐點" },
    ],
    display: { filter: false, UICreate: true, UIEdit: true, table: false },
  },
  {
    type: "inputText",
    title: { eng: "itemName", cht: "餐點名稱" },
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "select",
    title: { eng: "itemType", cht: "餐點類型" },
    option: [
      { value: "飲品", text: "飲品" },
      { value: "主餐", text: "主餐" },
      { value: "甜點", text: "甜點" },
    ],
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "inputText",
    title: { eng: "itemDescribe", cht: "餐點描述" },
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "select",
    title: { eng: "itemMain", cht: "首頁呈現品項" },
    option: [
      { value: 1, text: "首頁呈現品項" },
      { value: 0, text: "非首頁呈現品項" },
    ],
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "inputNumber",
    title: { eng: "itemPrice", cht: "餐點價格" },
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "inputImgSingle",
    title: { eng: "itemImg", cht: "餐點圖片" },
    display: { filter: false, UICreate: true, UIEdit: true, table: true },
  },
];

const removeUIText = {
  titleText: "確定使該品項下架？",
};
const onUIText = {
  titleText: "確定使該品項上架？",
};

let panelActiveValue = ref("exist");
async function changePanal(panalName) {
  panelActiveValue.value = panalName;
  refresh();
}
const panelActiveValueCom = computed(() => panelActiveValue.value);

let condition = ref({ condition: "", value: "" });
function handleUpdateData(data) {
  // console.log(data);
  condition.value = data;
  refresh();
}

const { data, pending, error, refresh } = useAsyncData(
  //改這
  "menuItemData",
  async () => {
    let url = "http://localhost:3000/api/menuItem?";
    //改這
    url +=
      panelActiveValueCom.value === "exist" ? "menuExist=1" : "menuExist=0";
    if (condition.value.value !== "") {
      url += "&";
      url += condition.value.condition;
      url += "=";
      url += condition.value.value;
    }
    return await $fetch(url);
  }
);
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

//編輯data
//改這
async function createData(data) {
  const result = await useAsyncData("menuItemDataCreate", async () => {
    let url = "http://localhost:3000/api/menuItem";
    $fetch(url, {
      method: "POST",
      body: data,
    });
  });
  // console.log(result);
  refresh();
  refresh();
  closeAllEditUI();
}
async function editData(data) {
  const result = await useAsyncData("menuItemDataEdit", async () => {
    let url = "http://localhost:3000/api/menuItem";
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
  const result = await useAsyncData("menuItemDataRemove", async () => {
    let url = "http://localhost:3000/api/menuItem";
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
  const result = await useAsyncData("menuItemDataOn", async () => {
    let url = "http://localhost:3000/api/menuItem";
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
  width: 500px;
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
  /* height: 200px; */
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;
}

::-webkit-scrollbar {
  display: none;
}
</style>

