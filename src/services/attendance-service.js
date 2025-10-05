import { api } from 'src/boot/axios'

export const doAttendanceCheck = (grade_schedule_id, attendance_check_data) => {
  return api.post(`/attendances/${grade_schedule_id}/check`, attendance_check_data)
}
