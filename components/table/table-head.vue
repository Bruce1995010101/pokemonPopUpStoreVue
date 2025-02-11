<template>
  <thead>
    <tr class="bc_yellow">
      <th v-for="menuDataTitle in menuDataTitleList" :key="menuDataTitle">
        <span>{{ menuDataTitle }}</span>
      </th>
      <th>
        <span>編輯</span>
      </th>
    </tr>
  </thead>
</template>

<script setup>
const props = defineProps({
  menuDataTitleList: Array,
});
</script>

<style scoped>
thead {
  font-size: var(--p);


}

th {
  padding: 10px;
  text-align: left;
}
th:first-of-type {
  text-align: center;
  width: 50px;
}

th:nth-of-type(2) > img {
  border-radius: 20px;
}
th:nth-last-of-type(2) {
  width: 100%;
}

th:nth-last-of-type(4) {
  text-align: center;
}
</style>
