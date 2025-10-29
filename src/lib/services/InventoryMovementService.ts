import { databases, DATABASE_ID, createServerClient } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { Databases } from 'node-appwrite';
import { InventoryMovement, InventoryMovementFilters, InventoryMovementStats } from '@/types/inventory-movements';

// Collection ID for inventory movements
const INVENTORY_MOVEMENTS_COLLECTION_ID = 'inventory_movements';

export class InventoryMovementService {
  private databases: Databases;

  constructor() {
    const serverClient = createServerClient();
    this.databases = new Databases(serverClient);
  }

  /**
   * Create a new inventory movement record
   */
  async createMovement(movementData: Omit<InventoryMovement, '$id' | '$createdAt' | '$updatedAt'>): Promise<InventoryMovement> {
    try {
      console.log('📝 Creating inventory movement:', {
        type: movementData.movement_type,
        product: movementData.product_name,
        quantity: movementData.quantity_change,
        reason: movementData.movement_reason
      });

      const movement = await this.databases.createDocument(
        DATABASE_ID,
        INVENTORY_MOVEMENTS_COLLECTION_ID,
        ID.unique(),
        {
          ...movementData,
          created_at: new Date().toISOString(),
          status: movementData.status || 'approved' // Default to approved for system movements
        }
      );

      console.log('✅ Inventory movement created:', movement.$id);
      return movement as unknown as InventoryMovement;
    } catch (error) {
      console.error('❌ Error creating inventory movement:', error);
      throw error;
    }
  }

  /**
   * Log a sale movement (when order is placed)
   */
  async logSale(productId: string, productName: string, productSku: string, 
                quantityBefore: number, quantitySold: number, 
                orderId: string, customerId?: string, customerName?: string): Promise<InventoryMovement> {
    return this.createMovement({
      movement_type: 'sale',
      movement_reason: `Sale via order ${orderId}`,
      movement_reference: orderId,
      product_id: productId,
      product_name: productName,
      product_sku: productSku,
      quantity_before: quantityBefore,
      quantity_change: -quantitySold, // Negative for outgoing stock
      quantity_after: quantityBefore - quantitySold,
      created_by: 'system',
      created_by_name: 'System',
      created_by_role: 'system',
      order_id: orderId,
      customer_id: customerId,
      customer_name: customerName,
      notes: `Product sold to customer`,
      status: 'approved'
    });
  }

  /**
   * Log a return movement (when order is cancelled/returned)
   */
  async logReturn(productId: string, productName: string, productSku: string,
                  quantityBefore: number, quantityReturned: number,
                  orderId: string, reason: string): Promise<InventoryMovement> {
    return this.createMovement({
      movement_type: 'return',
      movement_reason: `Return from order ${orderId}: ${reason}`,
      movement_reference: orderId,
      product_id: productId,
      product_name: productName,
      product_sku: productSku,
      quantity_before: quantityBefore,
      quantity_change: quantityReturned, // Positive for incoming stock
      quantity_after: quantityBefore + quantityReturned,
      created_by: 'system',
      created_by_name: 'System',
      created_by_role: 'system',
      order_id: orderId,
      notes: `Product returned: ${reason}`,
      status: 'approved'
    });
  }

  /**
   * Log a manual adjustment (admin stock change)
   */
  async logAdjustment(productId: string, productName: string, productSku: string,
                      quantityBefore: number, quantityChange: number,
                      reason: string, adminId: string, adminName: string,
                      requireApproval: boolean = false): Promise<InventoryMovement> {
    return this.createMovement({
      movement_type: 'adjustment',
      movement_reason: reason,
      product_id: productId,
      product_name: productName,
      product_sku: productSku,
      quantity_before: quantityBefore,
      quantity_change: quantityChange,
      quantity_after: quantityBefore + quantityChange,
      created_by: adminId,
      created_by_name: adminName,
      created_by_role: 'admin',
      notes: `Manual adjustment by admin`,
      status: requireApproval ? 'pending' : 'approved'
    });
  }

  /**
   * Log a restock movement (new inventory received)
   */
  async logRestock(productId: string, productName: string, productSku: string,
                   quantityBefore: number, quantityReceived: number,
                   reference: string, unitCost?: number): Promise<InventoryMovement> {
    return this.createMovement({
      movement_type: 'restock',
      movement_reason: `Inventory restock - ${reference}`,
      movement_reference: reference,
      product_id: productId,
      product_name: productName,
      product_sku: productSku,
      quantity_before: quantityBefore,
      quantity_change: quantityReceived,
      quantity_after: quantityBefore + quantityReceived,
      created_by: 'system',
      created_by_name: 'System',
      created_by_role: 'system',
      unit_cost: unitCost,
      total_cost: unitCost ? unitCost * quantityReceived : undefined,
      notes: `New stock received`,
      status: 'approved'
    });
  }

  /**
   * Get movements with filters
   */
  async getMovements(filters: InventoryMovementFilters = {}, limit: number = 50, offset: number = 0): Promise<{
    movements: InventoryMovement[];
    total: number;
  }> {
    try {
      const queries = [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('$createdAt')
      ];

      // Apply filters
      if (filters.product_id) {
        queries.push(Query.equal('product_id', filters.product_id));
      }
      if (filters.movement_type) {
        queries.push(Query.equal('movement_type', filters.movement_type));
      }
      if (filters.created_by) {
        queries.push(Query.equal('created_by', filters.created_by));
      }
      if (filters.status) {
        queries.push(Query.equal('status', filters.status));
      }
      if (filters.order_id) {
        queries.push(Query.equal('order_id', filters.order_id));
      }
      if (filters.date_from) {
        queries.push(Query.greaterThanEqual('$createdAt', filters.date_from));
      }
      if (filters.date_to) {
        queries.push(Query.lessThanEqual('$createdAt', filters.date_to));
      }

      const result = await this.databases.listDocuments(
        DATABASE_ID,
        INVENTORY_MOVEMENTS_COLLECTION_ID,
        queries
      );

      return {
        movements: result.documents as unknown as InventoryMovement[],
        total: result.total
      };
    } catch (error) {
      console.error('❌ Error fetching inventory movements:', error);
      throw error;
    }
  }

  /**
   * Get movements for a specific product
   */
  async getProductMovements(productId: string, limit: number = 20): Promise<InventoryMovement[]> {
    const { movements } = await this.getMovements({ product_id: productId }, limit);
    return movements;
  }

  /**
   * Get movement statistics
   */
  async getMovementStats(): Promise<InventoryMovementStats> {
    try {
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Get all movements
      const allMovements = await this.databases.listDocuments(
        DATABASE_ID,
        INVENTORY_MOVEMENTS_COLLECTION_ID,
        [Query.limit(1000), Query.orderDesc('$createdAt')]
      );

      const movements = allMovements.documents as unknown as InventoryMovement[];

      // Calculate stats
      const stats: InventoryMovementStats = {
        total_movements: movements.length,
        movements_today: movements.filter(m => new Date(m.$createdAt) >= new Date(today.toDateString())).length,
        movements_this_week: movements.filter(m => new Date(m.$createdAt) >= weekAgo).length,
        movements_this_month: movements.filter(m => new Date(m.$createdAt) >= monthAgo).length,
        
        sales_total: movements.filter(m => m.movement_type === 'sale').reduce((sum, m) => sum + Math.abs(m.quantity_change), 0),
        returns_total: movements.filter(m => m.movement_type === 'return').reduce((sum, m) => sum + m.quantity_change, 0),
        adjustments_total: movements.filter(m => m.movement_type === 'adjustment').length,
        
        top_moving_products: this.calculateTopMovingProducts(movements),
        recent_large_movements: movements.filter(m => Math.abs(m.quantity_change) >= 10).slice(0, 10),
        pending_approvals: movements.filter(m => m.status === 'pending')
      };

      return stats;
    } catch (error) {
      console.error('❌ Error calculating movement stats:', error);
      throw error;
    }
  }

  /**
   * Calculate top moving products
   */
  private calculateTopMovingProducts(movements: InventoryMovement[]) {
    const productStats = new Map();
    
    movements.forEach(movement => {
      const productId = movement.product_id;
      if (!productStats.has(productId)) {
        productStats.set(productId, {
          product_id: productId,
          product_name: movement.product_name,
          movement_count: 0,
          net_change: 0
        });
      }
      
      const stats = productStats.get(productId);
      stats.movement_count++;
      stats.net_change += movement.quantity_change;
    });
    
    return Array.from(productStats.values())
      .sort((a, b) => b.movement_count - a.movement_count)
      .slice(0, 10);
  }

  /**
   * Approve a pending movement
   */
  async approveMovement(movementId: string, approvedBy: string): Promise<InventoryMovement> {
    try {
      const updatedMovement = await this.databases.updateDocument(
        DATABASE_ID,
        INVENTORY_MOVEMENTS_COLLECTION_ID,
        movementId,
        {
          status: 'approved',
          approved_by: approvedBy,
          approved_at: new Date().toISOString()
        }
      );

      return updatedMovement as unknown as InventoryMovement;
    } catch (error) {
      console.error('❌ Error approving movement:', error);
      throw error;
    }
  }

  /**
   * Get movements summary for a date range
   */
  async getMovementsSummary(startDate: string, endDate: string): Promise<{
    total_in: number;
    total_out: number;
    net_change: number;
    movements_by_type: Record<string, number>;
  }> {
    try {
      const { movements } = await this.getMovements({
        date_from: startDate,
        date_to: endDate
      }, 1000);

      const summary = {
        total_in: 0,
        total_out: 0,
        net_change: 0,
        movements_by_type: {} as Record<string, number>
      };

      movements.forEach(movement => {
        const change = movement.quantity_change;
        
        if (change > 0) {
          summary.total_in += change;
        } else {
          summary.total_out += Math.abs(change);
        }
        
        summary.net_change += change;
        
        if (!summary.movements_by_type[movement.movement_type]) {
          summary.movements_by_type[movement.movement_type] = 0;
        }
        summary.movements_by_type[movement.movement_type]++;
      });

      return summary;
    } catch (error) {
      console.error('❌ Error calculating movements summary:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const inventoryMovementService = new InventoryMovementService();