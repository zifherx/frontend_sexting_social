<template>
  <v-container>
    <v-row class="mt-15">
      <v-col cols="12" sm="12" md="12" lg="12">
        <base-material-card icon="mdi-account-multiple" title="Lista Usuarios" color="primary" class="px-3 py-5">
          <v-dialog v-model="dialogActivacion" persistent max-width="500">
            <v-card>
              <v-card-title class="fondoTitulo white--text">Estado de Usuario</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row class="mt-5">
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-select
                        v-model="account.status"
                        label="Estado"
                        outlined
                        rounded
                        prepend-icon="mdi-list-status"
                        :items="itemsActivacion"
                        hide-details
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="closeActivacion">
                  Cancelar
                </v-btn>
                <v-btn color="green darken-1" text @click="activarUsuario">
                  Actualizar Usuario
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-data-table :headers="cabecera" :items="usuarios" :search="search">
            <template v-slot:item.conectado="{item}">
              <v-chip :color="getColor(item.conectado)" dark>
                {{ item.conectado }}
              </v-chip>
            </template>
            <template v-slot:item.status="{item}">
              <v-chip :color="getColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{item}">
              <v-btn small fab :color="colorVisualizacion" dark @click="dialogActivacion = !dialogActivacion">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import axios from "axios";
  import {axiosConfig} from "../../main";

  export default {
    name: "Usuarios",
    data() {
      return {
        cabecera: [
          {text: "Código", value: "codigo", align: "center"},
          {text: "Usuario", value: "usuario", align: "center"},
          {text: "Correo", value: "email", align: "center"},
          {text: "Online", value: "conectado", align: "center"},
          {text: "Estado", value: "status", align: "center"},
          {text: "Acciones", value: "actions", align: "center"},
        ],
        usuarios: [],
        search: "",
        colorVisualizacion: "#D500F9",
        dialogActivacion: false,
        itemsActivacion: ["Activo", "Inactivo"],
        account: {
          status: "",
        },
      };
    },
    watch: {
      dialogActivacion(val) {
        val || this.closeActivacion();
      },
    },
    created() {
      this.inicializar();
    },
    methods: {
      async inicializar() {
        try {
          const query = await axios.get(axiosConfig.baseURL + "users");
          //   console.log(query);
          if (query.status == 200) {
            await query.data.forEach((element) => {
              let obj = {};
              obj.codigo = element._id;
              obj.usuario = element.name;
              obj.email = element.email;
              element.online == 1 ? (obj.conectado = "Online") : (obj.conectado = "Offline");
              //   obj.conectado = element.online;
              if (element.status == true) {
                obj.status = "Activo";
              } else if (element.status == false) {
                obj.status = "Inactivo";
              }
              //   obj.status = element.status;
              this.usuarios.push(obj);
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
      closeActivacion() {
        this.dialogActivacion = false;
      },
      getColor(status) {
        if (status === "Activo") return "green";
        else if (status === "Online") return "green";
        else if (status === "Offline") return "red";
        else return "red";
      },
      async activarUsuario() {
        alert("Usuario Activado");
      },
    },
  };
</script>
<style>
  .fondoTitulo {
    background-color: #e91e63;
  }
</style>
