"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  userType: z.enum(["doctor", "patient"], { required_error: "Please select a user type." }),
});

export default function LoginPage() {
  const router = useRouter();

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "patient",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (
        values.email === "patient@gmail.com" &&
        values.password === "12345678" &&
        values.userType === "patient"
      ) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ name: "Patient", userType: "patient" })
        );

        toast({ title: "Login Successful", description: "Welcome back, Patient!" });

        console.log("Redirecting to home page...");
        window.location.href = "/"; // Redirect and reload
        return;
      }

      // Safely parse localStorage data
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find(
        (u: any) =>
          u.email === values.email &&
          u.password === values.password &&
          u.userType === values.userType
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        toast({ title: "Login Successful", description: `Welcome back, ${user.name}!` });

        console.log("Redirecting to home page...");
        window.location.href = "/"; // Redirect and reload
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Please check your email, password, or user type.",
        });
      }
    } catch (error) {
      console.error("Error handling login:", error);
      toast({ variant: "destructive", title: "Error", description: "Something went wrong." });
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Card className="w-[400px] shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* User Type Selection */}
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>I am a</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-row space-x-6"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem name="userType" value="patient" />
                          <FormLabel className="text-sm">Patient</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem name="userType" value="doctor" />
                          <FormLabel className="text-sm">Doctor</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="transition-colors duration-200 focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="transition-colors duration-200 focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}