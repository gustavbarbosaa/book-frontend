import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBooksService } from "@/services/Book/getBooksService";
import { registerTransactionService } from "@/services/Transaction/registerTransactionService";
import { getUsersService } from "@/services/User/getUsersService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerTransactionValidation = z.object({
  user: z.string({ message: "A cidade é obrigatória!" }),
  book: z.string({ message: "A cidade é obrigatória!" }),
});

type RegisterTransactionSchema = z.infer<typeof registerTransactionValidation>;

function RegisterTransaction() {

  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])

  const handleUserChange = async (user: string) => {
    setSelectedUsers(user)
    form.setValue("user", user)

    try {
      const data = await getUsersService.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.log("Erro ao carregar usuários na página: " + error)
    }
  }

  const handleBookChange = async (book: string) => {
    setSelectedBooks(book)
    form.setValue("book.", book)

    try {
      const data = await getBooksService.getAllBooks()
      setBooks(data)
    } catch (error) {
      console.log("Erro ao carregar livros na página: " + error)
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsersService.getAllUsers()
        setUsers(data)
      } catch (error) {
        console.log("Erro ao carregar os usuarios na página: " + error)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooksService.getAllBooks()
        setBooks(data)
      } catch (error) {
        console.log("Erro ao carregar os livros na página: " + error)
      }
    }
    fetchBooks()
  }, [])

  const form = useForm<RegisterTransactionSchema>({
    resolver: zodResolver(registerTransactionValidation),
  });

  const registerTransaction = async (data: RegisterTransactionSchema) => {
    try {
      const response = await registerTransactionService.registerTransaction(data)
      console.log(response)
      form.reset()
    } catch (error) {
      console.log("Erro ao cadastrar transação: " + error)
      throw error
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 h-full bg-background-image bg-no-repeat bg-cover bg-center gap-4 p-8">
      <div className="flex flex-col items-center justify-center gap-2 bg-secondary rounded w-full h-full drop-shadow-sm">
        <div className="p-8">
          <h2 className="md:text-5xl font-bold font-roboto">Cadastrar transação</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(registerTransaction)} className="w-1/2 space-y-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full flex gap-2">
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Usuario <span className="text-red-500 font-bold">*</span></FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleUserChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o usuário..." />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.name}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="book"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Livro <span className="text-red-500 font-bold">*</span></FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleBookChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a cidade..." />
                        </SelectTrigger>
                        <SelectContent>
                          {books.map((book) => (
                            <SelectItem key={book.id} value={book.titulo}>
                              {book.titulo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">Cadastrar transação</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default RegisterTransaction