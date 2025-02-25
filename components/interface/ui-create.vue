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
            <input
              class="UIInput itemImgCreate colValue"
              type="text"
              v-model="img"
            />
            <img class="createImg" :src="imgCom" alt="" />
          </div>
        </div>
        <div v-else-if="dataTitle.type === 'inputImgMutiple'" id="images">
          <div v-for="number in imgListAmountCom" :key="number" class="orderProductCreateDiv">
            <div class="UILittleDiv row">
              <div class="UISpan">圖片連結</div>
              <div class="UIImageDiv">
                <input
                  class="UIInput imgsValue"
                  type="text"
                  @input="collectAllImage(number - 1)"
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
            <button v-if="imgListAmountCom > 1" class="minusButtonMore" @click="lessImage(number)"></button>
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

const img = ref("");
const imgCom = computed(() => img.value);
const imgList = ref(['']);
const imgListCom = computed(() => imgList.value);
const imgListAmountCom = computed(() => imgList.value.length);


function collectAllImage(number) {
  const imageElements = document.querySelectorAll(".imgsValue");
  let tempImageList = [];
  imageElements.forEach((elem) => {
    tempImageList.push(elem.value);
  });
  imgList.value = tempImageList;
  // console.log(imgList.value);
  // console.log(number);
  
}

function moreImage(number) {
  imgList.value.splice(number, 0, '')
  // console.log(number);
  // console.log(imgList.value);
}
function lessImage(number) {
  imgList.value.splice(number-1, 1)
  // console.log(number-1);
  // console.log(imgList.value);
}

function submit() {
  let list = document.querySelectorAll(".colValue");
  let data = {
    menuExist: list[0].value,
    itemName: list[1].value,
    itemType: list[2].value,
    itemDescribe: list[3].value,
    itemMain: list[4].value,
    itemPrice: list[5].value,
    itemImg: list[6].value,
  };

  // console.log(data);
  emit("createData", data);
}

//測試用 先上資料
function testAllColMenu() {
  img.value =
    "https://www.pokemoncenter-online.com/cafe/common/img/menu/2024/photo_special11.jpg";
  const testData = [
    0,
    "寶可夢拿鐵",
    "飲品",
    "每一杯寶可夢拿鐵都充滿驚喜，選擇你的最愛，讓冒險從咖啡開始！",
    0,
    150,
    "https://www.pokemoncenter-online.com/cafe/common/img/menu/2024/photo_special11.jpg",
  ];
  let list = document.querySelectorAll(".colValue");
  list.forEach((elem, index) => {
    elem.value = testData[index];
  });
}
function testAllColProduct() {
  img.value =
    "https://www.pokemoncenter-online.com/cafe/common/img/menu/2024/photo_special11.jpg";
  const testData = [
    0,
    "呆呆獸海報",
    "decoration",
    "Slowpoke 並不以聰明或速度而聞名，但這件藝術品可以快速為您的空間增添色彩和歡樂！",
    300,
    25,
    0,
    0,
    [],
  ];
  let list = document.querySelectorAll(".colValue");
  list.forEach((elem, index) => {
    elem.value = testData[index];
  });
}
onMounted(async () => {
  if (process.client) {
    if (props.currentPage === "menuItem") {
      testAllColMenu();
    } else if (props.currentPage === "product") {
      testAllColProduct();
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
.UIImageDiv {
}
.imgsValue {
  width: 90%;
}
.divMore {
  margin-top: 45px;
}
.createImg {
  width: 250px;
  margin-top: 10px;
  /* width: 50px; */
  border-radius: 10px;
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