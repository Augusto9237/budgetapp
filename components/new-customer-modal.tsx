'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react"

const formSchema = z.object({
    cnpj: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    businessName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    tradeName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    buyer: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    contact: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})


export function NewCustomerModal() {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cnpj: "",
            businessName: "",
            tradeName: "",
            buyer: "",
            contact: "",
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    function handleCancel() {
        setIsOpen(false);
        form.reset();
    }


    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(open => !open)}>
            <DialogTrigger asChild>
                <Button className="bg-sky-700 hover:bg-sky-800 gap-2" size="sm">
                    <UserRoundPlus size={16} />
                    Adicionar Cliente
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Adicionar Cliente</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="cnpj"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CNPJ/CPF</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o CNPJ" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="businessName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Razão Social</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite a Razão Social" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tradeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Fantasia</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o Nome Fantasia" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="buyer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Responsável</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do responsavel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o E-mail" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o Telefone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full justify-center gap-4 pt-4">
                            <Button type="submit">
                                Confirmar
                            </Button>
                            <Button variant="outline" type="reset" onClick={() => handleCancel()}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}