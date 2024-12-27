import { PageA4 } from "@/components/page-A4";
import { budgets } from "../page";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page({ params }: { params: { id: string } }) {
    const budgetFilter = budgets.filter((budget) => budget.id === Number(params.id));

    

    return (
        <>
            <AppSidebar />
            <SidebarTrigger className="mt-[65px]" />
            <main className="flex flex-col items-center gap-8 pt-20 pb-5 w-full max-w-screen-lg mx-auto min-h-screen max-h-screen overflow-auto">
                <PageA4 budget={budgetFilter[0]} />
            </main>
        </>
    )
}