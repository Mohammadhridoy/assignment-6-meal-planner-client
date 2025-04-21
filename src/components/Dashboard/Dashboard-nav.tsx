"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"


type Titems = {
    title: string,
    url: string,
  }



export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon 
    isActive?: boolean 
    items?: Titems[]
  }[] | null 
}) 
{
  
   


  return (
    
    <SidebarGroup>
      <SidebarGroupLabel className="text-xl uppercase text-black py-4 "> Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem className="mt-5" >
              <CollapsibleTrigger asChild>

               <SidebarMenuButton 
               className="md:py-4 md:text-[14px] cursor-pointer lg:text-[17px] font-semibold font-sans shadow-sm hover:text-red-500  transition-all "
               tooltip={item.title}>
                  <Link className="flex justify-between items-center gap-3" href={item.url}>
                  {item.icon && <item.icon />}
                  <span >{item.title}</span>
                  </Link>
                  {
                    item?.items && <ChevronRight className="ml-auto transition-transform duration-200
                     group-data-[state=open]/collapsible:rotate-90" />
                  }
                </SidebarMenuButton> 
 
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item?.items && item?.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton className="mt-4" asChild>
                        <Link className="md:py-4 md:text-[14px] lg:text-[14px] font-semibold font-sans shadow-sm hover:text-red-500  transition-all "
                         href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>


            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
