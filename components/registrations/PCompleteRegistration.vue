<template>
  <v-row class="mt-5 mb-5 ml-5 mr-5">
    <v-col>
      <v-card elevation="3" class="mb-12" outlined>
        <v-card-title>Complete seu cadastro</v-card-title>
        <v-card-subtitle
          >Você está próximo de usar todas oportunidades que o Pjex tem a te
          oferecer. Só precisamos de mais algumas informações.</v-card-subtitle
        >
        <v-card-text>
          <v-form ref="form" class="ml-4 mr-4 mt-4 mb-4">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="form.nationality.value"
                  :label="form.nationality.label"
                  :placeholder="form.nationality.placeholder"
                  :error-messages="nationalityErrors"
                  required
                  filled
                ></v-text-field>

                <v-row>
                  <v-col>
                    <v-menu
                      ref="menu"
                      v-model="activePicker"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.birthdate.value"
                          :label="form.birthdate.label"
                          :placeholder="form.birthdate.placeholder"
                          :error-messages="birthdateErrors"
                          readonly
                          filled
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        active-picker.sync="DATE"
                        :max="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        min="1950-01-01"
                        no-title
                        @change="setDatePickerDate($event)"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="form.phone.value"
                      v-mask="'(##) #####-####'"
                      :label="form.phone.label"
                      :placeholder="form.phone.placeholder"
                      :error-messages="phoneErrors"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="form.schoolinfo.value"
                  :label="form.schoolinfo.label"
                  :placeholder="form.schoolinfo.placeholder"
                  :error-messages="schoolinfoErrors"
                  filled
                ></v-text-field>

                <v-text-field
                  v-model="form.languageinfo.value"
                  :label="form.languageinfo.label"
                  :placeholder="form.languageinfo.placeholder"
                  :error-messages="languageinfoErrors"
                  filled
                ></v-text-field>
              </v-col>

              <v-col>
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
                  <v-text-field
                    v-model="form.address.neighborhood.value"
                    :label="form.address.neighborhood.label"
                    :placeholder="form.address.neighborhood.placeholder"
                    :error-messages="neighborhoodErrors"
                    filled
                  ></v-text-field>

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
        </v-card-text>

        <v-card-actions class="mb-4 mr-6">
          <v-row>
            <v-col class="d-flex justify-end">
              <v-btn
                large
                color="primary"
                :loading="isSubmitting"
                @click="handleSubmit()"
              >
                Salvar e continuar
                <v-icon left size="24" class="ml-2"> east </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line prettier/prettier
import { validationMixin } from "vuelidate"
// eslint-disable-next-line prettier/prettier
import { required } from "vuelidate/lib/validators"
import { zipCode, phone } from '~/shared/validators'

export default {
  name: 'PCompleteRegistration',
  mixins: [validationMixin],
  props: {
    allStatesOfBrazil: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        nationality: {
          label: 'Nacionalidade',
          placeholder: 'Ex: Brasileiro',
          value: '',
        },
        birthdate: {
          label: 'Data de nascimento',
          placeholder: 'Ex: 11/08/1997',
          value: '',
        },
        phone: {
          label: 'Celular',
          placeholder: 'Ex: (67) 99999-9999',
          value: '',
        },
        schoolinfo: {
          label: 'Escolaridade',
          placeholder: 'Escolha a escolaridade',
          value: '',
        },
        languageinfo: {
          label: 'Habilidades linguísticas',
          placeholder: 'Ex: inglês, espanhol',
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
          state: {
            label: 'Estado',
            placeholder: 'Escolha o estado',
            value: '',
          },
          city: { label: 'Cidade', placeholder: 'Escolha a cidade', value: '' },
        },
      },
      allStates: [],
      allCities: [],
      activePicker: false,
      isFeatchingAddress: false,
      isSubmitting: false,
    }
  },
  validations() {
    return {
      form: {
        nationality: {
          value: {
            required,
          },
        },
        birthdate: {
          value: {
            required,
          },
        },
        phone: {
          value: {
            required,
            isValid(number) {
              return phone(number)
            },
          },
        },
        schoolinfo: {
          value: {
            required,
          },
        },
        languageinfo: {
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
    nationalityErrors() {
      return this.$v.form.nationality.value.$dirty &&
        !this.$v.form.nationality.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    birthdateErrors() {
      return this.$v.form.birthdate.value.$dirty &&
        !this.$v.form.birthdate.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    phoneErrors() {
      return this.$v.form.phone.value.$dirty &&
        !this.$v.form.phone.value.required
        ? ['Preenchimento obrigatório']
        : this.$v.form.phone.value.$dirty && !this.$v.form.phone.value.isValid
        ? ['Número inválido']
        : []
    },
    schoolinfoErrors() {
      return this.$v.form.schoolinfo.value.$dirty &&
        !this.$v.form.schoolinfo.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    languageinfoErrors() {
      return this.$v.form.schoolinfo.value.$dirty &&
        !this.$v.form.schoolinfo.value.required
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
  },
  mounted() {
    this.allStates = this.formatDataFromIbge(this.allStatesOfBrazil)
  },
  methods: {
    formatDataFromIbge(states) {
      return states.reduce((acc, state) => {
        return [
          ...acc,
          {
            value: state.nome,
            short: state.sigla,
            id: state.id,
          },
        ]
      }, [])
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
    setDatePickerDate(date) {
      const arrDate = date.split('-')
      this.form.birthdate.value = `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`
      this.activePicker = !this.activePicker
    },
    handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.isSubmitting = true
      this.$router.push('/dashboard')
      this.$toast.open({
        message: 'Dados salvos com sucesso!',
        type: 'success',
      })
    },
  },
}
</script>
