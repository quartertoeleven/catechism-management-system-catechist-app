import { defineBoot } from '#q-app/wrappers'
import { initializeApp } from 'firebase/app'

const firebaseConfig = JSON.parse(process.env.FIREBASE_AUTH_CONFIG)

const firebaseApp = initializeApp(firebaseConfig)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async ({ app }) => {
  // something to do
  app.provide('firebaseApp', firebaseApp)
})
