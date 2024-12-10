import axios from "axios"

const URL_IBGE = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"

export const IbgeService = {
  async getStates() {
    try {
      const response = await axios.get(`${URL_IBGE}`)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar estados: " + error)
      throw error
    }
  },

  async getCitiesForState(state: string) {
    try {
      const response = await axios.get(`${URL_IBGE}/${state}/municipios`)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar cidade:" + error)
      throw error
    }
  }
}