'use client';

import { useAuth } from '@/components/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { submitGymDetails } from '@/lib/auth';
import { CheckCircle2, Dumbbell, MapPin, Settings, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type OnboardingStep =
  | 'gym-info'
  | 'amenities'
  | 'plans'
  | 'employees'
  | 'complete';

interface GymData {
  gymName: string;
  location: string;
  phone: string;
  email: string;
  amenities: string[];
  plans: Array<{ name: string; price: string; duration: string }>;
  employees: Array<{ name: string; role: string; email: string }>;
}

export default function GymOwnerOnboarding() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('gym-info');
  const [gymData, setGymData] = useState<GymData>({
    gymName: '',
    location: '',
    phone: '',
    email: '',
    amenities: [],
    plans: [{ name: '', price: '', duration: '' }],
    employees: [{ name: '', role: '', email: '' }],
  });

  const steps: { id: OnboardingStep; label: string; icon: React.ReactNode }[] =
    [
      {
        id: 'gym-info',
        label: 'Gym Info',
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        id: 'amenities',
        label: 'Amenities',
        icon: <Dumbbell className="w-4 h-4" />,
      },
      {
        id: 'plans',
        label: 'Membership Plans',
        icon: <Settings className="w-4 h-4" />,
      },
      {
        id: 'employees',
        label: 'Employees',
        icon: <Users className="w-4 h-4" />,
      },
      {
        id: 'complete',
        label: 'Complete',
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
    ];

  const handleGymInfoChange = (field: string, value: string) => {
    setGymData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setGymData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleAddPlan = () => {
    setGymData((prev) => ({
      ...prev,
      plans: [...prev.plans, { name: '', price: '', duration: '' }],
    }));
  };

  const handlePlanChange = (index: number, field: string, value: string) => {
    setGymData((prev) => {
      const newPlans = [...prev.plans];
      newPlans[index] = { ...newPlans[index], [field]: value };
      return { ...prev, plans: newPlans };
    });
  };

  const handleAddEmployee = () => {
    setGymData((prev) => ({
      ...prev,
      employees: [...prev.employees, { name: '', role: '', email: '' }],
    }));
  };

  const handleEmployeeChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    setGymData((prev) => {
      const newEmployees = [...prev.employees];
      newEmployees[index] = { ...newEmployees[index], [field]: value };
      return { ...prev, employees: newEmployees };
    });
  };

  const handleNext = () => {
    const stepIndex = steps.findIndex((s) => s.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const stepIndex = steps.findIndex((s) => s.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id);
    }
  };

  const handleComplete = () => {
    if (user) {
      submitGymDetails(user.id, gymData);
      updateUser({
        approvalStatus: 'pending',
        gymDetails: gymData,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Set Up Your Gym
          </h1>
          <p className="text-muted-foreground">
            Complete these steps to launch your gym management dashboard
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => {
                  const stepIndex = steps.findIndex(
                    (s) => s.id === currentStep,
                  );
                  if (index < stepIndex) {
                    setCurrentStep(step.id);
                  }
                }}
                className={`flex flex-col items-center gap-2 cursor-pointer ${
                  index <= steps.findIndex((s) => s.id === currentStep)
                    ? 'opacity-100'
                    : 'opacity-50 cursor-default'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentStep === step.id
                      ? 'bg-primary text-primary-foreground'
                      : index < steps.findIndex((s) => s.id === currentStep)
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-medium text-center hidden sm:block">
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    index < steps.findIndex((s) => s.id === currentStep)
                      ? 'bg-green-500'
                      : 'bg-muted'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <Card className="p-8 border-0 shadow-lg">
          {currentStep === 'gym-info' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Gym Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="gymName">Gym Name</Label>
                    <Input
                      id="gymName"
                      placeholder="Enter your gym name"
                      value={gymData.gymName}
                      onChange={(e) =>
                        handleGymInfoChange('gymName', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter your gym location"
                      value={gymData.location}
                      onChange={(e) =>
                        handleGymInfoChange('location', e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={gymData.phone}
                        onChange={(e) =>
                          handleGymInfoChange('phone', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={gymData.email}
                        onChange={(e) =>
                          handleGymInfoChange('email', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'amenities' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Select Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Weight Training',
                    'Cardio Equipment',
                    'Swimming Pool',
                    'Yoga Studio',
                    'Sauna',
                    'Personal Training',
                    'Group Classes',
                    'Café',
                    'Locker Rooms',
                  ].map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`p-3 rounded-lg border-2 font-medium transition-colors ${
                        gymData.amenities.includes(amenity)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary/50'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'plans' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Membership Plans
                </h2>
                <div className="space-y-4">
                  {gymData.plans.map((plan, index) => (
                    <div
                      key={index}
                      className="p-4 border border-border rounded-lg space-y-3"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label>Plan Name</Label>
                          <Input
                            placeholder="e.g., Basic"
                            value={plan.name}
                            onChange={(e) =>
                              handlePlanChange(index, 'name', e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label>Price</Label>
                          <Input
                            placeholder="$29.99"
                            value={plan.price}
                            onChange={(e) =>
                              handlePlanChange(index, 'price', e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            placeholder="e.g., 1 Month"
                            value={plan.duration}
                            onChange={(e) =>
                              handlePlanChange(
                                index,
                                'duration',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={handleAddPlan}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    + Add Another Plan
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'employees' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Add Employees
                </h2>
                <div className="space-y-4">
                  {gymData.employees.map((employee, index) => (
                    <div
                      key={index}
                      className="p-4 border border-border rounded-lg space-y-3"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label>Name</Label>
                          <Input
                            placeholder="Employee name"
                            value={employee.name}
                            onChange={(e) =>
                              handleEmployeeChange(
                                index,
                                'name',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Role</Label>
                          <Input
                            placeholder="e.g., Trainer"
                            value={employee.role}
                            onChange={(e) =>
                              handleEmployeeChange(
                                index,
                                'role',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            placeholder="Email"
                            value={employee.email}
                            onChange={(e) =>
                              handleEmployeeChange(
                                index,
                                'email',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={handleAddEmployee}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    + Add Another Employee
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'complete' && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">
                  All Set!
                </h2>
                <p className="text-muted-foreground">
                  Your gym is ready to start managing members and operations.
                </p>
              </div>
              <div className="text-left bg-muted/30 p-4 rounded-lg space-y-2 text-sm">
                <p>
                  <strong>Gym:</strong> {gymData.gymName || 'Not specified'}
                </p>
                <p>
                  <strong>Location:</strong>{' '}
                  {gymData.location || 'Not specified'}
                </p>
                <p>
                  <strong>Amenities:</strong>{' '}
                  {gymData.amenities.join(', ') || 'None selected'}
                </p>
                <p>
                  <strong>Plans:</strong>{' '}
                  {gymData.plans.filter((p) => p.name).length} active plan(s)
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentStep === 'gym-info'}
            >
              Previous
            </Button>
            {currentStep !== 'complete' ? (
              <Button
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90"
                disabled={
                  (currentStep === 'gym-info' && !gymData.gymName) ||
                  (currentStep === 'plans' && !gymData.plans[0].name)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700"
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
