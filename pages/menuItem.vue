<template>
  <NuxtLayout name="default">
    <template #default>
      <div class="f_h4 c_white" id="title">餐點管理</div>

      <article class="tabs">
        <div class="selectDiv">
          <select class="selectSomething" id="condition"></select>
          <input
            class="selectInput"
            type="text"
            id="conditionInput"
            placeholder="請輸入值"
          />
          <!-- change here -->
          <select
            class="selectInput selectSomething"
            id="conditionSelect1"
          >
            <option value="" selected>不分類</option>
            <option value="飲品">飲品</option>
            <option value="主餐">主餐</option>
            <option value="甜點">甜點</option>
          </select>
          <select
            class="selectInput selectSomething"
            name=""
            id="conditionSelect2"
          >
            <option value="" selected>不分類</option>
            <option value="1">是</option>
            <option value="0">否</option>
          </select>
        </div>

        <input class="bookmark" checked id="one" name="tabs" type="radio" />
        <label class="bookMarkLabel" for="one">上架餐點</label>

        <input class="bookmark" id="two" name="tabs" type="radio" value="Two" />
        <label class="bookMarkLabel" for="two">下架餐點</label>

        <div class="panels">
          <div class="panel">
            <table class="panelTable">
              <thead>
                <tr class="bc_yellow" id="existTHead"></tr>
              </thead>
              <tbody class="noto-sans-tc_r c_black" id="existTBody"></tbody>
            </table>
          </div>

          <div class="panel">
            <table class="panelTable">
              <thead>
                <tr class="bc_yellow" id="noExistTHead"></tr>
              </thead>
              <tbody class="noto-sans-tc_r c_black" id="noExistTBody"></tbody>
            </table>
          </div>
        </div>
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
</script>

<style scoped>
#title{
    margin: 30px ;
    padding-left: 40px;
    background-color: var(--black);
    border-radius: 30px;
    letter-spacing: 2px;
}

#navMenu {
  background-color: var(--red);
  color: var(--white);
}

#conditionSelect1 {
  display: none;
}
#conditionSelect2 {
  display: none;
}
#conditionSelect3 {
  display: none;
}

.createImg {
  margin-top: 10px;
  width: 250px;
  border-radius: 20px;
}
.createImgBNDiv {
  display: flex;
  width: 100%;
  /* align-items: center ; */
  /* justify-content: center; */
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

td:nth-of-type(2) > img {
  border-radius: 20px;
}
td:nth-last-of-type(2) {
  /* display: block; */
  text-align: left;
}

td:nth-last-of-type(4) {
  /* display: block; */
  text-align: center;
}

/* content--------------------- */

#container {
  height: 100vh;
  position: relative;
}

.tabs {
  margin: 30px;
  position: relative;
  height: 80%;
}

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
  margin-left: auto;
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

.tabs input:nth-of-type(1):checked ~ .panels .panel:first-child,
.tabs input:nth-of-type(2):checked ~ .panels .panel:nth-child(2),
.tabs input:nth-of-type(3):checked ~ .panels .panel:nth-child(3),
.tabs input:nth-of-type(4):checked ~ .panels .panel:last-child {
  visibility: visible;
  display: block;
  transition: 0.3s;
}

/* tr:nth-child(even){
    background-color: var(--whitePure);
} */

.panels {
  border-radius: 10px 10px 10px 10px;
  /* position: relative; */
  height: 100%;
}

.panel {
  /* position: relative; */
  width: 100%;
  height: 100%;
  display: none;
  /* visibility: hidden; */
  border-radius: 0 10px 10px 10px;
  /* padding: 4%; */
  /* box-sizing: border-box; */
}

.panelTable {
  width: 100%;
  height: 90%;
  min-height: 315px;
  /* max-height: 500px; */

  background-color: var(--whitePure);
  border-radius: 0px 10px 10px 10px;
  margin: 0px;

  white-space: nowrap;
  /* border-collapse: collapse; */
  display: block;
  overflow: auto;
}

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
  background-image: url("../image/plus-circle-fill.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;

  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 0cap;
  padding: 0px 0px;
}

table {
  width: 100%;
  table-layout: fixed;
}

thead {
  font-size: var(--p);

  position: sticky;
  top: 0;
  z-index: 1;
}

thead > tr > td {
  text-align: center;
}

td {
  padding: 10px;
  text-align: left;
}
td:first-of-type {
  text-align: center;
  width: 50px;
}
td:nth-last-of-type(2) {
  /* display: block; */
  width: 100%;
  text-align: center;
}

tbody > tr > td:last-of-type {
  /* background-color: var(--yellow); */
  text-align: center;
  border-radius: 0px 0px 5px 5px;
}

tbody > tr:hover td:last-of-type {
  position: sticky;
  right: 0;
  z-index: 0;
}

tbody > tr {
  transition-property: background-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;
}

tbody > tr:hover {
  background-color: var(--whiteLine);
}

.tableBn {
  width: 30px;
  height: 30px;
  border-radius: 25px;
  border: 0cap;
  padding: 0px 0px;
}

/* button------------------------------- */
.remove {
  background-image: url("../image/remove.png");
  /* width: 70; */
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: var(--red);
}
.on {
  background-image: url("../image/upwhite.png");
  /* width: 70; */
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: var(--black-l1);
}

.edit {
  background-image: url("../image/pencil-fillwhite.png");
  background-position: center;
  background-size: 70%;
  background-repeat: no-repeat;
  background-color: var(--yellow);
}

.delete {
  background-image: url("../image/trash3-fillwhite.png");
  /* width: 70; */
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: var(--red);
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

