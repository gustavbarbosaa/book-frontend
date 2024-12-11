import { getUsersService } from "@/services/User/getUsersService";
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

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const data = await getUsersService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.log("Erro ao carregar os usuários na página: " + error);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full bg-background-image bg-no-repeat bg-cover bg-center gap-4 p-8">
        <div className="p-8">
        <h2 className="md:text-5xl font-bold font-roboto">Listar usuários</h2>
      </div>
      <Table className="flex-1 bg-secondary rounded p-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Rua</TableHead>
            <TableHead>Bairro</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead className="text-right">Tipo de usuário</TableHead>
            <TableHead className="text-right">Editar</TableHead>
            <TableHead className="text-right">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.cpf}</TableCell>
                <TableCell>{user.address.road}</TableCell>
                <TableCell>{user.address.neighborhood}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell className="text-right">{user.typeUser== "usuario" ? <Button type="button" disabled className="bg-primary">Usuário comum</Button> : <Button type="button" disabled className="bg-primary"> Bibliotecário</Button>}</TableCell>
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
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ListUsers;
