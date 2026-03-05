import { api } from 'src/boot/axios'

export const getStudentInfoFromQrCode = (qr_content_request) => {
  return api.post('/qr-reader', qr_content_request)
}
