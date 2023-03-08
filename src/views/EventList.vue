<template>
  <div>
    <v-progress-linear
      :active="isChangingPage" 
      v-if="isChangingPage" 
      indeterminate 
      location="bottom"
      color="red"
      ></v-progress-linear>
    <div v-if="!isLoading">
      <h1 class="newTitle">Event List for {{ users.user.name }}</h1>
      <EventCard v-for="event in events.events" v-bind:key="event.id" :event="event"></EventCard>
      <div class="text-center">
        <v-pagination
          v-model="currentPage"
          @input="changePage"
          :length="calculatePagination"
          dark
          v-if="!isLoading"
        ></v-pagination>
      </div>
    </div>
    <v-dialog v-model="error.active" :no-click-animation="true">
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
        currentPage: parseInt(this.$route.query.page) || 1,
        isChangingPage: false
      }
    },
    components: {
        EventCard
    },
    computed: {
      ...mapState(['events','users','notifications','isLoading']),
      calculatePagination(){
        if(this.events.lengthEvents % this.perPage >= 1){  
          // 2 options:
          var decimal = (this.events.lengthEvents/this.perPage) - Math.trunc(this.events.lengthEvents/this.perPage)
          // 1 - the part decimal of the division is more than 0,5
          if(decimal >= 0.5){
            return Math.round(this.events.lengthEvents/this.perPage)
          }else{
          // 2 - the part decimal of the division is less than 0,5
            return Math.round(this.events.lengthEvents/this.perPage)+1
          }
        }else if(this.events.lengthEvents % this.perPage === 0){
          return Math.ceil(this.events.lengthEvents/this.perPage)
        }
        return 0
      }
    },
    created(){
      this.$store.dispatch('modifyIsLoading',true)
      this.$store.dispatch('events/fetchEvents', this.currentPage).then(() => {
        if(this.notifications.errorMessage){
          this.error.active = true
          this.error.msg = this.notifications.errorMessage
        }
        this.$store.dispatch('modifyIsLoading',false)
      })
    },
    methods:{
      changePage(currentPage){
        this.isChangingPage = true
        this.$store.dispatch('events/fetchEvents',currentPage).then( ()=>{
            if(this.notifications.errorMessage){
              this.error.active = true
              this.error.msg = this.notifications.errorMessage
            }
            this.isChangingPage = false
          })
      this.$router.push(`/?page=${currentPage}`)
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
}
</style>