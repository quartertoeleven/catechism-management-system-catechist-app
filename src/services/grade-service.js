import { api } from 'src/boot/axios'

export const getGradeExams = (grade_code) => {
  return api.get(`/grades/${grade_code}/exams`)
}

export const getGradeSchedules = (grade_code) => {
  return api.get(`/grades/${grade_code}/schedules`)
}

export const createOrUpdateSchedule = (grade_code, data) => {
  return api.post(`/grades/${grade_code}/schedules`, data)
}

export const getGradeScheduleDetail = (grade_code, schedule_id) => {
  return api.get(`/grades/${grade_code}/schedules/${schedule_id}`)
}

export const deleteGradeSchedule = (grade_code, schedule_id) => {
  return api.delete(`/grades/${grade_code}/schedules/${schedule_id}`)
}
