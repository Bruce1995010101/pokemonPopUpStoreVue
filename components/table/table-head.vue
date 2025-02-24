<template>
  <thead>
    <tr class="bc_yellow">
      <th v-for="dataTitle in dataTitleList" :key="dataTitle" :class="{textCenter: dataTitle.style.align==='center'}">
        <span>{{ dataTitle.title.cht }}</span>
      </th>
      <th class="textCenter">
        <span>編輯</span>
      </th>
    </tr>
  </thead>
</template>

<script setup>
const props = defineProps({
  dataTitleList: Array,
  currentPage: String,
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

.textCenter{
  text-align: center;
}
th:last-of-type{
  width: 100%;
}
</style>
