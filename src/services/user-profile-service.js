import { api } from 'src/boot/axios'

export const changeAccountPassword = (change_password_body) => {
  return api.post('/account/change-password', change_password_body)
}
