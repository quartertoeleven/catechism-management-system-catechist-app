const routes = [
  {
    path: '/',
    component: () => import('layouts/MainPageLayout.vue'),
    name: 'home',
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'units',
        component: () => import('pages/units/UnitList.vue'),
      },
      {
        path: 'units/:unit_code',
        component: () => import('pages/units/UnitDetails.vue'),
        children: [
          { path: '', component: () => import('pages/units/tabs/UnitInfo.vue') },
          { path: 'students', component: () => import('pages/units/tabs/UnitStudentList.vue') },
          {
            path: 'attendance-check',
            component: () => import('pages/units/tabs/UnitAttendanceCheck.vue'),
          },
        ],
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
