import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Title Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient-x">
              Welcome to Care Medify
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl leading-relaxed">
              Your trusted healthcare platform connecting patients with expert medical professionals. Book
              consultations, manage your health records, and get the care you deserve.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="transition-transform duration-300 ease-in-out hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            >
              <Link href="/report-analyze">Report Analyse</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}