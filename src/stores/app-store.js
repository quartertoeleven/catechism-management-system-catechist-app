import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const pageTitle = ref('')
  const pageSubtitle = ref('')
  const navigateBackPath = ref('/')
  const appVersion = ref(process.env.APP_VERSION || 'develop')
  const suppressLoading = ref(false)

  const setPageTitle = (title) => {
    pageTitle.value = title
  }

  const setPageSubtitle = (subtitle) => {
    pageSubtitle.value = subtitle
  }

  const setNavigateBackPath = (path) => {
    navigateBackPath.value = path || '/'
  }

  const setSuppressLoading = (value) => (suppressLoading.value = value)

  return {
    pageTitle,
    setPageTitle,
    pageSubtitle,
    setPageSubtitle,
    navigateBackPath,
    setNavigateBackPath,
    appVersion,
    suppressLoading,
    setSuppressLoading,
  }
})
