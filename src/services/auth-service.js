import { api } from 'src/boot/axios'

export const login = (login_id, password) => {
  return api.post('/login', { login_id, password })
}

export const loginSSO = (loginIdToken) => {
  return api.post('/login-sso', null, {
    headers: {
      Authorization: `Bearer ${loginIdToken}`,
    },
  })
}

export const logout = () => {
  return api.post('/logout')
}

export const getAuth = () => {
  return api.get('/auth-state')
}
