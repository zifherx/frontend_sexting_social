<template>
  <v-main>
    <Navbar />
    <Landing/>
  </v-main>
</template>

<script>
  import HelloWorld from "../components/HelloWorld.vue";
  import Navbar from '../components/Navbar.vue'
  import Landing from '../components/Landing.vue'

  export default {
    name: "Home",
  
    components: {
      HelloWorld,
      Navbar,
      Landing
    },
  };
</script>
