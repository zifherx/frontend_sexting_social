<template>
  <v-container>
    <v-row class="mt-15">
      <v-col cols="12" sm="12" md="9" lg="9">
        <base-material-card icon="mdi-account" title="Perfil" class="px-3 py-5" color="primary">
          <div class="mt-5">
            <v-dialog v-model="dialogDatos" persistent max-width="500">
              <v-card>
                <v-card-title>Actualizando Perfil</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <v-text-field
                          class="centered-input text--darken-3"
                          v-model="profile.name"
                          label="Nombre"
                          outlined
                          rounded
                          prepend-icon="mdi-account"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <v-text-field
                          class="centered-input text--darken-3"
                          v-model="profile.username"
                          label="Nombre de Usuario"
                          outlined
                          rounded
                          prepend-icon="mdi-tag"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <v-text-field
                          class="centered-input text--darken-3"
                          v-model="profile.email"
                          label="Email"
                          outlined
                          rounded
                          prepend-icon="mdi-at"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <v-textarea
                          v-model="profile.description"
                          label="Descripción"
                          outlined
                          rounded
                          rows="1"
                          auto-grow
                          prepend-icon="mdi-image-text"
                          hide-details
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <v-file-input
                          v-model="image"
                          accept="image/png, image/jpeg, image/bmp"
                          label="Foto Perfil"
                          prepend-icon="mdi-paperclip"
                          placeholder="Selecciona una imagen"
                          outlined
                          rounded
                          hide-details
                          show-size
                          :rules="imageRule"
                        >
                          <template v-slot:selection="{text}">
                            <v-chip small label color="primary">
                              {{ text }}
                            </v-chip>
                          </template>
                        </v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="closeDatos">
                    Cancelar
                  </v-btn>
                  <v-btn color="green darken-1" text @click="actualizarPerfil">
                    Actualizar Perfil
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogClave" persistent max-width="500">
              <v-card>
                <v-card-title>Cambiando Contraseña</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form enctype="multipart/form-data">
                      <v-row>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <v-text-field
                            v-model="admin.clave"
                            label="Contraseña Actual"
                            :type="showPassword ? 'text' : 'password'"
                            prepend-icon="mdi-lock"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                            color="#C51162"
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <v-text-field
                            v-model="admin.nuevaClave"
                            label="Nueva Contraseña"
                            :type="showPassword2 ? 'text' : 'password'"
                            prepend-icon="mdi-lock"
                            :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword2 = !showPassword2"
                            color="#C51162"
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <v-text-field
                            v-model="admin.reNuevaClave"
                            label="Repite Nueva Contraseña"
                            :type="showPassword3 ? 'text' : 'password'"
                            prepend-icon="mdi-lock"
                            :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword3 = !showPassword3"
                            color="#C51162"
                            hide-details
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="closeClave">
                    Cancelar
                  </v-btn>
                  <v-btn color="green darken-1" text @click="cambiarClave">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-container>
              <v-row class="text-center">
                <v-col cols="12" sm="6" md="4" lg="4">
                  <v-text-field
                    class="centered-input text--darken-3"
                    v-model="account.name"
                    label="Nombre"
                    readonly
                    outlined
                    rounded
                    prepend-icon="mdi-account-tie"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <v-text-field
                    class="centered-input text--darken-3"
                    v-model="account.username"
                    label="Nombre de Usuario"
                    readonly
                    outlined
                    rounded
                    prepend-icon="mdi-account-box"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <v-text-field
                    class="centered-input text--darken-3"
                    v-model="account.email"
                    label="Email"
                    readonly
                    outlined
                    rounded
                    prepend-icon="mdi-at"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <v-text-field
                    class="centered-input text--darken-3"
                    v-model="account.roles.name"
                    label="Rol"
                    readonly
                    outlined
                    rounded
                    prepend-icon="mdi-tag"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="8" lg="8">
                  <v-text-field
                    class="centered-input text--darken-3"
                    v-model="account.titleImage"
                    label="Código Cloudinary"
                    readonly
                    outlined
                    rounded
                    prepend-icon="mdi-image"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-textarea
                    v-model="account.description"
                    label="Descripción"
                    auto-grow
                    rows="1"
                    readonly
                    outlined
                    rounded
                    prepend-icon="mdi-image-text"
                    hide-details
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="4">
                  <v-btn color="primary" dark rounded elevation="5" @click="dialogClave = !dialogClave">
                    <v-icon left>mdi-lock-reset</v-icon>
                    Cambiar Contraseña
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="4">
                  <v-btn color="#1A237E" dark rounded elevation="5" @click="dialogDatos = !dialogDatos">
                    <v-icon left>mdi-account-edit</v-icon>
                    Actualizar Perfil
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="4">
                  <v-btn color="#C62828" dark rounded elevation="5" @click="eliminarCuenta">
                    <v-icon left>mdi-account-remove</v-icon>
                    Eliminar Cuenta
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </base-material-card>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3">
        <base-material-card class="v-card-profile" :avatar="account.imageProfile">
          <v-card-text class="text-center">
            <h3 class="gg font-weight-light mb-1 black--text">
              {{ account.name }}
            </h3>
            <h6 class="display-1 mb-5 grey--text">
              <v-chip color="primary">{{ account.roles.name }}</v-chip>
            </h6>
            <p class="font-weight-light grey--text text-justify">
              {{ account.description }}
            </p>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import axios from "axios";
  import {mapActions, mapState} from "vuex";
  import {axiosConfig} from "../../main";
  import Swal from "sweetalert2";

  export default {
    name: "Perfil",
    data() {
      return {
        //Cabecera
        config: {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("data-token"),
          },
        },
        account: {
          name: "",
          username: "",
          email: "",
          roles: {name: ""},
          titleImage: "",
          imageProfile: "",
          description: "",
        },
        image: null,
        profile: {
          name: "",
          username: "",
          email: "",
          description: ""
        },
        admin: {
          clave: "",
          nuevaClave: "",
          reNuevaClave: "",
        },
        defaultAdmin: {
          clave: "",
          nuevaClave: "",
          reNuevaClave: "",
        },
        dialogDatos: false,
        dialogClave: false,
        showPassword: false,
        showPassword2: false,
        showPassword3: false,
        imageRule: [(value) => !value || value.size < 2000000 || "Avatar size should be less than 2 MB!"],
      };
    },
    watch: {
      dialogDatos(val) {
        val || this.closeDatos();
      },
      dialogClave(val) {
        val || this.closeClave();
      },
    },
    computed: {
      ...mapState(["usuario"]),
    },
    created() {
      this.cargarPerfil();
    },
    methods: {
      ...mapActions(["cerrarSesion", "detectarUsuario"]),

      async cargarPerfil() {
        try {
          const query = await axios.get(axiosConfig.baseURL + "users/" + this.usuario.codigo, this.config);
          // console.log(query)
          if (query.status == 200) {
            this.account = query.data;
            this.profile.name = query.data.name;
            this.profile.username = query.data.username;
            this.profile.email = query.data.email;
            this.profile.description = query.data.description;
          }
        } catch (err) {
          console.log(err.response);
        }
      },
      closeDatos() {
        this.dialogDatos = false;
      },

      closeClave() {
        this.admin = Object.assign({}, this.defaultAdmin);
        this.dialogClave = false;
      },

      async eliminarCuenta() {
        const {value: password} = await Swal.fire({
          title: "Ingresa tu Contraseña Actual",
          input: "password",
          inputLabel: "Contraseña",
          inputPlaceholder: "Contraseña",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#546E7A",
          confirmButtonText: "Eliminar Cuenta",
          confirmButtonColor: "#D50000",
          inputAttributes: {
            maxlength: 10,
            autocapitalize: "off",
            autocorrect: "off",
          },
        });

        if (password) {
          let obj = {
            nowPassword: password,
          };
          Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir el proceso.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, elimínalo!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const query = await axios.post(axiosConfig.baseURL + "auth/delete-account", obj, this.config);
                // console.log(query);
                if (query.status == 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Eliminado!",
                    text: "Tu cuenta ha sido eliminada",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                  this.logout();
                  //   console.log(this.usuario)
                  this.detectarUsuario(null);
                  //   console.log(this.usuario)
                  this.$router.push("/login");
                }
              } catch (err) {
                console.log(err.response);
                const errores = this.catchErrorMessage(err.response);
                this.responseAlert(errores);
              }
            }
          });
        }
      },

      async actualizarPerfil() {
        let config = {
          headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
          },
        };
        const formData = new FormData();
        let user = this.usuario.codigo;
        this.profile.image = this.image;
        this.profile.userId = user;

        formData.append("image", this.image);
        formData.append("name", this.profile.name);
        formData.append("username", this.profile.username);
        formData.append("userId", this.profile.userId);
        formData.append("email", this.profile.email);
        formData.append("description", this.profile.description);

        // console.log(formData)

        try {
          const query = await axios.patch(axiosConfig.baseURL + "users/update-profile", formData, config);
            // console.log(query);
          if (query.status == 200) {
            Swal.fire({
              icon: "success",
              title: "Actualizado!",
              text: query.data.message,
              showConfirmButton: false,
              timer: 2500,
            });
            this.cargarPerfil();
            this.closeDatos();
          }
        } catch (err) {
          console.log(err.response);
          const errores = this.catchErrorMessage(err.response);
          this.responseAlert(errores);
        }
      },

      async cambiarClave() {
        if (this.validarContraseñaVacios()) {
          if (this.admin.nuevaClave != this.admin.reNuevaClave) {
            Swal.fire({
              icon: "error",
              title: "No Coinciden",
              text: "Las nuevas contraseñas no coinciden",
              allowEscapeKey: true,
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            let objeto = {};
            objeto.oldPassword = this.admin.clave;
            objeto.newPassword = this.admin.nuevaClave;
            try {
              const query = await axios.post(axiosConfig.baseURL + "auth/change-password", objeto, this.config);
              if (query.status == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Cambio Exitoso!",
                  text: query.data.message,
                  allowOutsideClick: false,
                  showConfirmButton: false,
                  timer: 2500,
                });
                this.closeClave();
              }
            } catch (err) {
              console.log(err.response);
              const errores = this.catchErrorMessage(err.response);
              this.responseAlert(errores);
            }
          }
        }
      },

      validarContraseñaVacios() {
        let mensaje = [];

        if (this.admin.clave == "") {
          mensaje.push(" Contraseña Anterior");
        }

        if (this.admin.nuevaClave == "") {
          mensaje.push(" Nueva Contraseña");
        }

        if (this.admin.reNuevaClave == "") {
          mensaje.push(" Repite Nueva Contraseña");
        }

        if (mensaje.length > 0) {
          Swal.fire({
            icon: "warning",
            title: "Campos Requeridos",
            text: `${mensaje}`,
            allowOutsideClick: false,
            allowEscapeKey: true,
            showConfirmButton: true,
          });
          return false;
        } else {
          return true;
        }
      },

      catchErrorMessage(parametro) {
        let objeto = {};
        switch (parametro.status) {
          case 401:
            objeto.titulo = "Datos Erróneos";
            objeto.mensaje = parametro.data.message;
            break;
          case 403:
            objeto.titulo = "No Autorizado";
            objeto.mensaje = parametro.data.message;
            break;
          case 404:
            objeto.titulo = "No Existe";
            objeto.mensaje = parametro.data.message;
            break;
          case 500:
            objeto.titulo = "Error Servidor";
            objeto.mensaje = parametro.data.message;
            break;
          default:
            objeto.titulo = "Error";
            objeto.mensaje = parametro.data.message;
            break;
        }
        return objeto;
      },

      responseAlert(objeto) {
        Swal.fire({
          icon: "error",
          title: `${objeto.titulo}`,
          text: `${objeto.mensaje}`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 2000,
        });
      },

      logout() {
        localStorage.removeItem("data-token");
        localStorage.removeItem("data-codigo");
      },
    },
  };
</script>
<style scoped>
  .centered-input >>> input {
    text-align: center;
    font-size: 16px;
  }
  .gg{
    font-size: 30px;
  }
</style>
