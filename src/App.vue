<template>
  <v-app dark :style="{background: $vuetify.theme.themes[theme].background}">
    <v-app-bar app dark fluid  >
      <router-link to="/" class="brand" > Real World Vue Events </router-link>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme">toggle theme</v-btn>
      <v-spacer></v-spacer>
      <NavBar/>
    </v-app-bar>
    <v-main>
      <v-progress-linear
      :active="isLoading" 
      v-if="isLoading" 
      indeterminate 
      location="bottom"
      color="red"
      ></v-progress-linear>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
  }),
  computed:{
    ...mapState(['isLoading']),
    theme(){ 
      return this.$vuetify.theme.defaults.isDark ? 'dark' : 'light'
    }
  },
  methods:{
    toggleTheme: () => {
        this.$vuetify.theme.defaults.isDark = !this.$vuetify.theme.defaults.isDark
      }
  },
};
</script>
<style>
.brand {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 2.5em;
      text-decoration: none;
    }
</style>
