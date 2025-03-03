<template>
  <div>
    <div class="UITitle f_h6 c_black">新增資料</div>
    <div class="UIInputDiv f_p c_black">
      <div
        class="UILittleDiv"
        v-for="dataTitle in dataTitleUI"
        :key="dataTitle"
      >
        <div v-if="!dataTitle.display.UICreate"></div>
        <div v-else-if="dataTitle.type === 'select'" class="row">
          <div class="UISpan">{{ dataTitle.title.cht }}</div>
          <div>
            <select class="selectOption" v-model="rowData[dataTitle.title.eng]">
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
            <input
              class="UIInput"
              type="text"
              v-model="rowData[dataTitle.title.eng]"
            />
          </div>
        </div>

        <div v-else-if="dataTitle.type === 'inputNumber'" class="row">
          <div class="UISpan">{{ dataTitle.title.cht }}</div>
          <div>
            <input
              class="UIInput"
              type="number"
              v-model="rowData[dataTitle.title.eng]"
            />
          </div>
        </div>

        <div v-else-if="dataTitle.type === 'inputImgSingle'" class="row">
          <div class="UISpan">{{ dataTitle.title.cht }}</div>
          <div>
            <input class="UIInput itemImgCreate" type="text" v-model="img" />
            <img class="createImg" :src="imgCom" alt="" />
          </div>
        </div>

        <div v-else-if="dataTitle.type === 'inputImgMutiple'">
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
                  v-model="boughtProductList[number - 1][title.eng]"
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
        <div v-else-if="dataTitle.type === 'timeOption'">
          <div class="row">
            <div class="UISpan">{{ dataTitle.title.cht }}</div>
            <div>
              <input type="date" class="selectOption" v-model="dateTime[`${dataTitle.title.eng}Date`]">
              <select
                class="selectOption"
                v-model="dateTime[`${dataTitle.title.eng}Time`]"
              >
                <option
                  v-for="option in dataTitle.timeOption"
                  :key="option"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div v-else>[{{ dataTitle.title.cht }}] 欄位沒出來</div>
      </div>

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
const emit = defineEmits(["closeUI", "createData"]);
function closeUI() {
  emit("closeUI");
}

const rowData = ref({});

const img = ref("");
const imgCom = computed(() => img.value);

const imgList = ref([""]);
const imgListCom = computed(() => imgList.value);
const imgListAmountCom = computed(() => imgList.value.length);

function moreImage(number) {
  imgList.value.splice(number, 0, "");
  // console.log(number);
  // console.log(imgList.value);
}
function lessImage(number) {
  imgList.value.splice(number - 1, 1);
  // console.log(number-1);
  // console.log(imgList.value);
}

const boughtProductList = ref([{}]);
const boughtProductListCom = computed(() => boughtProductList.value);
const boughtProductListAmount = computed(() => boughtProductList.value.length);

function moreInput(number) {
  // console.log(boughtProductList.value);
  boughtProductList.value.splice(number, 0, {});
}
function lessInput(number) {
  boughtProductList.value.splice(number - 1, 1);
}

const dateTime = ref([{}])

function submit() {
  let data = null;
  if (props.currentPage === "menuitem") {
    data = { ...rowData.value, itemImg: img.value };
  } else if (props.currentPage === "product") {
    data = { ...rowData.value, productImg: imgList.value };
  } else if (props.currentPage === "orderlist") {
    let orderProductIDList = [];
    let productQList = [];
    for (let i = 0; i < boughtProductListAmount.value; i++) {
      orderProductIDList.push(boughtProductList.value[i].orderProductID);
      productQList.push(boughtProductList.value[i].productQ);
    }
    data = {
      ...rowData.value,
      orderProductIDList: orderProductIDList,
      productQList: productQList,
    };
  } else if(props.currentPage === "cafebooking"){
    data = {
      ...rowData.value,
      bookingTimePeriod: dateTime.value.bookingTimePeriodDate + ' ' + dateTime.value.bookingTimePeriodTime
    };
  }

  // console.log(data);
  emit("createData", data);
}

//測試用 先上資料
function testAllColMenu() {
  rowData.value = {
    menuExist: 0,
    itemName: "寶可夢拿鐵",
    itemType: "飲品",
    itemDescribe:
      "每一杯寶可夢拿鐵都充滿驚喜，選擇你的最愛，讓冒險從咖啡開始！",
    itemMain: 0,
    itemPrice: 150,
  };
  img.value =
    "https://www.pokemon-cafe.jp/zh-TW/5678fb1669451032b8fc990be2ca684e8cecd500.jpg";
}
function testAllColProduct() {
  rowData.value = {
    productExist: 0,
    productName: "呆呆獸海報",
    productType: "decoration",
    productDescribe:
      "Slowpoke 並不以聰明或速度而聞名，但這件藝術品可以快速為您的空間增添色彩和歡樂！",
    productPrice: 300,
    productInStock: 25,
    storeOnly: 0,
    productMain: 0,
  };
  imgList.value = [
    "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2023/10/12/draft/26062952.jpg&x=0&y=0&sw=0&sh=0&exp=3600&w=850&nt=1",
    "https://local.pokemon.jp/img/p/lginfo/89ebf3ab1666417aebc96fe81e1095c3.jpg",
  ];
}
function testAllColOrderList() {
  rowData.value = {
    orderExist: 0,
    buyerName: "莊家為",
    buyerEmail: "boi@gmail.com",
    buyerTel: "0912123123",
    buyerAddr: "台中市沙鹿區",
    transportNote: "儘速抵達",
    payment: "貨到付款",
    receiptType: "二聯式",
    companyTitle: "株式會社",
    taxIDNumber: "54685485",
    orderStatus: 0,
  };
  boughtProductList.value = [
    { orderProductID: 1, productQ: 1 },
    { orderProductID: 2, productQ: 2 },
    { orderProductID: 3, productQ: 3 },
  ];
}
function testAllCafeBooking() {
  rowData.value = {
    bookingExist: 0,
    bookingName: "莊家為",
    bookingEmail: "boi@gmail.com",
    bookingTel: "0912123123",
    bookingNumber: 5,
  };
  dateTime.value.bookingTimePeriodDate = '2025-03-03'
  dateTime.value.bookingTimePeriodTime = '11'
}
onMounted(async () => {
  if (process.client) {
    if (props.currentPage === "menuitem") {
      testAllColMenu();
    } else if (props.currentPage === "product") {
      testAllColProduct();
    } else if (props.currentPage === "orderlist") {
      testAllColOrderList();
    } else if (props.currentPage === "cafebooking") {
      testAllCafeBooking();
    }
  }
});
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