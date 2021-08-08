<template>
  <v-app>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Footer
  },
  data: () => ({
    //
  }),
};
</script>
