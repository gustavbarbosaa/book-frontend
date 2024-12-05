import InputForm from "@/components/InputForm"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"

function Login() {
  return (
    <div className="h-full w-full flex p-2">
      <picture className="picture flex items-center justify-center flex-1 rounded bg-background-image bg-no-repeat bg-cover bg-center"/>
      <div className="h-full flex flex-col items-center justify-center gap-10 rounded p-4">
        <div className="relative text-center">
          <h1 className="font-bold font-poppins text-3xl md:text-5xl">
            BEM VINDO AO <span className="text-tertiary">READIFY</span>
          </h1>
          <h2 className="font-medium font-poppins text-xl md:text-2xl">Insira seus dados para entrar na plataforma!</h2>
        </div>
        <form className="flex flex-col items-center justify-center gap-4 w-full">
          <InputForm label="Email" placeholder="Insira o seu email" id="email" type="email"/>
          <InputForm label="Senha" placeholder="Insira a sua senha" id="password" type="password"/>
          <div className="w-full text-end">
            <a href="#" className="font-medium text-primary">Esqueceu sua senha? Clique aqui para redefinir.</a>
          </div>
          <Button className="w-full" type="submit">Entrar</Button>
          <Separator><span className="font-thin font-poppins">OU</span></Separator>
          <a href="/cadastrar" className="w-full">
            <Button type="button" className="w-full">Criar conta</Button>
          </a>
        </form>
      </div>
    </div>
  )
}

export default Login