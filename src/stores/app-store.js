import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const pageTitle = ref('')
  const pageSubtitle = ref('')
  const appVersion = ref(process.env.APP_VERSION || 'develop')

  const setPageTitle = (title) => {
    pageTitle.value = title
  }

  const setPageSubtitle = (subtitle) => {
    pageSubtitle.value = subtitle
  }

  return {
    pageTitle,
    setPageTitle,
    pageSubtitle,
    setPageSubtitle,
    appVersion,
  }
})
