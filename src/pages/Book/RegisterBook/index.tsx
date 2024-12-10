import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

// Atualizando as validações do Zod
const registerBookValidation = z.object({
  titulo: z.string({message: "Título obrigatório!"}).min(3, { message: "O título deve ter no mínimo 3 caracteres!" }),
  escritor: z.string({message: "Escritor obrigatório!"}).min(3, { message: "O nome do escritor deve ter no mínimo 3 caracteres!" }),
  editora: z.string({message: "Editora obrigatória!"}).min(3, { message: "O nome da editora deve ter no mínimo 3 caracteres!" }),
  edicao: z.string({message: "Edição obrigatória!"}).min(1, { message: "A edição deve ser um número válido!" }).regex(/^\d+$/, {
    message: "A edição deve ser um número válido!",
  }),
  isbn: z.string({message: "ISBN obrigatório!"}).min(5, { message: "O ISBN deve ter no mínimo 5 caracteres!" }),
  
  // .regex(/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1,3}$/, {
  //   message: "O ISBN deve seguir o formato correto!",
  // }),
  categoria: z.string({message: "Categoria obrigatório!"}).min(3, { message: "A categoria deve ter no mínimo 3 caracteres!" }),
  dataPublicacao: z.date(),
  genero: z.string(),
});

type RegisterBookSchema = z.infer<typeof registerBookValidation>;

function RegisterBook() {
  const [date, setDate] = useState<Date>();
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<RegisterBookSchema>({
    resolver: zodResolver(registerBookValidation),
  });

  const registerBook = (data: RegisterBookSchema) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center flex-1 h-full bg-background-image bg-no-repeat bg-cover bg-center p-8">
      <div className="flex flex-col items-center justify-center gap-2 bg-secondary rounded w-full h-full drop-shadow-sm">
        <h2 className="md:text-5xl font-bold font-roboto">Cadastrar livros</h2>
        <form onSubmit={handleSubmit(registerBook)} className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2 border w-1/2 p-4 rounded">
            <div className="w-full">
              <Label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título do livro
              </Label>
              <Input
                type="text"
                id="titulo"
                placeholder="Insira o titulo do livro"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('titulo')}
              />
              {isSubmitted && errors.titulo && (
                <small className="text-red-600 font-medium font-poppins p-2">{errors.titulo.message}</small>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="escritor" className="block text-sm font-medium text-gray-700">
                Escritor
              </Label>
              <Input
                type="text"
                id="escritor"
                placeholder="Insira o escritor do livro"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('escritor')}
              />
              {isSubmitted && errors.escritor && (
                <small className="text-red-600 font-medium font-poppins p-2">{errors.escritor.message}</small>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="editora" className="block text-sm font-medium text-gray-700">
                Editora
              </Label>
              <Input
                type="text"
                id="editora"
                placeholder="Insira a editora"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('editora')}
              />
              {isSubmitted && errors.editora && (
                <small className="text-red-600 font-medium font-poppins p-2">{errors.editora.message}</small>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="edicao" className="block text-sm font-medium text-gray-700">
                Edição
              </Label>
              <Input
                type="text"
                id="edicao"
                placeholder="Insira a edição do livro"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('edicao')}
              />
              {isSubmitted && errors.edicao && (
                <small className="text-red-600 font-medium font-poppins p-2">{errors.edicao.message}</small>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                ISBN
              </Label>
              <Input
                type="text"
                id="isbn"
                placeholder="Insira o ISBN"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('isbn')}
              />
              {isSubmitted && errors.isbn && (
                <small className="text-red-600 font-medium font-poppins p-2">{errors.isbn.message}</small>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                Categoria
              </Label>
              <Input
                type="text"
                id="categoria"
                placeholder="Insira a categoria do livro"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('categoria')}
              />
              {isSubmitted && errors.categoria && (
                <small className="text-red-600 font-medium font-poppins p-2">{errors.categoria.message}</small>
              )}
            </div>

            <div className="flex items-center w-full gap-2">
              <div className="w-full">
                <Label htmlFor="dataPublicacao" className="block text-sm font-medium text-gray-700">
                  Data de publicação
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      {...register('dataPublicacao')}
                    />
                  </PopoverContent>
                </Popover>
                {isSubmitted && errors.dataPublicacao && (
                  <small className="text-red-600 font-medium font-poppins p-2">{errors.dataPublicacao.message}</small>
                )}
              </div>

              <div className="w-full">
                <Label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                  Selecione o gênero
                </Label>
                <Select {...register('genero')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent  >
                    <SelectItem value="acao">Ação</SelectItem>
                    <SelectItem value="aventura">Aventura</SelectItem>
                    <SelectItem value="comedia">Comédia</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="fantasia">Fantasia</SelectItem>
                    <SelectItem value="terror">Terror</SelectItem>
                  </SelectContent>
                </Select>
                {isSubmitted && errors.genero && (
                  <small className="text-red-600 font-medium font-poppins p-2">{errors.genero.message}</small>
                )}
              </div>
            </div>

            <Button className="w-full" type="submit">Cadastrar livro</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterBook;
