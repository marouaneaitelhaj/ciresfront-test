/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { loginSchema } from "@/lib/schemas";
import type { z } from 'zod';
import { ToggleLeft as Google } from 'lucide-react';
import { Login } from "@/API/login";
import { TloginRequest } from "@/lib/types";
import { useRouter } from "next/navigation";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });
  const onSubmit = async (data: TloginRequest) => {
    try{
        const result = (await Login(data)).data;
        console.log(result.token);
        document.cookie = `token=${result.token}; path=/`
        router.push("/");
    }catch(error:any){
        toast.error(error?.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Welcome back, Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                {...register('username')}
                id="username"
                label="Username"
                type="username"
                error={errors.username}
                placeholder="Enter your username"
              />

              <Input
                {...register('password')}
                id="password"
                label="Password"
                type="password"
                error={errors.password}
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                {...register('remember')}
                id="remember"
                label="Remember for 30 days"
              />
                <button 
                type="button" 
                className="text-sm font-medium text-black hover:text-gray-700"
                >
                Forgot password?
                </button>
            </div>

            <div className="space-y-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>

              <Button type="button" variant="secondary">
                <Google className="h-5 w-5 mr-2" />
                Sign in with Google
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button className="font-medium text-black hover:text-gray-700">
              Sign up for free
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Testimonial */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 z-10" />
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Office workspace"
        />
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
          <blockquote className="text-white">
            <p className="text-2xl font-medium mb-4">
              &quot;We&apos;ve been using Untitled to kick start every new project and can&apos;t imagine working without it.&quot;
            </p>
            <footer className="mt-2">
              <p className="text-xl font-semibold">Andi Lane</p>
              <p className="text-sm opacity-80">Founder, Catalog</p>
              <p className="text-sm opacity-80">Web Design Agency</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}