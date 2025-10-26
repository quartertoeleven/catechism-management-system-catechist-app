<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> {{ pageTitle }} </q-toolbar-title>

        <div>
          Phiên bản <span class="text-weight-bold">{{ appVersion }}</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Tính năng chính </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template> -->

<template>
  <q-layout view="lHr Lpr lFr">
    <q-header class="bg-grey-1 text-grey-9">
      <q-toolbar class="q-py-md">
        <q-avatar>
          <q-icon name="mdi-account-circle" size="lg" />
        </q-avatar>
        <q-toolbar-title>
          <div class="text-caption">Xin chào, {{ currentUser.catechist?.saint_name }}</div>
          <div class="text-weight-bold text-h6">
            {{ getFullName(currentUser.catechist || {}) }}
          </div>
        </q-toolbar-title>
        <!-- <q-space /> -->
        <q-btn flat round dense icon="mdi-cog" size="lg" class="q-mr-xs" to="/settings" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1 text-grey-9">
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-1 text-grey-9">
      <q-toolbar class="q-py-md">
        <q-toolbar-title class="text-center">
          <div class="text-subtitle2">Ứng dụng dành cho Giáo Lý Viên</div>
          <div class="text-caption">
            Phiên bản <span class="text-weight-bold">{{ appVersion }}</span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useAppStore } from 'stores/app-store'
import { useAuthStore } from 'stores/auth-store'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const authStore = useAuthStore()
const { appVersion } = storeToRefs(appStore)
const { currentUser } = authStore

const getFullName = (catechist) => {
  const nameSegments = [catechist.last_name, catechist.middle_name, catechist.first_name]
  const fullNameWithoutEmptySegment = nameSegments.filter((segment) => !!segment)
  return fullNameWithoutEmptySegment.join(' ')
}
</script>
