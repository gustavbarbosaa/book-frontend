import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteIcon, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBooksService } from "@/services/Book/getBooksService";

function ListBooks() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      try {
        const data = await getBooksService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.log("Erro ao carregar os livros na página: " + error);
      }
    }
    getBooks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full bg-background-image bg-no-repeat bg-cover bg-center gap-4 p-8">
        <div className="p-8">
        <h2 className="md:text-5xl font-bold font-roboto">Listar livros</h2>
      </div>
      <Table className="flex-1 bg-secondary rounded p-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Título</TableHead>
            <TableHead>Escritor</TableHead>
            <TableHead>Editora</TableHead>
            <TableHead>Edição</TableHead>
            <TableHead>Gênero</TableHead>
            <TableHead>Data de publicação</TableHead>
            <TableHead className="text-right">ISBN</TableHead>
            <TableHead className="text-right">Editar</TableHead>
            <TableHead className="text-right">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{book.titulo}</TableCell>
                <TableCell>{book.escritor}</TableCell>
                <TableCell>{book.editora}</TableCell>
                <TableCell>{book.edicao}</TableCell>
                <TableCell>{book.genero}</TableCell>
                <TableCell>{book.dataPublicacao}</TableCell>
                <TableCell className="text-right">{book.isbn}</TableCell>
                <TableCell className="text-right">
                  <Button type="button" className="bg-primary">
                    <Edit/>
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button type="button" className="bg-destructive">
                    <DeleteIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhum livro encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ListBooks