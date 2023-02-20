<template>
<div>
  <h1 class="newTitle">Event List for {{ user.user.name }}</h1>
  <EventCard v-for="event in events.events" v-bind:key="event.id" :event="event"></EventCard>
  <div class="text-center">
    <v-pagination
      v-model="page"
      @input="changePage"
      :length="Math.ceil(events.lengthEvents/perPage)+1"
      dark
    ></v-pagination>
  </div>

  <v-dialog v-model="error.active" >
          <v-card>
        <v-card-title class="text-h3 red lighten-2">
            ERROR: {{ error.msg }}
        </v-card-title>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="closeDialog" 
          >
            Accept
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
        perPage: 3,
        error: {
        active:false,
        msg: ''
      }
      }
    },
    components: {
        EventCard
    },
    computed: {
      ...mapState(['events','user','notifications']),
      page(){
        return parseInt(this.$route.query.page) || 1
      },
    },
    created(){
      this.$store.dispatch('fetchEvents',{perPage: this.perPage , page: this.page}).then(() => {
        if(this.notifications.errorMessage){
          this.error.active = true
          this.error.msg = this.notifications.errorMessage
        }
      })
    },
    methods:{
      changePage(page){
        this.page = page
        this.$router.push(`/?page=${page}`)
        this.$store.dispatch('fetchEvents',{perPage: this.perPage , page: page})
      },
      closeDialog(){
        this.error.active = false
        this.error.msg = ''
        this.$store.dispatch('notifications/modifyErrorMsg', '', {root:true})
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