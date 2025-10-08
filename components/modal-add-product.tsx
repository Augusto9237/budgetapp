'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PackagePlus, UserPlus } from "lucide-react"
import { SidebarMenuButton } from "./ui/sidebar"
import { Button } from "./ui/button"
import { useState, useContext } from "react"
import { Customer, GlobalContext } from "@/context/global-context"
import { ModalConfirmProduct } from "./modal-confirm-product"



export type Product = {
    name: string;
    reference: string;
    code: string;
    brand: string;
    price: number;
};

const products: Product[] = [
    {
        name: "Wireless Headphones",
        reference: "WH-2024",
        code: "WH2024-BLACK",
        brand: "AudioMaster",
        price: 99.99,
    },
    {
        name: "Smartwatch Series 5",
        reference: "SW-5500",
        code: "SW5500-SILVER",
        brand: "TechWear",
        price: 199.99,
    },
    {
        name: "4K Ultra HD TV 55\"",
        reference: "TV-55UHD",
        code: "TV55UHD-SAMSUNG",
        brand: "Samsung",
        price: 799.99,
    },
    {
        name: "Gaming Laptop",
        reference: "GL-1500",
        code: "GL1500-DELL",
        brand: "Dell",
        price: 1499.99,
    },
    {
        name: "Bluetooth Speaker",
        reference: "BS-300",
        code: "BS300-JBL",
        brand: "JBL",
        price: 59.99,
    },
    {
        name: "Wireless Mouse",
        reference: "WM-101",
        code: "WM101-LOGITECH",
        brand: "Logitech",
        price: 29.99,
    },
    {
        name: "Smartphone Pro Max",
        reference: "SP-12PRO",
        code: "SP12PRO-APPLE",
        brand: "Apple",
        price: 1199.99,
    },
    {
        name: "External Hard Drive 1TB",
        reference: "HD-1TB",
        code: "HD1TB-SEAGATE",
        brand: "Seagate",
        price: 89.99,
    },
    {
        name: "Electric Scooter",
        reference: "ES-200",
        code: "ES200-XIAOMI",
        brand: "Xiaomi",
        price: 499.99,
    },
    {
        name: "Action Camera 4K",
        reference: "AC-4K",
        code: "AC4K-GOPRO",
        brand: "GoPro",
        price: 349.99,
    },
];



export function ModalAddProduct() {
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(open => !open)}>
            <DialogTrigger asChild>
                <Button >
                    <PackagePlus />
                    <span>Adicionar Produto</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-md">
                <DialogHeader>
                    <DialogTitle>Produtos</DialogTitle>
                </DialogHeader>

                <div>
                    <div className="grid grid-cols-5 text-sm px-2">
                        <span>
                            Código
                        </span>
                        <span>
                            Referência
                        </span>
                        <span className="col-span-2">
                            Nome
                        </span>
                        <span>
                            Preço
                        </span>
                    </div>

                    <div className="space-y-2 mt-2">
                        {products.map((product) => (
                            <ModalConfirmProduct
                                key={product.code}
                                product={product}
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                                isConfirmOpen={isConfirmOpen}
                                setIsConfirmOpen={setIsConfirmOpen} />
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}