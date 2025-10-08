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
import { Budget, Prisma } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Card, CardHeader } from "./ui/card";
import { ModalAddCustomer } from "./modal-add-customer";
import { ModalAddProduct } from "./modal-add-product";
import { ButtonGroup } from "./ui/button-group";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface PageA4Props {
    budget: Prisma.BudgetGetPayload<{
        include: {
            enterprise: true,
            items: {
                include: { product: true }
            }
        }
    }> | null
}

export function BudgetEdit({ budget }: PageA4Props) {
    const { selectedCustomer, productsBucket, removeProductFromBudget } = useContext(GlobalContext)
    const [zoom, setZoom] = useState(100)

    function handleZoomIn() {
        if (zoom < 175) {
            setZoom(zoom + 25)
        }
    }

    function handleZoomOut() {
        if (zoom > 100) {
            setZoom(zoom - 25)
        }
    }

    function calculateTotal(items: BucketProduct[]): number {
        return items.reduce((total, item) => total + (((item.product.price - item.discount) * item.quantity)), 0);
    }
    return (
        <main className="flex flex-col items-center gap-8 pt-20 pb-5 w-full max-w-screen-xl px-5 mx-auto min-h-screen max-h-screen overflow-auto">
            <div className="w-full flex-col space-y-5">
                <h1 className="font-bold mx-auto text-xl">Orçamento Nº {budget?.id}</h1>
                <Card className="flex gap-4 p-5">
                    <Image src={`/${budget?.enterprise.logoUrl}`} width={100} height={100} alt="logo" className="object-contain" />
                    <div className="w-full text-start">
                        <h1 className="font-bold">{budget?.enterprise.businessName}</h1>
                        <p className="text-sm font-bold">CNPJ: {budget?.enterprise.cnpj}  I.E: {budget?.enterprise.stateRegistration}</p>
                        <p className="text-sm">{budget?.enterprise.neighborhood}, {budget?.enterprise.city}-{budget?.enterprise.state}</p>
                    </div>
                </Card>

                <Card className="p-5">
                    <CardHeader className="p-0 text-start mb-5">
                        <h1>Cliente</h1>
                    </CardHeader>
                    {/* <span>Nenhum cliente selecionado</span>
                    <ModalAddCustomer/> */}
                    {selectedCustomer && (
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
                    <Table className="text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="h-8 px-4 text-sm font-semibold">Cod.</TableHead>
                                <TableHead className="h-8 px-4 text-sm font-semibold">Ref.</TableHead>
                                <TableHead className="h-8 px-4 text-sm font-semibold">Nome</TableHead>
                                <TableHead className="h-8 px-4 text-sm font-semibold">Qtd</TableHead>
                                <TableHead className="h-8 px-4 text-sm font-semibold">Preço</TableHead>
                                <TableHead className="h-8 px-4 text-sm font-semibold max-w-[104px] overflow-hidden">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productsBucket.map((item: BucketProduct, i: Key) => (
                                <TableRow key={i} className="relative">
                                    <TableCell className="h-8 text-sm px-4">{item.product.code}</TableCell>
                                    <TableCell className="h-8 text-sm px-4">{item.product.reference}</TableCell>
                                    <TableCell className="h-8 text-sm px-4">{item.product.name}</TableCell>
                                    <TableCell className="text-center h-8 text-sm">{item.quantity}</TableCell>
                                    <TableCell className="h-8 text-sm px-4 max-w-[104px] overflow-hidden">{formatCurrency(item.product.price - item.discount)}</TableCell>
                                    <TableCell className="h-8 text-sm  max-w-[104px] overflow-hidden bg-amber-500 px-0.5">
                                        <ButtonGroup className="w-full">
                                            <Button variant='ghost' className="w-full max-w-[100px]">{formatCurrency((item.product.price - item.discount) * item.quantity)}</Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="icon" aria-label="More Options">
                                                        <MoreHorizontalIcon />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                            </DropdownMenu>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                                //     </PopoverTrigger>

                                //     <PopoverContent className="fixed -right-0 -top-[2.8rem] p-2 space-x-2 max-w-24">
                                //         <ModalEditProduct product={item.product} quantityEdit={item.quantity} discountEdit={item.discount} />
                                //         <Button variant="outline" onClick={() => removeProductFromBudget(item.product.code)} className="h-7 w-7 text-red-500 hover:text-red-600">
                                //             <Trash2 />
                                //         </Button>
                                //     </PopoverContent>

                                // </Popover>
                            ))}
                        </TableBody>
                    </Table>
                    <ModalAddProduct />
                    {/* <div className="font-semibold text-end w-full text-sm">
                        <span>Total: {formatCurrency(calculateTotal(productsBucket))}</span>
                    </div> */}
                </Card>

                <div className="text-center text-sm absolute bottom-4 left-0 right-0">
                    <h1 className="font-semibold">{formatDate(new Date())}, Belém - Pa</h1>
                </div>
            </div>
        </main>
    )
}