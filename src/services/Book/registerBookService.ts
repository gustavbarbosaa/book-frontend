import axios from "axios"

const URL = "http://localhost:3000/books"

export const registerBookService = {
  async registerBook(data: any) {
    try {
      const response = await axios.post(URL, data)
      return response.data
    } catch (error) {
      console.error("Erro ao cadastrar livro: " + error)
      throw error
    }
  }
}