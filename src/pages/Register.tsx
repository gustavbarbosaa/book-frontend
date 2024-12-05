import InputForm from "@/components/InputForm"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@radix-ui/react-separator"

function Register() {
  return (
    <div className="h-full w-full flex p-2">
      <div className="h-full flex flex-col items-center justify-center gap-10 rounded p-4">
        <div className="relative text-center">
          <h1 className="font-bold font-poppins text-3xl md:text-5xl">
            CRIE A SUA CONTA
          </h1>
          <h2 className="font-medium font-poppins text-xl md:text-2xl">Insira os dados conforme o formulário abaixo!</h2>
        </div>
        <form className="flex flex-col items-center justify-center gap-2 w-full">
          <InputForm label="Nome" placeholder="Insira o seu nome  completo" id="name" type="text"/>
          <InputForm label="Email" placeholder="Insira o seu email" id="email" type="email"/>
          <InputForm label="Senha" placeholder="Insira a sua senha" id="password" type="password"/>
          <div className="flex w-full gap-2">
            <InputForm label="Telefone" placeholder="Insira o seu telefone" id="phone" type="text"/>
            <InputForm label="CPF" placeholder="Insira o seu CPF" id="cpf" type="text"/>
          </div>
          <div className="flex w-full gap-2">
            <InputForm label="Rua" placeholder="Nome de sua rua" id="road" type="text"/>
            <InputForm label="Bairro" placeholder="Nome do seu bairro" id="neighborhood" type="text"/>
          </div>
          <div className="flex w-full gap-2">
            <div className="w-full flex flex-col gap-1">
              <Label className="block text-sm font-medium text-gray-700">Cidade</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputForm label="CEP" placeholder="Insira o CEP" id="postalcode" type="text"/>
            <InputForm label="Estado" placeholder="Nome do seu estado" id="state" type="text"/>
          </div>
          <Separator />
          <div className="w-full text-end">
            <a href="/login" className="font-medium text-primary">Já possuo uma conta. Realizar login!</a>
          </div>
          <Separator />
          <Button className="w-full">Criar conta</Button>
        </form>
      </div>
      <picture className="picture flex items-center justify-center flex-1 rounded bg-background-image bg-no-repeat bg-cover bg-center"/>
    </div>
  )
}

export default Register