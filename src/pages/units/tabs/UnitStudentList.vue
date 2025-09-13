<template>
  <div class="">
    <q-list>
      <q-item v-for="contact in contacts" :key="contact.student_code" class="" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.student_code }}</q-item-label>
        </q-item-section>

        <!-- <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section> -->
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
const contacts = [
  {
    name: 'Phêrô Nguyễn Văn A',
    student_code: 'GL2025-HS0001',
    letter: 'A',
  },
  {
    name: 'Gioan Baotixia Nguyễn Hoàng Hải Nam Phong',
    student_code: 'GL2025-HS0002',
    letter: 'P',
  },
  {
    name: 'Maria Madalena Nguyễn Đào Thanh Kim Nhật',
    student_code: 'GL2025-HS0003',
    letter: 'N',
  },
  {
    name: 'Phêrô Nguyễn Văn A',
    student_code: 'GL2025-HS0001',
    letter: 'A',
  },
  {
    name: 'Gioan Baotixia Nguyễn Hoàng Hải Nam Phong',
    student_code: 'GL2025-HS0002',
    letter: 'P',
  },
  {
    name: 'Maria Madalena Nguyễn Đào Thanh Kim Nhật',
    student_code: 'GL2025-HS0003',
    letter: 'N',
  },
  {
    name: 'Phêrô Nguyễn Văn A',
    student_code: 'GL2025-HS0001',
    letter: 'A',
  },
  {
    name: 'Gioan Baotixia Nguyễn Hoàng Hải Nam Phong',
    student_code: 'GL2025-HS0002',
    letter: 'P',
  },
  {
    name: 'Maria Madalena Nguyễn Đào Thanh Kim Nhật',
    student_code: 'GL2025-HS0003',
    letter: 'N',
  },
  {
    name: 'Phêrô Nguyễn Văn A',
    student_code: 'GL2025-HS0001',
    letter: 'A',
  },
  {
    name: 'Gioan Baotixia Nguyễn Hoàng Hải Nam Phong',
    student_code: 'GL2025-HS0002',
    letter: 'P',
  },
  {
    name: 'Maria Madalena Nguyễn Đào Thanh Kim Nhật',
    student_code: 'GL2025-HS0003',
    letter: 'N',
  },
  {
    name: 'Phêrô Nguyễn Văn A',
    student_code: 'GL2025-HS0001',
    letter: 'A',
  },
  {
    name: 'Gioan Baotixia Nguyễn Hoàng Hải Nam Phong',
    student_code: 'GL2025-HS0002',
    letter: 'P',
  },
  {
    name: 'Maria Madalena Nguyễn Đào Thanh Kim Nhật',
    student_code: 'GL2025-HS0003',
    letter: 'N',
  },
  {
    name: 'Phêrô Nguyễn Văn A',
    student_code: 'GL2025-HS0001',
    letter: 'A',
  },
  {
    name: 'Gioan Baotixia Nguyễn Hoàng Hải Nam Phong',
    student_code: 'GL2025-HS0002',
    letter: 'P',
  },
  {
    name: 'Maria Madalena Nguyễn Đào Thanh Kim Nhật',
    student_code: 'GL2025-HS0003',
    letter: 'N',
  },
]
</script>
