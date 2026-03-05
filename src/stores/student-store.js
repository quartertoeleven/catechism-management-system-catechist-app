import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Notify } from 'quasar'

import {
  getStudentDetails,
  updateStudentDetails,
  createOrUpdateStudentContacts,
  deleteStudentContacts,
} from '../services/student-service'

export const useStudentStore = defineStore('student', () => {
  const studentDetails = ref({})

  const fetchStudentInfo = async (student_code) => {
    const result = await getStudentDetails(student_code)
    studentDetails.value = result.data.data
  }

  const updateStudentInfo = async (student_code, data_for_update) => {
    const result = await updateStudentDetails(student_code, data_for_update)
    if (result.data.success) {
      Notify.create({
        type: 'positive',
        message: result.data.message,
        position: 'top-right',
        group: false,
        timeout: 4000,
        progress: true,
        icon: 'mdi-check',
      })
    }
  }

  const createOrUpdateContacts = async (student_code, contact_info) => {
    const result = await createOrUpdateStudentContacts(student_code, contact_info)
    if (result.data.success) {
      Notify.create({
        type: 'positive',
        message: result.data.message,
        position: 'top-right',
        group: false,
        timeout: 4000,
        progress: true,
        icon: 'mdi-check',
      })
      studentDetails.value.contacts = result.data.data
    }
  }

  const deleteContact = async (student_code, contact_id) => {
    const result = await deleteStudentContacts(student_code, contact_id)
    if (result.data.success) {
      studentDetails.value.contacts = result.data.data
    }
  }

  return {
    studentDetails,
    fetchStudentInfo,
    updateStudentInfo,
    createOrUpdateContacts,
    deleteContact,
  }
})
