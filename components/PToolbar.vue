<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed :clipped="clipped" app dark>
      <v-list>
        <v-list-item link>
          <v-list-item-avatar>
            <img
              :src="`https://randomuser.me/api/portraits/men/${28}.jpg`"
              alt=""
            />
          </v-list-item-avatar>
          <v-list-item-title v-text="this.$auth.user.name" />
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
          icon: 'home',
          title: 'DASHBOARD',
          to: '/dashboard',
        },
        {
          icon: 'home',
          title: 'PERFIL',
          to: '/dashboard/perfil',
        },
        {
          icon: 'home',
          title: 'FASES',
          to: '/dashboard/fases',
        },
        {
          icon: 'home',
          title: 'CURSOS',
          to: '/page/cursos',
        },
      ],
    }
  },
  methods: {
    async logoutUserAsync() {
      await this.$auth.logout()
    },
  },
}
</script>
