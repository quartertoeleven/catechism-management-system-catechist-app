const routes = [
  {
    path: '/',
    component: () => import('layouts/MainPageLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/units',
    component: () => import('layouts/HeaderOnlyLayout.vue'),
    children: [
      {
        path: ':unit_code',
        component: () => import('pages/units/UnitStudentList.vue'),
        name: 'unit_details',
      },
      {
        path: ':unit_code/attendance-check',
        component: () => import('pages/units/UnitAttendanceCheck.vue'),
        name: 'unit_attendance_check',
      },
    ],
  },

  {
    path: '/settings',
    component: () => import('layouts/HeaderOnlyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/settings/SettingIndex.vue'), name: 'settings' },
      { path: 'about', component: () => import('pages/settings/AboutPage.vue'), name: 'about' },
      {
        path: 'change-password',
        component: () => import('pages/settings/ChangePasswordPage.vue'),
        name: 'changePassword',
      },
    ],
  },

  {
    path: '/login',
    component: () => import('pages/auth/LoginPage.vue'),
    name: 'login',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
