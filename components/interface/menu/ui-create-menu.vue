<template>
  <div>
    <div class="UITitle f_h6 c_black">新增資料</div>
    <div class="UIInputDiv f_p c_black">
      <div class="UILittleDiv row">
        <div class="UISpan">餐點狀況</div>
        <div>
          <select class="selectOption colValue">
            <option value="1">上架餐點</option>
            <option value="0">下架餐點</option>
          </select>
        </div>
      </div>

      <div class="UILittleDiv row">
        <div class="UISpan">餐點名稱</div>
        <div>
          <input class="UIInput colValue" type="text" />
        </div>
      </div>
      <div class="UILittleDiv row">
        <div class="UISpan">餐點類型</div>
        <div>
          <select class="selectOption colValue">
            <option value="飲品">飲品</option>
            <option value="主餐">主餐</option>
            <option value="甜點">甜點</option>
          </select>
        </div>
      </div>
      <div class="UILittleDiv row">
        <div class="UISpan">餐點描述</div>
        <div>
          <input class="UIInput colValue" type="text" />
        </div>
      </div>
      <div class="UILittleDiv row">
        <div class="UISpan">首頁呈現品項</div>
        <div>
          <select class="selectOption colValue">
            <option value="1">首頁呈現品項</option>
            <option value="0">非首頁呈現品項</option>
          </select>
        </div>
      </div>
      <div class="UILittleDiv row">
        <div class="UISpan">餐點價格</div>
        <div>
          <input class="UIInput colValue" type="number" />
        </div>
      </div>

      <div class="UILittleDiv row">
        <div class="UISpan">圖片連結</div>
        <div>
          <input
            class="UIInput itemImgCreate colValue"
            type="text"
            v-model="img"
          />
          <img class="createImg" :src="imgCom" alt="" />
        </div>
      </div>

      <div class="UIBNDiv">
        <button class="UICancelBN c_white" @click="closeUI">取消</button>
        <button class="UISubmitBN c_white" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeUI"]);
function closeUI() {
  emit("closeUI");
}

const img = ref("");
const imgCom = computed(() => img.value);

const refresh = inject('refreshData')
async function submit() {
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
  const result = await useAsyncData("menuItemDataPost", async () => {
    let url = "http://localhost:3000/api/menuItem";
    $fetch(url, {
      method: "POST",
      body: data,
    });
  });
  // console.log(result);
  refresh()
  closeUI()
}

//測試用 先上資料
function testAllCol() {
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
onMounted(async () => {
  if (process.client) {
    testAllCol();
  }
});
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
</style>