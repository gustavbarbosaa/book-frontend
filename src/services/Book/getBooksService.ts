import axios from "axios"

const URL = "http://localhost:3000/books"

export const getBooksService = {
  async getAllBooks() {
    try {
      const response = await axios.get(URL)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar livros: " + error)
      throw error
    }
  }
}