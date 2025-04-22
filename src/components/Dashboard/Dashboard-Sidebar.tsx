"use client"

import {
    UserRoundPen,
    CalendarArrowDown,
    UserRound,
    Car,
    View,
    Logs,
    Settings

  } from "lucide-react"
  

  
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
  } from "@/components/ui/sidebar"
import { NavMain } from "./Dashboard-nav"
import { NavUser } from "./Dashboard-NavUser"
import { useUser } from "@/context/UserContext"
import { useState } from "react"

  
  
  
  
  
  
  const data = {
      navMain: { 
       customer: [ 
        {
          title:"profile",
          url:"/customer/profile",
          icon: UserRound,
          isAction: false,
         
        },
          {
            title: "Select-meals",
            url: "/dashboard/customer/select-meals",
            icon: Logs,
            isActive: false,
          },
          {
            title: "Track-Orders",
            url: "/dashboard/customer/trackOrders",
            icon:  View,
            isActive: true,
            items: [
              {
                title: "Order-History",
                url: "/dashboard/customer/trackOrders/history",
              },
              {
                title: "Order-Ongoing",
                url: "/dashboard/customer/trackOrders/ongoing",
              },
            
            ],
          },{
            title:"Preferences",
            url:"/dashboard/customer/preferences",
            icon:  Settings,
            isAction: false
          },
         

  
        ],
         provider: [ 
          {
            title: "My profile",
            url: "/dashboard",
            icon: UserRoundPen,
            isActive: false,
          },
          {
            title: "Users",
            url: "/dashboard/admin/users",
            icon: UserRound,
            isActive: true,
          },
          {
            title: "Products",
            url: "/dashboard/admin/products",
            icon:  Car,
            isActive: true,
          },
          {
            title: "Orders",
            url: "/dashboard/admin/orders",
            icon: CalendarArrowDown,
            isActive: true,
          },
  
        ],
       }
  
  
    }
  
  
  export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
      const {user, setIsLoading} = useUser()

     
  

      return (
        <Sidebar className="" collapsible="icon" {...props}>
  
          <SidebarContent className="mt-20" >
  
          {/* <NavMain items={link} />  */}
               {/* {
                user?.role == "customer" || "provider"? <NavMain items={link} /> 
                :<NavMain items={data.navMain.provider} />
               } */}

              {
                user?.role == "provider" ? <NavMain items={data?.navMain?.provider} />
                : <NavMain items={data?.navMain?.customer} /> 
                
              }
               
          
          </SidebarContent>
  
  
          <SidebarFooter>
            <NavUser user={user} setIsLoading={setIsLoading} />
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>
      )
    }