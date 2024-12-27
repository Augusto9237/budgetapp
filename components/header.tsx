import Link from "next/link";
import { Card } from "./ui/card";

export function Header() {
    return (
        <Card className="rounded-none bg-card-foreground shadow-md text-white p-4 border-none fixed top-0 left-0 right-0 z-20">
            <div className="flex items-center gap-5">
                <div className="flex justify-center">
                    <h1 className="font-bold">Budget App</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/budgets">
                        Orçamentos
                    </Link>
                    <Link href="/">
                        Clientes
                    </Link>
                    <Link href="/">
                        Produtos/Serviços
                    </Link>
                    <Link href="/">
                        Empresas
                    </Link>
                </div>
            </div>
        </Card>
    )
}