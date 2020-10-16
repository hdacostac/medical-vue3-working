import { createRouter, createWebHistory } from 'vue-router';
import oauthClient from '@/configuration/oauth.config.js';

import SimplestLayout from '../layouts/SimplestLayout.vue';
import MainLayout from '../layouts/MainLayout.vue';

// import Home from '../views/Home.vue';
import PatientForm from '../views/PatientForm.vue';

const routes = [
  {
    path: '/',
    name: 'PatientForm',
    component: PatientForm,
    meta: { layout: MainLayout }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { layout: SimplestLayout }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  oauthClient.checkSecurityConstraint();

  return next();
})

export default router;
