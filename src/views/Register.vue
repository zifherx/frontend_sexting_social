<template>
  <v-main>
    <navbar />
    <v-container>
      <v-row class="mt-10">
        <v-flex>
          <base-material-card title="Registrar" icon="mdi-account-plus" color="primary" class="px-5 py-3 mx-auto" width="500">
            <!-- <v-form @submit.prevent="overlay = !overlay"> -->
            <v-form @submit.prevent="createAccount(account)">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-text-field v-model="account.name" label="Nombre" hide-details prepend-icon="mdi-account" class="mt-5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-text-field v-model="account.email" label="Correo Electrónico" hide-details prepend-icon="mdi-account-circle"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-text-field
                    v-model="account.password"
                    label="Contraseña"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-text-field v-show="false" v-model="account.birthday" label="Fecha de Nacimiento" hide-details prepend-icon="mdi-calendar"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-text-field v-show="false" v-model="account.gender" label="Género" hide-details prepend-icon="mdi-gender-male-female"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12" sm="12" md="5" lg="5">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="12" sm="12" md="3" lg="3">
                  <v-btn type="button" color="#ECEFF1" to="/login" block>Cancelar</v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="3" lg="3">
                  <v-btn type="submit" color="primary" block>Registrarse</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </base-material-card>
        </v-flex>
      </v-row>
    </v-container>

    <v-overlay :value="overlay">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary" size="128"></v-progress-circular>
      </div>
    </v-overlay>
  </v-main>
</template>
<script>
import { mapActions } from 'vuex';
  import Navbar from "../components/Navbar.vue";
  export default {
    components: {Navbar},
    name: "Register",
    data() {
      return {
        overlay: false,
        showPassword: false,
        account: {name: "",email: '', password: ""},
        defaultAccount: {name: "",email: '', password: ""},
      };
    },
    watch: {
      overlay(val) {
        val &&
          setTimeout(() => {
            (this.overlay = false);
          }, 3000);
      },
    },
    methods: {
      ...mapActions(['createAccount']),
      limpiarControles() {
        this.account = Object.assign({}, this.defaultAccount);
      },
    },
  };
</script>
