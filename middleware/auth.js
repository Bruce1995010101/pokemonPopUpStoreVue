export default defineNuxtRouteMiddleware(async (to, from) => {
  const userSession = useAuth()
  const isLoggedIn = await userSession.checkUserAuthority()


  // console.log('Auth的資料', isLoggedIn);
  if (isLoggedIn) {
    return 
  }else{
    return navigateTo('/'); // 未登入跳轉至登入頁面
  }

});
