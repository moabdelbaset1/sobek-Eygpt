import { databases, DATABASE_ID, createServerClient } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { Databases } from 'node-appwrite';

interface LowStockAlert {
  product_id: string;
  product_name: string;
  current_stock: number;
  minimum_stock: number;
  alert_level: 'low' | 'critical' | 'out_of_stock';
  last_movement: string;
}

interface StockAlertSettings {
  low_stock_threshold: number;
  critical_stock_threshold: number;
  enable_notifications: boolean;
  notification_emails: string[];
}

export class InventoryAlertService {
  private databases: Databases;

  constructor() {
    const serverClient = createServerClient();
    this.databases = new Databases(serverClient);
  }

  /**
   * Check for low stock products and generate alerts
   */
  async checkLowStockAlerts(): Promise<LowStockAlert[]> {
    try {
      // Get all products with their current stock
      const products = await this.databases.listDocuments(
        DATABASE_ID,
        'products', // Your products collection ID
        [
          Query.select(['$id', 'name', 'stock', 'minimum_stock', 'sku']),
          Query.limit(1000)
        ]
      );

      const alerts: LowStockAlert[] = [];

      for (const product of products.documents) {
        const currentStock = product.stock || 0;
        const minimumStock = product.minimum_stock || 5; // Default minimum

        let alertLevel: 'low' | 'critical' | 'out_of_stock' | null = null;

        if (currentStock === 0) {
          alertLevel = 'out_of_stock';
        } else if (currentStock <= 2) {
          alertLevel = 'critical';
        } else if (currentStock <= minimumStock) {
          alertLevel = 'low';
        }

        if (alertLevel) {
          // Get last movement for this product
          const lastMovement = await this.getLastMovement(product.$id);

          alerts.push({
            product_id: product.$id,
            product_name: product.name,
            current_stock: currentStock,
            minimum_stock: minimumStock,
            alert_level: alertLevel,
            last_movement: lastMovement?.created_at || ''
          });
        }
      }

      return alerts;
    } catch (error) {
      console.error('❌ Error checking low stock alerts:', error);
      throw error;
    }
  }

  /**
   * Get the last movement for a product
   */
  private async getLastMovement(productId: string) {
    try {
      const movements = await this.databases.listDocuments(
        DATABASE_ID,
        'inventory_movements',
        [
          Query.equal('product_id', productId),
          Query.orderDesc('created_at'),
          Query.limit(1)
        ]
      );

      return movements.documents[0] || null;
    } catch (error) {
      console.error('Error getting last movement:', error);
      return null;
    }
  }

  /**
   * Create a stock alert notification
   */
  async createStockAlert(alert: LowStockAlert): Promise<void> {
    try {
      // Create notification record
      await this.databases.createDocument(
        DATABASE_ID,
        'notifications', // You'll need to create this collection
        ID.unique(),
        {
          type: 'low_stock',
          title: `تنبيه مخزون منخفض: ${alert.product_name}`,
          message: `المنتج ${alert.product_name} وصل لمستوى ${alert.alert_level}. الكمية الحالية: ${alert.current_stock}`,
          severity: alert.alert_level === 'out_of_stock' ? 'critical' : 
                   alert.alert_level === 'critical' ? 'high' : 'medium',
          data: JSON.stringify(alert),
          read: false,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        }
      );

      console.log(`🔔 Stock alert created for product: ${alert.product_name}`);
    } catch (error) {
      console.error('❌ Error creating stock alert:', error);
    }
  }

  /**
   * Get alert statistics
   */
  async getAlertStats() {
    try {
      const alerts = await this.checkLowStockAlerts();
      
      return {
        total_alerts: alerts.length,
        critical_alerts: alerts.filter(a => a.alert_level === 'critical').length,
        out_of_stock: alerts.filter(a => a.alert_level === 'out_of_stock').length,
        low_stock: alerts.filter(a => a.alert_level === 'low').length,
        alerts_by_category: this.groupAlertsByCategory(alerts)
      };
    } catch (error) {
      console.error('❌ Error getting alert stats:', error);
      return null;
    }
  }

  private groupAlertsByCategory(alerts: LowStockAlert[]) {
    // Group alerts by product category if you have categories
    // This is a placeholder - implement based on your product structure
    return alerts.reduce((acc, alert) => {
      const category = 'عام'; // Default category
      if (!acc[category]) acc[category] = 0;
      acc[category]++;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Send email notifications for critical alerts
   */
  async sendCriticalAlertEmails(alerts: LowStockAlert[]): Promise<void> {
    const criticalAlerts = alerts.filter(a => 
      a.alert_level === 'critical' || a.alert_level === 'out_of_stock'
    );

    if (criticalAlerts.length === 0) return;

    try {
      // Here you would integrate with your email service
      // For example, using Appwrite Functions or external email service
      console.log(`📧 Sending ${criticalAlerts.length} critical stock alerts via email`);
      
      // Placeholder for email sending logic
      const emailContent = this.generateAlertEmailContent(criticalAlerts);
      console.log('Email content:', emailContent);
      
    } catch (error) {
      console.error('❌ Error sending alert emails:', error);
    }
  }

  private generateAlertEmailContent(alerts: LowStockAlert[]): string {
    let content = `
    <h2>🚨 تنبيه مخزون حرج</h2>
    <p>المنتجات التالية تحتاج إلى إعادة تعبئة فورية:</p>
    <ul>
    `;

    alerts.forEach(alert => {
      const statusText = alert.alert_level === 'out_of_stock' ? 'نفد المخزون' : 'مخزون حرج';
      content += `
        <li>
          <strong>${alert.product_name}</strong> - ${statusText}
          <br>الكمية الحالية: ${alert.current_stock}
          <br>الحد الأدنى: ${alert.minimum_stock}
        </li>
      `;
    });

    content += `
    </ul>
    <p>يرجى اتخاذ الإجراءات اللازمة لإعادة تعبئة المخزون.</p>
    `;

    return content;
  }
}

export default InventoryAlertService;