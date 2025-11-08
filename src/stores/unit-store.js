import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getUnits,
  getUnitDetails,
  getUnitSchedules,
  getUnitAttendancesForSchedule,
  getUnitExamScores,
} from '../services/unit-service'
import { doAttendanceCheck } from '../services/attendance-service'
import { createOrUpdateStudentExamScore } from '../services/student-service'

export const useUnitStore = defineStore('unit', () => {
  const unitList = ref([])
  const unitDetails = ref({})
  const unitSchedules = ref([])
  const unitExamScores = ref([])

  const getUnitList = async () => {
    const result = await getUnits()
    unitList.value = result.data.data
  }

  const getSpecificUnitDetails = async (unitCode) => {
    const result = await getUnitDetails(unitCode)
    unitDetails.value = result.data.data
  }

  const fetchUnitSchedules = async (unitCode) => {
    const result = await getUnitSchedules(unitCode)
    unitSchedules.value = result.data.data.schedules
    unitDetails.value = result.data.data.unit_info
  }

  const fetchUnitAttendancesForSchedule = async (unitCode, scheduleId, type) => {
    const result = await getUnitAttendancesForSchedule(unitCode, scheduleId, type)
    return result.data.data
  }

  const updateAttendanceStatus = async (
    gradeScheduleId,
    type,
    studentCode,
    status,
    isNotifiedAbsence,
  ) => {
    const attendanceData = {
      student_code: studentCode,
      type: type,
      status: status,
      is_notified_absence: isNotifiedAbsence,
    }

    await doAttendanceCheck(gradeScheduleId, attendanceData)
  }

  const fetchUnitExamScoreList = async (unitCode, examId) => {
    const result = await getUnitExamScores(unitCode, examId)
    return result.data.data
  }

  const resetUnitDetails = () => {
    unitDetails.value = {}
  }

  const updateStudentExamScore = async (studentCode, examId, score) => {
    await createOrUpdateStudentExamScore(studentCode, { exam_id: examId, score: score })
  }

  return {
    unitList,
    unitDetails,
    getUnitList,
    resetUnitDetails,
    getSpecificUnitDetails,
    unitSchedules,
    fetchUnitSchedules,
    fetchUnitAttendancesForSchedule,
    updateAttendanceStatus,
    unitExamScores,
    fetchUnitExamScoreList,
    updateStudentExamScore,
  }
})
