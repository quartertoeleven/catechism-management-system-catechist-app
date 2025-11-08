import { api } from 'src/boot/axios'

export const createOrUpdateStudentExamScore = (student_code, score_data) => {
  return api.post(`/students/${student_code}/exam-scores`, score_data)
}
