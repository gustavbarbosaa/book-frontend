import { getTransactionService } from "@/services/Transaction/getTransactionsService";
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

function ListTransactions() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      try {
        const data = await getTransactionService.getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.log("Erro ao carregar os transações na página: " + error);
      }
    }
    getTransactions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full bg-background-image bg-no-repeat bg-cover bg-center gap-4 p-8">
        <div className="p-8">
        <h2 className="md:text-5xl font-bold font-roboto">Listar usuários</h2>
      </div>
      <Table className="flex-1 bg-secondary rounded p-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead className="text-right">Editar</TableHead>
            <TableHead className="text-right">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>{transaction.book}</TableCell>
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
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ListTransactions