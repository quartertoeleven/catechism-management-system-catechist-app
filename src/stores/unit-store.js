import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getUnits,
  getUnitDetails,
  getUnitSchedules,
  getUnitAttendancesForSchedule,
  getUnitExamScores,
  getUnitAttendanceStatistics,
} from '../services/unit-service'
import { doAttendanceCheck, doAttendanceCheckWithQR } from '../services/attendance-service'
import { createOrUpdateStudentExamScore } from '../services/student-service'
import { useAppStore } from './app-store'

export const useUnitStore = defineStore('unit', () => {
  const unitList = ref([])
  const unitDetails = ref({})
  const unitSchedules = ref([])
  const unitExamScores = ref([])
  const unitAttendanceStatistics = ref([])

  const appStore = useAppStore()

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

  const updateAttendanceStatusWithQR = async (gradeScheduleId, type, qrStr) => {
    const attendanceDataWithQr = {
      type: type,
      qrData: qrStr,
      gradeScheduleId: gradeScheduleId,
    }

    try {
      appStore.setSuppressLoading(true)
      const result = await doAttendanceCheckWithQR(gradeScheduleId, attendanceDataWithQr)
      return result.data
    } catch (error) {
      console.error(error)
      return null
    } finally {
      appStore.setSuppressLoading(false)
    }
  }

  const fetchUnitExamScoreList = async (unitCode, examId) => {
    const result = await getUnitExamScores(unitCode, examId)
    return result.data.data
  }

  const resetUnitDetails = () => {
    unitDetails.value = {}
    unitAttendanceStatistics.value = []
  }

  const updateStudentExamScore = async (studentCode, examId, score) => {
    await createOrUpdateStudentExamScore(studentCode, { exam_id: examId, score: score })
  }

  const fetchUnitAttendanceStatistic = async (unitCode) => {
    const result = await getUnitAttendanceStatistics(unitCode)
    unitAttendanceStatistics.value = result.data.data.students || []
    unitDetails.value = {
      code: result.data.data.code,
      name: result.data.data.name,
    }
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
    updateAttendanceStatusWithQR,
    unitAttendanceStatistics,
    fetchUnitAttendanceStatistic,
  }
})
