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

  position: sticky;
  top: 0;
  z-index: 1;
}

th {
  padding: 10px;
  text-align: left;
}
th:first-of-type {
  width: 50px;
}

th:first-of-type,
th:nth-of-type(2),
th:nth-last-of-type(4),
th:last-of-type {
  text-align: center;
}
th:last-of-type{
  width: 100%;
}
</style>
