'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react"
import { Enterprise } from "@prisma/client"
import { createBudget } from "@/actions/budgets"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
    enterprise: z.string().min(0, {
        message: "Selecione uma empresa",
    }),
})


interface newBudgetProps {
    enterprises: Enterprise[];
}


export function NewBudgetModal({ enterprises }: newBudgetProps) {
    const [isOpen, setIsOpen] = useState(false)
    const route = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            enterprise: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await createBudget(Number(values.enterprise))
            route.push(`/budgets/${response.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">
                    <FilePlus2 size={16} />
                    Novo orçamento
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">Novo Orçamento</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="enterprise"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma empresa" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {enterprises.map((enterprise) => (
                                                <SelectItem key={enterprise.id} value={`${enterprise.id}`}>
                                                    {enterprise.businessName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Selecione uma empresa para iniciar um orçamento.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4 justify-center">
                            <Button type="submit">Salvar</Button>
                            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancelar</Button>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}