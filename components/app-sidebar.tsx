"use client"
import * as React from "react"
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


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar collapsible="icon" {...props} className="mt-14">
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <ModalAddCustomer />
            </SidebarMenuItem>

            <SidebarMenuItem>
              <ModalAddProduct/>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="group/collapsible">
                <Wrench />
                <span>Adicionar Serviço</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Separator />
        </SidebarContent><SidebarFooter>
          <SidebarMenu className="pb-14">
            <SidebarMenuItem>
              <SidebarMenuButton className="group/collapsible bg-primary justify-center text-white pl-2">
                <Save className="" />
                <span>Salvar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="group/collapsible justify-center pl-2">
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
