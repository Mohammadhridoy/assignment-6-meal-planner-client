
"use client"

import {  ChevronsUpDown, Home, LogOut, Sparkles,} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  } from "@/components/ui/sidebar"
import { toast } from "sonner"
import { Tuser } from "@/types/types"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { logout } from "@/services/AuthServices"
import { Dispatch, SetStateAction } from "react"
import { usePathname, useRouter } from "next/navigation"
import { protectedRoutes } from "@/constant"
import { useUser } from "@/context/UserContext"





export function NavUser({
  // user, setIsLoading
}: {
  user: Tuser | null,
  setIsLoading: Dispatch<SetStateAction<boolean>>
}) {

  const pathname = usePathname()
  const router = useRouter()
 
  const {user, setIsLoading, setUser} = useUser()

  const handleLogout = () =>{
    logout()
    toast.warning("logout")
    setIsLoading(true)
    setUser(null)
      if(protectedRoutes.some(route => route.test(pathname))){
            router.push("/")
        }
       
    
  }

const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="https://i.ibb.co.com/pjmPgWrN/avater01.png" alt={user?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              
             
              
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="https://i.ibb.co.com/pjmPgWrN/avater01.png" alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link  className="font-semibold" href="/find-meals">
              <DropdownMenuItem>
                <Sparkles />
                Find-Meals
              </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            
              
              <DropdownMenuItem>
                <Link className="flex justify-between items-center gap-3 font-semibold" href="/">
                <Home />
                Home
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>

          
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
