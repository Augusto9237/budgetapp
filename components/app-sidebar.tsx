"use client"
import { useContext } from "react"
import {
  PackagePlus,
  Save,
  SaveOff,
  UserPlus,
  Wrench,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"
import { ModalAddCustomer } from "./modal-add-customer"
import { ModalAddProduct } from "./modal-add-product"
import { updateBudget } from "@/actions/budgets"
import { GlobalContext } from "@/context/global-context"
import toast from "react-hot-toast"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { selectedCustomer, productsBucket, removeProductFromBudget } = useContext(GlobalContext);

  async function updateBudgetFinal() {
    console.log('updateBudgetFinal', selectedCustomer, productsBucket)
    try {
      await updateBudget(1, selectedCustomer.id, productsBucket)
      toast.success('Orçamento atualizado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Sidebar collapsible="icon" {...props} className="mt-14 bg-background/30">
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <ModalAddCustomer />
            </SidebarMenuItem>

            <SidebarMenuItem>
              <ModalAddProduct />
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="group/collapsible">
                <Wrench />
                <span>Adicionar Serviço</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Separator />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu className="pb-14">
            <SidebarMenuItem>
              <SidebarMenuButton className="group/collapsible bg-primary text-white" onClick={updateBudgetFinal}>
                <Save className="" />
                <span>Salvar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="group/collapsible">
                <SaveOff className="" />
                <span>Cancelar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter><SidebarRail />
      </Sidebar >
    </>
  )
}
