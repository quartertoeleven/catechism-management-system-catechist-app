import { defineBoot } from '#q-app/wrappers'
import { createLogto } from '@logto/vue'

export default defineBoot(({ app }) => {
  const logtoConfig = {
    endpoint: process.env.LOGTO_ENDPOINT,
    appId: process.env.LOGTO_APP_ID,
    resources: [process.env.API_BASE_URL],
    scopes: ['openid', 'profile', 'email', 'custom_data'],
  }

  app.use(createLogto, logtoConfig)
})
