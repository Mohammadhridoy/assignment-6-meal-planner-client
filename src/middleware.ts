import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "./services/AuthServices"

type Role = keyof typeof roleBasedPrivateRoutes

const authRoutes = ['/login', '/register']


const roleBasedPrivateRoutes = {
    customer:[/^\/customer/, ],
    provider:[/^\/provider/]
}

export const middleware = async (request: NextRequest) =>{

    const {pathname} = request.nextUrl

 

    const userInfo = await getCurrentUser()
    
    if(!userInfo){
        if(authRoutes.includes(pathname)){
            return NextResponse.next()
        }else{
            return NextResponse.redirect(
                new URL(
                   `http://localhost:3000/login?redirectPath=${pathname}`,
                   request.url
                )
            )
        }
    }

    if(userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role ]){
        const routes = roleBasedPrivateRoutes[userInfo?.role as Role]
        
        if(routes.some((route) => route.test(pathname))){
            return NextResponse.next()
        }


        
    }
    return NextResponse.redirect(new URL('/', request.url))

    

}


export const config = {
    matcher: [
        "/login",
        "/customer/trackOrders/:page",
        "/customer/:path*",
        "/provider/:path*"
    ],
}