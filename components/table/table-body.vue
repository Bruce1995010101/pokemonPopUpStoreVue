<template>
  <tbody class="noto-sans-tc_r c_black">
    <tr v-for="dataRow in data" :key="dataRow">
        <td v-for="dataTD in dataRow" :key="dataTD">
            {{ dataTD }}
        </td>
    </tr>
  </tbody>
</template>

<script setup>
const props = defineProps({
  data: Array,
});

</script>


<style scoped>

/* tr */
tr {
  transition-property: background-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;
}

tr:hover {
  background-color: var(--whiteLine);
}

tr > td:last-of-type {
  /* background-color: var(--yellow); */
  text-align: center;
  border-radius: 0px 0px 5px 5px;
}

tr:hover td:last-of-type {
  position: sticky;
  right: 0;
  z-index: 0;
}

td {
  padding: 10px;
  text-align: left;
}
td:first-of-type {
  text-align: center;
  width: 50px;
}

td:nth-of-type(2) > img {
  border-radius: 20px;
}
td:nth-last-of-type(2) {
  width: 100%;
  text-align: left;
}

td:nth-last-of-type(4) {
  text-align: center;
}

.tableBn {
  width: 30px;
  height: 30px;
  border-radius: 25px;
  border: 0cap;
  padding: 0px 0px;
}
</style>
