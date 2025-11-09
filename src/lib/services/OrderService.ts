import { createAdminClient } from '@/lib/appwrite-admin';
import { InventoryService } from '@/lib/services/InventoryService';
import { OrderTimeline } from '@/types/orders';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const ORDERS_COLLECTION_ID = 'orders';

export class OrderService {
  static async updateOrderStatus(
    orderId: string,
    newStatus: string,
    note?: string
  ) {
    try {
      const { databases } = await createAdminClient();
      
      // Get current order
      const order = await databases.getDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId);
      const orderItems = JSON.parse(order.items || '[]');
      
      // Parse existing timeline
      const timeline: OrderTimeline[] = JSON.parse(order.timeline || '[]');
      
      // Create new timeline event
      const timelineEvent: OrderTimeline = {
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: note || `Order marked as ${newStatus}`
      };
      
      // Add new event to timeline
      timeline.push(timelineEvent);
      
      // Prepare update data
      const updateData: any = {
        status: newStatus,
        timeline: JSON.stringify(timeline)
      };
      
      // Handle inventory based on status
      switch (newStatus) {
        case 'processing':
          // When processing, reserve the inventory
          await InventoryService.validateAndReserveStock(orderItems, orderId);
          updateData.processed_at = new Date().toISOString();
          break;
          
        case 'shipped':
          // When shipped, keep the reservation
          updateData.fulfillment_status = 'partially_fulfilled';
          updateData.shipped_at = new Date().toISOString();
          break;
          
        case 'delivered':
          // When delivered, convert reservation to actual deduction
          await InventoryService.finalizeOrderDelivery(orderItems, orderId);
          updateData.fulfillment_status = 'fulfilled';
          updateData.delivered_at = new Date().toISOString();
          break;
          
        case 'cancelled':
          // When cancelled, release any reservations
          await InventoryService.releaseReservations(orderItems, orderId);
          updateData.cancelled_at = new Date().toISOString();
          break;
          
        case 'returned':
          // When returned, add back to inventory
          // This will be handled by the return process
          updateData.returned_at = new Date().toISOString();
          break;
      }
      
      // Update the order
      const updatedOrder = await databases.updateDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId,
        updateData
      );
      
      return updatedOrder;
      
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  }
}