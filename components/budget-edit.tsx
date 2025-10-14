'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/formateDate";
import Image from "next/image";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";
import { Key, useContext, useState } from "react";
import { BucketProduct, GlobalContext } from "@/context/global-context";
import { ModalEditProduct } from "./modal-edit-product copy";
import { formatCurrency } from "@/utils/formatCurrency";
import { Budget, Customer, Prisma } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { ModalAddCustomer } from "./modal-add-customer";
import { ModalAddProduct } from "./modal-add-product";
import { Separator } from "./ui/separator";
import { updateBudget } from "@/actions/budgets";

interface PageA4Props {
    budget: Prisma.BudgetGetPayload<{
        include: {
            enterprise: true,
            items: {
                include: { product: true }
            }
        }
    }> | null
    customers: Customer[];
}

export function BudgetEdit({ budget, customers }: PageA4Props) {
    const { selectedCustomer, productsBucket, removeProductFromBudget } = useContext(GlobalContext)

    async function handleUpdateBudget() {
        try {
            await updateBudget(budget?.id!, selectedCustomer?.id!, productsBucket)
        } catch (error) {
            
        }
    }

    function calculateTotal(items: BucketProduct[]): number {
        return items.reduce((total, item) => total + (((item.product.price - item.discount) * item.quantity)), 0);
    }
    return (
        <main className="flex flex-col items-center gap-8 pt-20 pb-5 w-full max-w-screen-xl px-5 mx-auto min-h-screen max-h-screen overflow-auto">
            <div className="w-full flex-col space-y-5">
                <div className="w-full text-center">
                    <h1 className="font-bold mx-auto text-xl">Orçamento Nº {budget?.id}</h1>
                </div>
                <Card className="flex gap-4 p-5">
                    <Image src={`/${budget?.enterprise.logoUrl}`} width={100} height={100} alt="logo" className="object-contain" />
                    <div className="w-full text-start">
                        <h1 className="font-bold">{budget?.enterprise.businessName}</h1>
                        <p className="text-sm font-bold">CNPJ: {budget?.enterprise.cnpj}  I.E: {budget?.enterprise.stateRegistration}</p>
                        <p className="text-sm">{budget?.enterprise.neighborhood}, {budget?.enterprise.city}-{budget?.enterprise.state}</p>
                    </div>
                </Card>

                <Card className="p-5">
                    <CardHeader className="p-0 flex flex-row justify-between items-center">
                        <CardTitle className="text-lg">Cliente</CardTitle>
                        <ModalAddCustomer edit={!selectedCustomer ? false : true} customers={customers} />
                    </CardHeader>
                    {!selectedCustomer && (
                        <div className="w-full flex flex-col gap-5 items-center">
                            <span>Nenhum cliente selecionado</span>
                        </div>
                    )}

                    {selectedCustomer?.businessName && (
                        <div className="w-full">
                            <div className="space-y-1 text-sm">
                                <div className="flex gap-2 font-semibold">Razão Social:<span className="font-normal">{selectedCustomer.businessName}</span></div>
                                <div className="flex gap-2 font-semibold">CPF/CNPJ: <span className="font-normal">{selectedCustomer.cnpj}</span></div>
                                <div className="flex gap-2 font-semibold">Fantasia: <span className="font-normal">{selectedCustomer.tradeName}</span></div>
                                <div className="flex gap-2 font-semibold">Comprador: <span className="font-normal">{selectedCustomer.buyer}</span> Contato:<span className="font-normal">{selectedCustomer.contact}</span></div>
                                <div className="flex gap-2 font-semibold">E-mail: <span className="font-normal">{selectedCustomer.email}</span></div>
                            </div>
                        </div>
                    )}

                </Card>

                <Card className="p-5 space-y-5">
                    <CardHeader className="p-0 text-start">
                        <h1>Produtos/Serviços</h1>
                    </CardHeader>
                    <Table className="text-sm w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="h-8 max-w-[160px] min-w-[160px] text-sm font-semibold">Cod.</TableHead>
                                <TableHead className="h-8 max-w-[100px] min-w-[100px] text-sm font-semibold">Ref.</TableHead>
                                <TableHead className="h-8 px-4 text-sm font-semibold w-full">Nome</TableHead>
                                <TableHead className="h-8 text-sm font-semibold max-w-[44px] min-w-[44px] ">Qtd</TableHead>
                                <TableHead className="h-8 text-sm font-semibold max-w-[100px] min-w-[100px]">Preço</TableHead>
                                <TableHead className="h-8 pl-4 text-sm font-semibold min-w-[120px] max-w-[120px] overflow-hidden">Subtotal</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productsBucket.map((item: BucketProduct, i: Key) => (
                                <TableRow key={i}>
                                    <TableCell className="h-8 text-sm max-w-[160px] min-w-[160px]">{item.product.code}</TableCell>
                                    <TableCell className="h-8 text-sm max-w-[100px] min-w-[100px]">{item.product.reference}</TableCell>
                                    <TableCell className="h-8 text-sm px-4 w-full flex-1">{item.product.name}</TableCell>
                                    <TableCell className="h-8 text-sm max-w-[40px] min-w-[40px] ">{item.quantity}</TableCell>
                                    <TableCell className="h-8 text-sm max-w-[100px] min-w-[100px]  overflow-hidden">{formatCurrency(item.product.price - item.discount)}</TableCell>
                                    <TableCell className="h-8 text-sm  min-w-[120px] max-w-[120px] overflow-hidden">
                                        {formatCurrency((item.product.price - item.discount) * item.quantity)}
                                    </TableCell>
                                    <TableCell className="px-0 relative">
                                        <div className="flex gap-2 items-center p-1">

                                            <ModalEditProduct product={item.product} quantityEdit={item.quantity} discountEdit={item.discount} />
                                            <Button variant="outline" onClick={() => removeProductFromBudget(item.product.code)} className="h-7 w-7 text-red-500 hover:text-red-600">
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ModalAddProduct />
                </Card>

                <Card className="p-5">
                    <CardHeader className="p-0">
                        <CardTitle className="text-lg">Resumo</CardTitle>
                    </CardHeader>
                    <div>
                        <div className="w-full flex justify-between items-center my-2">
                            <span>Subtotal:</span>
                            <span className="">{formatCurrency(calculateTotal(productsBucket))}</span>
                        </div>
                        <div className="w-full flex justify-between items-center mb-2">
                            <span>Desconto:</span>
                            <span className="">{formatCurrency(0)}</span>
                        </div>
                        <Separator className="my-5"/>
                        <div className="flex justify-between items-center font-bold">
                            <span>Total:</span>
                            <span>{formatCurrency(calculateTotal(productsBucket))}</span>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <Button variant='outline' className="text-primary">Cancelar</Button>
                <Button>Salvar</Button>
            </div>
        </main >
    )
}