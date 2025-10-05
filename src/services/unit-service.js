import { api } from 'src/boot/axios'

export const getUnits = (study_year_code = null) => {
  return api.get('/units', { params: { study_year: study_year_code } })
}

export const getUnitDetails = (unit_code) => {
  return api.get(`/units/${unit_code}`)
}

export const getUnitSchedules = (unit_code) => {
  return api.get(`/units/${unit_code}/schedules`)
}

export const getUnitAttendancesForSchedule = (unit_code, schedule_id, type) => {
  return api.get(`/units/${unit_code}/attendances`, {
    params: { schedule_id: schedule_id, type: type },
  })
}
