import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getStudyYearGenralSchedules } from '../services/study-year-service'

export const useStudyYearStore = defineStore('studyYear', () => {
  const generalSchedules = ref([])

  const fetchStudyYearGeneralSchedules = async () => {
    const result = await getStudyYearGenralSchedules()
    generalSchedules.value = result.data.data
  }

  return {
    generalSchedules,
    fetchStudyYearGeneralSchedules,
  }
})
