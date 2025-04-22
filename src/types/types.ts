
export type Tuser = {
    email:string,
    exp?:number
    iat?: number
    name: string
    phone:string,
    role:  "customer"| "provider",
    address?: string
    _id?:string
}