import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const pageTitle = ref('Trang chính')
  const appVersion = ref(process.env.APP_VERSION || 'develop')

  const setPageTitle = (title) => {
    pageTitle.value = title
  }

  return {
    pageTitle,
    setPageTitle,
    appVersion,
  }
})
