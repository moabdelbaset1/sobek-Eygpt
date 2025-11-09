"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Check, X } from 'lucide-react'

interface UpdateOrderDialogProps {
  orderId: string
  action: string
  actionLabel: string
  onUpdate: () => void
}

export default function UpdateOrderDialog({
  orderId,
  action,
  actionLabel,
  onUpdate
}: UpdateOrderDialogProps) {
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)
      
      const response = await fetch(`/api/admin/orders?orderId=${orderId}&action=${action}&note=${encodeURIComponent(note)}`, {
        method: 'PATCH'
      })

      if (response.ok) {
        onUpdate()
        setOpen(false)
      } else {
        const data = await response.json()
        alert('Error: ' + (data.error || 'Failed to update order'))
      }
    } catch (error) {
      console.error('Failed to update order:', error)
      alert('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          variant={action.includes('cancel') ? 'destructive' : 'default'}
        >
          {actionLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark this order as {actionLabel.toLowerCase()}?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note">Add a note (optional)</Label>
            <Textarea
              id="note"
              placeholder="Enter any additional notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={loading}
          >
            <Check className="w-4 h-4 mr-2" />
            {loading ? 'Updating...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}