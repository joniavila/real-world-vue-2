<template>
  <div>
    <div v-if="!isLoading">
      <h1 class="newTitle">Event List for {{ users.user.name }}</h1>
      <EventCard v-for="event in events.events" v-bind:key="event.id" :event="event"></EventCard>
      <div class="text-center">
        <v-pagination
          v-model="page"
          @input="changePage"
          :length="Math.ceil(events.lengthEvents/perPage)+1"
          dark
          v-if="!isLoading"
        ></v-pagination>
      </div>
    </div>
    <v-progress-linear
    :active="isLoading" v-if="isLoading" indeterminate location="bottom">
    </v-progress-linear>
    <v-dialog v-model="error.active" >
          <v-card>
        <v-card-title class="text-h3 red lighten-2">
            ERROR: {{ error.msg }}
        </v-card-title>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="closeDialogAndRetry" 
          >
            Retry
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
    data(){
      return{
        perPage:3,
        error: {
        active:false,
        msg: ''},
        isLoading: true
      }
    },
    components: {
        EventCard
    },
    computed: {
      ...mapState(['events','users','notifications']),
      page(){
        return parseInt(this.$route.query.page) || 1
      },
    },
    created(){
      this.$store.dispatch('events/fetchEvents', this.page).then(() => {
        if(this.notifications.errorMessage){
          this.error.active = true
          this.error.msg = this.notifications.errorMessage
        }
        this.isLoading= false
      })
    },
    methods:{
      changePage(page){
        this.isLoading=true
        this.page = page
        this.$router.push(`/?page=${page}`)
        this.$store.dispatch('events/fetchEvents',page).then( ()=>{
          if(this.notifications.errorMessage){
          this.error.active = true
          this.error.msg = this.notifications.errorMessage
        }
        this.isLoading= false
        })
      },
      closeDialogAndRetry(){
        this.error.active = false
        this.error.msg = ''
        this.$store.dispatch('notifications/modifyErrorMsg', '', {root:true})
        this.changePage(1)
      }
    }
}
</script>

<style>
.newTitle {
  margin:24px;
  margin-left:40%;
  font-size: 2.5em;
  color: #39b982;
}
</style>