<template>
  <NuxtLayout name="default">
    <template #default>
      <div class="f_h4 c_white" id="title">餐點管理</div>

      <article class="tabs">
        <data-filter
          :currentPage="page"
          :pageDataList="menuDataTitleList"
          :pageDataListTW="menuDataTitleListTW"
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
            <table-head :menuDataTitleList="menuDataTitleListTW"></table-head>
          </template>
          <template #tableBody>
            <table-body-menu
              :panelActive="panelActiveValueCom"
              :data="data"
            ></table-body-menu>
          </template>
        </table-slot>
        <div class="addDiv">
          <button title="新增資料" class="add" onclick="add()"></button>
        </div>
      </article>
    </template>

    <template #create>
      <div>
        <h1>create</h1>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
// import { usePagesData } from '~/stores/pagesData'
// const pagesData = usePagesData()
// pagesData.changePage('menuItem')
// console.log(pagesData.currentPage);
import { useRoute } from "vue-router";

const route = useRoute();
// 取得最後一段路由
const page = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  return segments[segments.length - 1] || "";
});

const menuDataTitleList = [
  "itemID",
  "itemImg",
  "itemName",
  "itemType",
  "itemMain",
  "itemPrice",
  "itemDescribe",
];
const menuDataTitleListTW = [
  "餐點編號",
  "餐點圖片",
  "餐點名稱",
  "餐點類型",
  "首頁呈現品項",
  "餐點價格",
  "餐點描述",
];

let panelActiveValue = ref("exist");
async function changePanal(panalName) {
  panelActiveValue.value = panalName;
  refresh()
}
const panelActiveValueCom = computed(() => panelActiveValue.value);


const { data, pending, error, refresh } = useAsyncData("menuItemData", async () => {
  let url = "http://localhost:3000/api/menuItem?";
  url += panelActiveValueCom.value === "exist" ? "menuExist=1" : "menuExist=0";
  return await $fetch(url);
});

onMounted(async () => {
  if (process.client) {
    //  console.log(resultR.value.data.value);
    // console.log(data);
    // console.log(panelActiveValueCom.value);
    // console.log(url);
  }
});
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

/* 加號--------------------- */

.addDiv {
  position: absolute;
  right: 20px;
  bottom: 20px;
  opacity: 0.6;
  transition: all 0.5s;
}
.addDiv:hover {
  opacity: 1;
}
.add {
  /* background-image: url("../image/plus-circle-fill.svg"); */
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
#editContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 50%);

  z-index: 3;

  display: none;
}
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

#createUI {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;

  display: none;
}

#editUI {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;

  display: none;
}
#deleteUI {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 250px;
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;

  display: none;
}
#removeUI {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 250px;
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;

  display: none;
}
#onUI {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 250px;
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;

  display: none;
}

.UITitle {
  text-align: center;
  margin: 40px 20px 30px 20px;
}

.UIInputDiv {
  margin: 10px 70px;
  text-align: left;
}

.UILittleDiv {
  margin-top: 15px;
}

.UISpan {
  height: 100%;
  white-space: nowrap;
  text-align: left;
}

.UIInput {
  width: 100%;
  border-radius: 20px;
  border: 0cap;

  padding-left: 10px;
  padding-right: 10px;
}

.selectOption {
  /* width: 200px; */
  border-radius: 20px;
  border: 0cap;
  padding: 0px 10px;
}

.UIBNDiv {
  margin-top: 20px;
  margin-bottom: 100px;
}

.UICancelBN {
  width: 175px;
  height: 30px;
  border-radius: 20px;
  background-color: var(--black);
  border: 0cap;
  float: left;
}
.UISubmitBN {
  width: 175px;
  height: 30px;
  border-radius: 20px;
  background-color: var(--red);
  border: 0cap;
  float: right;
}
.UIDiv {
  margin: 80px 40px;
}
.UIText {
  text-align: center;
  font-size: var(--h6);
}

.createImg {
  margin-top: 10px;
  width: 250px;
  border-radius: 20px;
}
.createImgBNDiv {
  display: flex;
  width: 100%;
}
.createImgBN {
  font-weight: 400;
  font-size: var(--p);
  color: var(--white);
  margin: auto;
  /* margin-bottom: 10px; */
  width: 40px;
  border-radius: 60px;
  border: 0cap;
  background-color: var(--black-l2);

  /* background-image: url(../image/plus-circle-fill.svg); */
  background-repeat: no-repeat;
  background-size: cover;
}

/* delete */

#deleteUIBnDiv {
  margin-top: 40px;
}

#deleteUICancelBn {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--black);
  color: var(--white);
  float: left;
}
#deleteUISubmit {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--red);
  color: var(--white);
  float: right;
}

/* remove */

#removeUIBnDiv {
  margin-top: 40px;
}

#removeUICancelBn {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--black);
  color: var(--white);
  float: left;
}
#removeUISubmit {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--red);
  color: var(--white);
  float: right;
}

/* on */

#onUIBnDiv {
  margin-top: 40px;
}

#onUICancelBn {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--black);
  color: var(--white);
  float: left;
}
#onUISubmit {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--red);
  color: var(--white);
  float: right;
}
</style>

