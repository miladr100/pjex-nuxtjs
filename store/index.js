export default {
  state: {
    users: {
      name: '',
      email: '',
    },
  },
  actions: {},
  mutations: {
    updateUser: (state, payload) => (state.users = payload),
  },
  getters: {},
}
