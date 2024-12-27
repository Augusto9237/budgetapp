'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'react-hot-toast';
import { Button } from "./ui/button"
import { useState, useContext, useEffect, Dispatch, SetStateAction } from "react"
import { Customer, GlobalContext } from "@/context/global-context"
import { Input } from "./ui/input"
import { Pencil } from "lucide-react";



type Product = {
    name: string;
    reference: string;
    code: string;
    brand: string;
    price: number;
};


interface ModalConfirmProductProps {
    product: Product;
    discountEdit: number;
    quantityEdit: number;
}

export function ModalEditProduct({ product, quantityEdit, discountEdit }: ModalConfirmProductProps) {
    const { addProductToBucket } = useContext(GlobalContext);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(product);
    const [quantity, setQuantity] = useState(1);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        setSelectedProduct(product);
        setQuantity(quantityEdit);
        setDiscount(discountEdit);
    }, [product, isConfirmOpen]);

    function handleConfirm(product: Product) {
        addProductToBucket({ ...product, price: (product.price - discount) }, quantity, discount);
        toast.success(`${product.name} foi adicionado ao orçamento`);
        setIsConfirmOpen(false);
        setSelectedProduct(null);
        setQuantity(1);
        setDiscount(0);
    }

    return (
        <Dialog open={isConfirmOpen} onOpenChange={() => setIsConfirmOpen(open => !open)}>
            <DialogTrigger asChild>
                <Button variant="outline" className="h-7 w-7">
                    <Pencil />
                </Button>
            </DialogTrigger>
            {selectedProduct && (
                <DialogContent className="max-w-screen-sm">
                    <DialogHeader>
                        <DialogTitle className="text-center">Editar Produto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-5 text-sm">
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

                        <div className="grid grid-cols-5 text-sm w-full">
                            <span className="text-start truncate">
                                {selectedProduct.code}
                            </span>

                            <span className="text-start">
                                {selectedProduct.reference}
                            </span>
                            <span className="text-start col-span-2">
                                {selectedProduct.name}
                            </span>
                            <span className="text-start">
                                R$ {selectedProduct.price}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <Input placeholder="Quantidade" type='number' defaultValue={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                            <Input placeholder="Desconto" type='number' defaultValue={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                        </div>
                        <div className="flex w-full justify-center gap-4">
                            <Button onClick={() => handleConfirm(selectedProduct)}>
                                Confirmar
                            </Button>
                            <Button variant="outline">
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    )
}