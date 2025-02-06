<template>
  <div id="container">
    <div class="bc_yellow" id="backStageContentForget">
      <img id="loginLogo" src="~/assets/logo.png" alt="" />
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  justify-self: center;
  width: 100%;
  height: 100vh;
  background-color: var(--white);
  /* background-color: chocolate; */
}
#backStageContentForget {
  width: 400px;
  /* height: 330px; */
  margin: auto;
  border-radius: 20px;
}
#loginLogo {
  width: 250px;
  margin: 16px 75px;
  margin-top: 40px;
}
</style>