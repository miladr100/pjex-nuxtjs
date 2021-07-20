<template>
  <v-card v-if="!isLoading" elevation="3" class="mb-12" outlined>
    <v-form ref="form" class="ml-4 mr-4 mt-4 mb-4" lazy-validation>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="form.cnpj.value"
            v-mask="'##.###.###/####-##'"
            :label="form.cnpj.label"
            :placeholder="form.cnpj.placeholder"
            :error-messages="cnpjErrors"
            filled
          ></v-text-field>

          <div v-if="!idFetchingBusiness">
            <v-text-field
              v-model="form.name.value"
              :label="form.name.label"
              class="mt-md-3"
              :placeholder="form.name.placeholder"
              :error-messages="nameErrors"
              filled
            ></v-text-field>

            <v-text-field
              v-model="form.nick.value"
              :label="form.nick.label"
              :placeholder="form.nick.placeholder"
              :error-messages="nickErrors"
              filled
            ></v-text-field>

            <v-text-field
              v-model="form.cnae.value"
              :label="form.cnae.label"
              :placeholder="form.cnae.placeholder"
              :error-messages="cnaeErrors"
              filled
            ></v-text-field>

            <v-select
              v-model="form.porte.value"
              :label="form.porte.label"
              :items="businessTypes"
              :disabled="businessTypes.length == 0"
              :placeholder="form.porte.placeholder"
              :error-messages="porteErrors"
              filled
            ></v-select>
          </div>
          <v-row v-else>
            <v-col class="d-flex justify-center mt-12">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-row>
            <v-col cols="12" md="7">
              <v-text-field
                v-model="form.address.zipcode.value"
                v-mask="'#####-###'"
                :label="form.address.zipcode.label"
                :placeholder="form.address.zipcode.placeholder"
                :error-messages="zipcodeErrors"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-btn
                block
                large
                outlined
                min-height="56"
                color="primary"
                target="_blank"
                link
                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              >
                <v-icon left size="24" class="mr-2">
                  not_listed_location
                </v-icon>
                Não sei meu cep
              </v-btn>
            </v-col>
          </v-row>

          <div v-if="!isFeatchingAddress">
            <v-row>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="form.address.neighborhood.value"
                  :label="form.address.neighborhood.label"
                  :placeholder="form.address.neighborhood.placeholder"
                  :error-messages="neighborhoodErrors"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.address.number.value"
                  :label="form.address.number.label"
                  :placeholder="form.address.number.placeholder"
                  filled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="form.address.street.value"
              :label="form.address.street.label"
              :placeholder="form.address.street.placeholder"
              :error-messages="streetErrors"
              filled
            ></v-text-field>

            <v-row>
              <v-col>
                <v-select
                  v-model="form.address.state.value"
                  :items="allStates"
                  item-text="value"
                  :disabled="allStates.length == 0"
                  :label="form.address.state.label"
                  :placeholder="form.address.state.placeholder"
                  :error-messages="stateErrors"
                  filled
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="form.address.city.value"
                  :label="form.address.city.label"
                  :items="allCities"
                  :disabled="allCities.length == 0"
                  item-text="value"
                  :placeholder="form.address.city.placeholder"
                  :error-messages="cityErrors"
                  filled
                ></v-select>
              </v-col>
            </v-row>

            <v-text-field
              v-model="form.address.complement.value"
              :label="form.address.complement.label"
              :placeholder="form.address.complement.placeholder"
              filled
            ></v-text-field>
          </div>
          <v-row v-else>
            <v-col class="d-flex justify-center mt-12">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="ml-4 mr-4 mt-4 mb-4">
      <v-btn color="primary" :loading="isSubmitting" @click="handleSubmit()">
        Avançar
      </v-btn>
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
// eslint-disable-next-line prettier/prettier
import { validationMixin } from "vuelidate"
// eslint-disable-next-line prettier/prettier
import { required } from "vuelidate/lib/validators"
import ibgeUtils from '~/shared/mixins/ibgeUtils.mixin'
import { zipCode } from '~/shared/validators'
import { removeMask } from '~/shared/helpers'

export default {
  name: 'StepOneForm',
  mixins: [validationMixin, ibgeUtils],
  data() {
    return {
      valid: false,
      isLoading: true,
      isFeatchingAddress: false,
      idFetchingBusiness: false,
      isSubmitting: false,
      allStates: [],
      allCities: [],
      businessTypes: [
        'Microempreendedor Individual (MEI)',
        'Microempresa (ME)',
        'Empresa de Pequeno Porte (EPP)',
        'Empresa de Médio Porte',
        'Grande Empresa',
      ],
      form: {
        name: {
          label: 'Razão social',
          placeholder: 'Ex: Caetano e Barreto Desenvolvimentos LTDA',
          value: '',
        },
        nick: {
          label: 'Nome fantasia',
          placeholder: 'Ex: Caetano desenvolvimento ',
          value: '',
        },
        cnpj: {
          label: 'CNPJ da empresa',
          placeholder: 'Ex: 07.526.557/0001-00 ',
          value: '',
        },
        cnae: {
          label: 'CNAE principal',
          placeholder: 'Ex: 6203-1/00',
          value: '',
        },
        porte: {
          label: 'Porte da empresa',
          placeholder: 'Escolha a escolaridade',
          value: '',
        },
        address: {
          zipcode: { label: 'CEP', placeholder: 'Ex: 79000-000', value: '' },
          neighborhood: {
            label: 'Bairro',
            placeholder: 'Ex: Bairro do instituto jovem',
            value: '',
          },
          street: {
            label: 'Logradouro',
            placeholder: 'Ex: Rua Maria Izabel',
            value: '',
          },
          number: {
            label: 'Nº',
            placeholder: 'Ex: 84',
            value: '',
          },
          complement: {
            label: 'Complemento',
            placeholder: 'Ex: Ao lado da loja X',
            value: '',
          },
          state: {
            label: 'Estado',
            placeholder: 'Escolha o estado',
            value: '',
          },
          city: { label: 'Cidade', placeholder: 'Escolha a cidade', value: '' },
        },
      },
    }
  },
  validations() {
    return {
      form: {
        name: {
          value: {
            required,
          },
        },
        nick: {
          value: {
            required,
          },
        },
        cnpj: {
          value: {
            required,
          },
        },
        cnae: {
          value: {
            required,
          },
        },
        porte: {
          value: {
            required,
          },
        },
        address: {
          zipcode: {
            value: {
              required,
              isValid(cep) {
                return zipCode(cep)
              },
            },
          },
          neighborhood: {
            value: {
              required,
            },
          },
          street: {
            value: {
              required,
            },
          },
          state: {
            value: {
              required,
            },
          },
          city: {
            value: {
              required,
            },
          },
        },
      },
    }
  },
  computed: {
    nameErrors() {
      return this.$v.form.name.value.$dirty && !this.$v.form.name.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    nickErrors() {
      return this.$v.form.nick.value.$dirty && !this.$v.form.nick.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    cnpjErrors() {
      return this.$v.form.cnpj.value.$dirty && !this.$v.form.cnpj.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    cnaeErrors() {
      return this.$v.form.cnae.value.$dirty && !this.$v.form.cnae.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    porteErrors() {
      return this.$v.form.porte.value.$dirty &&
        !this.$v.form.porte.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    zipcodeErrors() {
      return this.$v.form.address.zipcode.value.$dirty &&
        !this.$v.form.address.zipcode.value.required
        ? ['Preenchimento obrigatório']
        : this.$v.form.address.zipcode.value.$dirty &&
          !this.$v.form.address.zipcode.value.isValid
        ? ['CEP inválido']
        : []
    },
    neighborhoodErrors() {
      return this.$v.form.address.neighborhood.value.$dirty &&
        !this.$v.form.address.neighborhood.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    streetErrors() {
      return this.$v.form.address.street.value.$dirty &&
        !this.$v.form.address.street.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    stateErrors() {
      return this.$v.form.address.state.value.$dirty &&
        !this.$v.form.address.state.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    cityErrors() {
      return this.$v.form.address.city.value.$dirty &&
        !this.$v.form.address.city.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
  },
  watch: {
    'form.address.state.value'(paylod) {
      if (paylod) {
        const chosenState = this.allStates.find(
          (state) => state.value === paylod
        )
        this.getAndSetCitiesByStateCodeAsync(chosenState.id)
      }
    },
    'form.address.zipcode.value'(paylod) {
      if (paylod.length > 8) this.getAddressDataByZipcodeAsync(paylod)
    },
    'form.cnpj.value'(paylod) {
      if (paylod.length === 14) this.setBusinesInfoAsync()
    },
  },
  async mounted() {
    this.allStates = await this.getAllStatesFormattedAsync()
    await this.getDataFromStoreAsync()
    setTimeout(() => (this.isLoading = false), 300)
  },
  methods: {
    cancelForm() {
      this.$store.commit('updateExporterRegistrationCancelDialog', true)
    },
    returnToForm() {
      this.$store.commit('updateExporterRegistrationCancelDialog', false)
    },
    async getDataFromStoreAsync() {
      const businessData = this.$store.state.businessRegistration?.company_info
      if (businessData?.cnpj) this.form.cnpj.value = businessData.cnpj
      if (businessData?.razao_social)
        this.form.name.value = businessData.razao_social
      if (businessData?.nome_fantasia)
        this.form.nick.value = businessData.nome_fantasia
      if (businessData?.cnae_fiscal)
        this.form.cnae.value = businessData.cnae_fiscal
      if (businessData?.porte) this.form.porte.value = businessData.porte
      this.idFetchingBusiness = false
      if (businessData?.zipcode) {
        this.form.address.zipcode.value = businessData.zipcode
        await this.getAddressDataByZipcodeAsync(businessData.zipcode)
        if (businessData?.neighborhood)
          this.form.address.neighborhood.value = businessData.neighborhood
        if (businessData?.street)
          this.form.address.street.value = businessData.street
        if (businessData?.state)
          this.form.address.state.value = businessData.state
        if (businessData?.city) this.form.address.city.value = businessData.city
        if (businessData?.number)
          this.form.address.number.value = businessData.number
        if (businessData?.complement)
          this.form.address.complement.value = businessData.complement
      }
    },
    async getAndSetCitiesByStateCodeAsync(stateId) {
      const { data } = await this.$axios.get(
        `${process.env.ibgeApi}localidades/estados/${stateId}/municipios`
      )
      this.allCities = this.formatDataFromIbge(data)
    },
    async getAddressDataByZipcodeAsync(cep) {
      this.isFeatchingAddress = true
      try {
        const { data } = await this.$axios.get(
          `${process.env.brasilApi}cep/v1/${cep}s`
        )
        this.setAddressData(data)
      } catch (err) {
        console.error(err)
      } finally {
        this.isFeatchingAddress = false
      }
    },
    setAddressData(data) {
      const chosenState = this.allStates.find(
        (state) => state.short === data.state
      )
      this.form.address.state.value = chosenState.value
      this.form.address.city.value = data.city
      this.form.address.street.value = data.street
      this.form.address.neighborhood.value = data.neighborhood
    },
    async setBusinesInfoAsync() {
      this.idFetchingBusiness = true
      const infos = await this.getBusinessByCnpj(
        removeMask(this.form.cnpj.value)
      )
      if (infos.razao_social) this.form.name.value = infos.razao_social
      if (infos.nome_fantasia) this.form.nick.value = infos.nome_fantasia
      if (infos.cnae_fiscal) this.form.cnae.value = infos.cnae_fiscal
      this.idFetchingBusiness = false
      if (infos.cep) {
        this.form.address.zipcode.value = infos.cep
        this.getAddressDataByZipcodeAsync(infos.cep)
      }
    },
    handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.isSubmitting = true

      this.$store.commit(
        'updateBusinessRegistrationCompany',
        this.getDataToSubmit()
      )
      this.$store.commit('updateRegistrationStep', 2)

      this.isSubmitting = false
    },
    getDataToSubmit() {
      return {
        cnpj: removeMask(this.form.cnpj.value),
        razao_social: this.form.name.value,
        nome_fantasia: this.form.nick.value,
        cnae_fiscal: this.form.cnae.value,
        porte: this.form.porte.value,
        zipcode: removeMask(this.form.address.zipcode.value),
        neighborhood: this.form.address.neighborhood.value,
        street: this.form.address.street.value,
        state: this.form.address.state.value,
        city: this.form.address.city.value,
        number: this.form.address.number.value,
        complement: this.form.address.complement.value,
      }
    },
  },
}
</script>
