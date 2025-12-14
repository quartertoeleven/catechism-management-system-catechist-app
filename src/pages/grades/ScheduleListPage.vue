<template>
  <h1>this is the schedule page</h1>
</template>

<script setup>
import { onMounted } from 'vue'

import { useAppStore } from 'src/stores/app-store'

const appStore = useAppStore()

const { setPageSubtitle, setPageTitle } = appStore

onMounted(async () => {
  setPageTitle('Lịch sinh hoạt')
  setPageSubtitle('tên khối')
})
</script>
