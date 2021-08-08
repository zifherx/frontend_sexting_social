<template>
  <v-container>
    <v-card rounded="" elevation="1" class="my-10" max-height="550">
      <v-row justify="center" align="center" class="ml-5">
        <v-col cols="12" sm="12" md="12" lg="12">
          <iframe
            width="1080"
            height="520"
            src="https://www.youtube.com/embed/AcsF570HHy8?controls=0&amp;start=16"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    name: "Landing",
  };
</script>
