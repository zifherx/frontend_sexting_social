<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card elevation="5">
          <v-card-title class="fondoTitulo white--text">Conectados</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-subheader>Amigos</v-subheader>
              <v-list-item v-for="(online, i) in onlines" :key="i">
                <v-list-item-avatar>
                  <v-img :src="online.imageProfile"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="online.name"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon :color="online.online == 1 ? 'green accent-4' : 'grey'">
                    mdi-circle-medium
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import Swal from "sweetalert2";
  import axios from "axios";
  import {axiosConfig} from "../main";

  export default {
    name: "Sidebar",
    data() {
      return {
        onlines: [],
      };
    },
    created() {
      this.obtenerUsuariosConectados();
    },
    methods: {
      async obtenerUsuariosConectados() {
        try {
          const query = await axios.get(axiosConfig.baseURL + "users");
          // console.log(query);
          if (query.status == 200) {
            await query.data.forEach((element) => {
              let obj = {};
              obj.name = element.name;
              obj.imageProfile = element.imageProfile;
              obj.online = element.online;
              obj.status = element.status;
              this.onlines.push(obj);
            });
          }
        } catch (err) {
          console.log(err.response);
        }
      },
    },
  };
</script>
<style>
  .fondoTitulo {
    background-color: #e91e63;
  }
</style>
