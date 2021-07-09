<template>
  <v-footer id="dashboard-core-footer" color="grey lighten-2">
    <v-container>
      <v-row align="center" no-gutters>
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <v-icon size="20px" class="mb-1">
            {{ link.icon }}
          </v-icon>
          <a
            :href="link.href"
            class="mr-6 grey--text text--darken-3"
            rel="noopener"
            target="_blank"
            v-text="link.text"
          />
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col cols="12" md="auto">
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            PJEX - Instituto Jovem Exportador &copy;
            {{ new Date().getFullYear() }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'PFooter',
  data: () => ({
    links: [
      {
        href: 'https://jovemexportador.org.br/',
        text: 'Institucional',
        icon: 'school',
      },
      {
        href: 'https://jovemexportador.org.br/quemsomos/',
        text: 'Sobre Nós',
        icon: 'person',
      },
      {
        href: 'https://instagram.com/ronanpiress?utm_medium=copy_link',
        text: 'Instagram',
        icon: 'facebook',
      },
      {
        href: 'https://www.linkedin.com/in/ronan-pires-31719690/',
        text: 'Linkedin',
        icon: 'catching_pokemon',
      },
    ],
  }),
}
</script>

<style lang="sass">
#dashboard-core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
