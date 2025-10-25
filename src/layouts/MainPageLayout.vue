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
          <div class="text-weight-bold">{{ getFullName(currentUser.catechist || {}) }}</div>
        </q-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="mdi-cog" size="lg" class="q-mr-xs" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1 text-grey-9">
      <!-- <router-view /> -->
      <div class="q-pa-md">
        <q-list>
          <q-expansion-item
            expand-separator
            icon="mdi-account-settings"
            label="Account settings"
            caption="John Doe"
            expand-icon="mdi-menu-down"
            default-opened
          >
            <template v-slot:header>
              <q-item-section class="q-pl-sm">
                <q-item-label class="text-weight-medium">LỚP GIÁO LÝ</q-item-label>
                <q-item-label caption lines="1">{{ currentUser.current_unit?.name }}</q-item-label>
              </q-item-section>
            </template>

            <q-card class="my-card bg-grey-1">
              <div class="q-pa-none">
                <div class="row">
                  <div class="col-3">
                    <q-btn flat stack class="full-width q-pa-md" no-caps>
                      <q-icon
                        name="mdi-list-box"
                        size="xl"
                        class="q-pb-md"
                        @click="
                          navigateTo(`/units/${currentUser.current_unit?.code}/attendance-check`)
                        "
                      />
                      <div class="text-subtitle2 text-weight-regular">Danh sách</div>
                    </q-btn>
                  </div>
                  <div class="col-3">
                    <q-btn flat stack class="full-width q-pa-md" no-caps>
                      <q-icon
                        name="mdi-check-circle-outline"
                        size="xl"
                        class="q-pb-md"
                        @click="
                          navigateTo(`/units/${currentUser.current_unit?.code}/attendance-check`)
                        "
                      />
                      <div class="text-subtitle2 text-weight-regular">Điểm danh</div>
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
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
// import { ref } from 'vue'
// import EssentialLink from 'components/EssentialLink.vue'
import { useAppStore } from 'stores/app-store'
import { useAuthStore } from 'stores/auth-store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const authStore = useAuthStore()
const { appVersion } = storeToRefs(appStore)
const { currentUser } = authStore
const router = useRouter()

const getFullName = (catechist) => {
  const nameSegments = [catechist.last_name, catechist.middle_name, catechist.first_name]
  const fullNameWithoutEmptySegment = nameSegments.filter((segment) => !!segment)
  return fullNameWithoutEmptySegment.join(' ')
}

// const linksList = [
//   {
//     title: 'Danh sách lớp',
//     caption: 'Danh sách lớp',
//     icon: 'school',
//     link: '/units',
//   },
//   // {
//   //   title: 'Github',
//   //   caption: 'github.com/quasarframework',
//   //   icon: 'code',
//   //   link: 'https://github.com/quasarframework',
//   // },
//   // {
//   //   title: 'Discord Chat Channel',
//   //   caption: 'chat.quasar.dev',
//   //   icon: 'chat',
//   //   link: 'https://chat.quasar.dev',
//   // },
//   // {
//   //   title: 'Forum',
//   //   caption: 'forum.quasar.dev',
//   //   icon: 'record_voice_over',
//   //   link: 'https://forum.quasar.dev',
//   // },
//   // {
//   //   title: 'Twitter',
//   //   caption: '@quasarframework',
//   //   icon: 'rss_feed',
//   //   link: 'https://twitter.quasar.dev',
//   // },
//   // {
//   //   title: 'Facebook',
//   //   caption: '@QuasarFramework',
//   //   icon: 'public',
//   //   link: 'https://facebook.quasar.dev',
//   // },
//   // {
//   //   title: 'Quasar Awesome',
//   //   caption: 'Community Quasar projects',
//   //   icon: 'favorite',
//   //   link: 'https://awesome.quasar.dev',
//   // },
// ]

const navigateTo = (path) => {
  router.push(path)
}

// const leftDrawerOpen = ref(false)

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>
