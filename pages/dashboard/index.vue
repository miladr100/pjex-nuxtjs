<template>
  <v-app>
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
  middleware: ['auth'],
  mounted() {
    console.log(this.$auth.user)
  },
}
</script>
