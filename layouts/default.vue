<template>
  <v-app id="appRoot">
    <nuxt />
    <PToast />
  </v-app>
</template>

<script>
import PToast from '~/components/PToast.vue'

export default {
  components: {
    PToast,
  },
}
</script>
