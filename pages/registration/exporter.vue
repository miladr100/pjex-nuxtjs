<template>
  <v-app>
    <p-exporter-registration />
  </v-app>
</template>

<script>
import PExporterRegistration from '~/components/registrations/PExporterRegistration/index.vue'

export default {
  name: 'ExporterRegistration',
  components: {
    'p-exporter-registration': PExporterRegistration,
  },
  layout: 'logged',
  data() {
    return {}
  },
}
</script>
