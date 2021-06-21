<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="
                            text-center
                            display-2
                            teal--text
                            text--accent-4
                            mb-2
                          "
                        >
                          Entrar no Pjex
                        </h1>
                        <h2
                          class="
                            text-center
                            headline
                            teal--text
                            text--accent-3
                            mb-10
                          "
                        >
                          Plataforma Instituto Jovem Exportador
                        </h2>
                        <!-- <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>facebook</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>description</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>account-plus</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">
                          Ou entre de outra forma
                        </h4> -->
                        <v-form>
                          <v-text-field
                            v-model="userEmail"
                            label="E-mail"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            :color="baseColor.primary"
                          />

                          <v-text-field
                            id="password"
                            v-model="userPassword"
                            label="Senha"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            :color="baseColor.primary"
                          />
                        </v-form>
                        <h3 style="cursor: pointer" class="text-center mt-4">
                          Esqueceu sua senha ?
                        </h3>
                      </v-card-text>
                      <div class="text-center mt-3 mb-3">
                        <v-btn
                          rounded
                          dark
                          :color="baseColor.primary"
                          :loading="isLoading"
                          @click="loginUserAsync()"
                          >Entrar</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" :class="baseColor.primary">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Olá, Parceiro!</h1>
                        <h4 class="text-center">
                          Insira alguns dados rapidamente e comece sua jornada
                          conosco!
                        </h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >CADASTRAR</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" :class="baseColor.primary">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Bem vindo <br />
                          de volta!
                        </h1>
                        <h4 class="text-center">
                          Para permanecer conectado conosco por favor faça o
                          login com suas credencias.
                        </h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Fazer Login</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="
                            text-center
                            display-2
                            teal--text
                            text--accent-4
                            mb-2
                          "
                        >
                          Cadastrar no Pjex
                        </h1>
                        <h2
                          class="
                            text-center
                            headline
                            teal--text
                            text--accent-3
                            mb-10
                          "
                        >
                          Plataforma Instituto Jovem Exportador
                        </h2>
                        <!-- <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">
                          Insira seu e-mail para cadastro
                        </h4> -->
                        <v-form>
                          <v-text-field
                            v-model="userName"
                            label="Nome"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            :color="baseColor.primary"
                          />
                          <v-text-field
                            v-model="userEmail"
                            label="E-mail"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            :color="baseColor.primary"
                          />

                          <v-text-field
                            id="password"
                            v-model="userPassword"
                            label="Senha"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            :color="baseColor.primary"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mb-3">
                        <v-btn
                          rounded
                          dark
                          :color="baseColor.primary"
                          :loading="isLoading"
                          @click="registerNewUserAsync()"
                        >
                          Criar Conta
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    isLoading: false,
    step: 1,
    userName: '',
    userEmail: '',
    userPassword: '',
    baseColor: {
      primary: 'teal accent-4',
      secondary: 'teal accent-3',
    },
  }),
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.userEmail,
            password: this.userPassword,
          },
        })
        this.$router.push('/dashboard')
      } catch (err) {
        this.showToastMessage(err.response.data.message, 'error')
        this.isLoading = false
      }
    },

    async loginUserAsync() {
      if (this.userEmail && this.userPassword) {
        this.isLoading = true
        await this.login()
        this.showToastMessage('Bem vindo ao Pjex!')
      } else {
        this.showToastMessage('Por favor preencha todos os campos.', 'warning')
      }
    },

    async registerNewUserAsync() {
      if (this.userEmail && this.userPassword && this.userName) {
        try {
          this.isLoading = true
          await this.$axios.post('users', {
            name: this.userName,
            email: this.userEmail,
            password: this.userPassword,
          })
          await this.login()
          this.showToastMessage('Usuário registrado com sucesso!')
        } catch (err) {
          this.showToastMessage(err.response.data.message, 'error')
          this.isLoading = false
        }
      } else {
        this.showToastMessage('Por favor preencha todos os campos.', 'warning')
      }
    },

    showToastMessage(message, type = 'success') {
      this.$store.dispatch('showToast', {
        message,
        type,
      })
    },
  },
}
</script>
