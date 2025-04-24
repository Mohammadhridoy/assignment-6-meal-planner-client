import { z } from "zod";

export const createMealShema = z.object({
        mealname:z.string(),
        description:z.string(),
        price: z.string(),
        category: z.enum(["Veg" , "Non-Veg"]),
        portionSize: z.enum(["small" , "medium" , "large"]),
        image: z.string(),
        ingredients:  z.array(z.string()),
        preparationTime: z.string(),

    
})