import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getGradeExams } from '../services/grade-service'
import { createNewExam } from '../services/exam-service'

export const useGradeStore = defineStore('grade', () => {
  const gradeDetails = ref({})
  const gradeExams = ref([])

  const getGradeExamList = async (grade_code) => {
    const result = await getGradeExams(grade_code)
    gradeDetails.value = result.data.data.grade_details
    gradeExams.value = result.data.data.exams
  }

  const createGradeExam = async (grade_code, exam_data) => {
    exam_data.grade_code = grade_code
    await createNewExam(exam_data)
  }

  return {
    gradeDetails,
    gradeExams,
    getGradeExamList,
    createGradeExam,
  }
})
