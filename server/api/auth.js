// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const { data } = await useAsyncData('checkUserAuthority', async () => {
//     return await $fetch('http://localhost:3000/checkUserAuthority', {
//       credentials: 'include',
//     });
//   });

//   if (!data.value || !data.value.accountAuthority) {
//     return navigateTo('/login'); // 未登入跳轉至登入頁面
//   }
// });
