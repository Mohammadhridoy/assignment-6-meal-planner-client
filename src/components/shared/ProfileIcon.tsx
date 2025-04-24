"use client"
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { logout } from "@/services/AuthServices";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { protectedRoutes } from "@/constant";
import { usePathname, useRouter } from "next/navigation";


const ProfileIcon = () => {

  const {user} = useUser()
    const { setIsLoading} = useUser()
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () =>{
        logout()
        setIsLoading(true)
           if(protectedRoutes.some(route => route.test(pathname))){
                router.push("/")
            }
    }

    const getDashboardpath = (role: string | undefined | null)=>{
      switch(role){
        case "provider": 
        return "/provider/dashboard"
        case "customer": 
        return "customer/profile"
        default: return "/"
      }
    }

    return (
      
         <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            
                {/* Profile images  */}
                <Avatar>
                <AvatarImage className="cursor-pointer" src="https://i.ibb.co.com/pjmPgWrN/avater01.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                        
              
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            {
              user?.role &&  <Link href={getDashboardpath(user?.role)}> 
              <DropdownMenuItem  className="cursor-pointer">
               Dashboard 
               </DropdownMenuItem>
              </Link>
            }
              <DropdownMenuItem>
               Order Meal
               
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut/>
              Log out
              
            </DropdownMenuItem>
            </DropdownMenuGroup>
          
           
          </DropdownMenuContent>
        </DropdownMenu> 
       
        
    </div> 
       
    );
};

export default ProfileIcon;