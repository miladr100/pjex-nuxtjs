<template>
  <v-app>
    <v-snackbar
      v-model="this.$store.state.toast.show"
      :timeout="6000"
      right
      top
      :color="getTypeOfToat"
    >
      {{ this.$store.state.toast.message }}
      <template #action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="closeToast()">
          X
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  components: {},
  computed: {
    getTypeOfToat() {
      return this.$store.state.toast.type
    },
  },
  methods: {
    closeToast() {
      this.$store.commit('updateToastShow', false)
    },
  },
}
</script>
