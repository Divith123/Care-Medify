import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Image from "next/image"

// Mock data - Replace with real data from your backend
const doctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiology",
  experience: "15 years",
  rating: 4.8,
  availableSlots: 5,
  image: "/placeholder.svg",
  qualifications: "MD, FACC",
  about:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.",
  education: [
    "MD - Stanford University School of Medicine",
    "Residency - Johns Hopkins Hospital",
    "Fellowship - Cleveland Clinic",
  ],
  specializations: ["Preventive Cardiology", "Heart Failure Management", "Cardiac Imaging", "Nuclear Cardiology"],
  languages: ["English", "Spanish"],
  consultationFee: "$200",
}

export default function DoctorPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-48 w-48 rounded-lg overflow-hidden">
              <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{doctor.specialty}</Badge>
                  <span className="text-sm text-muted-foreground">⭐ {doctor.rating}</span>
                </div>
                <CardTitle className="text-3xl mb-2">{doctor.name}</CardTitle>
                <CardDescription className="text-lg">{doctor.qualifications}</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Button className="gap-2">
                  <Calendar className="h-4 w-4" /> Book Appointment
                </Button>
                <Button variant="outline">Send Message</Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="about" className="w-full">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{doctor.about}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec) => (
                    <Badge key={spec} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Consultation Fee</h3>
                <p className="text-muted-foreground">{doctor.consultationFee}</p>
              </div>
            </TabsContent>
            <TabsContent value="experience">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <ul className="space-y-2">
                    {doctor.education.map((edu) => (
                      <li key={edu} className="text-muted-foreground">
                        • {edu}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
                  <p className="text-muted-foreground">{doctor.experience}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="text-center py-10 text-muted-foreground">No reviews yet</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

