<template>
  <v-app-bar app color="primary" dark>
    <v-btn plain to="/">
      <v-img :src="require('../assets/sexting.svg')" contain class="shrink mr-2" alt="Sexting Social" transition="scale-transition" width="40" />
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="!usuario" color="#ffffff" plain to="/register">Registrese</v-btn>
    <v-btn v-if="!usuario" color="#ffffff" plain to="/login">Iniciar Sesión</v-btn>
    <v-btn v-if="usuario" color="#ffffff" plain to="/profile">{{ online.name }}</v-btn>
    <v-menu v-if="usuario" offset-y>
      <template v-slot:activator="{on, attrs}">
        <v-btn v-if="usuario" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link to="/profile">
          <v-list-item-icon>
            <v-icon fab color="primary">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="cerrarSesion()">
          <v-list-item-icon>
            <v-icon fab color="primary">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
  import {mapActions, mapState} from "vuex";
  export default {
    name: "DashboardNavbar",
    props: {
      online: {}
    },
    computed: {
      ...mapState(["usuario"]),
    },
    methods: {
      ...mapActions(["cerrarSesion"]),
    },
  };
</script>
