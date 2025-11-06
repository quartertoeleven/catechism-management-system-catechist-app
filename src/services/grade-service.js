import { api } from 'src/boot/axios'

export const getGradeSchedule = (grade_code) => {
  return api.get(`/grades/${grade_code}/schedules`)
}

export const getGradeExams = (grade_code) => {
  return api.get(`/grades/${grade_code}/exams`)
}
