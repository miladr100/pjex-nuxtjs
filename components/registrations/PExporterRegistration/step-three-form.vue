<template>
  <v-card v-if="!isLoading" elevation="3" class="mb-12" outlined>
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
                :disabled="
                  !form.alreadyExport.value || form.alreadyExport.value == 'Não'
                "
                :placeholder="form.timeExporting.placeholder"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="5">
              <v-select
                v-model="form.time"
                :items="yearOrMonth"
                :disabled="
                  !form.alreadyExport.value || form.alreadyExport.value == 'Não'
                "
                filled
              ></v-select>
            </v-col>
          </v-row>

          <v-select
            v-model="form.frequentlyExporting.value"
            :label="form.frequentlyExporting.label"
            :items="yesOrNo"
            :disabled="
              !form.alreadyExport.value || form.alreadyExport.value == 'Não'
            "
            :placeholder="form.frequentlyExporting.placeholder"
            filled
          ></v-select>

          <v-text-field
            v-model="form.valueExporting.value"
            v-mask="'R$ ############'"
            :label="form.valueExporting.label"
            :disabled="
              !form.alreadyExport.value || form.alreadyExport.value == 'Não'
            "
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

          <v-select
            v-model="form.rastreability.value"
            :label="form.rastreability.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.rastreability.placeholder"
            filled
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-select
            v-model="form.certification.value"
            :label="form.certification.label"
            :items="yesOrNo"
            :disabled="yesOrNo.length == 0"
            :placeholder="form.certification.placeholder"
            filled
          ></v-select>

          <v-text-field
            v-model="form.witchCertification.value"
            :label="form.witchCertification.label"
            :disabled="
              !form.certification.value || form.certification.value == 'Não'
            "
            :placeholder="form.witchCertification.placeholder"
            filled
          ></v-text-field>

          <v-select
            v-model="form.needCertificationAbroad.value"
            :label="form.needCertificationAbroad.label"
            :items="yesOrNo"
            :disabled="
              !form.certification.value || form.certification.value == 'Não'
            "
            :placeholder="form.needCertificationAbroad.placeholder"
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
      <v-btn text @click="returnStep()"> Voltar </v-btn>
      <v-divider dark></v-divider>
      <v-btn text @click="cancelForm()"> Cancelar </v-btn>
    </v-card-actions>
  </v-card>
  <v-row v-else>
    <v-col class="d-flex justify-center mt-12">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
import { removeMask } from '~/shared/helpers'

export default {
  name: 'StepThreeForm',
  data() {
    return {
      isSubmitting: false,
      isLoading: true,
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
          label: 'Que tipo de base?',
          placeholder: 'Escolha uma das opções.',
          value: '',
        },
        rastreability: {
          label: 'Sua empresa segue algum protocolo de rastreabilidade?',
          placeholder: 'Sim / Não',
          value: '',
        },
        certification: {
          label: 'Sua empresa possui alguma certificação?',
          placeholder: 'Sim / Não',
          value: '',
        },
        witchCertification: {
          label: 'Quais certificações?',
          placeholder: 'Escreva as certificações',
          value: '',
        },
        needCertificationAbroad: {
          label:
            'Esta certificação é exigida pelo mercado internacional p/ produto?',
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
  mounted() {
    this.getDataFromStore()
    setTimeout(() => (this.isLoading = false), 1500)
  },
  methods: {
    cancelForm() {
      this.$store.commit('updateExporterRegistrationCancelDialog', true)
    },
    returnToForm() {
      this.$store.commit('updateExporterRegistrationCancelDialog', false)
    },
    getDataFromStore() {
      const exportationInfo =
        this.$store.state.businessRegistration?.exportation_info
      if (exportationInfo) {
        if (
          exportationInfo?.exportador === false ||
          exportationInfo?.exportador === true
        )
          this.form.alreadyExport.value = this.boolYesOrNo(
            exportationInfo?.exportador
          )
        if (exportationInfo?.tempo_exportador) {
          const timeExporting = exportationInfo?.tempo_exportador.split('/')
          this.form.timeExporting.value = timeExporting[0]
          this.form.time = timeExporting[1]
        }
        if (
          exportationInfo?.exportador_recorrente === false ||
          exportationInfo?.exportador_recorrente === true
        )
          this.form.frequentlyExporting.value = this.boolYesOrNo(
            exportationInfo?.exportador_recorrente
          )
        if (exportationInfo?.valor_exportacoes)
          this.form.valueExporting.value = exportationInfo?.valor_exportacoes
        if (
          exportationInfo?.base_exterior === false ||
          exportationInfo?.base_exterior === true
        )
          this.form.baseAbroad.value = this.boolYesOrNo(
            exportationInfo?.base_exterior
          )
        if (exportationInfo?.tipo_base)
          this.form.witchBase.value = exportationInfo?.tipo_base
        if (
          exportationInfo?.protocolo_rastreabilidade === false ||
          exportationInfo?.protocolo_rastreabilidade === true
        )
          this.form.rastreability.value = this.boolYesOrNo(
            exportationInfo?.protocolo_rastreabilidade
          )
        if (
          exportationInfo?.certificacao === false ||
          exportationInfo?.certificacao === true
        )
          this.form.certification.value = this.boolYesOrNo(
            exportationInfo?.certificacao
          )
        if (exportationInfo?.certificacoes)
          this.form.witchCertification.value = exportationInfo?.certificacoes
        if (
          exportationInfo?.certificacao_exigencia_internacional === false ||
          exportationInfo?.certificacao_exigencia_internacional === true
        )
          this.form.needCertificationAbroad.value = this.boolYesOrNo(
            exportationInfo?.certificacao_exigencia_internacional
          )
        if (
          exportationInfo?.acessoria_contabil === false ||
          exportationInfo?.acessoria_contabil === true
        )
          this.form.contabilHelp.value = this.boolYesOrNo(
            exportationInfo?.acessoria_contabil
          )
        if (
          exportationInfo?.acessoria_juridica === false ||
          exportationInfo?.acessoria_juridica === true
        )
          this.form.loyalHelp.value = this.boolYesOrNo(
            exportationInfo?.acessoria_juridica
          )
        if (
          exportationInfo?.fechamento_cambio === false ||
          exportationInfo?.fechamento_cambio === true
        )
          this.form.exchange.value = this.boolYesOrNo(
            exportationInfo?.fechamento_cambio
          )
        if (
          exportationInfo?.agente_aduaneiro === false ||
          exportationInfo?.agente_aduaneiro === true
        )
          this.form.logisticManager.value = this.boolYesOrNo(
            exportationInfo?.agente_aduaneiro
          )
      }
    },
    handleSubmit() {
      this.isSubmitting = true
      this.$store.commit(
        'updateBusinessRegistrationExportationInfo',
        this.getDataToSubmit()
      )
      this.$store.commit('updateRegistrationStep', 4)
      this.isSubmitting = false
    },
    trueOrFase(text) {
      if (!text) return null
      return text === 'Sim'
    },
    boolYesOrNo(bool) {
      return bool ? 'Sim' : 'Não'
    },
    getDataToSubmit() {
      let timeExporting = ''
      if (this.form.timeExporting.value)
        timeExporting = this.form.timeExporting.value + '/' + this.form.time
      return {
        exportador: this.trueOrFase(this.form.alreadyExport.value),
        tempo_exportador: timeExporting,
        exportador_recorrente: this.trueOrFase(
          this.form.frequentlyExporting.value
        ),
        valor_exportacoes: removeMask(this.form.valueExporting.value),
        base_exterior: this.trueOrFase(this.form.baseAbroad.value),
        tipo_base: this.form.witchBase.value,
        protocolo_rastreabilidade: this.trueOrFase(
          this.form.rastreability.value
        ),
        certificacao: this.trueOrFase(this.form.certification.value),
        certificacoes: this.form.witchCertification.value,
        certificacao_exigencia_internacional: this.trueOrFase(
          this.form.needCertificationAbroad.value
        ),
        acessoria_contabil: this.trueOrFase(this.form.contabilHelp.value),
        acessoria_juridica: this.trueOrFase(this.form.loyalHelp.value),
        fechamento_cambio: this.trueOrFase(this.form.exchange.value),
        agente_aduaneiro: this.trueOrFase(this.form.logisticManager.value),
      }
    },
    returnStep() {
      this.$store.commit('updateRegistrationStep', 2)
    },
  },
}
</script>
