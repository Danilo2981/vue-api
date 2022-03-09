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
    // Edit courses pasa el id del curso
    {
      path: '/courses/:id',
      name: 'coursedetails',
      component: () => import('../views/Courses/CourseDetail.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
