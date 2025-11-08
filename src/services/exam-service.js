import { api } from 'src/boot/axios'

export const createOrUpdateExam = (data) => {
  return api.post('/exams', data)
}

export const deleteExam = (exam_id) => {
  return api.delete(`/exams/${exam_id}`)
}
