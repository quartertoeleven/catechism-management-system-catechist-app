import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
    const pageTitle = ref('Trang chính')

    const setPageTitle = (title) => {
        pageTitle.value = title
    }

    return {
        pageTitle,
        setPageTitle
    }
} )