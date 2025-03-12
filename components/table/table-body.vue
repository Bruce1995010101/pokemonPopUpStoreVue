<template>
  <tbody class="noto-sans-tc_r c_black">
    <tr v-for="dataRow in data" :key="dataRow" >
      <td v-for="colTitle in dataTitleList" :key="colTitle" :class="{textCenter: colTitle.style.align==='center'}">

        <span v-if="colTitle.type === 'string' || colTitle.type === 'number'">{{ dataRow[`${colTitle.title.eng}`] }}</span>
        <div v-else-if="colTitle.type === 'select'" >
          <span v-for="option in colTitle.option" :key="option" :class="{displayNone : option.value !== dataRow[`${colTitle.title.eng}`]}"> {{ option.text }} </span>
        </div>
        <img v-else-if="colTitle.type === 'image'" :src="dataRow[`${colTitle.title.eng}`]" :alt="dataRow[`${colTitle.title.eng}`]" />
        <span v-else-if="colTitle.type === 'time'">{{ dataRow[`${colTitle.title.eng}`] }}</span>
      
      </td>
      <td v-if="currentPage !== 'account'" class="textCenter">
        <button title="編輯資料" class="edit tableBn" @click="openEditUI(dataRow)"></button>
        <button v-if="props.panelActive === 'exist'" title="改成無效資料" class="remove tableBn" @click="openRemoveUI(dataRow)"></button>
        <button v-else title='改成有效資料' class='on tableBn' @click="openOnUI(dataRow)"></button>
      </td>
      <td v-else class="textCenter">
        <button title="編輯資料" class="edit tableBn" @click="openEditUI(dataRow)"></button>
        <button v-if="userInfo.currentUser.userTitle === 'HR' && props.panelActive === 'exist'" title="改成無效資料" class="remove tableBn" @click="openRemoveUI(dataRow)"></button>
        <button v-if="userInfo.currentUser.userTitle === 'HR' && props.panelActive === 'noExist'" title='改成有效資料' class='on tableBn' @click="openOnUI(dataRow)"></button>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
const props = defineProps({
  currentPage: String,
  data: Array,
  panelActive: String,
  dataTitleList: Array,
});

//導入user資料
import { useUserInfo } from "~/stores/userInfo";
const userInfo = useUserInfo();

const UIData = inject("UIData");
const emit = defineEmits(["openEditUI", "openRemoveUI","openOnUI"])

function openEditUI(data){
  console.log(userInfo.userInfo.userTitle);
  console.log(props.currentPage);
  
  emit("openEditUI")
  UIData.value.edit = data
  // console.log(UIData.value.edit);
}
function openRemoveUI(data){
  emit("openRemoveUI")
  UIData.value.remove = data
  console.log(UIData.value.remove);
}
function openOnUI(data){
  emit("openOnUI")
  UIData.value.on = data
  // console.log(UIData.value.on);
  
}

</script>


<style scoped>
tbody {
  height: 100%;
}
/* tr */
tr {
  transition-property: background-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;
}

tr:hover {
  background-color: var(--whiteLine);
}
/* td */
td {
  padding: 10px;
}

.textCenter{
  text-align: center;
}
td:first-of-type {
  width: 50px;
}

td:nth-of-type(2) > img {
  border-radius: 20px;
}

td:last-of-type {
  border-radius: 0px 0px 5px 5px;
}

tr:hover td:last-of-type {
  position: sticky;
  right: 0;
  z-index: 0;
}

img {
  border-radius: 20px;
  width: 100px;
}

/* button------------------------------- */
.tableBn {
  width: 30px;
  height: 30px;
  border-radius: 25px;
  border: 0cap;
  padding: 0px 0px;

  background-position: center;
  background-repeat: no-repeat;
}
.remove {
  background-image: url("~/assets/remove.png");

  background-size: 50%;

  background-color: var(--red);
}
.on {
  background-image: url("~/assets/upwhite.png");
  /* width: 70; */
  background-size: 50%;
  background-color: var(--black-l1);
}

.edit {
  background-image: url("~/assets/pencil-fillwhite.png");
  background-size: 70%;
  background-color: var(--yellow);
}

.delete {
  background-image: url("~/assets/trash3-fillwhite.png");
  background-size: 50%;
  background-color: var(--red);
}

.displayNone{
  display: none;
}
</style>
