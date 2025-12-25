import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getGradeExams,
  getGradeSchedules,
  createOrUpdateSchedule,
  getGradeScheduleDetail,
  deleteGradeSchedule,
} from '../services/grade-service'
import { createOrUpdateExam, deleteExam } from '../services/exam-service'

export const useGradeStore = defineStore('grade', () => {
  const gradeDetails = ref({})
  const gradeExams = ref([])
  const gradeSchedules = ref([])

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

  const fetchGradeSchedules = async (grade_code) => {
    const result = await getGradeSchedules(grade_code)
    gradeDetails.value = result.data.data.grade_details
    gradeSchedules.value = result.data.data.schedules
  }

  const fetchGradeScheduleDetails = async (grade_code, schedule_id) => {
    const result = await getGradeScheduleDetail(grade_code, schedule_id)
    return result.data.data
  }

  const createOrUpdateGradeSchedule = async (grade_code, schedule_data) => {
    await createOrUpdateSchedule(grade_code, schedule_data)
  }

  const removeGradeSchedule = async (grade_code, schedule_id) => {
    await deleteGradeSchedule(grade_code, schedule_id)
  }

  return {
    gradeDetails,
    gradeExams,
    getGradeExamList,
    createOrUpdateGradeExam,
    deleteGradeExam,
    gradeSchedules,
    fetchGradeSchedules,
    fetchGradeScheduleDetails,
    createOrUpdateGradeSchedule,
    removeGradeSchedule,
  }
})
