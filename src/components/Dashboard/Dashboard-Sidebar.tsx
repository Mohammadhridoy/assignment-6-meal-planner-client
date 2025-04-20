"use client"

import {
    UserRoundPen,
    CalendarArrowDown,
    UserRound,
    Car,
    View,
    Logs
  } from "lucide-react"
  

  
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
  } from "@/components/ui/sidebar"
import { NavMain } from "./Dashboard-nav"
import { NavUser } from "./Dashboard-NavUser"

  
  
  
  
  
  
  const data = {
      user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      navMain: { 
       user: [ 
          {
            title: "My profile",
            url: "/dashboard",
            icon: UserRoundPen,
            isActive: false,
          },
          {
            title: "View Orders ",
            url: "/dashboard/user/vieworder",
            icon:  View,
            isActive: false,
          },{
            title:"Order Tracking",
            url:"/dashboard/user/ordertracking",
            icon: Logs,
            isAction: false
          }
  
        ],
        admin: [ 
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
  
  
    
  
      return (
        <Sidebar className="" collapsible="icon" {...props}>
  
          <SidebarContent className="mt-20" >
  
            
               <NavMain items={data.navMain.admin} /> 
              {/* :<NavMain items={data.navMain.user} /> */}
  
          
          </SidebarContent>
  
  
          <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>
      )
    }