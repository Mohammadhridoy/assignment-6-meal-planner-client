import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem,
    FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"; 



const CustomerForm = () => {

      const form = useForm();
            
              const {formState:{ isSubmitting}} = form

    const onSubmitTwo: SubmitHandler<FieldValues> = async (data ) =>{
        console.log(data);
      }
    
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitTwo)}>
                   
                 <div className="pt-10">
                 <h1 className="font-semibold text-xl  pb-5">Change Password </h1> 
                 <div className="md:flex    items-center  md:gap-11 lg:gap-7  ">
                
                <FormField
                control={form.control}
                name="currentpassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel> Current Password</FormLabel>
                    <FormControl>
                        <Input className="md:w-44 lg:w-96"  placeholder="Enter your current password "  type="password" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )} />

                <FormField
                control={form.control}
                name="newpassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                        <Input className="md:w-44 lg:w-96" type="password" placeholder="Enter new password" {...field} value={field.value || ''} />
                    
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )} />
                </div>
                 </div>

              


                <Button className=" mt-3  text-white text-xl p-5 shadow-sm " type="submit">
                    {isSubmitting ? "Saving....": "save"} 
                </Button>

                </form>
                </Form>
            
        </div>
    );
};

export default CustomerForm;