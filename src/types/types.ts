import { JSX } from "react"

export type Tuser = {
    email:string,
    exp?:number
    iat?: number
    name: string
    phone:string,
    role:  "customer"| "provider",
    address?: string
    _id?:string,
    id?:string
    preferences: {
        dietaryRestrictions:string[],
        preferredCuisines: string[],
        portionSize: "small"| "medium" | "large"
    
    },
    specialties :{
        cuisinespecialties: string[] 
        availability: string[]
        price:string
    },
    rating?:string
}


export type TMeal= {
    map(arg0: (item: TMeal) => JSX.Element): import("react").ReactNode
    mealname:string 
    description:string
    price: string
    category: "Veg" | "Non-Veg"
    portionSize: "Small" | "Medium" | "Large"
    image: string
    tags: string[]
    ingredients:string
    preparationTime: string,
    _id?:string,
    available:boolean,
    isDeleted:boolean,
    

}

export  interface IMenus {
    menuname: string
    providerId: Tuser
    mealSlot: "Breakfast"| "Lunch" |"Dinner"
    meals: TMeal[]
    mealPublishDate: string,
    specialNotes: string
    isDeleted?:boolean,
    _id:string
    
}