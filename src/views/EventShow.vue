<template>
    <v-container>
      <v-card>
        <v-card-title class="title">{{ event.title }}</v-card-title>
        <v-card-subtitle class="eyebrow">@{{ event.time }} on {{ event.date }}</v-card-subtitle>
        <v-card-title>Organized by {{ event.organizer ? event.organizer.name : '' }}</v-card-title>
        <v-card-title>Category: {{ event.category }}</v-card-title>
        <v-card-title><BaseIcon name="map"></BaseIcon>Location</v-card-title>
        <v-card-subtitle>{{ event.location }}</v-card-subtitle>
        <v-card-title>Event details</v-card-title>
        <v-card-text>{{ event.description }}</v-card-text>
        <v-card-title class="badge -fill-gradient">Attendees {{event.attendees ? event.attendees.length : 0}}</v-card-title>
        <ul class="list-group">
          <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
            <v-card-subtitle>{{ attendee.name }}</v-card-subtitle>
          </li>
        </ul>
      </v-card>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
      id: String
    },
    created(){
      this.$store.dispatch('fetchEvent', this.id)
    },
    computed: mapState({
      event: state => state.events.event
    })
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>