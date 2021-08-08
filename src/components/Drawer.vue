<template>
  <v-navigation-drawer app permanent width="260" class="pt-15">
  <!-- <v-navigation-drawer absolute permanent :mini-variant.sync="mini" width="260" mobile-breakpoint="960" class="pt-15"> -->
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="online.imageProfile"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ online.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip color="primary" class="mx-auto">{{ online.roles.name }}</v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item link to="/dashboard">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Inicio</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="rol == 'Administrador'" link to="/users">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Usuarios</v-list-item-title>
      </v-list-item>
      <v-list-item v-show="false" link>
        <v-list-item-icon>
          <v-icon>mdi-comment-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Publicaciones</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/chat">
        <v-list-item-icon>
          <v-icon>mdi-chat</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Chat</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/profile">
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Configuración</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  import {mapState} from "vuex";
  import axios from "axios";
  import {axiosConfig} from "../main";

  export default {
    name: "Drawer",
    props: {
      online: {
          name: '',
          roles: {
              name: ''
          }
      },
    },
    data(){
      return{
        mini: true,
        rol: '',
      }
    },
    computed: {
      ...mapState(["usuario"])
    },
    created(){
      this.obtenerRol();
    },
    methods: {
      async obtenerRol(){
        let userCod = localStorage.getItem('data-codigo')
        try {
          const query = await axios.get(axiosConfig.baseURL + 'users/'+userCod);
          // console.log(query)
          if(query.status == 200){
            this.rol = query.data.roles.name;
          }
        } catch (err) {
          console.log(err.response)
        }
      }
    }
  };
</script>
