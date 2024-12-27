import { Budget } from "@/app/budgets/page";
import { Button } from "./ui/button";
import { FilePenLine, FileX2 } from "lucide-react";

interface BudgetItemProps {
    budget: Budget;
}

export function BudgetItem({ budget}: BudgetItemProps) {
    return (
    <div className="flex flex-col gap-2 bg-white p-2 shadow-md w-28 max-w-28">
      <p className="text-xs">Nº: {budget.id}</p>
      <p className="text-xs truncate">{budget.customer.name}</p>
      <p className="text-sm font-semibold">R$ {budget.total}</p>
      
      <div className="flex justify-between mt-2">
      <Button className="h-9 bg-zinc-300" size="icon" variant="outline">
        <FilePenLine size={16}/>
      </Button>
      <Button className="h-9" size="icon">
        <FileX2 size={16}/>
      </Button>
      </div>
    </div>
  );
}