import { defineStore } from 'pinia'

export const usePagesData = defineStore('counter', () => {
  let page = ref('loginPage')

  const changePage = (pageName) => {
    currentPage.value = pageName
  }
//   const decrement = () => {
//     count.value -= 1
//   }

  const currentPage = computed(() => page.value)

  return {
    page,
    changePage,
    // decrement,
    currentPage,
  }
})