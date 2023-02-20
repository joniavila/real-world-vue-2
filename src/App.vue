<template>
  <v-app>
    <v-app-bar app dark fluid>
      <router-link to="/" class="brand" > Real World Vue Events </router-link>
      <v-spacer></v-spacer>
      <NavBar/>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
    //
  }),
};
</script>
<style>
.brand {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 2.5em;
      color: #39b982;
      text-decoration: none;
    }
</style>
