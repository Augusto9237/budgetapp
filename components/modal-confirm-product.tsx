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
import { formatCurrency } from "@/utils/formatCurrency";



type Product = {
    name: string;
    reference: string;
    code: string;
    brand: string;
    price: number;
};


interface ModalConfirmProductProps {
    product: Product;
    selectedProduct: Product | null;
    isConfirmOpen: boolean;
    setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedProduct: Dispatch<SetStateAction<Product | null>>
}

export function ModalConfirmProduct({ product, selectedProduct, isConfirmOpen, setIsConfirmOpen, setSelectedProduct }: ModalConfirmProductProps) {
    const { addProductToBucket } = useContext(GlobalContext);
    const [quantity, setQuantity] = useState(1);
    const [discount, setDiscount] = useState(0);

    function handleConfirm(product: Product) {
        addProductToBucket({ ...product, price: (product.price - discount) }, quantity, discount);
        toast.success(`${product.name} foi adicionado ao orçamento`);
        setIsConfirmOpen(false);
        setSelectedProduct(null);
        setQuantity(1);
        setDiscount(0);
    }

    function handleCancel() {
        setIsConfirmOpen(false);
        setSelectedProduct(null);
        setQuantity(1);
        setDiscount(0);
    }


    return (
        <Dialog open={isConfirmOpen} onOpenChange={() => setIsConfirmOpen(open => !open)}>
            <DialogTrigger asChild onClick={() => setSelectedProduct(product)}>
                <Button variant="outline" className="grid grid-cols-5 text-sm w-full px-2">
                    <span className="text-start truncate">
                        {product.code}
                    </span>

                    <span className="text-start">
                        {product.reference}
                    </span>
                    <span className="text-start col-span-2">
                        {product.name}
                    </span>
                    <span className="text-start">
                        {formatCurrency(product.price)}
                    </span>
                </Button>
            </DialogTrigger>
            {selectedProduct && (
                <DialogContent className="max-w-screen-sm">
                    <DialogHeader>
                        <DialogTitle className="text-center">Adicionar Produto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
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
                                {formatCurrency(selectedProduct.price)}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-sm">
                                    Quantidade
                                </span>
                                <Input placeholder="Quantidade" type='number' defaultValue={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                            </div>

                            <div className="space-y-2">
                                <span className="text-sm">
                                    Desconto
                                </span>
                                <Input placeholder="Desconto" type='number' defaultValue={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="flex w-full justify-center gap-4 pt-4">
                            <Button onClick={() => handleConfirm(selectedProduct)}>
                                Confirmar
                            </Button>
                            <Button variant="outline" onClick={() => handleCancel()}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    )
}