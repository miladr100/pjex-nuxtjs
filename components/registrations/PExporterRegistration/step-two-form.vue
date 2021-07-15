<template>
  <v-card elevation="3" class="mb-12" outlined>
    <v-form ref="form" class="ml-4 mr-4 mt-4 mb-4" lazy-validation>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-text-field
                v-model="form.foundation.value"
                v-mask="'####'"
                :label="form.foundation.label"
                :placeholder="form.foundation.placeholder"
                :error-messages="foundationErrors"
                filled
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="form.employees.value"
                v-mask="'#####'"
                :label="form.employees.label"
                :placeholder="form.employees.placeholder"
                :error-messages="employeesErrors"
                filled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-select
            v-model="form.billing.value"
            :label="form.billing.label"
            :items="billingRange"
            :disabled="billingRange.length == 0"
            :placeholder="form.billing.placeholder"
            :error-messages="billingErrors"
            filled
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="form.sector.value"
            :label="form.sector.label"
            :items="allSectors"
            item-text="value"
            :disabled="allSectors.length == 0"
            :placeholder="form.sector.placeholder"
            :error-messages="sectorErrors"
            filled
          ></v-select>

          <v-select
            v-model="form.subsector.value"
            :label="form.subsector.label"
            :items="allSubsectors"
            :disabled="allSubsectors.length == 0"
            :placeholder="form.subsector.placeholder"
            :error-messages="subsectorErrors"
            filled
          ></v-select>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="ml-4 mr-4 mt-4 mb-4">
      <v-btn color="primary" :loading="isSubmitting" @click="handleSubmit()">
        Avançar
      </v-btn>
      <v-btn text @click="returnStep()"> Voltar </v-btn>
      <v-divider dark></v-divider>
      <v-btn text @click="cancelForm()"> Cancelar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// eslint-disable-next-line prettier/prettier
import { validationMixin } from "vuelidate"
// eslint-disable-next-line prettier/prettier
import { required } from "vuelidate/lib/validators"
// import { removeMask } from '~/shared/helpers'
import { setoresDeAtuacao } from './constants'

export default {
  name: 'StepTwoForm',
  mixins: [validationMixin],
  data() {
    return {
      isSubmitting: false,
      billingRange: [
        'MICRO – Até R$ 433.755,14 ',
        'PEQUENA – De R$ 433.755,14 a R$ 2.133.222,00 ',
        'MÉDIA – De R$ 2.133.222,00 a R$ 10 milhões',
        'GRANDE – acima de 10 milhões',
      ],
      allSectors: [],
      form: {
        foundation: {
          label: 'Ano de fundação',
          placeholder: 'Ex: 2012',
          value: '',
        },
        employees: {
          label: 'Qntd de funcionarios',
          placeholder: 'Ex: 100',
          value: '',
        },
        billing: {
          label: 'Faixa atual de faturamento',
          placeholder: 'Ex: Selecione a faixa ',
          value: '',
        },
        sector: {
          label: 'Setor de atuação',
          placeholder: 'Ex: Alimentos e bebidas',
          value: '',
        },
        subsector: {
          label: 'Sub-setor de atuação',
          placeholder: 'Ex: Açúcar e álcool',
          value: '',
        },
      },
    }
  },
  validations() {
    return {
      form: {
        foundation: {
          value: {
            required,
            isValid: (year) => {
              return year > 1800
            },
          },
        },
        employees: {
          value: {
            required,
          },
        },
        billing: {
          value: {
            required,
          },
        },
        sector: {
          value: {
            required,
          },
        },
        subsector: {
          value: {
            required,
          },
        },
      },
    }
  },
  computed: {
    allSubsectors() {
      const sector = this.allSectors.find(
        (sector) => this.form.sector.value === sector.value
      )
      return sector ? sector.sub : []
    },
    foundationErrors() {
      return this.$v.form.foundation.value.$dirty &&
        !this.$v.form.foundation.value.required
        ? ['Preenchimento obrigatório']
        : this.$v.form.foundation.value.$dirty &&
          !this.$v.form.foundation.value.isValid
        ? ['Ano inválido']
        : []
    },
    employeesErrors() {
      return this.$v.form.employees.value.$dirty &&
        !this.$v.form.employees.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    billingErrors() {
      return this.$v.form.billing.value.$dirty &&
        !this.$v.form.billing.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    sectorErrors() {
      return this.$v.form.sector.value.$dirty &&
        !this.$v.form.sector.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    subsectorErrors() {
      return this.$v.form.subsector.value.$dirty &&
        !this.$v.form.subsector.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
  },
  mounted() {
    this.allSectors = setoresDeAtuacao
  },
  methods: {
    cancelForm() {
      this.$store.commit('updateExporterRegistrationCancelDialog', true)
    },
    returnToForm() {
      this.$store.commit('updateExporterRegistrationCancelDialog', false)
    },
    handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.isSubmitting = true

      this.$store.commit(
        'updateBusinessRegistrationAbout',
        this.getDataToSubmit()
      )
      this.$store.commit('updateRegistrationStep', 3)

      this.isSubmitting = false
    },
    getDataToSubmit() {
      return {
        fundacao: this.form.foundation.value,
        quantidade_funcionarios: this.form.employees.value,
        faixa_faturamento: this.form.billing.value,
        setor_atuacao: this.form.sector.value,
        subsetor_atuacao: this.form.subsector.value,
      }
    },
    returnStep() {
      this.$store.commit('updateRegistrationStep', 1)
    },
  },
}
</script>
