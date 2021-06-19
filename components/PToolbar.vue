<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed :clipped="clipped" app>
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

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-icon @click="logoutUserAsync()">logout</v-icon>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: 'PToolbar',
  components: {},
  data() {
    return {
      title: 'Pjex',
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'home',
          title: 'DASHBOARD',
          to: '/dashboard',
        },
        {
          icon: 'home',
          title: 'PERFIL',
          to: '/dashboard',
        },
        {
          icon: 'home',
          title: 'FASES',
          to: '/dashboard',
        },
        {
          icon: 'home',
          title: 'CURSOS',
          to: '/page',
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
