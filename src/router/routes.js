const routes = [
  {
    path: '/',
    component: () => import('layouts/MainPageLayout.vue'),
    name: 'home',
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/units',
    component: () => import('layouts/HeaderOnlyLayout.vue'),
    children: [
      {
        path: ':unit_code',
        component: () => import('pages/units/UnitStudentList.vue'),
      },
      {
        path: ':unit_code/attendance-check',
        component: () => import('pages/units/UnitAttendanceCheck.vue'),
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
