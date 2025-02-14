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
  max-height: 100%;

  background-color: var(--whitePure);
  border-radius: 0px 10px 10px 10px;
  margin: 0px;

  white-space: nowrap;
  display: block;
  overflow: auto;
  scrollbar-width: thin;
  
}

/* 表格 */
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse; /* 合併邊框 */
  border-spacing: 0; /* 取消格子間距 */
}


</style>