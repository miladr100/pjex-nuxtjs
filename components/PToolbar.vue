<template>
  <div>
    <v-navigation-drawer
      fixed
      :clipped="clipped"
      app
      dark
      :mini-variant="drawer"
      :mobile-breakpoint="900"
      class="lighten"
    >
      <v-list>
        <v-list-item link>
          <v-list-item-avatar>
            <!-- <v-img
              :src="`https://randomuser.me/api/portraits/men/${28}.jpg`"
              alt=""
            /> -->
            <v-icon large>face</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6" v-text="firstUserName" />
            <v-list-item-subtitle v-text="this.$auth.user.email">
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="grey lighten-4" fixed app>
      <v-icon class="mr-2" @click.stop="drawer = !drawer">menu</v-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-layout row align-center style="max-width: 600px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        />
      </v-layout>
      <v-spacer />
      <v-icon @click="logoutUserAsync()">logout</v-icon>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'PToolbar',
  components: {},
  data() {
    return {
      title: 'Pjex',
      clipped: false,
      drawer: true,
      items: [
        {
          icon: 'space_dashboard',
          title: 'DASHBOARD',
          to: '/dashboard',
        },
        {
          icon: 'account_circle',
          title: 'PERFIL',
          to: '/dashboard/perfil',
        },
        {
          icon: 'add_chart',
          title: 'FASES',
          to: '/dashboard/fases',
        },
        {
          icon: 'important_devices',
          title: 'CURSOS',
          to: '/page/cursos',
        },
        {
          icon: 'help_center',
          title: 'Ajuda',
          to: '/help',
        },
      ],
    }
  },
  computed: {
    firstUserName() {
      return this.$auth.user.name.split(' ')[0]
    },
  },
  methods: {
    async logoutUserAsync() {
      await this.$auth.logout()
    },
  },
}
</script>
