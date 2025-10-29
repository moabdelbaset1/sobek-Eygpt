"use client"

import { useState } from "react"
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, DollarSign } from "lucide-react"

interface PaymentMethodDialogProps {
  orderId: string
  orderNumber: string
  currentNotes?: string
  onUpdate: (orderId: string, updateData: any) => void
  trigger?: React.ReactNode
}

export function PaymentMethodDialog({ 
  orderId, 
  orderNumber, 
  currentNotes = '',
  onUpdate,
  trigger 
}: PaymentMethodDialogProps) {
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    if (!paymentMethod) {
      alert("الرجاء اختيار طريقة الدفع")
      return
    }

    const paymentNote = `[${new Date().toISOString()}] Payment method: ${paymentMethod}`
    const additionalNotes = notes ? `\n[${new Date().toISOString()}] Note: ${notes}` : ''
    const updatedNotes = currentNotes + '\n' + paymentNote + additionalNotes

    const updateData = {
      notes: updatedNotes,
      payment_status: 'paid'
    }

    onUpdate(orderId, updateData)
    setOpen(false)
    
    // Reset form
    setPaymentMethod("")
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <CreditCard className="mr-2 h-4 w-4" />
            تحديد طريقة الدفع
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            تحديد طريقة الدفع - {orderNumber}
          </DialogTitle>
          <DialogDescription>
            اختر طريقة الدفع المستخدمة في هذا الطلب
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-method">طريقة الدفع</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="اختر طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">كاش - نقداً</SelectItem>
                <SelectItem value="visa">فيزا - بطاقة ائتمان</SelectItem>
                <SelectItem value="mastercard">ماستركارد</SelectItem>
                <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                <SelectItem value="installments">تقسيط</SelectItem>
                <SelectItem value="cod">دفع عند الاستلام</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
            <Textarea
              id="notes"
              placeholder="أي ملاحظات حول عملية الدفع..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit} disabled={!paymentMethod}>
            تأكيد طريقة الدفع
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}