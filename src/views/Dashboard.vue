<template>
  <v-app>
    <Navbar :online="user" />
    <Drawer :online="user" />
    <Viewer />
  </v-app>
</template>
<script>
  import Navbar from "../components/Navbar";
  import Drawer from "../components/Drawer";
  import Viewer from "../components/Viewer";
  import axios from "axios";
  import {axiosConfig} from "../main";
  import {mapActions, mapState} from "vuex";

  export default {
    name: "Dashboard",
    components: {
      Navbar,
      Drawer,
      Viewer,
    },
    data() {
      return {
        user: {
          name: "",
          roles: {
            name: "",
          },
          imageProfile: "",
        },
      };
    },
    computed: {
      ...mapState(["usuario"]),
    },
    created() {
      this.detectarUsuario(this.usuario);
      this.obtenerConectado();
    },
    methods: {
      ...mapActions(["detectarUsuario"]),
      async obtenerConectado() {
        const obj = localStorage.getItem("data-codigo");
        try {
          const query = await axios.get(axiosConfig.baseURL + `users/${obj}`);
          this.user = query.data;
        } catch (err) {
          console.log(err);
          console.log(err.response);
        }
      },
    },
  };
</script>
