<template>
  <NuxtLayout name="default" :editBlack="editBlackCom" @closeEditBlack="closeAllEditUI">
    <template #default>
      <div class="f_h4 c_white" id="title">餐點管理</div>

      <article class="tabs">
        <data-filter
          :currentPage="page"
          :pageDataList="filterDataTitle"
          @updateData="handleUpdateData"
        ></data-filter>

        <input
          class="bookmark"
          checked
          id="one"
          name="tabs"
          type="radio"
          value="exist"
          @change="changePanal('exist')"
        />
        <label class="bookMarkLabel" for="one">上架餐點</label>

        <input
          class="bookmark"
          id="two"
          name="tabs"
          type="radio"
          value="noExist"
          @change="changePanal('noExist')"
        />
        <label class="bookMarkLabel" for="two">下架餐點</label>

        <table-slot :panelActive="panelActiveValueCom">
          <template #tableHead>
            <table-head :menuDataTitleList="menuDataTitle"></table-head>
          </template>
          <template #tableBody>
            <table-body-menu
              :panelActive="panelActiveValueCom"
              :data="data"
              @openEditUI="openEditUI"
              @openRemoveUI="openRemoveUI"
              @openOnUI="openOnUI"
            ></table-body-menu>
          </template>
        </table-slot>
        <div class="addDiv">
          <button title="新增資料" class="add" @click="openAddDataUI"></button>
        </div>
      </article>
    </template>

    <template #create>
      <div class="createEditUI" v-if="createUICom">
        <ui-create-menu @closeUI="closeAllEditUI"></ui-create-menu>
      </div>
    </template>
    <template #edit>
      <div class="createEditUI" v-if="editUICom">
        <ui-edit-menu @closeUI="closeAllEditUI"></ui-edit-menu>
      </div>
    </template>
    <template #remove>
      <div class="comfirmUI" v-if="removeUICom">
        <ui-remove-menu @closeUI="closeAllEditUI"></ui-remove-menu>
      </div>
    </template>
    <template #on>
      <div class="comfirmUI" v-if="onUICom">
        <ui-on-menu @closeUI="closeAllEditUI"></ui-on-menu>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
// import { usePagesData } from '~/stores/pagesData'
// const pagesData = usePagesData()
// pagesData.changePage('menuItem')
// console.log(pagesData.currentPage);
// import CreateUserInterface from '~/components/editUI/create-user-interface.vue';

const route = useRoute();
// 取得最後一段路由
const page = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  return segments[segments.length - 1] || "";
});

const menuDataTitle = [
  {eng : "itemID",cht : "餐點編號"},
  {eng : "itemImg",cht : "餐點圖片"},
  {eng : "itemName",cht : "餐點名稱"},
  {eng : "itemType",cht : "餐點類型"},
  {eng : "itemMain",cht : "首頁呈現品項"},
  {eng : "itemPrice",cht : "餐點價格"},
  {eng : "itemDescribe",cht : "餐點描述"},
]
const filterDataTitle = computed(() => menuDataTitle.filter((title) => title.cht !== '餐點圖片'))

let panelActiveValue = ref("exist");
async function changePanal(panalName) {
  panelActiveValue.value = panalName;
  refresh();
}
const panelActiveValueCom = computed(() => panelActiveValue.value);

let condition = ref({ condition: "", value: "" });
function handleUpdateData(data) {
  // console.log(data);
  condition.value = data
  refresh();
}

const { data, pending, error, refresh } = useAsyncData(
  "menuItemData",
  async () => {
    let url = "http://localhost:3000/api/menuItem?";
    url += panelActiveValueCom.value === "exist" ? "menuExist=1" : "menuExist=0";
    if (condition.value.value !== "") {
      url += "&";
      url += condition.value.condition;
      url += "=";
      url += condition.value.value;
    }
    return await $fetch(url);
  }
);



//增刪修UI控制
let editBlack = ref(false)
const editBlackCom = computed( ()=> editBlack.value)
function openEditBlack(){
  editBlack.value = true
}
let createUI = ref(false)
const createUICom = computed( ()=> createUI.value)
let editUI = ref(false)
const editUICom = computed( ()=> editUI.value)
let removeUI = ref(false)
const removeUICom = computed( ()=> removeUI.value)
let onUI = ref(false)
const onUICom = computed( ()=> onUI.value)
function closeAllEditUI(){
  editBlack.value = false
  createUI.value = false
  editUI.value = false
  removeUI.value = false
  onUI.value = false
  refresh()
}

const UIData = ref({ edit: null, remove: null, on: null })
provide("UIData", UIData);
function openAddDataUI(){
  openEditBlack()
  createUI.value = true
}
function openEditUI(){
  openEditBlack()
  editUI.value = true
}
function openRemoveUI(){
  openEditBlack()
  removeUI.value = true
}
function openOnUI(){
  openEditBlack()
  onUI.value = true
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
  bottom: 50px;
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

</style>

