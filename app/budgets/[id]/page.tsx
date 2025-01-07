import { PageA4 } from "@/components/page-A4";
import { budgets } from "../page";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getEnterpriseById } from "@/actions/enterprises";
import { getBudgetById } from "@/actions/budgets";

export default async function Page({ params }: { params: { id: string } }) {
    const budget = await getBudgetById(Number(params.id))

    return (
        <>
            <AppSidebar />
            <SidebarTrigger className="mt-[65px]" />
            <main className="flex flex-col items-center gap-8 pt-20 pb-5 w-full max-w-screen-lg mx-auto min-h-screen max-h-screen overflow-auto">
                <PageA4 budget={budget} />
            </main>
        </>
    )
}