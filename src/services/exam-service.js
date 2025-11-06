import { api } from 'src/boot/axios'

export const createNewExam = (data) => {
  return api.post('/exams', data)
}
