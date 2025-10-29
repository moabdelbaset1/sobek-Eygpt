"use client"

import { useState } from "react"
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, AlertTriangle, CheckCircle } from "lucide-react"

interface OrderItem {
  product_id: string
  product_name: string
  sku: string
  quantity: number
  price: number
  size?: string
  color?: string
}

interface ReturnDialogProps {
  orderId: string
  orderNumber: string
  orderItems: OrderItem[]
  onReturn: (returnData: any) => void
  trigger?: React.ReactNode
}

export function OrderReturnDialog({ 
  orderId, 
  orderNumber, 
  orderItems, 
  onReturn,
  trigger 
}: ReturnDialogProps) {
  const [open, setOpen] = useState(false)
  const [returnReason, setReturnReason] = useState("")
  const [returnMethod, setReturnMethod] = useState("pickup")
  const [notes, setNotes] = useState("")
  const [processingFee, setProcessingFee] = useState(0)
  const [shippingRefund, setShippingRefund] = useState(0)
  const [selectedItems, setSelectedItems] = useState<Record<string, {
    selected: boolean
    quantity: number
    condition: string
    reason: string
  }>>({})

  const initializeItems = () => {
    const initial: Record<string, any> = {}
    orderItems.forEach(item => {
      initial[item.product_id] = {
        selected: false,
        quantity: item.quantity,
        condition: 'new',
        reason: returnReason || 'Customer request'
      }
    })
    setSelectedItems(initial)
  }

  const handleItemSelection = (productId: string, field: string, value: any) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }))
  }

  const getSelectedItemsForReturn = () => {
    return orderItems
      .filter(item => selectedItems[item.product_id]?.selected)
      .map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        sku: item.sku,
        quantity: selectedItems[item.product_id].quantity,
        price: item.price,
        reason: selectedItems[item.product_id].reason,
        condition: selectedItems[item.product_id].condition
      }))
  }

  const calculateRefundAmount = () => {
    const itemsRefund = getSelectedItemsForReturn().reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
    return itemsRefund + shippingRefund - processingFee
  }

  const handleSubmit = () => {
    const returnItems = getSelectedItemsForReturn()
    
    if (returnItems.length === 0) {
      alert("Please select at least one item to return")
      return
    }

    const returnData = {
      return_reason: returnReason,
      return_method: returnMethod,
      items: returnItems,
      shipping_refund: shippingRefund,
      processing_fee: processingFee,
      notes
    }

    onReturn(returnData)
    setOpen(false)
    
    // Reset form
    setSelectedItems({})
    setReturnReason("")
    setNotes("")
    setProcessingFee(0)
    setShippingRefund(0)
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen)
      if (newOpen) initializeItems()
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Process Return
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Process Return - {orderNumber}
          </DialogTitle>
          <DialogDescription>
            Select items to return and specify the return details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Return Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="return-reason">Return Reason</Label>
              <Select value={returnReason} onValueChange={setReturnReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defective">Defective Product</SelectItem>
                  <SelectItem value="wrong_item">Wrong Item Sent</SelectItem>
                  <SelectItem value="damaged_shipping">Damaged in Shipping</SelectItem>
                  <SelectItem value="not_as_described">Not as Described</SelectItem>
                  <SelectItem value="customer_request">Customer Request</SelectItem>
                  <SelectItem value="carrier_return">Returned by Carrier</SelectItem>
                  <SelectItem value="quality_issue">Quality Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="return-method">Return Method</Label>
              <Select value={returnMethod} onValueChange={setReturnMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="drop_off">Drop Off</SelectItem>
                  <SelectItem value="mail">Mail Return</SelectItem>
                  <SelectItem value="carrier_return">Carrier Return</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Items Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Items to Return</Label>
            <div className="border rounded-lg p-4 space-y-4 max-h-60 overflow-y-auto">
              {orderItems.map((item) => (
                <div key={item.product_id} className="flex items-start space-x-4 p-3 border rounded">
                  <Checkbox
                    checked={selectedItems[item.product_id]?.selected || false}
                    onCheckedChange={(checked) => 
                      handleItemSelection(item.product_id, 'selected', checked)
                    }
                  />
                  
                  <div className="flex-1">
                    <div className="font-medium">{item.product_name}</div>
                    <div className="text-sm text-muted-foreground">
                      SKU: {item.sku} • ${item.price} each
                      {item.size && ` • Size: ${item.size}`}
                      {item.color && ` • Color: ${item.color}`}
                    </div>
                    
                    {selectedItems[item.product_id]?.selected && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div>
                          <Label className="text-xs">Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            max={item.quantity}
                            value={selectedItems[item.product_id].quantity}
                            onChange={(e) => 
                              handleItemSelection(item.product_id, 'quantity', parseInt(e.target.value))
                            }
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Condition</Label>
                          <Select
                            value={selectedItems[item.product_id].condition}
                            onValueChange={(value) => 
                              handleItemSelection(item.product_id, 'condition', value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="used">Used</SelectItem>
                              <SelectItem value="damaged">Damaged</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-xs">Specific Reason</Label>
                          <Input
                            placeholder="Item reason"
                            value={selectedItems[item.product_id].reason}
                            onChange={(e) => 
                              handleItemSelection(item.product_id, 'reason', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium">Qty: {item.quantity}</div>
                    <div className="text-sm text-muted-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shipping-refund">Shipping Refund ($)</Label>
              <Input
                id="shipping-refund"
                type="number"
                min="0"
                step="0.01"
                value={shippingRefund}
                onChange={(e) => setShippingRefund(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="processing-fee">Processing Fee ($)</Label>
              <Input
                id="processing-fee"
                type="number"
                min="0"
                step="0.01"
                value={processingFee}
                onChange={(e) => setProcessingFee(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label>Total Refund</Label>
              <div className="p-2 bg-green-50 border border-green-200 rounded text-green-800 font-semibold">
                ${calculateRefundAmount().toFixed(2)}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Internal Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any internal notes about this return..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Warning Messages */}
          {getSelectedItemsForReturn().some(item => item.condition === 'damaged') && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Damaged items will not be returned to inventory
              </span>
            </div>
          )}

          {getSelectedItemsForReturn().length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                Items in "New" or "Used" condition will be automatically returned to inventory
              </span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={getSelectedItemsForReturn().length === 0}
          >
            Process Return (${calculateRefundAmount().toFixed(2)})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}