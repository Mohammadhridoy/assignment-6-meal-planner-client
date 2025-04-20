"use client"

import Link from "next/link";
import {  useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import ProfileIcon from "./ProfileIcon";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthServices";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constant";



const Navbar = () => {
    const [open, setOpen] = useState(false)

    const {user, setIsLoading} = useUser()
    
    const pathname = usePathname()
    const router = useRouter()
 
const handlelogout = () =>{
    logout()
    setIsLoading(true)
    if(protectedRoutes.some(route => pathname.match(route))){
        router.push('/')
       
    }
}

    return (
       <header className="w-full bg-white border-b shadow-sm sticky 
       top-0 left-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between" 
        >
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-primary">
            MealMate
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex gap-6 items-center" >
                 <Link href="/" className="hover:text-primary transition ease-in-out">Home</Link>
                 <Link href="/find-meals" className="hover:text-primary transition ease-in-out">Find Meals</Link>
                 {
                    user ? <Link href="/dashboard/customer" className="hover:text-primary transition  ease-in-out">Dashboard</Link> : null
                 }
                {
                    user?  <ProfileIcon/> : <div >
                    <Link href="/login" className="hover:text-primary transition  mr-3">
                      <Button size="sm" className="cursor-pointer hover:bg-primary transition ease-in-out" variant="outline">
                        login
                      </Button>
                     </Link>
                     <Link href="/register" className="hover:text-primary transition ">
                      <Button size="sm" className="cursor-pointer hover:bg-primary transition ease-in-out" variant="outline">
                        Register
                      </Button>
                     </Link>
                    </div>
                }
                
            </nav>

            {/* Mobile Menu button */}
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                       
                         <Button variant="ghost" size='icon' >
                            <Menu className="w-6 h-6"/>
                        </Button>
                          
                        
                    </SheetTrigger>

                    <SheetContent side="right" className="w-[250px] p-4">
                        <div className="flex flex-col space-y-4" >
                            <Link href="/" onClick={()=> setOpen(false)} >Home</Link>
                            <Link href="/find-meals" onClick={()=> setOpen(false)} >
                            Find Meals</Link>
                           {
                            user? <div className="flex flex-col space-y-2"> 
                                   <Link href="/dashboard" onClick={()=> setOpen(false)} >
                            Dashboard</Link>
                            <Link href="/findmeals" onClick={()=> setOpen(false)} >
                            Profile</Link>
                            <Link href="/" onClick={()=> setOpen(false)} >
                            <Button onClick={ handlelogout} className=" w-full mt-3 cursor-pointer hover:bg-primary transition ease-in-out" variant="outline">
                               logout
                            </Button>
                            </Link>
                            </div> :  <div className="">
                            <Link href="/login" onClick={()=> setOpen(false)} >
                            <Button className=" w-full cursor-pointer hover:bg-primary transition ease-in-out" variant="outline">
                               login
                            </Button>
                            </Link>
                            <Link href="/register" onClick={()=> setOpen(false)} >
                            <Button className=" w-full cursor-pointer hover:bg-primary transition ease-in-out" variant="outline">
                               register
                            </Button>
                            </Link>
                            </div>
                           }


                            
                         
                            
                        </div>
                        <SheetTitle> </SheetTitle>
                    </SheetContent>

                </Sheet>
            </div>

        </div>

       </header>
    );
};

export default Navbar;