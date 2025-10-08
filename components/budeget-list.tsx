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
import { Enterprise, Prisma } from "@prisma/client";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";



interface BudgetListProps {
    budgets: Prisma.BudgetGetPayload<{
        include: {
            enterprise: true,
            customer: true,
            items: {
                include: { product: true }
            }
        }
    }>[];
    enterprises: Enterprise[];
}

export function BudgetList({ budgets, enterprises }: BudgetListProps) {

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center gap-4">
                <form className="w-full max-w-md">
                    <Input className="bg-muted/30"  type="text" placeholder="Pesquisar orçamento por CNPJ/CPF" />
                </form>
                
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
                            <TableHead className="text-right pr-[4.6rem]">•••</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {budgets.map((budget) => (
                            <TableRow key={budget.id}>
                                <TableCell className="h-12">{budget.id}</TableCell>
                                <TableCell className="h-12">{budget.customer?.cnpj}</TableCell>
                                <TableCell className="h-12">{budget.customer?.businessName}</TableCell>
                                <TableCell className="h-12">{budget.customer?.tradeName}</TableCell>
                                <TableCell className="h-12">R$ 0</TableCell>
                                <TableCell className="h-12">
                                    <Badge
                                        className={cn('p-0 px-2 py-1 rounded-sm ',
                                            budget.status === "IN_PROCESS" && "bg-muted hover:bg-muted text-sky-700",
                                            budget.status === "SENT" && "bg-yellow-500/25 hover:bg-yellow-500/30 text-yellow-700",
                                            budget.status === "APPROVED" && "bg-sky-500/25 hover:bg-sky-500/30 text-sky-700",
                                            budget.status === "PAID" && "bg-green-500/25 hover:bg-green-500/30 text-green-700",
                                            budget.status === "OWZING" && "bg-red-50/25 hover:bg-red-50/30 text-red-700"
                                        )}
                                    >
                                        {budget.status === "IN_PROCESS" && "Em processo"}
                                        {budget.status === "SENT" && "Enviado"}
                                        {budget.status === "APPROVED" && "Aprovado"}
                                        {budget.status === "PAID" && "Pago"}
                                        {budget.status === "OWZING" && "Ag. pagamento"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="h-12">
                                    <div className="flex gap-2 w-full justify-end items-center">
                                        <Button size='sm'  variant="outline">
                                            <FileDown />
                                        </Button>

                                        <Link href={`/budgets/${budget.id}`} className="">
                                            <Button size='sm'  variant="outline">
                                                <FilePenLine />
                                            </Button>
                                        </Link>
                                        <Button size='sm' variant="outline" >
                                            <FileX />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}