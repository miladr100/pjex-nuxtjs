export const state = () => ({
  users: {
    name: '',
    email: '',
  },
})

export const mutations = {
  updateUser: (state, payload) => (state.users = payload),
}
