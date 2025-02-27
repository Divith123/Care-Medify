import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

// Mock data - Replace with real data from your backend
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15 years",
    rating: 4.8,
    availableSlots: 5,
    image: "/placeholder.svg",
    qualifications: "MD, FACC",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    experience: "12 years",
    rating: 4.7,
    availableSlots: 3,
    image: "/placeholder.svg",
    qualifications: "MD, PhD",
  },
  // Add more doctors...
]

export default function SpecialtyPage({
  params,
}: {
  params: { specialty: string }
}) {
  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold capitalize mb-2">{params.specialty} Specialists</h1>
        <p className="text-muted-foreground">Find and book appointments with top {params.specialty} specialists</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{doctor.specialty}</Badge>
                <span className="text-sm text-muted-foreground">⭐ {doctor.rating}</span>
              </div>
              <CardTitle className="mb-2">{doctor.name}</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>{doctor.qualifications}</p>
                  <p>{doctor.experience} Experience</p>
                  <p className="text-primary">{doctor.availableSlots} slots available today</p>
                </div>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
              </Button>
              <Button asChild>
                <Link href={`/doctors/${doctor.id}/book`}>Book Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

