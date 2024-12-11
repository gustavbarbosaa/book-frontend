import axios from "axios"

const URL = "http://localhost:3000/users"

export const getUsersService = {
  async getAllUsers() {
    try {
      const response = await axios.get(URL)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar usuários: " + error)
      throw error
    }
  }
}