<template>
<div>
  <h1>Event List</h1>
  <EventCard v-for="event in events" v-bind:key="event.id" :event="event"></EventCard>
</div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService';
export default {
    data(){
      return{
        events:[]
      }
    },
    components: {
        EventCard
    },
    created(){
      EventService.getEvents()
        .then( res => {
          if(res.data.length > 0){
            this.events = res.data
          }
        })
        .catch( err => {
          console.log('ERROR in events request: ',err)
        })
    },
}
</script>

<style>

</style>