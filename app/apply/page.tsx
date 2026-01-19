"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { submitGymDetails } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MapPin, Dumbbell, Users, Settings, UserPlus, ArrowLeft } from "lucide-react"

type OnboardingStep = "account" | "gym-info" | "amenities" | "plans" | "employees" | "complete"

interface GymData {
    name: string
    email: string
    gymName: string
    location: string
    phone: string
    gymEmail: string
    amenities: string[]
    plans: Array<{ name: string; price: string; duration: string }>
    employees: Array<{ name: string; role: string; email: string }>
}

export default function ApplyPage() {
    const router = useRouter()
    const { signup, isAuthenticated, user, updateUser } = useAuth()
    const [currentStep, setCurrentStep] = useState<OnboardingStep>("account")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [gymData, setGymData] = useState<GymData>({
        name: "",
        email: "",
        gymName: "",
        location: "",
        phone: "",
        gymEmail: "",
        amenities: [],
        plans: [{ name: "", price: "", duration: "" }],
        employees: [{ name: "", role: "", email: "" }],
    })

    // If already logged in as gym_owner, maybe we should redirect or skip account step
    // But for now, let's keep it simple as a standalone "Apply" flow.

    const steps: { id: OnboardingStep; label: string; icon: React.ReactNode }[] = [
        { id: "account", label: "Account", icon: <UserPlus className="w-4 h-4" /> },
        { id: "gym-info", label: "Gym Info", icon: <MapPin className="w-4 h-4" /> },
        { id: "amenities", label: "Amenities", icon: <Dumbbell className="w-4 h-4" /> },
        { id: "plans", label: "Plans", icon: <Settings className="w-4 h-4" /> },
        { id: "employees", label: "Employees", icon: <Users className="w-4 h-4" /> },
        { id: "complete", label: "Done!", icon: <CheckCircle2 className="w-4 h-4" /> },
    ]

    const handleChange = (field: keyof GymData, value: any) => {
        setGymData((prev) => ({ ...prev, [field]: value }))
    }

    const handleAmenityToggle = (amenity: string) => {
        setGymData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity],
        }))
    }

    const handleAddPlan = () => {
        setGymData((prev) => ({
            ...prev,
            plans: [...prev.plans, { name: "", price: "", duration: "" }],
        }))
    }

    const handlePlanChange = (index: number, field: string, value: string) => {
        setGymData((prev) => {
            const newPlans = [...prev.plans]
            newPlans[index] = { ...newPlans[index], [field]: value }
            return { ...prev, plans: newPlans }
        })
    }

    const handleAddEmployee = () => {
        setGymData((prev) => ({
            ...prev,
            employees: [...prev.employees, { name: "", role: "", email: "" }],
        }))
    }

    const handleEmployeeChange = (index: number, field: string, value: string) => {
        setGymData((prev) => {
            const newEmployees = [...prev.employees]
            newEmployees[index] = { ...newEmployees[index], [field]: value }
            return { ...prev, employees: newEmployees }
        })
    }

    const handleNext = () => {
        const stepIndex = steps.findIndex((s) => s.id === currentStep)
        if (stepIndex < steps.length - 1) {
            setCurrentStep(steps[stepIndex + 1].id)
        }
    }

    const handlePrevious = () => {
        const stepIndex = steps.findIndex((s) => s.id === currentStep)
        if (stepIndex > 0) {
            setCurrentStep(steps[stepIndex - 1].id)
        }
    }

    const handleComplete = async () => {
        setIsLoading(true)
        try {
            // 1. Create Account
            const newUser = await signup({
                name: gymData.name,
                email: gymData.email,
                role: "gym_owner"
            })

            // 2. Map gymData to GymDetails type expected by lib/auth
            const details = {
                gymName: gymData.gymName,
                location: gymData.location,
                phone: gymData.phone,
                email: gymData.gymEmail,
                amenities: gymData.amenities,
                plans: gymData.plans,
                employees: gymData.employees,
            }

            // 3. Submit Gym Details to mock "backend"
            submitGymDetails(newUser.id, details)

            // 4. Update the local context user state so redirects work
            updateUser({
                approvalStatus: "pending",
                gymDetails: details,
            })

            // 5. Redirect to approval pending screen
            router.push("/gym-owner/approval-pending")
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background p-6">
            <div className="max-w-4xl mx-auto">
                {/* Navigation */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/")}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-3">
                        Start Your <span className="text-primary">Gym Journey</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">Apply to join the FitHub partner network</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-12 flex items-center justify-between px-4">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div
                                className={`flex flex-col items-center gap-2 ${index <= steps.findIndex((s) => s.id === currentStep) ? "opacity-100" : "opacity-30"
                                    }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentStep === step.id
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : index < steps.findIndex((s) => s.id === currentStep)
                                            ? "bg-green-500 text-white"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {step.icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">
                                    {step.label}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-[2px] mx-4 transition-colors ${index < steps.findIndex((s) => s.id === currentStep) ? "bg-green-500" : "bg-muted"
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step Content */}
                <Card className="p-8 border-border bg-card/50 backdrop-blur-sm shadow-2xl">
                    {/* Account */}
                    {currentStep === "account" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground">Account Information</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={gymData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={gymData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Create Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gym Info */}
                    {currentStep === "gym-info" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground">Gym Details</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="gymName">Gym Name</Label>
                                        <Input
                                            id="gymName"
                                            placeholder="Legacy Fitness"
                                            value={gymData.gymName}
                                            onChange={(e) => handleChange("gymName", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Street Address</Label>
                                        <Input
                                            id="location"
                                            placeholder="123 Sport Ave, Fitness City"
                                            value={gymData.location}
                                            onChange={(e) => handleChange("location", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Business Phone</Label>
                                            <Input
                                                id="phone"
                                                placeholder="+1 (555) 000-0000"
                                                value={gymData.phone}
                                                onChange={(e) => handleChange("phone", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gymEmail">Business Email</Label>
                                            <Input
                                                id="gymEmail"
                                                type="email"
                                                placeholder="contact@gym.com"
                                                value={gymData.gymEmail}
                                                onChange={(e) => handleChange("gymEmail", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Amenities */}
                    {currentStep === "amenities" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground">Select Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {[
                                        "Weight Training",
                                        "Cardio Equipment",
                                        "Swimming Pool",
                                        "Yoga Studio",
                                        "Sauna",
                                        "Personal Training",
                                        "Group Classes",
                                        "Café",
                                        "Locker Rooms",
                                    ].map((amenity) => (
                                        <button
                                            key={amenity}
                                            onClick={() => handleAmenityToggle(amenity)}
                                            className={`p-4 rounded-xl border-2 font-medium transition-all ${gymData.amenities.includes(amenity)
                                                ? "border-primary bg-primary/10 text-primary scale-[1.02]"
                                                : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                                                }`}
                                        >
                                            {amenity}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Plans */}
                    {currentStep === "plans" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground">Membership Plans</h2>
                                <div className="space-y-4">
                                    {gymData.plans.map((plan, index) => (
                                        <div key={index} className="p-4 border border-border rounded-xl bg-background/30 space-y-3">
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="space-y-2">
                                                    <Label>Plan Name</Label>
                                                    <Input
                                                        placeholder="Basic"
                                                        value={plan.name}
                                                        onChange={(e) => handlePlanChange(index, "name", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Price</Label>
                                                    <Input
                                                        placeholder="$49.99"
                                                        value={plan.price}
                                                        onChange={(e) => handlePlanChange(index, "price", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Frequency</Label>
                                                    <Input
                                                        placeholder="Monthly"
                                                        value={plan.duration}
                                                        onChange={(e) => handlePlanChange(index, "duration", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={handleAddPlan} variant="outline" className="w-full border-dashed">
                                        + Add Another Plan
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Employees */}
                    {currentStep === "employees" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground">Add Employees</h2>
                                <div className="space-y-4">
                                    {gymData.employees.map((employee, index) => (
                                        <div key={index} className="p-4 border border-border rounded-xl bg-background/30 space-y-3">
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="space-y-2">
                                                    <Label>Name</Label>
                                                    <Input
                                                        placeholder="Trainer Name"
                                                        value={employee.name}
                                                        onChange={(e) => handleEmployeeChange(index, "name", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Role</Label>
                                                    <Input
                                                        placeholder="Head Coach"
                                                        value={employee.role}
                                                        onChange={(e) => handleEmployeeChange(index, "role", e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Email</Label>
                                                    <Input
                                                        type="email"
                                                        placeholder="coach@gym.com"
                                                        value={employee.email}
                                                        onChange={(e) => handleEmployeeChange(index, "email", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={handleAddEmployee} variant="outline" className="w-full border-dashed">
                                        + Add Staff Member
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Complete */}
                    {currentStep === "complete" && (
                        <div className="text-center space-y-8 animate-in zoom-in duration-500">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 text-green-500">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-foreground">Review & Submit</h2>
                                <p className="text-muted-foreground">Ready to embark on your fitness business journey?</p>
                            </div>
                            <div className="grid gap-4 max-w-sm mx-auto p-6 bg-secondary/20 rounded-2xl text-left border border-border/50">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Applicant:</span>
                                    <span className="font-semibold text-foreground">{gymData.name}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Gym Name:</span>
                                    <span className="font-semibold text-foreground">{gymData.gymName}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Location:</span>
                                    <span className="font-semibold text-foreground truncate pl-4">{gymData.location}</span>
                                </div>
                                <div className="pt-2 border-t border-border/50">
                                    <span className="text-xs text-muted-foreground italic">By submitting, you agree to our Terms of Service.</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-12 pt-8 border-t border-border/50">
                        <Button
                            onClick={handlePrevious}
                            variant="ghost"
                            disabled={currentStep === "account" || isLoading}
                            className="px-8"
                        >
                            Previous
                        </Button>
                        {currentStep !== "complete" ? (
                            <Button
                                onClick={handleNext}
                                className="bg-primary hover:bg-primary/90 px-8 font-bold shadow-lg shadow-primary/20"
                                disabled={
                                    (currentStep === "account" && (!gymData.name || !gymData.email || !password)) ||
                                    (currentStep === "gym-info" && !gymData.gymName)
                                }
                            >
                                Next Step
                            </Button>
                        ) : (
                            <Button
                                onClick={handleComplete}
                                disabled={isLoading}
                                className="bg-primary hover:bg-primary/90 px-12 font-bold shadow-lg shadow-primary/20"
                            >
                                {isLoading ? "Processing..." : "Submit Application"}
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}
