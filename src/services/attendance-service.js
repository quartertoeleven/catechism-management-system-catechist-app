import { api } from 'src/boot/axios'

export const doAttendanceCheck = (grade_schedule_id, attendance_check_data) => {
  return api.post(`/attendances/${grade_schedule_id}/check`, attendance_check_data)
}

export const doAttendanceCheckWithQR = (grade_schedule_id, attendance_check_data_with_qr) => {
  return api.post(`/attendances/${grade_schedule_id}/qr-check`, attendance_check_data_with_qr)
}
