<template>
  <v-main>
    <navbar />
    <v-container>
      <v-row class="mt-10">
        <v-flex>
          <base-material-card title="Recupera Cuenta" icon="mdi-account-search" color="primary" class="px-5 py-3 mx-auto" width="600">
            <v-form @submit.prevent="overlay = !overlay">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="account.email" label="Correo Electrónico" prepend-icon="mdi-at" class="mt-5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <v-btn type="button" color="#ECEFF1" to="/login" block>Cancelar</v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <v-btn type="submit" color="primary" block>Buscar</v-btn>
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
  import Navbar from "../components/Navbar.vue";
  export default {
    components: {Navbar},
    name: "ForgotPassword",
    data() {
      return {
        overlay: false,
        showPassword: false,
        account: {user: "", password: ""},
        defaultAccount: {user: "", password: ""},
      };
    },
    watch: {
      overlay(val) {
        val &&
          setTimeout(() => {
            (this.overlay = false), this.iniciarSesion();
          }, 3000);
      },
    },
    methods: {
      async iniciarSesion() {
        alert(`Registrado ${this.account.user}`);
        this.limpiarControles();
      },
      limpiarControles() {
        this.account = Object.assign({}, this.defaultAccount);
      },
    },
  };
</script>
