<template>
  <div>
    <div class="f_h4 c_white" id="title">總覽</div>
    <div id="tableDiv">
      <table id="tabl">
        <tbody class="noto-sans-tc_r c_black" id="overAlltbody"></tbody>
      </table>
      <div>
        <button class="noto-sans-tc_r f_h6" id="webOnline">網站維護</button>
      </div>
    </div>

    <div id="editContainer">
      <div id="editBlack"></div>
      <div id="webStatusUI">
        <div class="UIDiv">
          <div class="UIText">確定改變網站狀態？</div>
          <div id="webStatusBnDiv">
            <button id="webStatusCancelBn">取消</button>
            <button id="webStatusUISubmit">確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#title{
    margin: 30px ;
    padding-left: 40px;
    background-color: var(--black);
    border-radius: 30px;
    letter-spacing: 2px;
}

/* -------------------------------- */
#overAllContainer {
  /* display: flex; */
  /* justify-self: center; */
  height: 101vh;
  /* position: relative; */
}

#navOverAll {
  background-color: var(--red);
  color: var(--white);
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

#editContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 101vw;
  height: 101vh;
  background-color: rgba(0, 0, 0, 50%);

  z-index: 3;

  display: none;
}

#editBlack {
  position: absolute;
  top: 0;
  left: 0;
  width: 103vw;
  height: 103vh;
  background-color: rgba(0, 0, 0, 50%);

  z-index: 4;

  display: none;
}
#webStatusUI {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 250px;
  background-color: var(--yellow);
  border-radius: 20px;

  z-index: 5;

  overflow: auto;

  display: none;
}
.UIDiv {
  margin: 80px 40px;
}
.UIText {
  text-align: center;
  font-size: var(--h6);
}

/* delete */

#webStatusBnDiv {
  margin-top: 40px;
}

#webStatusCancelBn {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--black);
  color: var(--white);
  float: left;
}
#webStatusUISubmit {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 0cap;
  background-color: var(--red);
  color: var(--white);
  float: right;
}
</style>