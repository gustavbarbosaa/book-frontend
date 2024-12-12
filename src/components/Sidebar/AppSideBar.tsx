import { Book, ChevronRight, Home, LogOut, RefreshCcw, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Button } from "../ui/button"
import React from "react"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Usuários",
      icon: Users,
      items: [
        {
          title: "Listar usuários",
          url: "/usuarios",
        },
      ]
    },
    {
      title: "Livros",
      icon: Book,
      items: [
        {
          title: "Listar livros",
          url: "/livros",
        },
        {
          title: "Cadastrar livro",
          url: "/cadastrar/livro",
        }
      ]
    },
    {
      title: "Empréstimos",
      icon: RefreshCcw,
      items: [
        {
          title: "Realizar empréstimo",
          url: "/cadastrar/emprestimo",
        },
        {
          title: "Listar empréstimos",
          url: "/emprestimos",
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarGroupLabel>Readify</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <CollapsibleTrigger>
                  {item.icon && <item.icon className="mr-2"/>}
                  {item.title}
                  {item.items && item.items.length > 0 && (
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="ml-2">
                    {item.items?.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>  
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <a href="/login" className="w-full">
          <Button type="button" className="w-full">
            Sair 
            <LogOut/>
          </Button>
        </a>
      </SidebarFooter>
    </Sidebar>
  )
}
