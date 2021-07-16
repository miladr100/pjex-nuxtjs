<template>
  <v-app><PLogin /></v-app>
</template>

<script>
import PLogin from '~/components/PLogin/index.vue'

export default {
  components: {
    PLogin,
  },
  mounted() {
    this.$store.dispatch('resetAllStore')
  },
}
</script>
