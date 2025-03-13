import { defineStore } from 'pinia'

export const usePagesData = defineStore('pagesData', () => {
  let page = ref('loginPage')

  const changePage = (pageName) => {
    page.value = pageName
  }

  const currentPage = computed(() => page.value)

  return {
    page,
    changePage,
    currentPage,
  }
})