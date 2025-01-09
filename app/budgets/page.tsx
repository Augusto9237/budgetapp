import { getBudgets } from "@/actions/budgets";
import { getEnterprises } from "@/actions/enterprises";
import { BudgetList } from "@/components/budeget-list";
import { BudgetItem } from "@/components/budget-item";


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
    <main className="flex flex-col items-center gap-8 pt-20 pb-5 w-full max-w-screen-xl max-lg:px-5 mx-auto min-h-screen max-h-screen overflow-auto">
      <BudgetList budgets={budgets} enterprises={enterprises} />
    </main>
  );
}
