import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchView from '../views/SearchView'
import ArtistView from '../views/ArtistView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    name: "SearchView",
    component: SearchView,
  },
  {
    path: '/artist/:id',
    name: "ArtistView",
    component: ArtistView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
