export default {
  methods: {
    async getAllStatesAsync() {
      try {
        const allStatesOfBrazil = await this.$axios.$get(
          `${process.env.brasilApi}ibge/uf/v1`
        )
        return { allStatesOfBrazil }
      } catch (err) {
        console.error(err)
      }
    },

    async getAllStatesFormattedAsync() {
      try {
        const allStatesOfBrazil = await this.$axios.$get(
          `${process.env.brasilApi}ibge/uf/v1`
        )
        return this.formatDataFromIbge(allStatesOfBrazil)
      } catch (err) {
        console.error(err)
      }
    },

    async getCitiesByStateCodeFormattedAsync(stateId) {
      const { data } = await this.$axios.get(
        `${process.env.ibgeApi}localidades/estados/${stateId}/municipios`
      )
      return this.formatDataFromIbge(data)
    },

    async getBusinessByCnpj(cnpj) {
      const { data } = await this.$axios.get(
        `${process.env.brasilApi}cnpj/v1/${cnpj}`
      )
      return this.getUtilDataFromCnpj(data)
    },

    formatDataFromIbge(states) {
      return states.reduce((acc, state) => {
        return [
          ...acc,
          {
            value: state.nome,
            short: state.sigla,
            id: state.id,
          },
        ]
      }, [])
    },

    getUtilDataFromCnpj(data) {
      // eslint-disable-next-line camelcase
      const { cnpj, razao_social, nome_fantasia, cnae_fiscal, cep } = data
      return {
        cnpj,
        razao_social,
        nome_fantasia,
        cnae_fiscal,
        cep,
      }
    },
  },
}
