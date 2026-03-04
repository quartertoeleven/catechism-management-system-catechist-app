<template>
  <q-tabs v-model="currentTab" inline-label align="justify" outside-arrows mobile-arrows>
    <q-tab name="basic" icon="mdi-information" label="Lý lịch" />
    <q-tab name="parent" icon="mdi-human-male-female-child" label="Phụ huynh" />
    <q-tab name="contact" icon="mdi-contacts" label="Liên lạc" />
    <!-- <q-tab name="result" icon="mdi-school" label="Học tập" /> -->
  </q-tabs>

  <q-tab-panels style="height: calc(100vh - 8rem)" class="bg-grey-1" v-model="currentTab" animated swipeable
    transition-prev="slide-right" transition-next="slide-left">
    <q-tab-panel name="basic">
      <div class="q-qa-md q-gutter-md">
        <q-form class="q-gutter-y-md" id="studentBasicAndSacramentsInfoForm"
          @submit.prevent="handleBasicAndSacramentsInfoFormSubmit()">
          <q-card class="bg-grey-1" flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Thông tin chung</div>
            </q-card-section>
            <q-card-section class="q-pt-none q-gutter-y-md">
              <q-input class="full-width" outlined readonly label="Mã học viên" type="text"
                v-model="generalInfoFormData.basic.code" />
              <q-input class="full-width" outlined label="Tên Thánh" type="text"
                v-model="generalInfoFormData.basic.saint_name" />
              <q-input class="full-width" outlined label="Họ" type="text"
                v-model="generalInfoFormData.basic.last_name" />
              <q-input class="full-width" outlined label="Tên đệm" type="text"
                v-model="generalInfoFormData.basic.middle_name" />
              <q-input class="full-width" outlined label="Tên" type="text"
                v-model="generalInfoFormData.basic.first_name" />
              <div class="row q-gutter-x-md">
                <div class="col">
                  <q-select class="full-width" dropdown-icon="mdi-menu-down" outlined :options="genderOptions"
                    map-options emit-value v-model="generalInfoFormData.basic.gender" label="Giới tính" />
                </div>
                <div class="col">
                  <q-input outlined v-model="generalInfoFormData.basic.date_of_birth" label="Ngày sinh" readonly>
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="dobSelectionPopup">
                          <q-date v-model="generalInfoFormData.basic.date_of_birth" today-btn minimal no-unset
                            mask="DD/MM/YYYY" :locale="dateLocales" @update:model-value="dobSelectionPopup.hide()">
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
              <q-toggle label="Đã được Rửa Tội" v-model="generalInfoFormData.sacraments.is_baptized" />
              <q-input outlined v-model="generalInfoFormData.sacraments.baptism_date" label="Ngày Rửa Tội" readonly
                :disable="!generalInfoFormData.sacraments.is_baptized">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                      ref="baptismDateSelectionPopup">
                      <q-date v-model="generalInfoFormData.sacraments.baptism_date" today-btn minimal no-unset
                        mask="DD/MM/YYYY" :locale="dateLocales" @update:model-value="baptismDateSelectionPopup.hide()">
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input class="full-width" outlined label="Nơi Rửa Tội" type="text"
                :disable="!generalInfoFormData.sacraments.is_baptized"
                v-model="generalInfoFormData.sacraments.baptism_place" />
              <q-toggle label="Đã lãnh nhận Bí Tích Thêm Sức" v-model="generalInfoFormData.sacraments.is_confirmed" />
              <q-input outlined v-model="generalInfoFormData.sacraments.confirmation_date" label="Ngày Thêm Sức"
                :disable="!generalInfoFormData.sacraments.is_confirmed" readonly>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                      ref="confirmationDateSelectionPopup">
                      <q-date v-model="generalInfoFormData.sacraments.confirmation_date" today-btn minimal no-unset
                        mask="DD/MM/YYYY" :locale="dateLocales"
                        @update:model-value="confirmationDateSelectionPopup.hide()">
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input class="full-width" outlined label="Nơi Thêm Sức" type="text"
                :disable="!generalInfoFormData.sacraments.is_confirmed"
                v-model="generalInfoFormData.sacraments.confirmation_place" />
            </q-card-section>
          </q-card>
        </q-form>
      </div>
      <q-btn class="full-width q-mt-md" color="primary" icon="save" label="Lưu lý lịch học viên" type="submit"
        form="studentBasicAndSacramentsInfoForm" style="position: sticky; bottom: 0; z-index: 1" />
    </q-tab-panel>

    <q-tab-panel name="parent">
      <q-form class="q-gutter-y-md" id="parentInfoForm" @submit.prevent="handleParentInfoFormSubmit()">
        <q-card class="bg-grey-1" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Thông tin bố</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input class="full-width" outlined label="Tên thánh" type="text"
              v-model="parentInfoFormData.father_saint_name" />
            <q-input class="full-width" outlined label="Họ tên" type="text"
              v-model="parentInfoFormData.father_full_name" />
            <q-input class="full-width" outlined label="Nghề nghiệp" type="text"
              v-model="parentInfoFormData.father_job" />
          </q-card-section>
        </q-card>
        <q-card class="bg-grey-1" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Thông tin mẹ</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input class="full-width" outlined label="Tên thánh" type="text"
              v-model="parentInfoFormData.mother_saint_name" />
            <q-input class="full-width" outlined label="Họ tên" type="text"
              v-model="parentInfoFormData.mother_full_name" />
            <q-input class="full-width" outlined label="Nghề nghiệp" type="text"
              v-model="parentInfoFormData.mother_job" />
          </q-card-section>
        </q-card>
      </q-form>
      <q-btn class="full-width q-mt-md" color="primary" icon="save" label="Lưu thông tin phụ huynh" type="submit"
        form="parentInfoForm" style="position: sticky; bottom: 0; z-index: 1" />
    </q-tab-panel>

    <q-tab-panel name="contact">
      <q-form class="q-gutter-y-md" @submit.prevent="handleAddressFormSubmit()">
        <q-card class="bg-grey-1" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Địa chỉ mới (sau sáp nhập)</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input class="full-width" outlined label="Dòng 1 (số nhà, tên đường, khu phố)" type="text"
              v-model="addressFormData.address_line_1" />
            <q-input class="full-width" outlined label="Dòng 2 (phường/xã, thành phố/tỉnh)" type="text"
              v-model="addressFormData.address_line_2" />
          </q-card-section>
          <q-card-section>
            <div class="text-subtitle2">Địa chỉ cũ (trước sáp nhập)</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input class="full-width" outlined label="Dòng 1 (số nhà, tên đường, khu phố)" type="text"
              v-model="addressFormData.old_address_line_1" />
            <q-input class="full-width" outlined label="Dòng 2 (phường/xã, quận/huyện, thành phố/tỉnh)" type="text"
              v-model="addressFormData.old_address_line_2" />
          </q-card-section>
          <q-card-section>
            <q-btn class="full-width" color="primary" icon="save" label="Lưu địa chỉ" type="submit" />
          </q-card-section>
        </q-card>
      </q-form>

      <q-card class="my-card q-mt-md bg-grey-1" flat bordered>
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-subtitle2">Thông tin liên lạc</div>
            <q-btn color="primary" icon="mdi-plus" label="Thêm mới" size="md" @click="addNewContact()"
              :disable="!!contactList.find((c) => c.isEdit)" />
          </div>

        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-list bordered separator v-if="contactList.length > 0">
            <q-item :clickable="!contact.isEdit" v-for="contact in contactList" :key="contact.frontend_key">
              <template v-if="!contact.isEdit">
                <q-item-section side>
                  <q-icon :name="contactTypeOptions.find((t) => t.value === contact.type)?.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ contact.info }}</q-item-label>
                  <q-item-label caption>{{contactTypeOptions.find((t) => t.value === contact.type)?.label}} {{
                    contact.relationship ? '-' : '' }}
                    {{contactRelationTypeOptions.find((t) => t.value ===
                      contact.relationship)?.label
                    }}</q-item-label>
                </q-item-section>
                <q-item-section side v-if="!contactList.find((c) => c.isEdit)">
                  <q-btn flat round color="" icon="mdi-dots-horizontal" dense @click.prevent.stop="">
                    <q-menu>
                      <q-list>
                        <q-item clickable v-close-popup v-ripple @click="enableEditContact(contact)">
                          <q-item-section avatar>
                            <q-icon color="" name="mdi-pencil" />
                          </q-item-section>
                          <q-item-section>Chỉnh sửa</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup v-ripple @click="handleRemoveContact(contact)">
                          <q-item-section avatar>
                            <q-icon color="negative" name="mdi-delete" />
                          </q-item-section>
                          <q-item-section>Xóa</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </template>
              <template v-else>
                <q-item-section>
                  <div class="q-pt-md q-gutter-sm">
                    <q-form class="q-gutter-y-md" :id="`contactForm-${contact.frontend_key}`"
                      @submit.prevent="handleSaveContact(contact)">
                      <q-select class="full-width" dropdown-icon="mdi-menu-down" outlined :options="contactTypeOptions"
                        map-options emit-value v-model="contact.type" label="Phương thức" />
                      <q-select class="full-width" dropdown-icon="mdi-menu-down" outlined clearable
                        :options="contactRelationTypeOptions" map-options emit-value v-model="contact.relationship"
                        label="Quan hệ với học viên" hint="Để trống nếu là thông tin của chính học viên" />
                      <q-input class="full-width" outlined label="Chi tiết" type="text" v-model="contact.info" />
                      <div class="q-gutter-x-sm row justify-end">
                        <q-btn color="negative" icon="mdi-cancel" label="Hủy" @click="cancelEditContact(contact)" />
                        <q-btn color="primary" icon="save" label="Lưu" type="submit" />
                      </div>
                    </q-form>

                  </div>
                </q-item-section>
              </template>
            </q-item>
          </q-list>
          <div class="row" v-else>
            <div class="text-center full-width text-subtitle">
              (chưa có thông tin)
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { date, useQuasar } from 'quasar'

import { genderOptions, dateLocales, contactTypeOptions, contactRelationTypeOptions } from 'src/helpers/constants'
import { useStudentStore } from 'src/stores/student-store'
import { useAppStore } from 'stores/app-store'

const currentTab = ref('basic')

const appStore = useAppStore()
const studentStore = useStudentStore()
const router = useRouter()
const $q = useQuasar()

const { setPageSubtitle, setPageTitle } = appStore
const { studentDetails } = storeToRefs(studentStore)
const { fetchStudentInfo, updateStudentInfo, createOrUpdateContacts, deleteContact } = studentStore

const dobSelectionPopup = ref(null)
const baptismDateSelectionPopup = ref(null)
const confirmationDateSelectionPopup = ref(null)

const generalInfoFormData = ref({
  basic: {
    code: '',
    saint_name: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: null,
    date_of_birth: null,
  },
  sacraments: {
    is_baptized: null,
    baptism_date: null,
    baptism_place: '',
    is_confirmed: null,
    confirmation_date: null,
    confirmation_place: '',
  }
})

const parentInfoFormData = ref({
  father_saint_name: '',
  father_full_name: '',
  father_job: '',
  mother_saint_name: '',
  mother_full_name: '',
  mother_job: '',
})

const addressFormData = ref({
  address_line_1: '',
  address_line_2: '',
  old_address_line_1: '',
  old_address_line_2: ''
})

const contactList = ref([])

onMounted(async () => {
  await fetchStudentInfo(router.currentRoute.value.params.student_code)
  setPageTitle('Thông tin học viên')
  setPageSubtitle(`${studentDetails.value.basic.code}`)
  populateGeneralInfoFormData()
  populateParentInfoFormData()
  populateAddressFormData()
  populateContactList()
})

const populateGeneralInfoFormData = () => {
  generalInfoFormData.value.basic.code = studentDetails.value.basic.code
  generalInfoFormData.value.basic.saint_name = studentDetails.value.basic.saint_name
  generalInfoFormData.value.basic.first_name = studentDetails.value.basic.first_name
  generalInfoFormData.value.basic.middle_name = studentDetails.value.basic.middle_name
  generalInfoFormData.value.basic.last_name = studentDetails.value.basic.last_name
  generalInfoFormData.value.basic.gender = studentDetails.value.basic.gender
  generalInfoFormData.value.basic.date_of_birth = date.formatDate(
    studentDetails.value.basic.date_of_birth,
    'DD/MM/YYYY',
    dateLocales,
  )
  generalInfoFormData.value.sacraments.is_baptized = studentDetails.value.sacraments.is_baptized
  generalInfoFormData.value.sacraments.baptism_date = date.formatDate(
    studentDetails.value.sacraments.baptism_date,
    'DD/MM/YYYY',
    dateLocales,
  )
  generalInfoFormData.value.sacraments.baptism_place = studentDetails.value.sacraments.baptism_place
  generalInfoFormData.value.sacraments.is_confirmed = studentDetails.value.sacraments.is_confirmed
  generalInfoFormData.value.sacraments.confirmation_date = date.formatDate(
    studentDetails.value.sacraments.confirmation_date,
    'DD/MM/YYYY',
    dateLocales,
  )
  generalInfoFormData.value.sacraments.confirmation_place = studentDetails.value.sacraments.confirmation_place
}

const populateParentInfoFormData = () => {
  parentInfoFormData.value.father_saint_name = studentDetails.value.parents.father_saint_name
  parentInfoFormData.value.father_full_name = studentDetails.value.parents.father_full_name
  parentInfoFormData.value.father_job = studentDetails.value.parents.father_full_name
  parentInfoFormData.value.mother_saint_name = studentDetails.value.parents.mother_saint_name
  parentInfoFormData.value.mother_full_name = studentDetails.value.parents.mother_full_name
  parentInfoFormData.value.mother_job = studentDetails.value.parents.mother_job
}

const populateAddressFormData = () => {
  addressFormData.value.address_line_1 = studentDetails.value.address.address_line_1
  addressFormData.value.address_line_2 = studentDetails.value.address.address_line_2
  addressFormData.value.old_address_line_1 = studentDetails.value.address.old_address_line_1
  addressFormData.value.old_address_line_2 = studentDetails.value.address.old_address_line_2
}

const populateContactList = () => {
  contactList.value = [...studentDetails.value.contacts]
  for (const contact of contactList.value) {
    contact.frontend_key = crypto.randomUUID()
    contact.isEdit = false
  }
}

const addNewContact = () => {
  const newContact = {
    id: null,
    info: '',
    type: null,
    relationship: null,
    frontend_key: crypto.randomUUID(),
    isEdit: true
  }
  contactList.value.unshift(newContact)
}

const enableEditContact = (contact) => {
  contact.originalInfo = { ...contact }
  contact.isEdit = true
}

const cancelEditContact = (contact) => {
  if (contact.originalInfo) {
    // In case of editing existing contacts
    contact.info = contact.originalInfo.info
    contact.relationship = contact.originalInfo.relationship
    contact.type = contact.originalInfo.type
    delete contact.originalInfo
    contact.isEdit = false
  } else {
    // In case of cancelling the operation of adding a new contact
    contactList.value.splice(contactList.value.indexOf(contact), 1)
  }
}

const handleBasicAndSacramentsInfoFormSubmit = async () => {
  const basic_data = { ...generalInfoFormData.value.basic }
  const sacraments_data = { ...generalInfoFormData.value.sacraments }

  basic_data.date_of_birth = date.formatDate(
    date.extractDate(basic_data.date_of_birth, 'DD/MM/YYYY', dateLocales),
    'YYYY-MM-DD',
  )

  if (sacraments_data.baptism_date) {
    sacraments_data.baptism_date = date.formatDate(
      date.extractDate(sacraments_data.baptism_date, 'DD/MM/YYYY', dateLocales),
      'YYYY-MM-DD',
    )
  }
  if (sacraments_data.confirmation_date) {
    sacraments_data.confirmation_date = date.formatDate(
      date.extractDate(sacraments_data.confirmation_date, 'DD/MM/YYYY', dateLocales),
      'YYYY-MM-DD',
    )
  }

  await updateStudentInfo(studentDetails.value.basic.code, {
    basic: basic_data,
    sacraments: sacraments_data
  })
}

const handleParentInfoFormSubmit = async () => {
  const parents_data = { ...parentInfoFormData.value }

  await updateStudentInfo(studentDetails.value.basic.code, {
    parents: parents_data
  })
}

const handleAddressFormSubmit = async () => {
  const address_data = { ...addressFormData.value }

  await updateStudentInfo(studentDetails.value.basic.code, {
    address: address_data
  })
}

const handleSaveContact = async (updatedContact) => {
  const contactData = {
    id: updatedContact.id,
    type: updatedContact.type,
    relationship: updatedContact.relationship,
    info: updatedContact.info
  }
  await createOrUpdateContacts(studentDetails.value.basic.code, contactData)
  populateContactList()
}

const handleRemoveContact = async (contact) => {
  const confirmationDialog = $q.dialog({
    title: 'Xóa liên lạc',
    message: `Bạn có chắc muốn xóa thông tin liên lạc này không?`,
    html: true,
    ok: {
      label: 'Đồng ý xóa',
      flat: true,
      color: 'negative',
      icon: 'mdi-delete-outline',
    },
    cancel: {
      label: 'Hủy',
      flat: true,
      color: 'grey-14',
      icon: 'mdi-close',
    },
    focus: 'cancel',
  })
  confirmationDialog.onOk(async () => {
    await deleteContact(studentDetails.value.basic.code, contact.id)
    populateContactList()
  })
}
</script>
