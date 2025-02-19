<template>
  <NuxtLayout
    name="default"
    :editBlack="editBlackCom"
    @closeEditBlack="closeAllEditUI"
  >
    <div class="f_h4 c_white" id="title">總覽</div>
    <div id="tableDiv">
      <table>
        <tbody class="noto-sans-tc_r c_black">
          <tr>
            <td>
              上線狀態：{{
                webStatusResult.data.value[0].webStatus === 1 ? "上線中" : "維護中"
              }}
            </td>
          </tr>
          <tr>
            <td>商品數量： {{ data[0].productNum }} 個</td>
          </tr>
          <tr>
            <td>交易筆數： {{ data[1].orderNum }} 筆</td>
          </tr>
          <tr>
            <td>交易金額： {{ data[2].amount }} 新台幣</td>
          </tr>
          <tr>
            <td>咖啡廳預定總人數： {{ data[3].cafeBookingNum }} 人</td>
          </tr>
          <tr>
            <td>快閃店預定總人數： {{ data[4].storeBookingNum }} 人</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          class="noto-sans-tc_r f_h6"
          id="webOnline"
          @click="openWebStatusUI"
        >
          網站維護
        </button>
      </div>
    </div>

    <template #webStatus>
      <div class="webStatusUI" v-if="webStatusCom">
        <ui-on-over-all
          @closeUI="closeAllEditUI"
          @changeWebStatus="changeWebStatus"
        ></ui-on-over-all>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
const webStatus = ref(false);
const webStatusCom = computed(() => webStatus.value);

let editBlack = ref(false);
const editBlackCom = computed(() => editBlack.value);
function closeAllEditUI() {
  editBlack.value = false;
  webStatus.value = false;
  webStatusResult.refresh()
}
function openEditBlack() {
  editBlack.value = true;
}
function openWebStatusUI() {
  openEditBlack();
  webStatus.value = true;
}

const { data, pending, error, refresh } = useAsyncData(
  "overAllData",
  async () => {
    let url = "http://localhost:3000/api/overAll";
    return await $fetch(url);
  }
);
const webStatusResult = useAsyncData("webStatus", async () => {
  let url = "http://localhost:3000/api/webStatus";
  return await $fetch(url);
});

function changeWebStatus() {
  const changeWebStatusResult = useAsyncData("changeWebStatus", async () => {
    let url = "http://localhost:3000/api/webStatus";
    const payload = {
      webStatus: webStatusResult.data.value[0].webStatus === 1 ? 0 : 1,
    };
    console.log(payload);
    return await $fetch(url, {
      method: "PATCH",
      body: payload,
    });
    
  });
  
  
  webStatusResult.refresh()
  closeAllEditUI()
}

onMounted(async () => {
  if (process.client) {
    console.log(data.value);
    console.log(webStatusResult.data.value);
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

#tableDiv {
  margin: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
}
table {
  width: 100%;
  background-color: var(--whiteLine);
  border-radius: 30px;
  margin-bottom: 30px;
}

td {
  padding: 10px;
  padding-left: 30px;
}

#webOnline {
  width: 275px;
  height: 45px;
  border-radius: 30px;
  color: var(--white);
  background-color: var(--red);
  border: 0cap;
}

.webStatusUI {
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