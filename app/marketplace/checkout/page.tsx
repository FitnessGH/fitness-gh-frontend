"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Lock } from "lucide-react"
import { useState } from "react"

interface OrderSummary {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export default function CheckoutPage() {
  const [orderStep, setOrderStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [orderSummary] = useState<OrderSummary>({
    subtotal: 149.95,
    shipping: 9.99,
    tax: 11.99,
    total: 171.93,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-between">
          {["shipping", "payment", "confirmation"].map((step, i) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  orderStep === step
                    ? "bg-primary text-primary-foreground"
                    : i < ["shipping", "payment", "confirmation"].indexOf(orderStep)
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    i < ["shipping", "payment", "confirmation"].indexOf(orderStep) ? "bg-green-500" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Shipping Step */}
        {orderStep === "shipping" && (
          <Card className="p-6 border-0 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Shipping Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" />
                </div>
              </div>
              <Button onClick={() => setOrderStep("payment")} className="w-full bg-primary hover:bg-primary/90 mt-6">
                Continue to Payment
              </Button>
            </div>
          </Card>
        )}

        {/* Payment Step */}
        {orderStep === "payment" && (
          <Card className="p-6 border-0 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Payment Information
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" type="password" />
                </div>
              </div>

              {/* Order Summary */}
              <Card className="p-4 bg-muted/30 border-border/50 mt-6">
                <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">${orderSummary.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-medium">${orderSummary.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-primary text-lg">${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3 mt-6">
                <Button onClick={() => setOrderStep("shipping")} variant="outline" className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button onClick={() => setOrderStep("confirmation")} className="flex-1 bg-primary hover:bg-primary/90">
                  Complete Purchase
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Confirmation Step */}
        {orderStep === "confirmation" && (
          <Card className="p-6 border-0 shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-foreground">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-6">Thank you for your purchase</p>

            <Card className="p-4 bg-muted/30 border-border/50 text-left mb-6">
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Order Number</p>
                  <p className="font-semibold text-foreground">ORD-2025-456789</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Delivery</p>
                  <p className="font-semibold text-foreground">January 24, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Amount</p>
                  <p className="font-semibold text-primary">${orderSummary.total.toFixed(2)}</p>
                </div>
              </div>
            </Card>

            <Button className="w-full bg-primary hover:bg-primary/90">Continue Shopping</Button>
          </Card>
        )}
      </div>
    </div>
  )
}
