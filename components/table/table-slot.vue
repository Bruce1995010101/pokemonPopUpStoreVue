<template>
  <div class="panels">
    <div class="panel" v-if="props.panelActive === 'exist'">
      <table class="panelTable">

        <slot name="tableHead"></slot>
        <slot name="tableBody"></slot>

      </table>
    </div>

    <div class="panel" v-if="props.panelActive === 'noExist'">
      <table class="panelTable">

        <slot name="tableHead"></slot>
        <slot name="tableBody"></slot>
        
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  panelActive: String,
});
</script>


<style scoped>
.panels {
  border-radius: 10px 10px 10px 10px;
  height: 100%;
}

.panel {
  width: 100%;
  height: 100%;
  /* display: none; */
  border-radius: 0 10px 10px 10px;
}

.panelTable {
  width: 100%;
  height: 90%;
  min-height: 315px;

  background-color: var(--whitePure);
  border-radius: 0px 10px 10px 10px;
  margin: 0px;

  white-space: nowrap;
  display: block;
  overflow: auto;
}

/* 表格 */
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse; /* 合併邊框 */
  border-spacing: 0; /* 取消格子間距 */
}

/* tr */
tbody > tr {
  transition-property: background-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;
}

tbody > tr:hover {
  background-color: var(--whiteLine);
}

tbody > tr > td:last-of-type {
  /* background-color: var(--yellow); */
  text-align: center;
  border-radius: 0px 0px 5px 5px;
}

tbody > tr:hover td:last-of-type {
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