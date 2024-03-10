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
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { useRouter } from "next/navigation";

import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
 
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
import { register } from "@/actions/register";
import RegisterSchema from "@/schemas/RegisterSchema";

 
const Signup = () => {

  const {toast} = useToast();
 
   const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isloding = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
    try {
      const res =  await  register(values)
       
      form.reset();
      if(res?.success){
        toast({
          variant:"success",
          title: "Signup Success",
          description: "you are now signed up",
        })   
         router.push("/auth/login");
      }


      if(res?.error){
        toast({
          variant:"destructive",
          title:res.error,
          description: "Email Alerady in use",
        })   
         
      }
      form.reset();
   
      router.refresh(); 
    } catch (error) {
      toast({
        variant:"destructive",
        title: "Something went wrong",
        description: "user already exists",
      })
      console.log(error);
    }
  }

  return (
    <>
      <div className=" flex h-[100vh] w-full justify-center items-center">
        <Card className="p-5 max-w-lg w-full">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-3xl">Signup</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                disabled={isloding}
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
                  {isloding ? <Loader2 className=" animate-spin" /> : "Signup"}
                </Button>
                <span className="text-sm text-zinc-500">
                  {" "}
                  You have already singup?
                  <Link href="/auth/login" className="text-blue-500">
                    {" "}
                    login
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

export default Signup;
