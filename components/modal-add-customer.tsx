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
import { Customer, GlobalContext } from "@/context/global-context"

import { toast } from 'react-hot-toast';

const customers: Customer[] = [
    {
        cnpj: "12.345.678/0001-90",
        businessName: "Food SA",
        tradeName: "Northern Delights",
        buyer: "John Smith",
        contact: "(555) 123-4567",
        email: "john.smith@delights.com",
    },
    {
        cnpj: "23.456.789/0001-01",
        businessName: "Advanced Technology Ltd.",
        tradeName: "Tech Solutions",
        buyer: "Jane Doe",
        contact: "(555) 987-6543",
        email: "jane.doe@techsolutions.com",
    },
    {
        cnpj: "34.567.890/0001-12",
        businessName: "Construction and Renovations EIRELI",
        tradeName: "Prime Builders",
        buyer: "Michael Brown",
        contact: "(555) 234-5678",
        email: "michael.brown@primebuilders.com",
    },
    {
        cnpj: "45.678.901/0001-23",
        businessName: "Quick Transport ME",
        tradeName: "Fast Transports",
        buyer: "Emily Davis",
        contact: "(555) 345-6789",
        email: "emily.davis@fasttransports.com",
    },
    {
        cnpj: "56.789.012/0001-34",
        businessName: "Clothing Store Ltd.",
        tradeName: "Fashion Store",
        buyer: "William Garcia",
        contact: "(555) 456-7890",
        email: "william.garcia@fashionstore.com",
    },
    {
        cnpj: "67.890.123/0001-45",
        businessName: "Plastic Industry SA",
        tradeName: "Plastics Master",
        buyer: "Olivia Wilson",
        contact: "(555) 567-8901",
        email: "olivia.wilson@plasticsmaster.com",
    },
    {
        cnpj: "78.901.234/0001-56",
        businessName: "Total Security ME",
        tradeName: "Secure Protection",
        buyer: "David Martinez",
        contact: "(555) 678-9012",
        email: "david.martinez@secureprotection.com",
    },
    {
        cnpj: "89.012.345/0001-67",
        businessName: "Renewable Energy Ltd.",
        tradeName: "EcoEnergy",
        buyer: "Sophia Taylor",
        contact: "(555) 789-0123",
        email: "sophia.taylor@ecoenergy.com",
    },
    {
        cnpj: "90.123.456/0001-78",
        businessName: "Business Consulting EIRELI",
        tradeName: "Business Solutions",
        buyer: "James Anderson",
        contact: "(555) 890-1234",
        email: "james.anderson@businesssolutions.com",
    },
    {
        cnpj: "01.234.567/0001-89",
        businessName: "Education and Training SA",
        tradeName: "Learn More",
        buyer: "Isabella Thomas",
        contact: "(555) 901-2345",
        email: "isabella.thomas@learnmore.com",
    },
];



export function ModalAddCustomer() {
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
                <SidebarMenuButton className="group/collapsible" >
                    <UserPlus />
                    <span>Adicionar Cliente</span>
                </SidebarMenuButton>
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