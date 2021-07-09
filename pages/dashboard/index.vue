<template>
  <v-row>
    <v-card>
      <v-card-title>Bem vindo a plataforma do Jovem Exportador</v-card-title>
    </v-card>

    <div class="text-center">
      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Cadastre sua empresa
          </v-card-title>

          <v-card-text class="mt-4">
            Para aproveitar todas as vantagens de nossa plataforma, você deve
            escolher uma das categorias e cadastrar sua empresa.
          </v-card-text>

          <v-card-text>
            <v-select
              v-model="businessRegister"
              :items="bussinesType"
              label="Eu sou..."
              :error-messages="bussinesTypeErrors"
              filled
            ></v-select>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="registerBusiness">
              Cadastrar empresa
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-row>
</template>

<script>
// eslint-disable-next-line prettier/prettier
import { validationMixin } from "vuelidate"
// eslint-disable-next-line prettier/prettier
import { required } from "vuelidate/lib/validators"

export default {
  components: {},
  mixins: [validationMixin],
  layout: 'logged',
  data() {
    return {
      businessRegister: '',
      bussinesType: ['exportador'],
      dialog: true,
    }
  },
  validations() {
    return {
      businessRegister: {
        required,
      },
    }
  },
  computed: {
    bussinesTypeErrors() {
      return this.$v.businessRegister.$dirty &&
        !this.$v.businessRegister.required
        ? ['Preenchimento obrigatório']
        : []
    },
  },
  methods: {
    registerBusiness() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.$router.push('/registration/exporter')
    },
  },
}
</script>
