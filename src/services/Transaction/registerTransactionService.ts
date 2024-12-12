import axios from "axios"

const URL = "http://localhost:3000/transactions"

export const registerTransactionService = {
  async registerTransaction(data: any) {
    try {
      const response = await axios.post(URL, data)
      return response.data
    } catch (error) {
      console.error("Erro ao cadastrar transação: " + error)
      throw error
    }
  }
}