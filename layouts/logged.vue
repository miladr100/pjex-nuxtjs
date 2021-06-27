<template>
  <v-app>
    <PToolbar />
    <nuxt class="mt-16 ml-16" />
    <PFooter />
  </v-app>
</template>

<script>
import PToolbar from '~/components/PToolbar.vue'
import PFooter from '~/components/PFooter.vue'

export default {
  components: {
    PToolbar,
    PFooter,
  },
  middleware: ['auth'],
}
</script>
