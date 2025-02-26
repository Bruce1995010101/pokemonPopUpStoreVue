<template>
  <NuxtLayout
    name="default"
    :editBlack="editBlackCom"
    @closeEditBlack="closeAllEditUI"
  >
    <template #default>
      <!-- 改這 -->
      <div class="f_h4 c_white" id="title">商品管理</div>

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
        <label class="bookMarkLabel" for="one">上架商品</label>

        <input
          class="bookmark"
          id="two"
          name="tabs"
          type="radio"
          value="noExist"
          @change="changePanal('noExist')"
        />
        <!-- 改這 -->
        <label class="bookMarkLabel" for="two">下架商品</label>

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
const defaultSelected = "productType";

onMounted(async () => {
  if (process.client) {
    pagesData.changePage(page.value);
    // console.log(pagesData.currentPage);
  }
});

//改這
const tableDataTitle = [
  {
    title: { eng: "productID", cht: "商品編號" },
    type: "number",
    style: { align: "center" },
  },
  {
    title: { eng: "productName", cht: "商品名稱" },
    type: "string",
    style: { align: "center" },
  },
  {
    title: { eng: "productType", cht: "商品類型" },
    type: "select",
    style: { align: "center" },
    option: [
      { value: "decoration", text: "家飾用品" },
      { value: "jewelry", text: "珠寶首飾" },
      { value: "model", text: "模型" },
      { value: "stationery", text: "文具、文創" },
      { value: "toy", text: "玩具、玩偶" },
    ]
  },
  {
    title: { eng: "productPrice", cht: "商品價格" },
    type: "number",
    style: { align: "center" },
  },
  {
    title: { eng: "productInStock", cht: "庫存" },
    type: "number",
    style: { align: "center" },
  },
  {
    title: { eng: "storeOnly", cht: "快閃店限定" },
    type: "select",
    style: { align: "center" },
    option: [
      { value: 1, text: "V" },
      { value: 0, text: "X" },
    ],
  },
  {
    title: { eng: "productMain", cht: "首頁呈現商品" },
    type: "select",
    style: { align: "center" },
    option: [
      { value: 1, text: "首頁呈現商品" },
      { value: 0, text: "非首頁呈現商品" },
    ],
  },
  {
    title: { eng: "productDescribe", cht: "商品描述" },
    type: "string",
    style: { align: "left" },
  },
];
const dataList = [
  {
    type: "inputText",
    title: { eng: "productID", cht: "商品編號" },
    display: { filter: true, UICreate: false, UIEdit: false, table: true },
  },
  {
    type: "select",
    title: { eng: "productExist", cht: "商品狀況" },
    option: [
      { value: 1, text: "上架商品" },
      { value: 0, text: "下架商品" },
    ],
    display: { filter: false, UICreate: true, UIEdit: true, table: false },
  },
  {
    type: "inputText",
    title: { eng: "productName", cht: "商品名稱" },
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "select",
    title: { eng: "productType", cht: "商品類型" },
    option: [
      { value: "decoration", text: "家飾用品" },
      { value: "jewelry", text: "珠寶首飾" },
      { value: "model", text: "模型" },
      { value: "stationery", text: "文具、文創" },
      { value: "toy", text: "玩具、玩偶" },
    ],
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "inputText",
    title: { eng: "productDescribe", cht: "商品描述" },
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "inputNumber",
    title: { eng: "productPrice", cht: "商品價格" },
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "inputNumber",
    title: { eng: "productInStock", cht: "庫存" },
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "select",
    title: { eng: "storeOnly", cht: "快閃店限定" },
    option: [
      { value: 1, text: "快閃店限定" },
      { value: 0, text: "非快閃店限定" },
    ],
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "select",
    title: { eng: "productMain", cht: "首頁呈現商品" },
    option: [
      { value: 1, text: "首頁呈現商品" },
      { value: 0, text: "非首頁呈現商品" },
    ],
    display: { filter: true, UICreate: true, UIEdit: true, table: true },
  },
  {
    type: "inputImgMutiple",
    title: { eng: "productImg", cht: "圖片連結" },
    img: [
      "https://github.com/Bruce1995010101/pkimg/blob/main//productImg/p11/11-3.jpg?raw=true",
      "https://github.com/Bruce1995010101/pkimg/blob/main//productImg/p11/11-2.jpg?raw=true",
    ],
    display: { filter: false, UICreate: true, UIEdit: true, table: true },
  },
];

const removeUIText = {
  titleText: "確定使該商品下架？",
};
const onUIText = {
  titleText: "確定使該商品上架？",
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
  "productData",
  async () => {
    let url = "http://localhost:3000/api/product?";
    //改這
    url +=
      panelActiveValueCom.value === "exist"
        ? "productExist=1"
        : "productExist=0";
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
  const result = await useAsyncData("productDataCreate", async () => {
    let url = "http://localhost:3000/api/product";
    $fetch(url, {
      method: "POST",
      body: data,
    });
  });
  console.log(data);
  refresh();
  refresh();
  closeAllEditUI();
}
async function editData(data) {
  const result = await useAsyncData("productDataEdit", async () => {
    let url = "http://localhost:3000/api/product";
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
  const result = await useAsyncData("productDataRemove", async () => {
    let url = "http://localhost:3000/api/product";
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
  const result = await useAsyncData("productDataOn", async () => {
    let url = "http://localhost:3000/api/product";
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

