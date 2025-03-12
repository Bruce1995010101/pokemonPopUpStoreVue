import { defineStore } from 'pinia'

export const useUserInfo = defineStore('userInfo', () => {
  
  let userInfo = ref({})

  const changeUser = (user) => {
    userInfo.value = user
  }

  const currentUser = computed(() => userInfo.value)

  return {
    userInfo,
    changeUser,
    currentUser,
  }
})