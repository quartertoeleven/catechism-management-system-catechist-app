import { api } from 'src/boot/axios'

export const getStudyYearGenralSchedules = (study_year_code = 'current') => {
  return api.get(`/study_years/${study_year_code}/schedules`)
}
