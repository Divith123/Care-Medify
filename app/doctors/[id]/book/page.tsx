"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Mock available time slots
const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]

export default function BookingPage({ params }: { params: { id: string } }) {
  const [date, setDate] = useState<Date | undefined>()
  const [timeSlot, setTimeSlot] = useState<string | undefined>()
  const [consultationType, setConsultationType] = useState<string | undefined>()
  const [symptoms, setSymptoms] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false) // Track booking confirmation

  // Handle booking logic
  const handleBooking = () => {
    if (!date || !timeSlot || !consultationType) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields (Date, Time, and Consultation Type).",
      })
      return
    }
    if (!symptoms.trim()) {
      toast({
        variant: "destructive",
        title: "Incomplete Details",
        description: "Please describe your symptoms or reason for consultation.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false)
      setBookingConfirmed(true) // Mark booking as confirmed

      // Show toast notification
      toast({
        title: "Appointment Booked!",
        description: `Your ${consultationType} appointment is scheduled for ${date.toDateString()} at ${timeSlot}.`,
      })

      // Reset form after successful booking
      setDate(undefined)
      setTimeSlot(undefined)
      setConsultationType(undefined)
      setSymptoms("")

      // Scroll to the success message
      const successMessageElement = document.getElementById("success-message")
      if (successMessageElement) {
        successMessageElement.scrollIntoView({ behavior: "smooth" })
      }
    }, 1000)
  }

  return (
    <div className="container py-10">
      <div className="max-w-[800px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Book Your Appointment</CardTitle>
            <CardDescription>
              Select your preferred date, time, and consultation type to schedule your visit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success Message */}
            {bookingConfirmed && (
              <div
                id="success-message"
                className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4"
                role="alert"
                aria-live="polite"
              >
                <h3 className="font-medium">Appointment Confirmed!</h3>
                <p>Your appointment has been successfully booked.</p>
              </div>
            )}

            {/* Date Picker */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="date" className="font-medium block">
                  Select Date
                </label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date && (date < new Date() || date < new Date("1900-01-01"))}
                />
              </div>
              {/* Time Slots */}
              <div className="space-y-2">
                <label className="font-medium block">Available Time Slots</label>
                <div className="grid gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={timeSlot === slot ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setTimeSlot(slot)}
                      disabled={isSubmitting}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            {/* Consultation Type */}
            <div className="space-y-2">
              <label htmlFor="consultation-type" className="font-medium block">
                Consultation Type
              </label>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger id="consultation-type" aria-label="Select consultation type">
                  <SelectValue placeholder="Choose consultation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Consultation</SelectItem>
                  <SelectItem value="inPerson">In-Person Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Symptoms Description */}
            <div className="space-y-2">
              <label htmlFor="symptoms" className="font-medium block">
                Describe Your Symptoms
              </label>
              <Textarea
                id="symptoms"
                placeholder="Please describe your symptoms or reason for consultation"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                disabled={isSubmitting}
              />
            </div>
            {/* Submit Button */}
            <Button
              onClick={handleBooking}
              className="w-full"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}