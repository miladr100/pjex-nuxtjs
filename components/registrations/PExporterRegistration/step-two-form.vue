<template>
  <v-card elevation="3" class="mb-12" outlined>
    <v-form ref="form" class="ml-4 mr-4 mt-4 mb-4" lazy-validation>
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.foundation.value"
            :label="form.foundation.label"
            :placeholder="form.foundation.placeholder"
            :error-messages="foundationErrors"
            filled
          ></v-text-field>

          <v-text-field
            v-model="form.employees.value"
            :label="form.employees.label"
            :placeholder="form.employees.placeholder"
            :error-messages="employeesErrors"
            filled
          ></v-text-field>

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
    </v-card-actions>
  </v-card>
</template>

<script>
// eslint-disable-next-line prettier/prettier
import { validationMixin } from "vuelidate"
// eslint-disable-next-line prettier/prettier
import { required } from "vuelidate/lib/validators"
// import { removeMask } from '~/shared/helpers'

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
      allSubsectors: [],
      form: {
        foundation: {
          label: 'Ano de fundação',
          placeholder: 'Ex: 2012',
          value: '',
        },
        employees: {
          label: 'Nome fantasia',
          placeholder: 'Ex: Caetano desenvolvimento ',
          value: '',
        },
        billing: {
          label: 'Faixa atual de faturamento',
          placeholder: 'Ex: 07.526.557/0001-00 ',
          value: '',
        },
        sector: {
          label: 'Setor de atuação',
          placeholder: 'Ex: alimentos e bebidas',
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
    foundationErrors() {
      return this.$v.form.foundation.value.$dirty &&
        !this.$v.form.foundation.value.required
        ? ['Preenchimento obrigatório']
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
  methods: {
    handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.isSubmitting = true

      // this.$store.commit('updateBusinessRegistration', this.getDataToSubmit())
      this.$store.commit('updateRegistrationStep', 3)

      this.isSubmitting = false
    },
    returnStep() {
      this.$store.commit('updateRegistrationStep', 1)
    },
  },
}
</script>
