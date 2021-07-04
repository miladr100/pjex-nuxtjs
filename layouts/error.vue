<template>
  <v-app dark>
    <v-card elevation="0">
      <v-row v-if="loadingNextScreen" class="mt-12 mb-4">
        <v-col class="d-flex justify-center align-center mt-16">
          <v-progress-circular
            class="mt-16"
            indeterminate
            :size="80"
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <div v-else>
        <v-row class="mt-12 mb-4">
          <v-col justify="center" align="center">
            <v-img :src="theLogo" max-width="300"> </v-img>
          </v-col>
        </v-row>
        <v-row class="mt-12 mb-4">
          <v-col justify="center" align="center">
            <v-card-title
              v-if="error.statusCode === 404"
              class="justify-center"
              >{{ pageNotFound }}</v-card-title
            >
            <v-card-title v-else class="justify-center">{{
              otherError
            }}</v-card-title>
            <v-card-subtitle class="mt-4">
              <v-btn color="primary" @click="goHome()">
                Voltar para o início
                <v-icon left size="24" class="ml-2"> east </v-icon>
              </v-btn>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1> -->
  </v-app>
</template>

<script>
import pjexLogo from '~/static/img/logo_programa.png'

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loadingNextScreen: true,
      theLogo: pjexLogo,
      pageNotFound: 'Ohh! Nos desculpe, mas essa página não existe :(',
      otherError: 'Oh Ohh! Mil perdões, ocorreu um erro desconhecido x(',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  mounted() {
    setTimeout(() => (this.loadingNextScreen = false), 2000)
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
