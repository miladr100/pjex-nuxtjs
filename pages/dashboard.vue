<template>
  <v-app v-if="$auth.loggedIn">
    <PToolbar />
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
}
</script>
