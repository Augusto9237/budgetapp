import { Budget } from "@/app/budgets/page";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "./ui/input";
import { NewBudgetModal } from "./new-budget-modal";
import { Card } from "./ui/card";
import { ActionsButtons } from "./actions-buttons";
import { Button } from "./ui/button";
import Link from "next/link";
import { FileDown, FilePenLine, FileText, FileX, FileX2, Printer } from "lucide-react";


interface BudgetListProps {
    budgets: Budget[];
}

export function BudgetList({ budgets }: BudgetListProps) {
    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center gap-4">
                <form className="w-full max-w-md">
                    <Input className="bg-white" type="text" placeholder="Pesquisar orçamento por CNPJ/CPF" />
                </form>
                <NewBudgetModal budgets={budgets} />
            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead>Nº</TableHead>
                            <TableHead>CNPJ/CPF</TableHead>
                            <TableHead>Razão Social</TableHead>
                            <TableHead>Fantasia</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {budgets.map((budget) => (
                            <TableRow key={budget.id}>
                                <TableCell className="h-12">{budget.id}</TableCell>
                                <TableCell className="h-12">{budget.customer.CNPJ}</TableCell>
                                <TableCell className="h-12">{budget.customer.name}</TableCell>
                                <TableCell className="h-12">{budget.customer.fantasy}</TableCell>
                                <TableCell className="h-12">R$ {budget.total}</TableCell>
                                <TableCell className="h-12">
                                    {budget.status === "IN_PROCESS" && (<p className="text-blue-500">Em processo</p>)}
                                    {budget.status === "SENT" && (<p className="text-orange-400">Enviado</p>)}
                                    {budget.status === "APPROVED" && (<p className="text-green-500">Aprovado</p>)}
                                    {budget.status === "REJECTED" && (<p className="text-red-600">Rejeitado</p>)}
                                </TableCell>
                                <TableCell className="h-12">
                                    <ActionsButtons>
                                        <div className="flex flex-col gap-2">
                                            <Button variant="outline" className="w-full h-9 gap-2">
                                                <FileDown size={14} />
                                                Exportar
                                            </Button>

                                            <Link href={`/budgets/${budget.id}`} className="w-full">
                                                <Button className="w-full h-9 gap-2">
                                                    <FilePenLine size={14} />
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button className="w-full h-9 gap-2" variant="destructive">
                                                <FileX size={14} />
                                                Excluir
                                            </Button>
                                        </div>
                                    </ActionsButtons>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}