'use client'
import { Budget, BudgetItem } from "@/app/budgets/page";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/formateDate";
import Image from "next/image";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Key, useContext } from "react";
import { BucketProduct, GlobalContext } from "@/context/global-context";
import { ModalEditProduct } from "./modal-edit-product copy";
import { formatCurrency } from "@/utils/formatCurrency";

interface PageA4Props {
    budget: Budget
}

export function PageA4({ budget }: PageA4Props) {
    const { selectedCustomer, productsBucket, removeProductFromBudget} = useContext(GlobalContext);

    function calculateTotal(items: BucketProduct[]): number {
        return items.reduce((total, item) => total + ((item.product.price * item.quantity)), 0);
    }
    return (
        <div className="bg-white min-w-[595px] w-[595px] min-h-[842px] h-[842px] shadow-md px-7 py-5 space-y-4 relative">
            <div className="flex gap-2">
                <Image src={`/${budget.enterprise.logo}`} width={100} height={100} alt="logo" className="object-contain" />
                <div className="border border-black w-full p-2">
                    <h1 className="font-bold">{budget.enterprise.corporate_reason}</h1>
                    <p className="text-sm font-bold">CNPJ: {budget.enterprise.CNPJ}  I.E: {budget.enterprise.IE}</p>
                    <p className="text-sm">{budget.enterprise.address}, {budget.enterprise.city}-{budget.enterprise.state}</p>
                </div>
            </div>

            <div className="flex flex-col w-full text-center">
                <h1 className="font-semibold max-auto">Orçamento Nº {budget.id}</h1>
                {selectedCustomer && (
                    <div>
                        <div className="text-sm">
                            <div className="flex gap-2 font-semibold">Razão Social:<span className="font-normal">{selectedCustomer.businessName}</span></div>
                            <div className="flex gap-2 font-semibold">Cpf/Cnpj: <span className="font-normal">{selectedCustomer.cnpj}</span></div>
                            <div className="flex gap-2 font-semibold">Fantasia: <span className="font-normal">{selectedCustomer.tradeName}</span></div>
                            <div className="flex gap-2 font-semibold">Comprador: <span className="font-normal">{selectedCustomer.buyer}</span> Contato:<span className="font-normal">{selectedCustomer.contact}</span></div>
                            <div className="flex gap-2 font-semibold">E-mail: <span className="font-normal">{selectedCustomer.email}</span></div>
                        </div>
                    </div>
                )}
                {!selectedCustomer && (
                    <h1>Selecione um cliente</h1>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Table className="border border-black text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="h-8 px-4 text-black text-xs font-semibold">Cod.</TableHead>
                            <TableHead className="h-8 px-4 text-black text-xs font-semibold">Ref.</TableHead>
                            <TableHead className="h-8 px-4 text-black text-xs font-semibold">Nome</TableHead>
                            <TableHead className="h-8 px-4 text-black text-xs font-semibold">Qtd</TableHead>
                            <TableHead className="h-8 px-4 text-black text-xs font-semibold">Preço</TableHead>
                            <TableHead className="h-8 px-4 text-black text-xs font-semibold">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productsBucket.map((item: BucketProduct, i: Key) => (
                            <Popover key={i}>
                                <PopoverTrigger asChild>
                                    <TableRow >
                                        <TableCell className="h-8 text-xs px-4">{item.product.code}</TableCell>
                                        <TableCell className="h-8 text-xs px-4">{item.product.reference}</TableCell>
                                        <TableCell className="h-8 text-xs px-4">{item.product.name}</TableCell>
                                        <TableCell className="text-center h-8 text-xs">{item.quantity}</TableCell>
                                        <TableCell className="h-8 text-xs px-4">{formatCurrency(item.product.price)}</TableCell>
                                        <TableCell className="h-8 text-xs px-4">{formatCurrency(item.quantity * item.product.price)}</TableCell>
                                    </TableRow>
                                </PopoverTrigger>

                                <PopoverContent className="fixed left-[17.4rem] -top-[2.8rem] p-2 space-x-2 max-w-24">
                                    <ModalEditProduct product={item.product} quantityEdit={item.quantity} discountEdit={item.discount} />
                                    <Button variant="outline" onClick={() => removeProductFromBudget(item.product.code)} className="h-7 w-7 text-red-500 hover:text-red-600">
                                        <Trash2 />
                                    </Button>
                                </PopoverContent>

                            </Popover>
                        ))}
                    </TableBody>
                </Table>
                <div className="font-semibold text-end w-full text-sm">
                    <span>Total: {formatCurrency(calculateTotal(productsBucket))}</span>
                </div>
            </div>

            <div className="text-center text-sm absolute bottom-4 left-0 right-0">
                <h1 className="font-semibold">{formatDate(new Date())}, Belém - Pa</h1>
            </div>

        </div>
    )
}