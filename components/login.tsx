"use client";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
 
 
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
 
 
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
 
 
import { login } from "@/actions/login";
import LoginSchema from "@/schemas/LoginSchema";
 

 
const Login = () => {
  const {toast} = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "", 
      password: "",
    },
  });

  const isloding = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
     
    try {
      const res =  await  login(values);
      form.reset();
       router.refresh();  
      toast({
        variant:"success",
        title:res?.success,
        description: "you are now logdin",
       })


       if(res?.error){
         
      toast({
        variant:"destructive",
        title:res?.error,
        description: "Invalid User",
       })

       }
  
    } catch (error) {
      console.log(error);
      toast({
        variant:"destructive",
        title: "Invalid User",
        description: "Unauthorized User",
       })
       form.reset();

    }
  }

  return (
    <>
      <div className=" flex h-[100vh] w-full justify-center items-center">
        <Card className="p-5 max-w-lg w-full">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-3xl">Login</CardTitle>
            <CardDescription>Login to your account</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
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
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <CardFooter className=" justify-between p-0">
                <Button type="submit">
                  {isloding ? <Loader2 className=" animate-spin" /> : "Login"}
                </Button>
                <span className="text-sm text-zinc-500">
                  {" "}
                  You have not an accont?
                  <Link href="/auth/signup" className="text-blue-500">
                    {" "}
                    signup
                  </Link>
                </span>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;