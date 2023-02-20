<template>
  <div>
    <h1>Event Create </h1>
    <v-container >
        <form @submit.prevent="createNewEvent">
            <h3>Select a category</h3>
            <v-select :items="categories" label="" v-model="event.category"></v-select>
            <h3>Name & describe your event</h3>
            <div class="field">
              <v-text-field label="Title" placeholder="Add an event title" v-model="event.title"></v-text-field>
            </div>
            <div class="field">
              <v-text-field label="Description" placeholder="Add a description" v-model="event.description"></v-text-field>
            </div>
            <h3>Where is your event?</h3>
            <div class="field">
              <v-text-field label="Location" placeholder="Add a location" v-model="event.location"></v-text-field>
            </div>
            <h3>When is your event?</h3>
            <div class="field">
              <v-date-picker v-model="picker" placeholder="Select a date"></v-date-picker>
            </div>
            <div class="field">
              <h3>Select a time</h3>
              <v-select :items="times" label="" v-model="event.time"></v-select>
            </div>
            <v-btn
              block
              color="accent"
              elevation="18"
              x-large
              type="submit"
            >Submit</v-btn>
        </form>
    </v-container>
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
import { mapState } from 'vuex'
export default {
  components:{
  }, 
  data(){
    const times = []
    for(let i=1; i<= 24;i ++){
      times.push(i+':00')
    }
    return{
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      error: {
        active:false,
        msg: ''
      }
    }
  },
  computed:{
    ...mapState(['notifications','user'])
  },
  methods:{
    createFreshEventObject(){
      const user = this.user.user
      const id = Math.floor(Math.random() * 100000)
      return {
        id:id,
        user:user,
        category:'',
        organizer:'',
        title:'',
        description:'',
        location:'',
        date:'',
        time:'',
        attendess: []
      }
    },
    createNewEvent(){

      this.$store.dispatch('addEvent', this.event).then( () => {
        if(!this.notifications.errorMessage){
          this.createFreshEventObject()
          this.$router.push({
            name:'event-show',
            params: {
              id: `${this.event.id}`
            }
          })
        }else{
          this.error.active = true
          this.error.msg = this.notifications.errorMessage
        }
      })
      
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
  .field {
    margin-bottom: 24px;
  }
</style>