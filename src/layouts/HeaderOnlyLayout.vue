<template>
  <q-layout view="hHh lpr lfr">
    <q-header bordered class="bg-grey-1 text-grey-9">
      <q-toolbar class="q-py-sm">
        <q-btn flat round dense icon="mdi-chevron-left" :to="navigateBackPath" replace />
        <q-toolbar-title class="text-center q-mr-xl">
          {{ pageTitle }}
          <div class="text-caption">
            {{ pageSubtitle }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAppStore } from 'stores/app-store'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { pageTitle, pageSubtitle, navigateBackPath } = storeToRefs(appStore)
</script>
