"use client"

import {
    UserRoundPen,
    CalendarArrowDown,
    UserRound,
    Car,
    View,
    Logs,
    Settings,
    SquarePen

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
            url: "/customer/select-meals",
            icon: Logs,
            isActive: false,
          },
          {
            title: "Track-Orders",
            url: "/customer/trackOrders",
            icon:  View,
            isActive: true,
            items: [
              {
                title: "Order-History",
                url: "/customer/trackOrders/history",
              },
              {
                title: "Order-Ongoing",
                url: "/customer/trackOrders/ongoing",
              },
            
            ],
          },{
            title:"Preferences",
            url:"/customer/preferences",
            icon:  Settings,
            isAction: false
          },
         

  
        ],
         provider: [
          {
            title: "Dashboard",
            url: "/provider/dashboard",
            icon: UserRoundPen,
            isActive: false,
          },
          {
            title: "Profile",
            url: "/provider/profile",
            icon: UserRoundPen,
            isActive: false,
          },
          {
            title: "Post Meal Manu",
            url: "/provider/post-meal-menu",
            icon: SquarePen,
            isActive: true,
          },
          {
            title: "View Order",
            url: "/provider/View-Order",
            icon:  View,
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