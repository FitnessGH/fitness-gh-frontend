"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (id: string) => void
}

export function ShoppingCart({ isOpen, onClose, items, onRemoveItem }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <button className="p-1 hover:bg-muted rounded" onClick={() => onRemoveItem(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}

              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <p className="font-semibold text-foreground">Total:</p>
                  <p className="text-lg font-bold text-primary">${total.toFixed(2)}</p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Proceed to Checkout</Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
