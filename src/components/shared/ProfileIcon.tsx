"use client"
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { logout } from "@/services/AuthServices";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/UserContext";


const ProfileIcon = () => {

    const {setIsLoading} = useUser()

    const handleLogout = () =>{
        logout()
        setIsLoading(true)
    }

    return (
        <div>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
            {/* Profile images  */}
            <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
                    
          
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
          Dashboard 
            
          </DropdownMenuItem>
          <DropdownMenuItem>
            Profile
            
          </DropdownMenuItem>
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