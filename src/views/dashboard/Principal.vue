<template>
  <div class="my-5">
    <v-row>
      <v-col cols="12" sm="8" md="8" lg="8">
        <Posts />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4">
        <Sidebar />
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import Posts from "../../components/Posts.vue";
  import Sidebar from "../../components/Sidebar.vue";
  export default {
    name: "Principal",
    components: {
      Posts,
      Sidebar,
    },
  };
</script>