"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Navbar() {
  // State to track logged-in user
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null);

  // Fetch logged-in user from localStorage after component mounts
  useEffect(() => {
    const fetchUser = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
      setLoggedInUser(user);
    };

    // Initial fetch
    fetchUser();

    // Add an event listener to update the state when login/logout occurs
    window.addEventListener("storage", fetchUser);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("storage", fetchUser);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null); // Clear the logged-in user state
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary animate-pulse" />
          <span className="text-xl font-bold text-primary tracking-wide">Care Medify</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/specialties"
            className="transition-colors duration-200 ease-in-out hover:text-primary"
          >
            Specialties
          </Link>
          <Link
            href="/doctors"
            className="transition-colors duration-200 ease-in-out hover:text-primary"
          >
            Doctors
          </Link>
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {loggedInUser ? (
            <>
              <span className="text-primary font-medium">Hello, {loggedInUser.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}