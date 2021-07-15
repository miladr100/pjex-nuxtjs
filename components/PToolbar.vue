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

    <div class="text-center">
      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Cadastre sua empresa
          </v-card-title>

          <v-card-text class="mt-4">
            Para aproveitar todas as vantagens de nossa plataforma, você deve
            escolher uma das categorias e cadastrar sua empresa.
          </v-card-text>

          <v-card-text>
            <v-select
              v-model="businessRegister"
              :items="bussinesType"
              label="Eu sou..."
              :error-messages="bussinesTypeErrors"
              filled
            ></v-select>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="registerBusiness">
              Cadastrar empresa
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line prettier/prettier
import { validationMixin } from "vuelidate"
// eslint-disable-next-line prettier/prettier
import { required } from "vuelidate/lib/validators"

export default {
  name: 'PToolbar',
  components: {},
  mixins: [validationMixin],
  data() {
    return {
      businessRegister: '',
      bussinesType: ['Exportador'],
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
          to: '/dashboard/cursos',
        },
        {
          icon: 'help_center',
          title: 'Ajuda',
          to: '/dashboard/ajuda',
        },
      ],
    }
  },
  validations() {
    return {
      businessRegister: {
        required,
      },
    }
  },
  computed: {
    firstUserName() {
      return this.$auth.user.name.split(' ')[0]
    },
    dialog() {
      return !this.$store.state.userRegistration?.is_company_registered
    },
    bussinesTypeErrors() {
      return this.$v.businessRegister.$dirty &&
        !this.$v.businessRegister.required
        ? ['Preenchimento obrigatório']
        : []
    },
  },
  methods: {
    async logoutUserAsync() {
      await this.$auth.logout()
    },
    registerBusiness() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.$router.push('/registration/exporter')
    },
  },
}
</script>
