<template>
  <p-complete-registration :all-states-of-brazil="allStatesOfBrazil" />
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
    try {
      const allStatesOfBrazil = await $axios.$get(
        `${process.env.brasilApi}ibge/uf/v1`
      )
      return { allStatesOfBrazil }
    } catch (err) {
      console.error(err)
    }
  },
}
</script>
