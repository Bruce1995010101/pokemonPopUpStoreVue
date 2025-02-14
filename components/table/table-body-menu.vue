<template>
  <tbody class="noto-sans-tc_r c_black">
    <tr v-for="dataRow in data" :key="dataRow">
      <td>
        {{ dataRow.itemID }}
      </td>
      <td>
        <img :src="dataRow.itemImg" :alt="dataRow.itemName" />
      </td>
      <td>
        {{ dataRow.itemName }}
      </td>
      <td>
        {{ dataRow.itemType }}
      </td>
      <td>
        {{ dataRow.itemMain ? "首頁呈現品項" : "非首頁呈現品項" }}
      </td>
      <td>
        {{ dataRow.itemPrice }}
      </td>
      <td>
        {{ dataRow.itemDescribe }}
      </td>
      <td>
        <button title="編輯資料" class="edit tableBn"></button>
        <button v-if="props.panelActive === 'exist'" title="改成無效資料" class="remove tableBn"></button>
        <button v-else title='改成有效資料' class='on tableBn'></button>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
const props = defineProps({
  data: Array,
  panelActive: String
});
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

td:first-of-type,
td:nth-last-of-type(4),
td:nth-of-type(5),
td:last-of-type {
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
</style>
