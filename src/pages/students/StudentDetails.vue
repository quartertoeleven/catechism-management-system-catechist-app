<template>
  <q-tabs v-model="currentTab" inline-label align="justify" outside-arrows mobile-arrows>
    <q-tab name="basic" icon="mdi-information" label="Lý lịch" />
    <q-tab name="parent" icon="mdi-human-male-female-child" label="Phụ huynh" />
    <q-tab name="contact" icon="mdi-contacts" label="Liên lạc" />
    <q-tab name="result" icon="mdi-school" label="Học tập" />
  </q-tabs>

  <q-tab-panels
    style="height: calc(100vh - 8rem)"
    class="bg-grey-1"
    v-model="currentTab"
    animated
    swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-tab-panel name="basic">
      <q-btn
        class="full-width q-mb-md"
        color="primary"
        icon="save"
        label="Lưu lý lịch học viên"
        style="position: sticky; top: 0; z-index: 1"
      />
      <div class="q-qa-md q-gutter-md">
        <q-form class="q-gutter-y-md" @submit.prevent="">
          <q-card class="bg-grey-1" flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Thông tin chung</div>
            </q-card-section>
            <q-card-section class="q-pt-none q-gutter-y-md">
              <q-input
                class="full-width"
                outlined
                readonly
                label="Mã học viên"
                type="text"
                v-model="generalInfoFormData.code"
              />
              <q-input
                class="full-width"
                outlined
                label="Tên Thánh"
                type="text"
                v-model="generalInfoFormData.saint_name"
              />
              <q-input
                class="full-width"
                outlined
                label="Họ"
                type="text"
                v-model="generalInfoFormData.last_name"
              />
              <q-input
                class="full-width"
                outlined
                label="Tên đệm"
                type="text"
                v-model="generalInfoFormData.middle_name"
              />
              <q-input
                class="full-width"
                outlined
                label="Tên"
                type="text"
                v-model="generalInfoFormData.first_name"
              />
              <div class="row q-gutter-x-md">
                <div class="col">
                  <q-select
                    class="full-width"
                    dropdown-icon="mdi-menu-down"
                    outlined
                    :options="genderOptions"
                    map-options
                    emit-value
                    v-model="generalInfoFormData.gender"
                    label="Giới tính"
                  />
                </div>
                <div class="col">
                  <!-- <q-input
                    class="full-width"
                    outlined
                    label="Ngày sinh"
                    type="text"
                    v-model="generalInfoFormData.date_of_birth"
                  /> -->
                  <q-input
                    outlined
                    v-model="generalInfoFormData.date_of_birth"
                    label="Ngày sinh"
                    readonly
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                          ref="dateSelectionPopup"
                        >
                          <q-date
                            v-model="generalInfoFormData.date_of_birth"
                            today-btn
                            minimal
                            no-unset
                            mask="DD/MM/YYYY"
                            :locale="dateLocales"
                            @update:model-value="dateSelectionPopup.hide()"
                          >
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="my-card bg-grey-1" flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Thông tin Rửa Tội và Thêm Sức</div>
            </q-card-section>
            <q-card-section class="q-pt-none q-gutter-y-md">
              <q-toggle label="Đã được Rửa Tội" v-model="generalInfoFormData.is_baptized" />
              <q-input
                class="full-width"
                outlined
                label="Ngày Rửa Tội"
                type="text"
                v-model="generalInfoFormData.baptism_date"
              />
              <q-input
                class="full-width"
                outlined
                label="Nơi Rửa Tội"
                type="text"
                v-model="generalInfoFormData.baptism_place"
              />
              <q-toggle
                label="Đã lãnh nhận Bí Tích Thêm Sức"
                v-model="generalInfoFormData.is_confirmed"
              />
              <q-input
                class="full-width"
                outlined
                label="Ngày Thêm Sức"
                type="text"
                v-model="generalInfoFormData.confirmation_date"
              />
              <q-input
                class="full-width"
                outlined
                label="Nơi Thêm Sức"
                type="text"
                v-model="generalInfoFormData.confirmation_place"
              />
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </q-tab-panel>

    <q-tab-panel name="parent">
      <q-btn
        class="full-width q-mb-md"
        color="primary"
        icon="save"
        label="Lưu thông tin phụ huynh"
        style="position: sticky; top: 0; z-index: 1"
      />
      <q-form class="q-gutter-y-md" @submit.prevent="">
        <q-card class="bg-grey-1" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Thông tin bố</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input class="full-width" outlined label="Tên thánh" type="text" />
            <q-input class="full-width" outlined label="Họ tên" type="text" />
            <q-input class="full-width" outlined label="Nghề nghiệp" type="text" />
          </q-card-section>
        </q-card>
        <q-card class="bg-grey-1" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Thông tin mẹ</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input class="full-width" outlined label="Tên thánh" type="text" />
            <q-input class="full-width" outlined label="Họ tên" type="text" />
            <q-input class="full-width" outlined label="Nghề nghiệp" type="text" />
          </q-card-section>
        </q-card>
      </q-form>
    </q-tab-panel>

    <q-tab-panel name="contact">
      <q-form class="q-gutter-y-md" @submit.prevent="">
        <q-card class="bg-grey-1" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Địa chỉ mới (sau sáp nhập)</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input
              class="full-width"
              outlined
              label="Dòng 1 (số nhà, tên đường, khu phố)"
              type="text"
            />
            <q-input
              class="full-width"
              outlined
              label="Dòng 2 (phường/xã, thành phố/tỉnh)"
              type="text"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-subtitle2">Địa chỉ cũ (trước sáp nhập)</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input
              class="full-width"
              outlined
              label="Dòng 1 (số nhà, tên đường, khu phố)"
              type="text"
            />
            <q-input
              class="full-width"
              outlined
              label="Dòng 2 (phường/xã, quận/huyện, thành phố/tỉnh)"
              type="text"
            />
          </q-card-section>
          <q-card-section>
            <q-btn class="full-width" color="primary" icon="save" label="Lưu địa chỉ" />
          </q-card-section>
        </q-card>
      </q-form>

      <q-card class="my-card q-mt-md" flat bordered>
        <q-card-section>
          <div class="text-subtitle2">Thông tin liên lạc</div>
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon name="mdi-phone" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Điện thoại</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>0909xxxxxx</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon name="mdi-email" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Email</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>0909xxxxxx</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon name="mdi-phone" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Điện thoại</q-item-label>
                <q-item-label caption>Bố</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>0909xxxxxx</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon name="mdi-phone" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Điện thoại</q-item-label>
                <q-item-label caption>Mẹ</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>0909xxxxxx</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
  <q-page-sticky position="bottom-right" :offset="[24, 24]">
    <q-btn fab icon="save" color="primary" />
  </q-page-sticky>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { date } from 'quasar'

import { genderOptions, dateLocales } from 'src/helpers/constants'
import { useStudentStore } from 'src/stores/student-store'
import { useAppStore } from 'stores/app-store'

const currentTab = ref('basic')

const appStore = useAppStore()
const studentStore = useStudentStore()
const router = useRouter()

const { setPageSubtitle, setPageTitle } = appStore
const { studentDetails } = storeToRefs(studentStore)
const { fetchStudentDetails } = studentStore

const dateSelectionPopup = ref(null)
const generalInfoFormData = ref({
  code: '',
  saint_name: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  is_baptized: null,
  baptism_date: null,
  baptism_place: '',
  is_confirmed: null,
  confirmation_date: null,
  confirmation_place: '',
})

const populateGeneralInfoFormData = () => {
  generalInfoFormData.value.code = studentDetails.value.code
  generalInfoFormData.value.saint_name = studentDetails.value.saint_name
  generalInfoFormData.value.first_name = studentDetails.value.first_name
  generalInfoFormData.value.middle_name = studentDetails.value.middle_name
  generalInfoFormData.value.last_name = studentDetails.value.last_name
  generalInfoFormData.value.gender = studentDetails.value.gender
  generalInfoFormData.value.date_of_birth = date.formatDate(
    studentDetails.value.date_of_birth,
    'DD/MM/YYYY',
    dateLocales,
  )
  generalInfoFormData.value.is_baptized = studentDetails.value.is_baptized
  generalInfoFormData.value.baptism_date = studentDetails.value.baptism_date
  generalInfoFormData.value.baptism_place = studentDetails.value.baptism_place
  generalInfoFormData.value.is_confirmed = studentDetails.value.is_confirmed
  generalInfoFormData.value.confirmation_date = studentDetails.value.confirmation_date
  generalInfoFormData.value.confirmation_place = studentDetails.value.confirmation_place
}

onMounted(async () => {
  await fetchStudentDetails(router.currentRoute.value.params.student_code)
  setPageTitle('Thông tin học viên')
  setPageSubtitle(`${studentDetails.value.code}`)
  console.log(studentDetails)
  populateGeneralInfoFormData()
})
</script>
