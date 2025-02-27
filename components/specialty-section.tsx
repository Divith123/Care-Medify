import Link from "next/link";
import { Heart, Brain, Droplet, Activity, Baby } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const specialties = [
  {
    title: "Cardiology",
    icon: Heart,
    description: "Expert care for heart conditions",
    href: "/specialties/cardio",
  },
  {
    title: "Neurology",
    icon: Brain,
    description: "Specialized neurological treatment",
    href: "/specialties/neuro",
  },
  {
    title: "Diabetology",
    icon: Droplet,
    description: "Diabetes management and care",
    href: "/specialties/diabetic",
  },
  {
    title: "Oncology",
    icon: Activity,
    description: "Cancer treatment and support",
    href: "/specialties/tumor",
  },
  {
    title: "Gynecology",
    icon: Baby,
    description: "Women's health specialists",
    href: "/specialties/gynecology",
  },
];

export function SpecialtySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              Our Specialties
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose from our wide range of medical specialties and connect with expert doctors.
            </p>
          </div>

          {/* Specialty Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {specialties.map((specialty) => (
              <Link key={specialty.title} href={specialty.href}>
                <Card className="group relative overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 ease-in-out hover:border-primary hover:shadow-2xl hover:scale-[1.02] h-full">
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                    <specialty.icon className="h-10 w-10 text-primary animate-pulse" />
                  </div>

                  {/* Card Content */}
                  <CardHeader className="flex flex-col items-center justify-center space-y-2 p-4">
                    <specialty.icon className="h-8 w-8 text-primary transition-transform duration-300 ease-in-out group-hover:scale-110" />
                    <CardTitle className="text-center text-lg font-semibold text-primary group-hover:text-primary-dark">
                      {specialty.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-center text-sm text-gray-500 group-hover:text-gray-700">
                      {specialty.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}