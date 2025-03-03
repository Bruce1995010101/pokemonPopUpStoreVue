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
            <input class="UIInput" type="text" v-model="img" />
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

        <div v-else-if="dataTitle.type.includes('time')">
          <div v-if="dataTitle.type === 'timeOption'" class="row">
            <div class="UISpan">{{ dataTitle.title.cht }}</div>
            <div>
              <input type="date" class="selectOption" v-model="dateTime[`${dataTitle.title.eng}Date`]" />
              <select  class="selectOption" v-model="dateTime[`${dataTitle.title.eng}Time`]">
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
          <div v-if="dataTitle.type === 'timeInput'" class="row">
            <div class="UISpan">{{ dataTitle.title.cht }}</div>
            <div>
              <input type="date" class="selectOption" v-model="dateTime[`${dataTitle.title.eng}Date`]" />
              <input  class="timeInput" type="time" v-model="dateTime[`${dataTitle.title.eng}Time`]">
            </div>
          </div>
        </div>

        <input
          v-else-if="dataTitle.type === 'inputTextID'"
          type="hidden"
          v-model="rowData[dataTitle.title.eng]"
        />

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
const emit = defineEmits(["closeUI", "editData"]);
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
}
function lessImage(number) {
  imgList.value.splice(number - 1, 1);
}

const boughtProductList = ref([{}]);
const boughtProductListCom = computed(() => boughtProductList.value);
const boughtProductListAmount = computed(() => boughtProductList.value.length);

function moreInput(number) {
  boughtProductList.value.splice(number, 0, {});
}
function lessInput(number) {
  boughtProductList.value.splice(number - 1, 1);
}

const dateTime = ref({})

//取得資料呈現在UI上
const UIData = inject("UIData");
async function updateData() {
  const editData = UIData.value.edit;
  img.value = editData.itemImg;
  // console.log(props.currentPage);
  if (props.currentPage === "menuitem") {
    rowData.value = editData;
    img.value = editData.itemImg;
  } else if (props.currentPage === "product") {
    rowData.value = editData;

    const tempImageList = [];
    for (const imgObj of editData.productImg) {
      tempImageList.push(imgObj.productImg);
    }
    imgList.value = tempImageList;
  } else if (props.currentPage === "orderlist") {
    rowData.value = editData;
    // console.log('ui印上的資料:',editData);

    const tempImageList = [
      { orderProductID: editData.productID, productQ: editData.productQ },
    ];
    boughtProductList.value = tempImageList;

    dateTime.value.orderDateDate = editData.orderDate.split(' ')[0]
    dateTime.value.orderDateTime = editData.orderDate.split(' ')[1]
  } else if (props.currentPage === "cafebooking") {
    rowData.value = editData;

    dateTime.value.bookingTimePeriodDate = editData.bookingTimePeriod.split(' ')[0]
    dateTime.value.bookingTimePeriodTime = editData.bookingTimePeriod.split(' ')[1].slice(0, 2)
    dateTime.value.bookingDateDate = editData.bookingDate.split(' ')[0]
    dateTime.value.bookingDateTime = editData.bookingDate.split(' ')[1]
  } else if (props.currentPage === "storebooking") {
    rowData.value = editData;

    dateTime.value.bookingTimePeriodDate = editData.bookingTimePeriod.split(' ')[0]
    dateTime.value.bookingTimePeriodTime = editData.bookingTimePeriod.split(' ')[1].slice(0, 2)
    dateTime.value.bookingDateDate = editData.bookingDate.split(' ')[0]
    dateTime.value.bookingDateTime = editData.bookingDate.split(' ')[1]
  }
}
onMounted(async () => {
  if (process.client) {
    updateData();
  }
});

//submit
async function submit() {
  let data = null;
  if (props.currentPage === "menuitem") {
    data = { ...rowData.value, itemImg: img.value };
  } else if (props.currentPage === "product") {
    data = { ...rowData.value, productImg: imgList.value };
  } else if (props.currentPage === "orderlist") {
    const orderDate = {orderDate: dateTime.value.orderDateDate + ' ' + dateTime.value.orderDateTime}  
    data = { ...rowData.value, ...boughtProductList.value[0], ...orderDate };
  } else if (props.currentPage === "cafebooking") {
    const bookingTimePeriod = {bookingTimePeriod: dateTime.value.bookingTimePeriodDate + ' ' + dateTime.value.bookingTimePeriodTime}  
    const bookingDate = {bookingDate: dateTime.value.bookingDateDate + ' ' + dateTime.value.bookingDateTime}  
    data = { ...rowData.value, ...bookingTimePeriod, ...bookingDate };
  } else if (props.currentPage === "storebooking") {
    const bookingTimePeriod = {bookingTimePeriod: dateTime.value.bookingTimePeriodDate + ' ' + dateTime.value.bookingTimePeriodTime}  
    const bookingDate = {bookingDate: dateTime.value.bookingDateDate + ' ' + dateTime.value.bookingDateTime}  
    data = { ...rowData.value, ...bookingTimePeriod, ...bookingDate };
  }
  // console.log('submit的資料',data);
  
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
.timeInput {
  height: 20px;
  border-radius: 20px;
  border: 0cap;
  padding-left: 10px;
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