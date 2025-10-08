import Link from "next/link";
import { Card } from "./ui/card";
import { Bell, CircleDollarSign } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
    return (
        <Card className="rounded-none shadow-md p-4 border-x-0 border-t-0 border-primary fixed top-0 left-0 right-0 z-20">
            <div className="flex items-center justify-between">
                <div className="flex justify-center items-center gap-2">
                    <CircleDollarSign className="stroke-primary" />
                    <h1 className="text-xl font-bold">BudgetPro</h1>
                </div>

                <div className="flex items-center gap-8">
                    <Link href="/budgets" className="text-sm font-medium text-white/70 hover:text-primary dark:hover:text-primary transition-colors">
                        Orçamentos
                    </Link>
                    <Link href="/customers" className="text-sm font-medium text-white/70 hover:text-primary dark:hover:text-primary transition-colors">
                        Clientes
                    </Link>
                    <Link href="/" className="text-sm font-medium text-white/70 hover:text-primary dark:hover:text-primary transition-colors">
                        Produtos
                    </Link>
                    <Link href="/" className="text-sm font-medium text-white/70 hover:text-primary dark:hover:text-primary transition-colors">
                        Serviços
                    </Link>
                    <Link href="/" className="text-sm font-medium text-white/70 hover:text-primary dark:hover:text-primary transition-colors">
                        Empresas
                    </Link>
                </div>
                <Button variant='ghost' size='icon'>
                    <Bell />
                </Button>
            </div>
        </Card>
    )
}