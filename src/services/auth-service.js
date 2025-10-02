import { api } from 'src/boot/axios'

export const login = (login_id, password) => {
  return api.post('/login', { login_id, password })
}
