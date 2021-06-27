<template>
  <v-card elevation="3" class="mb-12" outlined>
    <v-form
      ref="form"
      v-model="valid"
      class="ml-4 mr-4 mt-4 mb-4"
      lazy-validation
    >
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Nome Completo"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Celular"
            required
          ></v-text-field>

          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Data do cadastro"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'StepOneForm',
  data() {
    return {
      valid: false,
    }
  },
}
</script>
