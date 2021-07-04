<template>
  <v-app>
    <PToolbar />
    <v-main>
      <nuxt class="mt-2 ml-2" />
    </v-main>
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
