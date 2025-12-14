<template>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered>
      <q-expansion-item
        icon="mdi-account-settings"
        label="Account settings"
        caption="John Doe"
        expand-icon="mdi-menu-down"
        default-opened
        class="bg-grey-3"
      >
        <template v-slot:header>
          <q-item-section class="q-pl-sm q-py-xs">
            <q-item-label class="text-weight-medium">LỚP GIÁO LÝ</q-item-label>
            <q-item-label caption lines="1">{{ currentUser.current_unit?.name }}</q-item-label>
          </q-item-section>
        </template>

        <q-card class="my-card bg-grey-1">
          <div class="q-pa-none">
            <div class="row">
              <div class="col-4">
                <q-btn
                  flat
                  stack
                  class="full-width q-pa-md"
                  no-wrap
                  no-caps
                  :to="`/units/${currentUser.current_unit?.code}`"
                >
                  <q-icon name="mdi-list-box" size="xl" class="q-pb-md" />
                  <div class="text-subtitle2 text-weight-regular">Danh sách</div>
                </q-btn>
              </div>
              <div class="col-4">
                <q-btn
                  flat
                  stack
                  class="full-width q-pa-md"
                  no-caps
                  no-wrap
                  :to="`/units/${currentUser.current_unit?.code}/attendance-check`"
                >
                  <q-icon name="mdi-check-circle-outline" size="xl" class="q-pb-md" />
                  <div class="text-subtitle2 text-weight-regular">Điểm danh</div>
                </q-btn>
              </div>
              <div class="col-4">
                <q-btn
                  flat
                  stack
                  class="full-width q-pa-md"
                  no-caps
                  no-wrap
                  :to="`/units/${currentUser.current_unit?.code}/exam-scores`"
                >
                  <q-icon name="mdi-book-edit" size="xl" class="q-pb-md" />
                  <div class="text-subtitle2 text-weight-regular">Điểm kiểm tra</div>
                </q-btn>
              </div>
              <div class="col-4">
                <q-btn
                  flat
                  stack
                  class="full-width q-pa-md"
                  no-wrap
                  no-caps
                  :to="`/units/${currentUser.current_unit?.code}/statistics`"
                >
                  <q-icon name="mdi-chart-box-outline" size="xl" class="q-pb-md" />
                  <div class="text-subtitle2 text-weight-regular">Thống kê</div>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card>
      </q-expansion-item>
    </q-list>

    <q-list bordered>
      <q-expansion-item
        icon="mdi-account-settings"
        label="Account settings"
        caption="John Doe"
        expand-icon="mdi-menu-down"
        default-opened
        class="bg-grey-3"
      >
        <template v-slot:header>
          <q-item-section class="q-pl-sm q-py-xs">
            <q-item-label class="text-weight-medium">KHỐI GIÁO LÝ</q-item-label>
            <q-item-label caption lines="1">{{ currentUser.current_grade?.name }}</q-item-label>
          </q-item-section>
        </template>

        <q-card class="my-card bg-grey-1">
          <div class="q-pa-none">
            <div class="row">
              <div class="col-4">
                <q-btn
                  flat
                  stack
                  class="full-width q-pa-md"
                  no-wrap
                  no-caps
                  :to="`/grades/${currentUser.current_grade?.code}/schedules`"
                >
                  <q-icon name="mdi-calendar" size="xl" class="q-pb-md" />
                  <div class="text-subtitle2 text-weight-regular">Lịch sinh hoạt</div>
                </q-btn>
              </div>
              <div class="col-4">
                <q-btn
                  flat
                  stack
                  class="full-width q-pa-md"
                  no-wrap
                  no-caps
                  :to="`/grades/${currentUser.current_grade?.code}/exams`"
                >
                  <q-icon name="mdi-book-multiple" size="xl" class="q-pb-md" />
                  <div class="text-subtitle2 text-weight-regular">Bài kiểm tra</div>
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
