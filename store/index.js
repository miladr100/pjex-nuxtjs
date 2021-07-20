export const state = () => ({
  exporterRegistrationCancelDialog: false,
  isCompanyRegistered: false,
  isUserRegistered: false,

  userRegistration: {
    nationality: '',
    birthdate: '',
    phone: '',
    schoolinfo: '',
    languageinfo: '',
    zipcode: '',
    neighborhood: '',
    street: '',
    state: '',
    city: '',
    number: '',
    complement: '',
    is_company_registered: false,
  },

  businessRegistration: {
    company_info: {
      cnpj: '',
      razao_social: '',
      nome_fantasia: '',
      cnae_fiscal: '',
      porte: '',
      zipcode: '',
      neighborhood: '',
      street: '',
      state: '',
      city: '',
      number: '',
      complement: '',
    },
    about_company: {},
    exportation_info: {},
  },

  registrationStep: 0,
})

export const mutations = {
  updateUserRegistration: (state, payload) =>
    (state.userRegistration = payload),
  updateRegistrationStep: (state, payload) =>
    (state.registrationStep = payload),
  updateBusinessRegistration: (state, payload) =>
    (state.businessRegistration = payload),
  updateBusinessRegistrationCompany: (state, payload) =>
    (state.businessRegistration.company_info = payload),
  updateBusinessRegistrationAbout: (state, payload) =>
    (state.businessRegistration.about_company = payload),
  updateBusinessRegistrationExportationInfo: (state, payload) =>
    (state.businessRegistration.exportation_info = payload),
  updateExporterRegistrationCancelDialog: (state, payload) =>
    (state.exporterRegistrationCancelDialog = payload),
  updateIsCompanyRegistered: (state, payload) =>
    (state.isCompanyRegistered = payload),
  updateIsUserRegistered: (state, payload) =>
    (state.isUserRegistered = payload),
}

export const actions = {
  async getAndSetUserRegistrationAsync({ commit }) {
    const endpoint = `/users/register/${this.$auth.user.id}`
    const userRegister = await this.$axios.$get(endpoint)
    commit('updateUserRegistration', userRegister)
  },
  resetAllStore({ commit }) {
    commit('updateUserRegistration', {})
    commit('updateBusinessRegistration', {
      company_info: {},
      about_company: {},
      exportation_info: {},
    })
  },
}

export const getters = {
  isThereUserRegistration: (state) => {
    return state.isUserRegistered
  },

  isThereCompanyRegistration: (state) => {
    if (this?.$auth?.user?.company_registration) return true
    return false
  },
}
