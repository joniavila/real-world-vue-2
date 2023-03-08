<template>
    <v-card>
        <v-card-title
        class="event-card"
        shaped
        >
            <h1>
                Opps ! This Page you are looking for is not there
            </h1>
        </v-card-title>
        <v-card-actions>
            <v-btn
            :x-large="true"
            class="btn-404"
            @click="goHome">
                Go Home
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
methods:{
    goHome(){
        this.$router.push('/')
    }
}
}
</script>

<style>
.event-card {
      padding: 10%;
      margin-bottom: 24px;
      margin-left: 20%;;
      transition: all 0.2s linear;
      cursor: pointer;
      width:80%
    }
.btn-404{
    margin-left: 50%;
}
</style>