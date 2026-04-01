import { register } from 'register-service-worker'
import { Notify } from 'quasar' // Import Notify

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready(/* registration */) {
    // console.log('Service worker is active.')
  },

  registered(/* registration */) {
    // console.log('Service worker has been registered.')
  },

  cached(/* registration */) {
    // console.log('Content has been cached for offline use.')
  },

  updatefound(/* registration */) {
    // console.log('New content is downloading.')
  },

  // updated(registration) {
  //   // OLD BEHAVIOR (Auto Reload):
  //   // window.location.reload()

  //   // NEW BEHAVIOR (Prompt User):
  //   Notify.create({
  //     message: 'Ứng dụng có phiên bản mới!',
  //     icon: 'cloud_download',
  //     color: 'primary',
  //     timeout: 0,
  //     position: 'top',
  //     actions: [
  //       {
  //         label: 'Cập nhật',
  //         color: 'white',
  //         handler: () => {
  //           if (registration.waiting) {
  //             // Send message to waiting service worker to skip waiting
  //             registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  //           }

  //           // Create and dispatch custom event
  //           const event = new CustomEvent('swUpdated', { detail: registration })
  //           document.dispatchEvent(event)
  //           setTimeout(() => {
  //             window.location.reload()
  //           }, 100)
  //         },
  //       },
  //     ],
  //   })
  // },

  updated(registration) {
    // console.log('New content is available; please refresh.')
    // Create a custom event to notify the app about the update
    if (registration.waiting) {
      // Send message to waiting service worker to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }

    // Create and dispatch custom event
    const event = new CustomEvent('swUpdated', { detail: registration })
    document.dispatchEvent(event)

    Notify.create({
      message: 'Ứng dụng có phiên bản mới!',
      icon: 'cloud_download',
      color: 'primary',
      timeout: 0,
      position: 'top',
      actions: [
        {
          label: 'Cập nhật',
          color: 'white',
          handler: () => {
            window.location.reload()
          },
        },
      ],
    })
  },

  offline() {
    // console.log('No internet connection found. App is running in offline mode.')
  },

  error(/* err */) {
    // console.error('Error during service worker registration:', err)
  },
})
