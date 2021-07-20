<template>
  <p-complete-registration
    v-if="mounted"
    :all-states-of-brazil="allStatesOfBrazil"
  />
</template>

<script>
import PCompleteRegistration from '~/components/registrations/PCompleteRegistration.vue'

export default {
  name: 'CompleteRegistration',
  components: {
    'p-complete-registration': PCompleteRegistration,
  },
  middleware: ['auth'],
  async asyncData({ $axios }) {
    const allStatesOfBrazil = await $axios.$get(
      `${process.env.brasilApi}ibge/uf/v1`
    )
    return { allStatesOfBrazil }
  },
  data() {
    return {
      mounted: false,
    }
  },
  mounted() {
    if (this.$store.getters.isThereUserRegistration) {
      this.$store.dispatch('getAndSetUserRegistrationAsync')
      this.$router.push('/dashboard')
      return
    }

    this.$nextTick(() => (this.mounted = true))
  },
}
</script>
