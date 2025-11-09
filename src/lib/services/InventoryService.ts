import { OrderItem } from '@/types/orders';
import { createAdminClient } from '@/lib/appwrite-admin';
import { ReservationService } from './ReservationService';

export class InventoryService {
  static async validateAndReserveStock(items: OrderItem[], orderId: string) {
    const validationErrors = [];
    
    for (const item of items) {
      try {
        const product = await databases.getDocument(
          DATABASE_ID,
          'products',
          item.productId
        );

        const currentStock = product.units || product.stockQuantity || 0;
        const availableStock = currentStock - (product.reserved || 0);

        if (availableStock < item.quantity) {
          validationErrors.push({
            productId: item.productId,
            productName: item.name,
            available: availableStock,
            requested: item.quantity
          });
          continue;
        }

        // Reserve the stock
        await ReservationService.reserveStock(
          item.productId,
          item.name,
          item.quantity,
          orderId
        );

      } catch (error) {
        console.error(`Failed to validate/reserve stock for ${item.name}:`, error);
        validationErrors.push({
          productId: item.productId,
          productName: item.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    if (validationErrors.length > 0) {
      // If any validations failed, release any successful reservations
      await this.releaseReservations(items, orderId);
      throw new Error('Stock validation failed: ' + JSON.stringify(validationErrors));
    }
  }

  static async releaseReservations(items: OrderItem[], orderId: string) {
    for (const item of items) {
      try {
        await ReservationService.releaseStock(
          item.productId,
          item.name,
          item.quantity,
          orderId
        );
      } catch (error) {
        console.error(`Failed to release stock for ${item.name}:`, error);
      }
    }
  }

  static async finalizeOrderDelivery(items: OrderItem[], orderId: string) {
    for (const item of items) {
      try {
        // Release the reservation first
        await ReservationService.releaseStock(
          item.productId,
          item.name,
          item.quantity,
          orderId
        );

        // Get current product state
        const product = await databases.getDocument(
          DATABASE_ID,
          'products',
          item.productId
        );

        const currentStock = product.units || product.stockQuantity || 0;
        const newStock = Math.max(0, currentStock - item.quantity);

        // Update final stock
        await databases.updateDocument(
          DATABASE_ID,
          'products',
          item.productId,
          {
            units: newStock,
            stockQuantity: newStock
          }
        );

        // Log the movement
        await databases.createDocument(
          DATABASE_ID,
          INVENTORY_MOVEMENTS_COLLECTION_ID,
          'unique()',
          {
            product_id: item.productId,
            product_name: item.name,
            type: 'sale',
            quantity: item.quantity,
            previous_stock: currentStock,
            new_stock: newStock,
            order_id: orderId,
            created_at: new Date().toISOString()
          }
        );

      } catch (error) {
        console.error(`Failed to finalize delivery for ${item.name}:`, error);
        throw error;
      }
    }
  }
}