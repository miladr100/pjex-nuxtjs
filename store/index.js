export const state = () => ({
  exporterRegistrationCancelDialog: false,

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
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    cnae_fiscal: '',
    zipcode: '',
    neighborhood: '',
    street: '',
    state: '',
    city: '',
    number: '',
    complement: '',
    about: {},
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
  updateBusinessRegistrationAbout: (state, payload) =>
    (state.businessRegistration.about = payload),
  updateBusinessRegistrationExportationInfo: (state, payload) =>
    (state.businessRegistration.exportation_info = payload),
  updateExporterRegistrationCancelDialog: (state, payload) =>
    (state.exporterRegistrationCancelDialog = payload),
  updateIsCompanyRegistered: (state, payload) =>
    (state.userRegistration.is_company_registered = payload),
}

export const actions = {
  async getAndSetUserRegistrationAsync({ commit }) {
    const endpoint = `/users/register/${this.$auth.user.id}`
    const userRegister = await this.$axios.$get(endpoint)
    commit('updateUserRegistration', userRegister)
  },
}

export const getters = {
  isThereUserRegistration: (state) => {
    if (state.userRegistration.birthdate && state.userRegistration.zipcode)
      return true
    return false
  },
}
