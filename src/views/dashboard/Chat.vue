<template>
  <div class="my-5">
    <v-row>
      <v-col cols="12" sm="8" md="8" lg="8">
        <ChatGrupal />
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4">
        <Sidebar />
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import Sidebar from "../../components/Sidebar.vue";
  import ChatGrupal from "../../components/ChatGrupal.vue";

  export default {
    name: "Chat",
    components: {
      Sidebar,
      ChatGrupal,
    },
  };
</script>
<style>
  .fondoTitulo {
    background-color: #e91e63;
  }
</style>
