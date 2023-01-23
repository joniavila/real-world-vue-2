<template>
    <router-link class="event-list" :to="{name: 'event-show', params:{ id:'1'}}">
        <div class="event-card -shadow">
            <span class="eyebrow">@{{event.time}} on {{event.date}}</span>
            <h4 class="title">{{ title }}</h4>
            <span>{{event.attendees.length}} attendees</span>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return{
            event:{
                id: 1,
                title: 'ALALALA',
                date: 'Mon Jan 23 , 2023',
                time: '18:00',
                attendees:[
                    {id: 123, name:'Jonas Avila'},
                    {id: 456, name:'Franco Avila'}
                ]
            }
        }
    }
}
</script>

<style>
.event-card {
      padding: 20px;
      margin-bottom: 24px;
      transition: all 0.2s linear;
      cursor: pointer;
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