<template>
    <router-link class="event-link" :to="{name: 'event-show', params:{ id:`${event.id}`}}">
        <v-card elevation="11" shaped class="event-card" >
          <v-card-title>
            {{ event.title }}
          </v-card-title>
          <v-card-subtitle>
            @{{event.time}} on {{event.date}}
          </v-card-subtitle>
          <v-card-text>
            <BaseIcon name="users">{{event.attendees ? event.attendees.length : 0}} attendees</BaseIcon>
          </v-card-text>
        </v-card>
    </router-link>
</template>

<script>
export default {
    props: {
        event: Object,   
    }
}

</script>

<style scoped>
.event-card {
      padding: 20px;
      margin-bottom: 24px;
      margin-left: 10%;;
      transition: all 0.2s linear;
      cursor: pointer;
      width:80%
    }
    .event-card:hover {
      transform: scale(1.01);
      box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
    }
    .event-card > .title {
      margin: 0;
    }
    
    .event-link {
      color: black;
      text-decoration: none;
      font-weight: 100;
    }
</style>