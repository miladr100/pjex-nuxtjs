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

      <v-stepper-step :complete="step > 3" step="3" complete-icon="done">
        Dados sobre exportação
      </v-stepper-step>

      <v-stepper-content step="3">
        <step-three-form />
      </v-stepper-content>

      <v-stepper-step step="4" complete-icon="done">
        Aceitar termos e submeter formulário
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-row>
          <v-col cols="12" md="7" sm="11" xs="12" class="mt-4 mb-0 pb-0">
            <v-text-field
              v-model="nameOf"
              label="Nome completo de quem preencheu este formulário"
              placeholder="Ex: Marcelo Mariano"
              filled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="7" sm="11" xs="12" class="mt-0 pt-0">
            <v-radio-group v-model="terms" column>
              <v-radio
                :label="termsLabel"
                color="success"
                value="sim"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-start">
            <v-btn color="primary" :loading="submit" @click="submitForm()">
              Salvar dados
            </v-btn>
            <v-btn text @click="returnStep()"> Voltar </v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn text @click="cancelForm()"> Cancelar </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper>

    <div class="text-center">
      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Tem certeza que deseja cancelar?
          </v-card-title>

          <v-card-text class="mt-4">
            Lembre-se que para aproveitar todas as vantagens de nossa
            plataforma, você deve cadastrar sua empresa. <br />
            Se escolher sair, todos os dados do formulário serão perdidos.
          </v-card-text>

          <v-divider dark></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="returnToForm()">
              Continuar
            </v-btn>

            <v-btn color="primary" text @click="returnDashboard()">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import StepOneForm from '~/components/registrations/PExporterRegistration/step-one-form.vue'
import StepTwoForm from '~/components/registrations/PExporterRegistration/step-two-form.vue'
import StepThreeForm from '~/components/registrations/PExporterRegistration/step-three-form.vue'

export default {
  name: 'PExporterRegistration',
  components: {
    'step-one-form': StepOneForm,
    'step-two-form': StepTwoForm,
    'step-three-form': StepThreeForm,
  },
  data() {
    return {
      submit: false,
      nameOf: '',
      terms: '',

      termsLabel:
        'Declaro que os dados fornecidos estão corretos e que estou ciente que estes dados serão utilizados para análise e seleção desta empresa para participar do Programa Jovem Exportador.',
    }
  },
  head: {
    title: 'Cadastro exportador',
  },
  computed: {
    step() {
      return this.$store.state.registrationStep
    },
    dialog() {
      return this.$store.state.exporterRegistrationCancelDialog
    },
  },
  mounted() {
    this.$store.commit('updateRegistrationStep', 1)
    this.$store.commit('updateExporterRegistrationCancelDialog', false)
  },
  methods: {
    cancelForm() {
      this.$store.commit('updateExporterRegistrationCancelDialog', true)
    },
    returnToForm() {
      this.$store.commit('updateExporterRegistrationCancelDialog', false)
    },
    submitForm() {
      if (!this.nameOf) {
        this.$toast.open({
          message: 'Atenção, preencha o seu nome.',
          type: 'warning',
        })
        return
      }

      if (this.terms !== 'sim') {
        this.$toast.open({
          message: 'Atenção, você deve aceitar os termos.',
          type: 'warning',
        })
        return
      }
      this.submit = true

      try {
        setTimeout(() => (this.submit = false), 2000)
        this.$toast.open({
          message: 'Dados da empresa salvos com sucesso!',
          type: 'success',
        })
        this.$store.commit('updateIsCompanyRegistered', true)
        this.returnDashboard()
      } catch (err) {
        this.$toast.open({
          message: 'Erro ao salvar dados da empresa' + err,
          type: 'error',
        })
      }
    },
    returnStep() {
      this.$store.commit('updateRegistrationStep', 3)
    },
    returnDashboard() {
      this.$router.push('/dashboard')
    },
  },
}
</script>

<style scoped></style>
