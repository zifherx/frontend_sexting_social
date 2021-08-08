<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card elevation="5">
          <v-card-title class="fondoTitulo white--text">Chat Grupal</v-card-title>
          <v-card-text>
            <v-container>
              <div class="fondoChat" id="chat"></div>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <form class="mt-3">
            <v-container>
              <v-row>
                <v-col cols="12" sm="9" md="9" lg="9">
                  <v-text-field v-model="mensaje" label="Mensaje" outlined rounded hide-details></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-btn color="primary" dark rounded x-large>
                    <v-icon left>mdi-send</v-icon>
                    Enviar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: "ChatGrupal",
    data() {
      return {
        mensaje: "",
      };
    },
  };
</script>
<style>
  .fondoChat {
    background-color: #eceff1;
  }
</style>
