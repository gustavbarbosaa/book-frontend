import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@radix-ui/react-separator"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email: z.string().email({message: "Insira um email válido!"}),
  password: z.string()
    .min(6, {message: "A senha deve possuir no mínimo 6 caracteres!"})
    .max(30, {message: "A senha deve possuir no máximo 30 caracteres!"})
})

type LoginTypeSchema = z.infer<typeof loginSchema>

function Login() {

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<LoginTypeSchema>({
    resolver: zodResolver(loginSchema),
  })

  const login = (data: LoginTypeSchema) => {
    console.log(data)
  }

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
        <form onSubmit={handleSubmit(login)} className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="w-full">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Insira o seu email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('email')}
            />
            {isSubmitted && errors.email && (
              <small className="text-red-600 font-medium font-poppins p-2">{errors.email.message}</small>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Insira a sua senha"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('password')}
            />
            {isSubmitted && errors.password && (
              <small className="text-red-600 font-medium font-poppins p-2">{errors.password.message}</small>
            )}
          </div>
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