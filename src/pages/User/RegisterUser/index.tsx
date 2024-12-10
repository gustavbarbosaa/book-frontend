import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IbgeService } from "@/services/Cities/ibgeService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerUserValidation = z.object({
  name: z.string({message: "Título obrigatório!"}).min(3, { message: "O título deve ter no mínimo 3 caracteres!" }),
  email: z.string({message: "Email é obrigatório!"}).email({message: "Insira um email válido!"}),
  password: z.string({message: "A senha é obrigatória!"}).min(3, { message: "A senha deve ter no mínimo 3 dígitos! " }),
  phone: z.string({message: "O telefone é obrigatório!"}).min(11, { message: "O telefone deve ter 11 dígitos!" }),
  cpf: z.string({message: "O CPF é obrigatório!"}).min(11, { message: "O CPF deve ter 11 dígitos!" }),
  typeUser: z.string({message: "Tipo de usuário é obrigatório!"}),
  address: z.object({
    number: z.string({ message: "O número é obrigatório!" }).optional(),
    road: z.string({ message: "A rua é obrigatória!" }).min(1, { message: "A rua não pode estar vazia!" }),
    neighborhood: z.string({ message: "O bairro é obrigatório!" }),
    city: z.string({ message: "A cidade é obrigatória!" }),
    postalCode: z.string({ message: "O CEP é obrigatório!" }).min(8, { message: "O CEP deve ter pelo menos 8 caracteres!" }),
    state: z.string({ message: "O estado é obrigatório!" }),
  }),
});

type RegisterUserSchema = z.infer<typeof registerUserValidation>;

function RegisterUSer() {

  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedStates] = useState("")
  const [postalCode, setPostalCode] = useState("")

  useEffect(() => {
    async function fetchStates() {
      try {
        const data = await IbgeService.getStates()
        setStates(data)
      } catch (error) {
        console.log("Erro ao carregar os estados na página: " + error)
      }
    }
    fetchStates()
  }, [])

  const handleStateChange = async (state: string) => {
    setSelectedStates(state)
    form.setValue("address.state", state)

    try {
      const data = await IbgeService.getCitiesForState(state)
      setCities(data)
    } catch (error) {
      console.log("Erro ao carregar cidades na página: " + error)
    }
  }

  const handleCityChange = (city: string) => {
    form.setValue("address.city", city);
    setPostalCode("12345-678");
    form.setValue("address.postalCode", "12345-678");
  };

  const form = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserValidation),
  });

  const registerUser = (data: RegisterUserSchema) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center flex-1 h-full bg-background-image bg-no-repeat bg-cover bg-center p-8">
      <div className="flex flex-col items-center justify-center gap-2 bg-secondary rounded w-full h-full drop-shadow-sm">
        <div className="p-8">
          <h2 className="md:text-5xl font-bold font-roboto">Cadastrar usuário</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(registerUser)} className="w-1/2 space-y-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full flex gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira o nome do usuário" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Informe o email do usuário..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Informe a senha do usuarío..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="w-full flex gap-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Informe o telefone do usuário..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe o CPF do usuário..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                <FormField
                  control={form.control}
                  name="typeUser"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tipo de usuário</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o tipo de usuário..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bibliotecario">Bibliotecário</SelectItem>
                          <SelectItem value="usuario">Usuário</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="w-full flex gap-2">
                <FormField
                  control={form.control}
                  name="address.number"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>N°</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Informeo número da residência" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.road"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe o nome da rua..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.neighborhood"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe o bairro..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex gap-2">
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Estado</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleStateChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o estado..." />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.id} value={state.sigla}>
                              {state.nome}
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
                  name="address.city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cidade</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleCityChange(value);
                        }}
                        value={field.value}
                        disabled={!selectedState}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a cidade..." />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.id} value={city.nome}>
                              {city.nome}
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
                  name="address.postalCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Informe o CEP..."
                          {...field}
                          value={postalCode}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">Cadastrar usuário</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default RegisterUSer