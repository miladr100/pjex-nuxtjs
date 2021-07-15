<template>
  <v-row class="mt-2 mb-4">
    <v-col>
      <v-card-title>Bem vindo a plataforma do Jovem Exportador</v-card-title>

      <v-row class="mt-6 mb-4 ml-2 mr-2">
        <v-col cols="12" lg="3" md="6" sm="12" class="mt-8">
          <ui-material-stats-card
            color="primary"
            icon="military_tech"
            title="Pontuação"
            value="5"
            sub-icon="mdi-tag"
            sub-text="Tracked from Google Analytics"
          />
        </v-col>

        <v-col cols="12" lg="3" md="6" sm="12" class="mt-8">
          <ui-material-stats-card
            color="primary"
            icon="local_activity"
            title="Eventos"
            value="5"
            sub-icon="mdi-tag"
            sub-text="Tracked from Google Analytics"
          />
        </v-col>

        <v-col cols="12" lg="3" md="6" sm="12" class="mt-8">
          <ui-material-stats-card
            color="primary"
            icon="timeline"
            title="Classificação"
            value="10"
            sub-icon="mdi-tag"
            sub-text="Tracked from Google Analytics"
          />
        </v-col>

        <v-col cols="12" lg="3" md="6" sm="12" class="mt-8">
          <ui-material-stats-card
            color="primary"
            icon="school"
            title="Mat. exportadora"
            value="7"
            sub-icon="mdi-tag"
            sub-text="Tracked from Google Analytics"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import MaterialStatsCard from '~/components/ui-components/MaterialStatsCard.vue'

export default {
  components: {
    'ui-material-stats-card': MaterialStatsCard,
  },
  layout: 'logged',
  data() {
    return {}
  },

  methods: {},
}
</script>
