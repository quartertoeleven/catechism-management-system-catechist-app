<template>
  <div class="q-pa-md q-gutter-sm" v-if="showInstallBanner">
    <q-banner position="bottom" inline-actions rounded class="bg-primary text-white">
      Ấn vào nút bên cạnh để cài đặt ứng dụng
      <template v-slot:action>
        <q-btn flat label="Cài đặt" @click="installApp" />
      </template>
    </q-banner>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue'

const showInstallBanner = ref(false)
let deferredPrompt

onMounted(() => {
  // handle PWA install promt

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()
    console.log('jajajajajjajjajaj')
    // Stash the event so it can be triggered later.
    deferredPrompt = e
    // Show the install prompt
    showInstallBanner.value = true
  })
})

const installApp = () => {
  deferredPrompt.prompt()
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
      showInstallBanner.value = false
    } else {
      console.log('User dismissed the A2HS prompt')
    }
    deferredPrompt = null
  })
}
</script>
