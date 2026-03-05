import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useAppStore } from './app-store'

import { getStudentInfoFromQrCode } from '../services/qr-reader-service'

export const useQrQuickActionStore = defineStore('qr-quick-action', () => {
  const appStore = useAppStore()

  const studentInfo = ref({})

  const fetchStudentInfoFromQrCode = async (qr_content_request) => {
    try {
      appStore.setSuppressLoading(true)
      appStore.setSuppressErrorNotification(true)
      const result = await getStudentInfoFromQrCode(qr_content_request)
      studentInfo.value = result.data.data
      return result
    } catch (error) {
      console.error(error)
      return error.response
    } finally {
      appStore.setSuppressLoading(false)
      appStore.setSuppressErrorNotification(false)
    }
  }

  return {
    studentInfo,
    fetchStudentInfoFromQrCode,
  }
})
