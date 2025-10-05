
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
import { Customer } from "@/context/global-context";
import { NewCustomerModal } from "./new-customer-modal";


interface BudgetListProps {
    customers: Customer[]
}

export function CustomerList({ customers }: BudgetListProps) {
    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center gap-4">
                <form className="w-full max-w-md">
                    <Input className="bg-white" type="text" placeholder="Pesquisar cliente por CNPJ/CPF" />
                </form>
                <NewCustomerModal/>
            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead className="w-20">CNPJ/CPF</TableHead>
                            <TableHead>Razão Social</TableHead>
                            <TableHead>Fantasia</TableHead>
                            <TableHead>Comprador</TableHead>
                            <TableHead>Contato</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.cnpj}>
                                <TableCell className="h-12 w-34 text">{customer.cnpj}</TableCell>
                                <TableCell className="h-12 w-40">{customer.businessName}</TableCell>
                                <TableCell className="h-12">{customer.tradeName}</TableCell>
                                <TableCell className="h-12 w-36">{customer.buyer}</TableCell>
                                <TableCell className="h-12">{customer.contact}</TableCell>
                                <TableCell className="h-12">
                                    <ActionsButtons>
                                        <div className="flex flex-col gap-2">
                                            {/* <Button variant="outline" className="w-full h-9 gap-2">
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
                                            </Button> */}
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