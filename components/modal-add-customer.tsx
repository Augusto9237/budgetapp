'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus } from "lucide-react"
import { SidebarMenuButton } from "./ui/sidebar"
import { Button } from "./ui/button"
import { useState, useContext } from "react"
import {GlobalContext } from "@/context/global-context"

import { toast } from 'react-hot-toast';
import { Customer } from "@prisma/client"

interface ModalCustomerProps {
    edit: boolean
    customers: Customer[]
}

export function ModalAddCustomer({ edit, customers }: ModalCustomerProps) {
    const { setSelectedCustomer } = useContext(GlobalContext);
    const [isOpen, setIsOpen] = useState(false)

    function handleSelectCustomer(customer: Customer) {
        setSelectedCustomer(customer)
        toast.success(`${customer.businessName} foi adicionado ao orçamento`);
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(open => !open)}>
            <DialogTrigger asChild>
                <Button className="max-w-sm" variant={edit ? 'outline' : 'default'}>
                    <UserPlus />
                    <span>{edit ? 'Alterar' : 'Adicionar'} Cliente</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-md">
                <DialogHeader>
                    <DialogTitle>Clientes</DialogTitle>
                </DialogHeader>

                <div>
                    <div className="grid grid-cols-4 text-sm px-2">
                        <span>
                            CNPJ
                        </span>
                        <span className="col-span-2">
                            Razão Social
                        </span>
                        <span>
                            Fantasia
                        </span>
                    </div>

                    <div className="space-y-2 mt-2">
                        {customers.map((customer) => (
                            <Button onClick={() => handleSelectCustomer(customer)} key={customer.cnpj} variant="outline" className="grid grid-cols-4 text-sm w-full px-2">
                                <span className="text-start">
                                    {customer.cnpj}
                                </span>
                                <span className="text-start col-span-2">
                                    {customer.businessName}
                                </span>
                                <span className="text-start">
                                    {customer.tradeName}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}