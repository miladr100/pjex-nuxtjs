<template>
  <v-card elevation="3" class="mb-12" outlined>
    <v-form ref="form" class="ml-4 mr-4 mt-4 mb-4" lazy-validation>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-select
            v-model="form.alreadyExport.value"
            :label="form.alreadyExport.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.alreadyExport.placeholder"
            filled
          ></v-select>

          <v-row>
            <v-col cols="12" md="8" sm="7">
              <v-text-field
                v-model="form.timeExporting.value"
                v-mask="'###'"
                :label="form.timeExporting.label"
                :placeholder="form.timeExporting.placeholder"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="5">
              <v-select
                v-model="form.time"
                :items="yearOrMonth"
                :disabled="yesOrNo.length == 0"
                filled
              ></v-select>
            </v-col>
          </v-row>

          <v-select
            v-model="form.frequentlyExporting.value"
            :label="form.frequentlyExporting.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.frequentlyExporting.placeholder"
            filled
          ></v-select>

          <v-text-field
            v-model="form.valueExporting.value"
            v-mask="'R$ ############'"
            :label="form.valueExporting.label"
            :placeholder="form.valueExporting.placeholder"
            filled
          ></v-text-field>

          <v-select
            v-model="form.baseAbroad.value"
            :label="form.baseAbroad.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.baseAbroad.placeholder"
            filled
          ></v-select>

          <v-select
            v-model="form.witchBase.value"
            :label="form.witchBase.label"
            :items="typeOfBase"
            :disabled="!form.baseAbroad.value || form.baseAbroad.value == 'Não'"
            :placeholder="form.witchBase.placeholder"
            filled
          ></v-select>

          <v-text-field
            v-model="form.certification.value"
            :label="form.certification.label"
            :placeholder="form.certification.placeholder"
            filled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-select
            v-model="form.needCertificationAbroad.value"
            :label="form.needCertificationAbroad.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.needCertificationAbroad.placeholder"
            filled
          ></v-select>

          <v-select
            v-model="form.rastreability.value"
            :label="form.rastreability.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.rastreability.placeholder"
            filled
          ></v-select>

          <v-select
            v-model="form.contabilHelp.value"
            :label="form.contabilHelp.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.contabilHelp.placeholder"
            filled
          ></v-select>

          <v-select
            v-model="form.loyalHelp.value"
            :label="form.loyalHelp.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.loyalHelp.placeholder"
            filled
          ></v-select>

          <v-select
            v-model="form.exchange.value"
            :label="form.exchange.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.exchange.placeholder"
            filled
          ></v-select>

          <v-select
            v-model="form.logisticManager.value"
            :label="form.logisticManager.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.logisticManager.placeholder"
            filled
          ></v-select>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="ml-4 mr-4 mt-4 mb-4">
      <v-btn color="primary" :loading="isSubmitting" @click="handleSubmit()">
        Avançar
      </v-btn>
      <v-btn text @click="returnStep()"> Cancelar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'StepThreeForm',
  data() {
    return {
      isSubmitting: false,
      yesOrNo: ['Sim', 'Não'],
      yearOrMonth: ['Anos', 'Meses'],
      typeOfBase: [
        'Escritório',
        'Planta produtiva',
        'Representante comercial',
        'Distribuidor',
        'Loja própria',
      ],
      form: {
        alreadyExport: {
          label: 'Sua empresa já exportou?',
          placeholder: 'Sim / Não',
          value: '',
        },
        timeExporting: {
          label:
            'Há quanto tempo sua empresa exporta seus produtos ou serviços?',
          placeholder: 'Ex: 2 anos',
          value: '',
        },
        time: 'Anos',
        frequentlyExporting: {
          label: 'Sua empresa exporta de forma recorrente?',
          placeholder: 'Sim / Não',
          value: '',
        },
        valueExporting: {
          label:
            'Em média, qual é o valor anual das exportações de sua empresa?',
          placeholder: 'Em reais',
          value: '',
        },
        baseAbroad: {
          label: 'Possui base no exterior?',
          placeholder: 'Sim / Não',
          value: '',
        },
        witchBase: {
          label: 'Qual?',
          placeholder: 'Escolha uma das opções.',
          value: '',
        },
        certification: {
          label: 'Sua empresa possui alguma certificação? Qual?',
          placeholder: 'Escreva as certificações',
          value: '',
        },
        needCertificationAbroad: {
          label:
            'Esta certificação é exigida pelo mercado internacional p/ produto?',
          placeholder: 'Sim / Não',
          value: '',
        },
        rastreability: {
          label: 'Sua empresa segue algum protocolo de rastreabilidade?',
          placeholder: 'Sim / Não',
          value: '',
        },
        contabilHelp: {
          label:
            'Possui assessoria contábil e tributária específico p/ comércio exterior?',
          placeholder: 'Sim / Não',
          value: '',
        },
        loyalHelp: {
          label:
            'Possui assessoria jurídica p/ a elaboração de contratos internacionais?',
          placeholder: 'Sim / Não',
          value: '',
        },
        exchange: {
          label:
            'Efetua o fechamento de câmbio através de um banco/corretora de câmbio?',
          placeholder: 'Sim / Não',
          value: '',
        },
        logisticManager: {
          label:
            'Possui um agente responsável pela Logística e Despacho Aduaneiro?',
          placeholder: 'Sim / Não',
          value: '',
        },
      },
    }
  },
  methods: {
    handleSubmit() {
      // this.$v.$touch()
      // if (this.$v.$invalid) return
      // this.isSubmitting = true
      // this.$store.commit('businessRegistrationAbout', this.getDataToSubmit())
      // console.log(this.$store.state.businessRegistration)
      // this.$store.commit('updateRegistrationStep', 3)
      // this.isSubmitting = false
    },
    returnStep() {
      this.$store.commit('updateRegistrationStep', 2)
    },
  },
}
</script>
