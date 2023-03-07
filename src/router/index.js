import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventCreate from '@/views/EventCreate.vue';
import NProgress from 'nprogress';
import store from '@/store/index.js';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow, 
    props:true,
    beforeEnter(routeTo, routeFrom,next) {
      store.dispatch('events/fetchEvent', routeTo.params.id).then( (response) => {
        routeTo.params.event = response
        next()
      })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  }
]

const router = new VueRouter({
  routes,
  mode:"history"
})

router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})

router.afterEach( ()=> {
  NProgress.done()
})

export default router
