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


import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react"
import { Budget } from "@/app/budgets/page"

const formSchema = z.object({
    enterprise: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    customer: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})


interface newBudgetProps {
    budgets: Budget[];
}


export function NewBudgetModal({ budgets }: newBudgetProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            enterprise: "",
            customer: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button  size="sm">
                    <FilePlus2 size={16} />
                    Novo orçamento
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Novo Orçamento</DialogTitle>
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
                                            <SelectItem value="CNPJ1">Empresa 1</SelectItem>
                                            <SelectItem value="CNPJ2">Empresa 2</SelectItem>
                                            <SelectItem value="CNPJ3">Empresa 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Selecione uma empresa para iniciar um orçamento.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Salvar</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}