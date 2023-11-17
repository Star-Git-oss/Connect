import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  
  FormField,
  FormItem, 
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"


const SignUpForm = () => {

  const isLoading = false;
    // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name:'',
      username: "",
      email:'',
      password:'',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
      const newUser = await createUserAccount(values);
      console.log(newUser)
  }

  return (
      <Form {...form}>
            <div className="sm:w-420 flex flex-center flex-col">
              <div className="flex flex-center">
                <img src="/assets/images/logo .svg" width={60} height={60}/>
                <h1 className="text-2xl px-1 text-primary-600">Connect</h1>
              
              </div>
              <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">Create a new account</h2>
              <p className="text-light-3 small-medium md:base-regular mt-2">
                Enter your details to get started with Connect
              </p>
               

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="shad-input" {...field} />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="shad-input" {...field} />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="shad-button_primary">
                {isLoading? (
                  <div className="flex-center gap-2">
                    <Loader/> Loading...
                  </div>
                ): 'Sign up'}
              </Button>
              <p className="text-small-regular text-light-2 text-center">
                Already have an account?
                <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
              </p>
            </form>
            </div>
       </Form>  
    
  )
}

export default SignUpForm
