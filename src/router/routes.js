const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { 
        path: 'units',
        component: () => import('pages/units/UnitList.vue'),
      },
      { path: 'units/:id', component: () => import('pages/units/UnitDetails.vue') }
    ],
  },

  {
    path: '/login',
    component: () => import('pages/auth/LoginPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
