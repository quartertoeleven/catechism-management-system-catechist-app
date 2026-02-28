import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getStudentDetails } from '../services/student-service'

export const useStudentStore = defineStore('student', () => {
  const studentDetails = ref({})

  const fetchStudentDetails = async (student_code) => {
    const result = await getStudentDetails(student_code)
    studentDetails.value = result.data.data
  }

  return {
    studentDetails,
    fetchStudentDetails,
  }
})
