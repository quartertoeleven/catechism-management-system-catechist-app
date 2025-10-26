import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getUnits,
  getUnitDetails,
  getUnitSchedules,
  getUnitAttendancesForSchedule,
} from '../services/unit-service'

import { doAttendanceCheck } from '../services/attendance-service'

export const useUnitStore = defineStore('unit', () => {
  const unitList = ref([])
  const unitDetails = ref({})
  const unitSchedules = ref([])

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

  const resetUnitDetails = () => {
    unitDetails.value = {}
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
  }
})
