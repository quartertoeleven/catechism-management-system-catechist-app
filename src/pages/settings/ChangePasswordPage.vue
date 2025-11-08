<template>
  <div class="q-pa-md q-gutter-y-md">
    <q-card bordered class="text-body2 shadow-0 bg-grey-1">
      <q-card-section class="text-body2">
        <p><b>Yêu cầu cho mật khẩu mới</b></p>
        <q-list dense class="q-pb-md">
          <q-item
            v-for="rule in passwordRules"
            :key="rule.message"
            :class="rule.valid ? 'text-positive' : 'text-negative'"
          >
            <q-item-section side>
              <q-icon
                size="sm"
                :name="rule.valid ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
                :color="rule.valid ? 'positive' : 'negative'"
              />
            </q-item-section>
            <q-item-section>
              {{ rule.message }}
            </q-item-section>
          </q-item>
        </q-list>
        <p>Bạn sẽ cần đăng nhập lại với mật khẩu mới sau khi đổi mật khẩu thành công.</p>
      </q-card-section>
    </q-card>

    <q-form class="q-gutter-y-md" @submit.prevent="onChangePasswordFormSubmit">
      <q-input
        v-model="changePasswordFormData.currentPassword"
        class="full-width"
        outlined
        label="Mật khẩu hiện tại"
        type="password"
      />
      <q-input
        v-model="changePasswordFormData.newPassword"
        class="full-width"
        outlined
        label="Mật khẩu mới"
        type="password"
        @update:model-value="checkPasswordStrength()"
      />
      <q-input
        v-model="changePasswordFormData.confirmPassword"
        class="full-width"
        outlined
        label="Xác nhận mật khẩu mới"
        type="password"
      />
      <div class="">
        <q-btn
          class="full-width"
          type="submit"
          color="primary"
          label="Đổi mật khẩu"
          no-caps
          :disable="passwordRules.every((rule) => !rule.valid)"
          icon="mdi-lock-reset"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useAppStore } from 'src/stores/app-store'
import { useAuthStore } from 'src/stores/auth-store'
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()
const { setPageTitle, setNavigateBackPath } = appStore
const { changePassword } = authStore

const changePasswordFormData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const passwordRules = ref([
  {
    message: 'Tối thiểu 8 kí tự, tối đa 32 kí tự',
    valid: false,
    validateRule: (value) => value.length >= 8 && value.length <= 32,
  },
  {
    message: 'Ít nhất 3 trong các nhóm sau: chữ hoa, chữ thường, số và kí tự đặc biệt',
    valid: false,
    validateRule: (value) => {
      const patterns = [/(?=.*[a-z])/g, /(?=.*[A-Z])/g, /(?=.*[0-9])/g, /(?=.*[^A-Za-z0-9])/g]
      let numberOfValidCheck = 0
      for (const pattern of patterns) {
        if (pattern.test(value)) {
          numberOfValidCheck++
        }
      }
      return numberOfValidCheck >= 3
    },
  },
])

onMounted(() => {
  setPageTitle('Đổi mật khẩu')
  setNavigateBackPath('/settings')
})

onUnmounted(() => {
  setNavigateBackPath(null)
})

const checkPasswordStrength = () => {
  passwordRules.value.forEach((rule) => {
    rule.valid = rule.validateRule(changePasswordFormData.value.newPassword)
  })
}

const onChangePasswordFormSubmit = async () => {
  const { newPassword, confirmPassword } = changePasswordFormData.value
  if (confirmPassword !== newPassword) {
    $q.notify({
      type: 'negative',
      message: 'Xác nhận mật khẩu phải trùng với mật khẩu mới',
      position: 'top-right',
      group: false,
      timeout: 4000,
      progress: true,
      icon: 'mdi-alert',
    })
    return
  }
  await changePassword(
    changePasswordFormData.value.currentPassword,
    changePasswordFormData.value.newPassword,
    changePasswordFormData.value.confirmPassword,
  )
  await router.replace({ name: 'login' })
}
</script>
