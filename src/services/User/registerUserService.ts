import axios from "axios"

const URL = "http://localhost:3000/users"

export const registerUserService = {
  async registerUser(data: any) {
    try {
      const response = await axios.post(URL, data)
      return response.data
    } catch (error) {
      console.error("Erro ao cadastrar usuário: " + error)
      throw error
    }
  }
}