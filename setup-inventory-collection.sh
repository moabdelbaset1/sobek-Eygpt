#!/bin/bash
# Database Setup Script for Inventory Movements

echo "🔧 Setting up Inventory Movements Collection in Appwrite..."

# You need to create this collection in your Appwrite console with these attributes:
echo "
📋 Collection: inventory_movements

Required Attributes:
- movement_type (string, required) - enum: sale|return|adjustment|restock|transfer|damage|expired|manual
- movement_reason (string, required)
- movement_reference (string, optional)
- product_id (string, required)
- product_name (string, required)  
- product_sku (string, required)
- quantity_before (integer, required)
- quantity_change (integer, required)
- quantity_after (integer, required)
- created_by (string, required)
- created_by_name (string, required)
- created_by_role (string, required) - enum: admin|system|manager
- order_id (string, optional)
- customer_id (string, optional)
- customer_name (string, optional)
- notes (string, optional)
- status (string, required) - enum: pending|approved|rejected
- created_at (datetime, required)

Indexes needed:
- product_id (key)
- movement_type (key)
- created_at (key)
- status (key)
- created_by (key)

Permissions:
- Read: users
- Write: users (admin role)
"

echo "⚠️  Please create this collection manually in Appwrite Console!"
echo "🔗 Go to: https://cloud.appwrite.io/console -> Database -> Create Collection"