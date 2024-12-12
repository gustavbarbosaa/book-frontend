import axios from "axios"

const URL = "http://localhost:3000/transactions"

export const getTransactionService = {
  async getAllTransactions() {
    try {
      const response = await axios.get(URL)
      return response.data
    } catch (error) {
      console.error("Erro ao carregar transações: " + error)
      throw error
    }
  }
}