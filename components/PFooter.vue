<template>
  <v-footer dark class="darken">
    <v-card flat tile width="100%" class="darken text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <span
          >PJEX - Instituto Jovem Exportador &copy;
          {{ new Date().getFullYear() }}</span
        >
      </v-card-text>
    </v-card>
  </v-footer>
  <!-- <v-footer app dark height="auto" class="indigo lighten-1">
    <v-row justify="center">
      <v-col col=>
        <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
          <v-icon size="24">{{ icon }}</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <span
          >PJEX - Instituto Jovem Exportador &copy;
          {{ new Date().getFullYear() }}</span
        >
      </v-col>
    </v-row>
  </v-footer> -->
</template>

<script>
export default {
  name: 'PFooter',
  data() {
    return {
      icons: ['facebook', 'catching_pokemon', 'school'],
    }
  },
}
</script>
