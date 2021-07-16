export default function ({ store, redirect }) {
  if (!store.getters.isThereUserRegistration) {
    return redirect('/registration/complete')
  }
}
