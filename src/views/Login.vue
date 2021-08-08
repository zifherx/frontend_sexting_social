<template>
  <v-main>
    <Navbar />
    <v-container>
      <v-row class="mt-10">
        <v-flex>
          <base-material-card color="primary" title="Login" icon="mdi-login" class="px-5 py-3 mx-auto" width="400">
            <v-form @submit.prevent="iniciarSesion(account)">
              <v-text-field v-model="account.email" label="Correo Electrónico" prepend-icon="mdi-account-circle" class="mt-5"></v-text-field>
              <v-text-field
                v-model="account.password"
                label="Contraseña"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-btn type="submit" color="primary" block>Login</v-btn>
              <a href="/forgot-password">
                <p class="text-center mt-5">¿Olvidaste tu contraseña?</p>
              </a>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" sm="12" md="6" class="mx-auto">
                <v-btn block dark color="#1A237E" to="/register">Crear cuenta</v-btn>
              </v-col>
            </v-form>
          </base-material-card>
        </v-flex>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
  import Navbar from "../components/Navbar";
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "Login",
    components: {Navbar},
    data() {
      return {
        showPassword: false,
        account: {email: "", password: ""},
        defaultAccount: {email: "", password: ""},
      };
    },
    methods: {
      ...mapActions(['iniciarSesion']),
      limpiarControles() {
        this.account = Object.assign({}, this.defaultAccount);
      },
    },
  };
</script>
