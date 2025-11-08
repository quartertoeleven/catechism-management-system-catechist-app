import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getGradeExams } from '../services/grade-service'
import { createOrUpdateExam, deleteExam } from '../services/exam-service'

export const useGradeStore = defineStore('grade', () => {
  const gradeDetails = ref({})
  const gradeExams = ref([])

  const getGradeExamList = async (grade_code) => {
    const result = await getGradeExams(grade_code)
    gradeDetails.value = result.data.data.grade_details
    gradeExams.value = result.data.data.exams
  }

  const createOrUpdateGradeExam = async (grade_code, exam_data) => {
    exam_data.grade_code = grade_code
    await createOrUpdateExam(exam_data)
  }

  const deleteGradeExam = async (exam_id) => {
    await deleteExam(exam_id)
  }

  return {
    gradeDetails,
    gradeExams,
    getGradeExamList,
    createOrUpdateGradeExam,
    deleteGradeExam,
  }
})
