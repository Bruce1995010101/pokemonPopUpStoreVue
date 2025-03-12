export default defineNuxtRouteMiddleware(async (to, from) => {
  const userSession = useAuth()
  const userInfo = await userSession.checkUserAuthority()

  if (userInfo) {
    for (let i = 0; i < userInfo.accountAuthority.length; i++) {
        if (userInfo.accountAuthority[i].pageName === to.name) {
            return;
        }
    }
  }
  const result = await useAsyncData("logout", async () => {
    return await $fetch("http://localhost:3000/logout", {
      credentials: "include",
    });
  });
  // console.log(result);
  if (result.data.value === "out") {
    return navigateTo('/');
  }
});
