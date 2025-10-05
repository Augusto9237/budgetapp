import { PageA4 } from "@/components/page-A4";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getBudgetById } from "@/actions/budgets";

export default async function Page({ params }: { params: { id: string } }) {
    const budget = await getBudgetById(Number(params.id))
    
    return (
        <>
            <AppSidebar />
            <SidebarTrigger className="mt-[65px]" />
            <PageA4 budget={budget} />
        </>
    )
}