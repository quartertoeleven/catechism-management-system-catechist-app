<template>
  <q-dialog v-model="dialogOpen" class="full-width">
    <q-card class="full-width">
      <q-card-section class="q-mx-md row items-center q-pb-none">
        <div class="text-h5 text-weight-regular text-center full-width">Thông tin học viên</div>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Mã học viên</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ studentInfo.code }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Tên thánh</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ studentInfo.saint_name || '(chưa có Tên Thánh)' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Họ tên</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ studentInfo.full_name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Giới tính</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ studentInfo.gender === 'male' ? 'Nam' : 'Nữ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Lớp hiện tại</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ studentInfo.current_unit?.name || '(chưa xếp lớp)' }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <q-separator />
      </q-card-section>

      <q-card-section class="q-mx-md q-gutter-y-md">
        <div class="text-subtitle2 text-center full-width q-mt-none">Thao tác nhanh</div>
        <q-btn
          icon="mdi-information"
          class="full-width"
          outline
          color="primary"
          label="Xem thông tin học viên"
          :to="`/students/${studentInfo.code}`"
        />
        <q-btn
          class="full-width"
          outline
          color="positive"
          icon="mdi-check-circle-outline"
          label="Điểm danh học viên"
          v-if="studentInfo.current_unit"
          :to="`/units/${studentInfo.current_unit?.code}/attendance-check?student_prefill=${studentInfo.code}`"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQrQuickActionStore } from 'src/stores/qr-quick-action-store'

const qrQuickActionStore = useQrQuickActionStore()
const { studentInfo } = storeToRefs(qrQuickActionStore)

const dialogOpen = ref(false)

const open = () => {
  dialogOpen.value = true
}

defineExpose({
  open,
})
</script>
