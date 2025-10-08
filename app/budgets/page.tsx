import { getBudgets } from "@/actions/budgets";
import { getEnterprises } from "@/actions/enterprises";
import { BudgetList } from "@/components/budeget-list";
import { BudgetItem } from "@/components/budget-item";
import { NewBudgetModal } from "@/components/new-budget-modal";


enum BudgetStatus {
  IN_PROCESS = "IN_PROCESS",
  SENT = "SENT",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}


export default async function Page() {
  const enterprises = await getEnterprises();
  const budgets = await getBudgets()

  return (
    <main className="flex flex-col items-center gap-8 pt-20 pb-5 w-full max-w-screen-xl px-5 mx-auto min-h-screen max-h-screen overflow-auto">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold">Orçamentos e Ordem de serviços</h2>
        <NewBudgetModal enterprises={enterprises} />
      </div>

      <BudgetList budgets={budgets} enterprises={enterprises} />
    </main>
  );
}
