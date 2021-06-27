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
            label="Nome da Empresa"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="CNPJ"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="CNAE Principal"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Nome completo do responsável"
            required
          ></v-text-field>

          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="CPF do responsável"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'StepTwoForm',
  data() {
    return {}
  },
}
</script>
