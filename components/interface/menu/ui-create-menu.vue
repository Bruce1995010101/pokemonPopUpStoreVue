<template>
  <div>
    <div class="UITitle f_h6 c_black">新增資料</div>
    <div class="UIInputDiv f_p c_black">
      <div class="UILittleDiv row">
        <div class="UISpan col-3">餐點狀況</div>
        <div class="col-9">
          <select
            class="selectOption TESTmenuExist"
            name=""
            id="menuExistCreate"
          >
            <option value="1">上架餐點</option>
            <option value="0">下架餐點</option>
          </select>
        </div>
      </div>

      <div class="UILittleDiv row">
        <div class="UISpan col-3">餐點名稱</div>
        <div class="col-9">
          <input class="UIInput TESTitemName" type="text" id="itemNameCreate" />
        </div>
      </div>
      <div class="UILittleDiv row">
        <div class="UISpan col-3">餐點類型</div>
        <div class="col-9">
          <select class="selectOption TESTitemType" name="" id="itemTypeCreate">
            <option value="飲品">飲品</option>
            <option value="主餐">主餐</option>
            <option value="甜點">甜點</option>
          </select>
        </div>
      </div>
      <div class="UILittleDiv row">
        <div class="UISpan col-3">餐點描述</div>
        <div class="col-9">
          <input
            class="UIInput TESTitemDescribe"
            type="text"
            id="itemDescribeCreate"
          />
        </div>
      </div>
      <div class="UILittleDiv row">
        <div class="UISpan col-3">首頁呈現品項</div>
        <div class="col-9">
          <select class="selectOption TESTitemMain" name="" id="itemMainCreate">
            <option value="1">首頁呈現品項</option>
            <option value="0">非首頁呈現品項</option>
          </select>
        </div>
      </div>
      <div class="UILittleDiv row">
        <div class="UISpan col-3">餐點價格</div>
        <div class="col-9">
          <input
            class="UIInput TESTitemPrice"
            type="number"
            id="itemPriceCreate"
          />
        </div>
      </div>

      <div class="UILittleDiv row">
        <div class="UISpan col-3">圖片連結</div>
        <div class="col-9">
          <input
            oninput="changeImg(this)"
            class="UIInput TESTitemImg itemImgCreate"
            type="test"
            id="itemImgCreate"
          />
          <img class="createImg" src="" alt="" />
        </div>
      </div>

      <div class="UIBNDiv">
        <button class="UICancelBN c_white" @click="closeUI">取消</button>
        <button class="UISubmitBN c_white" id="createUISubmit">送出</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeUI"])
function closeUI(){
  emit("closeUI")
}
</script>


<style scoped>

.row {
  display: grid;
  grid-template-columns: 25% 75%;
  height: 100%;
  margin: 0%;
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
  height: 20px;
  border-radius: 20px;
  border: 0cap;

  padding-left: 10px;
  padding-right: 10px;
}

.selectOption {
  height: 20px;
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

  background-image: url(~/assets/plus-circle-fill.svg);
  background-repeat: no-repeat;
  background-size: cover;
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