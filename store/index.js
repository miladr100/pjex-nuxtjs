export const state = () => ({
  users: {
    name: '',
    email: '',
  },
  toast: {
    message: '',
    type: 'success',
    show: false,
  },
})

export const mutations = {
  updateUser: (state, payload) => (state.users = payload),
  updateToastMessage: (state, payload) => (state.toast.message = payload),
  updateToastType: (state, payload) => (state.toast.type = payload),
  updateToastShow: (state, payload) => (state.toast.show = payload),
}

export const actions = {
  showToast({ commit }, payload) {
    commit('updateToastMessage', payload.message)
    if (payload.type) commit('updateToastType', payload.type)
    commit('updateToastShow', true)

    setTimeout(() => {
      commit('updateToastShow', false)
      commit('updateToastType', 'success')
    }, 6000)
  },
}
