<template>
  <v-main>
    <v-row v-if="loadingNextScreen" class="mt-16">
      <v-col class="d-flex justify-center align-center mt-16">
        <v-progress-circular
          class="mt-16"
          indeterminate
          :size="80"
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-container v-else class="fill-height" fluid>
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
                          v-model="loginForm.userEmail.value"
                          :label="loginForm.userEmail.label"
                          :placeholder="loginForm.userEmail.placeholder"
                          :error-messages="loginEmailErrors"
                          prepend-icon="email"
                          type="text"
                          color="primary"
                          filled
                        />

                        <v-text-field
                          v-model="loginForm.userPassword.value"
                          :label="loginForm.userPassword.label"
                          :placeholder="loginForm.userPassword.placeholder"
                          :error-messages="loginPasswordErrors"
                          prepend-icon="lock"
                          type="password"
                          color="primary"
                          filled
                        />
                      </v-form>
                      <h3 style="cursor: pointer" class="text-center mt-4">
                        Esqueceu sua senha ?
                      </h3>
                    </v-card-text>
                    <div class="text-center mt-3 mb-6">
                      <v-btn
                        rounded
                        dark
                        color="primary"
                        :loading="isLoading"
                        @click="loginUserAsync()"
                        >Entrar</v-btn
                      >
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="primary">
                    <v-card-text class="white--text mt-md-12 mt-sm-4">
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
                    <v-row class="mt-md-12 mt-sm-4 mb-sm-4">
                      <v-col justify="center" align="center">
                        <v-img
                          :src="require('~/static/img/logo_programa.png')"
                          max-width="200"
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="primary">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">Bem vindo <br /></h1>
                      <h4 class="text-center">
                        Para permanecer conectado conosco por favor faça o login
                        com suas credencias.
                      </h4>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step--"
                        >Fazer Login</v-btn
                      >
                    </div>
                    <v-row class="mt-md-12 mt-sm-4 mb-sm-4">
                      <v-col justify="center" align="center">
                        <v-img
                          :src="require('~/static/img/logo_programa.png')"
                          max-width="200"
                        >
                        </v-img>
                      </v-col>
                    </v-row>
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
                          v-model="registerForm.userName.value"
                          :label="registerForm.userName.label"
                          :placeholder="registerForm.userName.placeholder"
                          :error-messages="registerNameErrors"
                          prepend-icon="person"
                          type="text"
                          color="primary"
                          filled
                        />
                        <v-text-field
                          v-model="registerForm.userEmail.value"
                          :label="registerForm.userEmail.label"
                          :placeholder="registerForm.userEmail.placeholder"
                          :error-messages="registerEmailErrors"
                          prepend-icon="email"
                          type="text"
                          color="primary"
                          filled
                        />

                        <v-text-field
                          v-model="registerForm.userPassword.value"
                          :label="registerForm.userPassword.label"
                          :placeholder="registerForm.userPassword.placeholder"
                          :error-messages="registerPasswordErrors"
                          prepend-icon="lock"
                          type="password"
                          color="primary"
                          filled
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn
                        rounded
                        dark
                        color="primary"
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
</template>

<script>
// eslint-disable-next-line prettier/prettier
import { validationMixin } from "vuelidate"
// eslint-disable-next-line prettier/prettier
import { required, email, minLength} from "vuelidate/lib/validators"
import { password } from '~/shared/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],
  props: {
    source: String,
  },
  data: () => ({
    isLoading: false,
    step: 1,
    loginForm: {
      userEmail: {
        label: 'Email',
        placeholder: 'Ex: martin@gmail.com',
        value: '',
      },
      userPassword: {
        label: 'Senha',
        placeholder: 'Insiria sua senha',
        value: '',
      },
    },
    registerForm: {
      userName: {
        label: 'Nome completo',
        placeholder: 'Digite seu nome completo',
        value: '',
      },
      userEmail: {
        label: 'Email',
        placeholder: 'Insira seu melhor email',
        value: '',
      },
      userPassword: {
        label: 'Senha',
        placeholder: 'Escolha uma senha forte',
        value: '',
      },
    },
    loadingNextScreen: false,
  }),
  validations() {
    return {
      loginForm: {
        userEmail: {
          value: {
            required,
            email,
          },
        },
        userPassword: {
          value: {
            required,
          },
        },
      },
      registerForm: {
        userName: {
          value: {
            required,
          },
        },
        userEmail: {
          value: {
            required,
            email,
          },
        },
        userPassword: {
          value: {
            required,
            minLength: minLength(8),
            isValid(pass) {
              return password(pass)
            },
          },
        },
      },
    }
  },
  computed: {
    loginEmailErrors() {
      return this.$v.loginForm.userEmail.value.$dirty &&
        !this.$v.loginForm.userEmail.value.required
        ? ['Preenchimento obrigatório']
        : this.$v.loginForm.userEmail.value.$dirty &&
          !this.$v.loginForm.userEmail.value.email
        ? ['Email inválido']
        : []
    },
    loginPasswordErrors() {
      return this.$v.loginForm.userPassword.value.$dirty &&
        !this.$v.loginForm.userPassword.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    registerNameErrors() {
      return this.$v.registerForm.userName.value.$dirty &&
        !this.$v.registerForm.userName.value.required
        ? ['Preenchimento obrigatório']
        : []
    },
    registerEmailErrors() {
      return this.$v.registerForm.userEmail.value.$dirty &&
        !this.$v.registerForm.userEmail.value.required
        ? ['Preenchimento obrigatório']
        : this.$v.registerForm.userEmail.value.$dirty &&
          !this.$v.registerForm.userEmail.value.email
        ? ['Email inválido']
        : []
    },
    registerPasswordErrors() {
      return this.$v.registerForm.userPassword.value.$dirty &&
        !this.$v.registerForm.userPassword.value.required
        ? ['Preenchimento obrigatório']
        : this.$v.registerForm.userPassword.value.$dirty &&
          !this.$v.registerForm.userPassword.value.minLength
        ? ['Inválido. Senha deve ter no mínimo 8 caracteres.']
        : this.$v.registerForm.userPassword.value.$dirty &&
          !this.$v.registerForm.userPassword.value.isValid
        ? [
            'Inválido. Senha deve conter letras e números, maiúsculos e caracteres especiais.',
          ]
        : []
    },
  },
  methods: {
    async login(userEmail, userPassword) {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: userEmail,
            password: userPassword,
          },
        })
        this.$store.commit(
          'updateIsUserRegistered',
          this.$auth.user.user_registration
        )
        this.$store.commit(
          'updateIsCompanyRegistered',
          this.$auth.user.company_registration
        )
        this.$router.push('/dashboard')
      } catch (err) {
        this.loadingNextScreen = false
        this.isLoading = false
        this.showToastMessage(err?.response?.data?.message, 'error')
      }
    },

    async loginUserAsync() {
      this.$v.loginForm.$touch()
      if (this.$v.loginForm.$invalid) return

      this.isLoading = true
      await this.login(
        this.loginForm.userEmail.value,
        this.loginForm.userPassword.value
      )
    },

    async registerNewUserAsync() {
      this.$v.registerForm.$touch()
      if (this.$v.registerForm.$invalid) return

      try {
        this.isLoading = true
        await this.$axios.post('users', {
          name: this.registerForm.userName.value,
          email: this.registerForm.userEmail.value,
          password: this.registerForm.userPassword.value,
        })
        this.loadingNextScreen = true
        await this.login(
          this.registerForm.userEmail.value,
          this.registerForm.userPassword.value
        )
        this.showToastMessage('Usuário registrado com sucesso!')
        this.$router.push('/registration/complete')
      } catch (err) {
        this.showToastMessage(err.response.data.message, 'error')
        this.isLoading = false
      }
    },

    showToastMessage(message, type = 'success') {
      this.$toast.open({
        message,
        type,
      })
    },
  },
}
</script>
