import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // List courses
    {
      path: '/courses',
      name: 'courseslist',
      component: () => import('../views/Courses/CoursesList.vue')
    },
    // See courses pasa el id del curso
    {
      path: '/courses/:id',
      name: 'coursedetails',
      component: () => import('../views/Courses/CourseDetail.vue')
    },
      // Edit courses pasa el id del curso
      {
        path: '/courses/:id/edit',
        name: 'courseedit',
        component: () => import('../views/Courses/CourseEdit.vue')
      },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue')
    }
  ]
})

export default router
