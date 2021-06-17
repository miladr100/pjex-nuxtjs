<template>
  <v-row>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-row>
</template>

<script>
export default {
  name: 'PFooter',
  data() {
    return {}
  },
}
</script>
