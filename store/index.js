export const state = () => ({
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
    exportation: {},
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
  businessRegistrationAbout: (state, payload) =>
    (state.businessRegistration.about = payload),
  businessRegistrationExportation: (state, payload) =>
    (state.businessRegistration.exportation = payload),
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
