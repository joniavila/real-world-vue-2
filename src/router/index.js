import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventCreate from '@/views/EventCreate.vue';
import NotFoundPage from '@/views/NotFoundPage.vue'
import store from '@/store';
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
    beforeEnter(routeTo, routeFrom,next){
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
  },
  {
    path:'/404',
    name: '404',
    component: NotFoundPage
  },
  {
    path:'*',
    redirect: {
      name: '404'
    }
  }
]
const router = new VueRouter({
  routes,
  mode:"history"
})

router.beforeEach((routeTo, routeFrom, next) => {
  store.dispatch('modifyIsLoading',true)
  console.log('se ejecuta')
  next()
})

router.afterEach(() => {
  store.dispatch('modifyIsLoading',false)
})



export default router
