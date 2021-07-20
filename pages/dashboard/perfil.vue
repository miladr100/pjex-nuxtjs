<template>
  <v-container class="mt-14 mb-4">
    <v-row v-if="!isLoading" justify="center">
      <v-col cols="12" md="8">
        <ui-material-card>
          <template #heading>
            <div class="text-h3 font-weight-light">Editar perfil</div>

            <div class="subtitle-1 font-weight-light">Complete seu perfil</div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="User Name" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Email Address" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="First Name" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Last Name" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Adress" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="City" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Country" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" :loading="isSubmitting">
                    Atualizar perfil
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ui-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <ui-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="text-h5 mb-1 grey--text">CEO / CO-FOUNDER</h6>

            <h4 class="text-h4 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human
              foundation in truth.
            </p>

            <!-- <v-btn color="success" rounded class="mr-0"> Follow </v-btn> -->
          </v-card-text>
        </ui-material-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="d-flex justify-center mt-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line prettier/prettier
import { validationMixin } from "vuelidate"
// eslint-disable-next-line prettier/prettier
import { required } from "vuelidate/lib/validators"
import MaterialCard from '~/components/ui-components/MaterialCard.vue'
import { phone } from '~/shared/validators'
import ibgeUtils from '~/shared/mixins/ibgeUtils.mixin'
// import { removeMask } from '~/shared/helpers'

export default {
  name: 'Perfil',
  components: {
    'ui-material-card': MaterialCard,
  },
  mixins: [validationMixin, ibgeUtils],
  layout: 'logged',
  data() {
    return {
      isLoading: true,
      allStates: [],
      allCities: [],
      activePicker: false,
      isFeatchingAddress: false,
      isSubmitting: false,
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
          number: {
            label: 'Nº',
            placeholder: 'Ex: 84',
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
              // isValid(cep) {
              //   return zipCode(cep)
              // },
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
  async mounted() {
    this.allStates = await this.getAllStatesFormattedAsync()
    await this.getDataFromStoreAsync()
    setTimeout(() => (this.isLoading = false), 200)
  },
  methods: {
    async getDataFromStoreAsync() {
      const userData = this.$store.state.userRegistration
      if (userData?.nationality)
        this.form.nationality.value = userData.nationality
      if (userData?.razao_social) this.form.birthdate.value = userData.birthdate
      if (userData?.phone) this.form.phone.value = userData.phone
      if (userData?.schoolinfo) this.form.schoolinfo.value = userData.schoolinfo
      if (userData?.languageinfo)
        this.form.languageinfo.value = userData.languageinfo

      if (userData?.zipcode) {
        this.form.address.zipcode.value = userData.zipcode
        await this.getAddressDataByZipcodeAsync(userData.zipcode)
        if (userData?.neighborhood)
          this.form.address.neighborhood.value = userData.neighborhood
        if (userData?.street) this.form.address.street.value = userData.street
        if (userData?.state) this.form.address.state.value = userData.state
        if (userData?.city) this.form.address.city.value = userData.city
        if (userData?.number) this.form.address.number.value = userData.number
        if (userData?.complement)
          this.form.address.complement.value = userData.complement
      }
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
    async getAndSetCitiesByStateCodeAsync(stateId) {
      this.allCities = await this.getCitiesByStateCodeFormattedAsync(stateId)
    },
  },
}
</script>
