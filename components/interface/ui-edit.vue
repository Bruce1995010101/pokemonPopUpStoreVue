<template>
  <div>
    <div class="UITitle f_h6 c_black">修改資料</div>
    <div class="UIInputDiv f_p c_black">
      <div
        class="UILittleDiv"
        v-for="dataTitle in dataTitleUI"
        :key="dataTitle"
      >
        <div v-if="!dataTitle.display.UIEdit"></div>
        <div v-else-if="dataTitle.type === 'select'" class="row">
          <div class="UISpan">{{ dataTitle.title.cht }}</div>
          <div>
            <select class="selectOption colValue">
              <option
                v-for="option in dataTitle.option"
                :key="option"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>

        <div v-else-if="dataTitle.type === 'inputText'" class="row">
          <div class="UISpan">{{ dataTitle.title.cht }}</div>
          <div>
            <input class="UIInput colValue" type="text" />
          </div>
        </div>

        <div v-else-if="dataTitle.type === 'inputNumber'" class="row">
          <div class="UISpan">{{ dataTitle.title.cht }}</div>
          <div>
            <input class="UIInput colValue" type="number" />
          </div>
        </div>

        <div v-else-if="dataTitle.type === 'inputImgSingle'" class="row">
          <div class="UISpan">{{ dataTitle.title.cht }}</div>
          <div>
            <input class="UIInput colValue" type="text" v-model="img" />
            <img class="editImg" :src="imgCom" alt="" />
          </div>
        </div>

        <div v-else-if="dataTitle.type === 'inputImgMutiple'" id="images">
          <div
            v-for="number in imgListAmountCom"
            :key="number"
            class="orderProductCreateDiv"
          >
            <div class="UILittleDiv row">
              <div class="UISpan">圖片連結</div>
              <div class="UIImageDiv">
                <input
                  class="UIInput imgsInput"
                  type="text"
                  v-model="imgList[number - 1]"
                />
                <img
                  v-if="imgListCom[number - 1] !== ''"
                  class="createImg"
                  :src="imgListCom[number - 1]"
                  :alt="`圖片${number}`"
                />
              </div>
            </div>
            <button class="plusProduct" @click="moreImage(number)"></button>
            <button
              v-if="imgListAmountCom > 1"
              class="minusButtonMore"
              @click="lessImage(number)"
            ></button>
          </div>
        </div>

        <div v-else-if="dataTitle.type === 'mutipleInput'">
          <div
            v-for="number in boughtProductListAmount"
            :key="number"
            class="orderProductCreateDiv"
          >
            <div
              class="UILittleDiv row"
              v-for="title in dataTitle.title"
              :key="title"
            >
              <div class="UISpan">{{ title.cht }}</div>
              <div class="UIImageDiv">
                <input
                  class="UIInput imgsInput"
                  type="text"
                  v-model="boughtProductList[0][title.eng]"
                />
              </div>
            </div>
            <button class="plusProduct" @click="moreInput(number)"></button>
            <button
              v-if="boughtProductListAmount > 1"
              class="minusButtonMore"
              @click="lessInput(number)"
            ></button>
          </div>
        </div>

        <div v-else>[{{ dataTitle.title.cht }}] 欄位沒出來</div>
      </div>

      <input type="hidden" class="colValue" />

      <div class="UIBNDiv">
        <button class="UICancelBN c_white" @click="closeUI">取消</button>
        <button class="UISubmitBN c_white" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dataTitleUI: Array,
  currentPage: String,
});
const emit = defineEmits(["closeUI", "editData"]);
function closeUI() {
  emit("closeUI");
}

const img = ref("");
const imgCom = computed(() => img.value);
const imgList = ref([""]);
const imgListCom = computed(() => imgList.value);
const imgListAmountCom = computed(() => imgList.value.length);

function moreImage(number) {
  imgList.value.splice(number, 0, "");
}
function lessImage(number) {
  imgList.value.splice(number - 1, 1);
}


const boughtProductList = ref([{}])
const boughtProductListCom = computed(() => boughtProductList.value);
const boughtProductListAmount = computed(() => boughtProductList.value.length);

function moreInput(number) {
  console.log(boughtProductList.value);
  
  boughtProductList.value.splice(number, 0, {});
}
function lessInput(number) {
  boughtProductList.value.splice(number - 1, 1);
}

//取得資料呈現在UI上
const UIData = inject("UIData");
async function updateData() {
  const editData = UIData.value.edit;
  img.value = editData.itemImg;
  let data = null;
  // console.log(props.currentPage);
  if (props.currentPage === "menuitem") {
    data = [
      editData.menuExist,
      editData.itemName,
      editData.itemType,
      editData.itemDescribe,
      editData.itemMain,
      editData.itemPrice,
      editData.itemImg,
      editData.itemID,
    ];
  } else if (props.currentPage === "product") {
    data = [
      editData.productExist,
      editData.productName,
      editData.productType,
      editData.productDescribe,
      editData.productPrice,
      editData.productInStock,
      editData.storeOnly,
      editData.productMain,
      // editData.productImg,
      editData.productID,
    ];
    // console.log(editData.productImg);
    const tempImageList = [];
    for (const imgObj of editData.productImg) {
      tempImageList.push(imgObj.productImg);
    }
    imgList.value = tempImageList;
  }
  let list = document.querySelectorAll(".colValue");
  list.forEach((elem, index) => {
    elem.value = data[index];
  });
}
onMounted(async () => {
  if (process.client) {
    updateData();
  }
});

//submit
async function submit() {
  let list = document.querySelectorAll(".colValue");
  let data = null;
  if (props.currentPage === "menuitem") {
    data = {
      itemID: list[7].value,
      menuExist: list[0].value,
      itemName: list[1].value,
      itemType: list[2].value,
      itemDescribe: list[3].value,
      itemMain: list[4].value,
      itemPrice: list[5].value,
      itemImg: list[6].value,
    };
  } else if (props.currentPage === "product") {
    data = {
      productID: list[8].value,
      productExist: list[0].value,
      productName: list[1].value,
      productType: list[2].value,
      productDescribe: list[3].value,
      productPrice: list[4].value,
      productInStock: list[5].value,
      storeOnly: list[6].value,
      productMain: list[7].value,
      productImg: imgList.value,
    };
  }
  // console.log(data);
  emit("editData", data);
}
</script>

<style scoped>
.UITitle {
  text-align: center;
  margin: 40px 20px 30px 20px;
}

.UIInputDiv {
  margin: 10px 70px;
  text-align: left;
}

.UILittleDiv {
  height: 100%;
}
.row {
  display: grid;
  grid-template-columns: 25% 75%;
  height: 100%;
  margin: 0%;
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

.editImg {
  margin-top: 10px;
  width: 250px;
  border-radius: 20px;
}
.editImgBNDiv {
  display: flex;
  width: 100%;
}
.editImgBN {
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

.orderProductCreateDiv {
  background-color: var(--red-l1);
  box-shadow: 0 0 0 20px var(--red-l1);
  border-radius: 25px;
  margin-top: 30px;
  margin-bottom: 45px;
  position: relative;
}
.imgsInput {
  width: 90%;
}
.divMore {
  margin-top: 45px;
}
.createImg {
  margin-top: 10px;
  width: 250px;
  border-radius: 20px;
}

.plusProduct {
  background-color: var(--red);
  background-image: url(~/assets/plus-circle.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 35px;
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translate(0, -50%);
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 25px;
}

.plusButtonMore {
  right: -30px;
}
.minusButtonMore {
  background-color: var(--red);
  background-image: url(~/assets/minus.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 35px;
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translate(0, -50%);
  width: 30px;
  height: 30px;
  border: 0cap;
  border-radius: 25px;
}
</style>