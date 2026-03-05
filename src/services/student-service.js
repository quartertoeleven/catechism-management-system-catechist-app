import { api } from 'src/boot/axios'

export const getStudentDetails = (student_code) => {
  return api.get(`/students/${student_code}`)
}

export const updateStudentDetails = (student_code, data_for_update) => {
  return api.put(`/students/${student_code}`, data_for_update)
}

export const createOrUpdateStudentContacts = (student_code, contact_details) => {
  return api.post(`/students/${student_code}/contacts`, contact_details)
}

export const deleteStudentContacts = (student_code, contact_id) => {
  return api.delete(`/students/${student_code}/contacts/${contact_id}`)
}

export const createOrUpdateStudentExamScore = (student_code, score_data) => {
  return api.post(`/students/${student_code}/exam-scores`, score_data)
}
