<template>
  <q-tabs v-model="currentTab" inline-label align="full">
    <q-tab name="basic" icon="mdi-information" label="Lý lịch" />
    <q-tab name="parent" icon="mdi-human-male-female-child" label="Phụ huynh" />
    <q-tab name="contact" icon="mdi-contacts" label="Liên lạc" />
    <q-tab name="result" icon="mdi-school" label="Học tập" />
  </q-tabs>

  <q-tab-panels
    v-model="currentTab"
    animated
    swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-tab-panel name="basic">
      <div class="text-h4 q-mb-md">BASIC</div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
        odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
        culpa fuga nulla ullam. In, libero.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
        odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
        culpa fuga nulla ullam. In, libero.
      </p>
    </q-tab-panel>

    <q-tab-panel name="parent">
      <div class="text-h4 q-mb-md">PARENT</div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
        odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
        culpa fuga nulla ullam. In, libero.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
        odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
        culpa fuga nulla ullam. In, libero.
      </p>
    </q-tab-panel>

    <q-tab-panel name="contact">
      <div class="text-h4 q-mb-md">CONTACT</div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
        odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
        culpa fuga nulla ullam. In, libero.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
        odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
        culpa fuga nulla ullam. In, libero.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
        odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
        culpa fuga nulla ullam. In, libero.
      </p>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { useAppStore } from 'stores/app-store'
import { onMounted, ref } from 'vue'

const currentTab = ref('basic')

const appStore = useAppStore()
// const router = useRouter()

const { setPageSubtitle, setPageTitle } = appStore

onMounted(() => {
  setPageTitle('Thông tin học viên')
  setPageSubtitle('')
})
</script>
