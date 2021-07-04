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
})

export const mutations = {
  updateUserRegistration: (state, payload) =>
    (state.userRegistration = payload),
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
