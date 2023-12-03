import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ToastAction } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"


import {
  Form,
  FormControl,
  
  FormField,
  FormItem, 
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInValidation} from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"

import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"


import { useUserContext } from "@/context/AuthContext"

const SignInForm = () => {
  const { toast } = useToast()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
   const navigate = useNavigate();

  const {mutateAsync: signInAccount} =
  useSignInAccount();
    // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email:'',
      password:'',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
     
      const session = await signInAccount({
        email: values.email, 
        password: values.password,
      })

      if(!session){
        return toast({
          variant: "destructive",
          title: "Sign up failed. Please try again.",
          
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }

      const isLoggedIn = await checkAuthUser;
      
      if(isLoggedIn){
        form.reset();
        navigate('/')
      }else{
          return toast({
          variant: "destructive",
          title: "Sign up failed. Please try again.",
          
          action: <ToastAction altText="Try again" onClick={handleTryAgain}>Try again</ToastAction>,
        })
      }

      function handleTryAgain() {
        // Programmatically trigger form submission
  }
      
  }

  return (
      <Form {...form}>
            <div className="sm:w-420 flex flex-center flex-col">
              <div className="flex flex-center">
                <img src="/assets/images/logo .svg" width={60} height={60}/>
                <h1 className="text-2xl px-1 text-primary-600">Connect</h1>
              
              </div>
              <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">Log in to your account</h2>
              <p className="text-light-3 small-medium md:base-regular mt-2">
                Welcome back! Please enter your details
              </p>
               

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
             
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
                {isUserLoading? (
                  <div className="flex-center gap-2">
                    <Loader/> Loading...
                  </div>
                ): 'Log In'}
              </Button>
              <p className="text-small-regular text-light-2 text-center">
                New here?
                <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Create an account</Link>
              </p>
            </form>
            </div>
       </Form>  
    
  )
}

export default SignInForm
