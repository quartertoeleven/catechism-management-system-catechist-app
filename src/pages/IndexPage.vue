<template>
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
                <q-btn flat stack class="full-width q-pa-md" no-caps to="/units">
                  <q-icon name="mdi-list-box" size="xl" class="q-pb-md" />
                  <div class="text-subtitle2 text-weight-regular">Danh sách</div>
                </q-btn>
              </div>
              <div class="col-3">
                <q-btn
                  flat
                  stack
                  class="full-width q-pa-md"
                  no-caps
                  :to="`/units/${currentUser.current_unit?.code}/attendance-check`"
                >
                  <q-icon name="mdi-check-circle-outline" size="xl" class="q-pb-md" />
                  <div class="text-subtitle2 text-weight-regular">Điểm danh</div>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import { useAuthStore } from 'stores/auth-store'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
</script>
