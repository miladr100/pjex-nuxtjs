<template>
  <v-app>
    <v-row class="mt-6 mb-4">
      <v-col justify="center" align="center">
        <v-img :src="require('~/static/img/logo_programa.png')" max-width="300">
        </v-img>
      </v-col>
    </v-row>
    <v-card-title class="ml-2">Cadastro do Exportador</v-card-title>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1" complete-icon="done">
        Dados da empresa
        <!-- <small>Preencha os campos abaixo com os dados da sua empresa.</small> -->
      </v-stepper-step>

      <v-stepper-content step="1">
        <step-one-form />
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2" complete-icon="done">
        Dados sobre empresa
        <!-- <small>Preencha os campos abaixo com sobre a empresa.</small> -->
      </v-stepper-step>

      <v-stepper-content step="2">
        <step-two-form />
      </v-stepper-content>

      <!-- <v-stepper-step :complete="step > 3" step="3" complete-icon="done">
        Select an ad format and name ad unit
      </v-stepper-step>

      <v-stepper-content step="3">
        <step-three-form />
        <v-btn color="primary" @click="step = 4"> Continue </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step step="4" complete-icon="done">
        View setup instructions
      </v-stepper-step>
      <v-stepper-content step="4">
        <step-three-form />
        <v-btn color="primary" @click="step = 1"> Continue </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content> -->
    </v-stepper>
  </v-app>
</template>

<script>
import StepOneForm from '~/components/registrations/PExporterRegistration/step-one-form.vue'
import StepTwoForm from '~/components/registrations/PExporterRegistration/step-two-form.vue'
// import StepThreeForm from '~/components/registrations/PExporterRegistration/step-three-form.vue'

export default {
  name: 'PExporterRegistration',
  components: {
    'step-one-form': StepOneForm,
    'step-two-form': StepTwoForm,
    // 'step-three-form': StepThreeForm,
  },
  data() {
    return {
      submit: false,
    }
  },
  head: {
    title: 'Cadastro exportador',
  },
  computed: {
    step() {
      return this.$store.state.registrationStep
    },
  },
  mounted() {
    this.$store.commit('updateRegistrationStep', 1)
  },
  methods: {
    submitForm() {
      this.submit = true
    },
  },
}
</script>

<style scoped></style>
