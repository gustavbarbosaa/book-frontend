import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Atualizando as validações do Zod
const registerBookValidation = z.object({
  titulo: z.string({message: "Título obrigatório!"}).min(3, { message: "O título deve ter no mínimo 3 caracteres!" }),
  escritor: z.string({message: "Escritor obrigatório!"}).min(3, { message: "O nome do escritor deve ter no mínimo 3 caracteres!" }),
  editora: z.string({message: "Editora obrigatória!"}).min(3, { message: "O nome da editora deve ter no mínimo 3 caracteres!" }),
  edicao: z.string({message: "Edição obrigatória!"}).min(1, { message: "A edição deve ser um número válido!" }).regex(/^\d+$/, {
    message: "A edição deve ser um número válido!",
  }),
  isbn: z.string({message: "ISBN obrigatório!"}).min(5, { message: "O ISBN deve ter no mínimo 5 caracteres!" }),
  dataPublicacao: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date <= new Date() && date >= new Date("1900-01-01");
  }, {
    message: "Informe uma data válida entre 1900 e hoje.",
  }),
  genero: z.string().nonempty({message: "O gênero é obrigatório!"}),
});

type RegisterBookSchema = z.infer<typeof registerBookValidation>;

function RegisterBook() {
  const form = useForm<RegisterBookSchema>({
    resolver: zodResolver(registerBookValidation),
  });

  const registerBook = (data: RegisterBookSchema) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center flex-1 h-full bg-background-image bg-no-repeat bg-cover bg-center p-8">
      <div className="flex flex-col items-center justify-center gap-2 bg-secondary rounded w-full h-full drop-shadow-sm">
        <div className="p-8">
          <h2 className="md:text-5xl font-bold font-roboto">Cadastrar livros</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(registerBook)} className="w-1/2 space-y-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full flex gap-2">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira o título do livo" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="escritor"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Escritor</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe o escritor do livro..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                <FormField
                  control={form.control}
                  name="editora"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Editora</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe a editora..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="edicao"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Edição</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Informe a edição do livro..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genero"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Gênero</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o gênero..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acao">Ação</SelectItem>
                          <SelectItem value="aventura">Aventura</SelectItem>
                          <SelectItem value="comedia">Comédia</SelectItem>
                          <SelectItem value="drama">Drama</SelectItem>
                          <SelectItem value="fantasia">Fantasia</SelectItem>
                          <SelectItem value="terror">Terror</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataPublicacao"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel>Data de publicação</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP", { locale: ptBR })
                              ) : (
                                <span>Selecione a data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date?.toISOString() || null)}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe o ISBN..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit" className="w-full">Cadastrar livro</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default RegisterBook;
