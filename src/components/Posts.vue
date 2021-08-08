<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card>
          <v-card-title class="tituloPost white--text">Sexting Social</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="2" md="2" lg="2">
                <v-avatar size="80">
                  <v-img :src="usuario.imageProfile"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="10" md="10" lg="10">
                <v-textarea
                  v-model="post.texto"
                  rounded
                  outlined
                  prepend-icon="mdi-comment-multiple"
                  auto-grow
                  rows="1"
                  label="Publicación"
                  hide-details
                >
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-btn dark block color="primary" rounded>
                  <v-icon left>mdi-image</v-icon>
                  Foto/Video
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-btn dark block color="accent" rounded @click="subirPost">
                  <v-icon left>mdi-publish</v-icon>
                  Publicar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-for="(post, i) in posts" :key="i" cols="12" sm="12" md="12" lg="12">
        <v-card elevation="5" rounded>
          <v-card-title class="tituloPost white--text">
            {{ post.user.name }}
            <v-spacer></v-spacer>
            <v-btn dark color="#283593" v-show="false">
              <v-icon left>mdi-delete</v-icon>
              Eliminar
            </v-btn>
            </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-textarea
              outlined
              rounded
              prepend-icon="mdi-comment-multiple"
              label="Publicación"
              v-model="post.texto"
              auto-grow
              rows="1"
              hide-details
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn dark color="primary">
              <v-icon left>mdi-thumb-up</v-icon>
              Me gusta
            </v-btn>
            <v-spacer></v-spacer>
            <p>
              <v-icon color="primary">mdi-thumb-up</v-icon>
              0
            </p>
            <p class="mx-2">
              <v-icon color="primary">mdi-eye</v-icon>
              0
            </p>
            <p>
              <v-icon color="primary">mdi-clock</v-icon>
              {{ post.fecha }}
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import Swal from "sweetalert2";
  import axios from "axios";
  import {axiosConfig} from "../main";
  import dayjs from "dayjs";
  var relativeTime = require("dayjs/plugin/relativeTime");
  require("dayjs/locale/es");
  // import 'dayjs/locale/de' // ES 2015

  dayjs.locale("es"); // use locale globally
  dayjs.extend(relativeTime);

  export default {
    name: "Posts",
    data() {
      return {
        //Cabecera
        config: {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("data-token"),
          },
        },
        posts: [],
        usuario: {},
        post: {
          texto: "",
        },
      };
    },
    created() {
      this.cargarPosts();
      this.cargarUsuario();
    },
    methods: {
      async cargarUsuario() {
        try {
          let codUser = localStorage.getItem("data-codigo");
          const query = await axios.get(axiosConfig.baseURL + "users/" + codUser);
          //   console.log(query);
          this.usuario = query.data;
        } catch (err) {
          console.log(err.response);
        }
      },
      async cargarPosts() {
        try {
          const query = await axios.get(axiosConfig.baseURL + "posts");
          // console.log(query);
          await query.data.forEach((element) => {
            let obj = {};
            obj.user = element.user;
            obj.texto = element.texto;
            obj.fecha = this.calcularFecha(element.fechaCreacion);
            // console.log(obj);
            this.posts.push(obj);
          });
        } catch (err) {
          console.log(err.response);
        }
      },
      async subirPost() {
        if (this.post.texto.length !== 0) {
          let obj = {};
          obj.user = this.usuario.email;
          obj.texto = this.post.texto;
          //   console.log(obj);
          try {
            const query = await axios.post(axiosConfig.baseURL + "posts", obj, this.config);
            // console.log(query);
            if (query.status == 200) {
              Swal.fire({
                icon: "success",
                title: "Post Publicado",
                text: query.data.message,
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2000,
              });
              let cantidad = this.posts.length;
              // console.log(cantidad)
              this.posts.splice(this.posts,cantidad)
              // console.log(this.posts)
              this.cargarPosts();
            }
          } catch (err) {
            console.log(err.response);
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: "Campos Vacíos",
            text: "Debe ingresar valores en la publicación",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
      calcularFecha(a) {
        let fecha = JSON.stringify(a).substr(1, 10);
        // console.log(fecha);
        return dayjs(a)
          .startOf("minute")
          .fromNow();
      },
    },
  };
</script>
<style>
  .tituloPost {
    background-color: #e91e63;
  }
</style>
