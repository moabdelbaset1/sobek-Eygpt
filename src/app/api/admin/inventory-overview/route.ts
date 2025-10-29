import { NextRequest, NextResponse } from 'next/server'
import { Query } from 'node-appwrite'
import { createAdminClient } from '@/lib/appwrite-admin'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ''
const MOVEMENTS_COLLECTION = 'inventory_movements'
const ALERTS_COLLECTION = 'inventory_alerts'
const AUDIT_COLLECTION = 'inventory_audit_items'

export async function GET(request: NextRequest) {
  try {
    if (!DATABASE_ID) {
      console.error('❌ DATABASE_ID not configured in environment')
      return NextResponse.json(
        { items: [], error: 'Database ID not configured' },
        { status: 500 }
      )
    }

    console.log('📊 Fetching inventory data from Appwrite...')
    console.log(`  Database: ${DATABASE_ID}`)
    console.log(`  Collections: ${MOVEMENTS_COLLECTION}, ${ALERTS_COLLECTION}, ${AUDIT_COLLECTION}`)

    const { databases } = await createAdminClient()

    // Fetch movements and alerts in parallel (audit is optional)
    const [movementsResult, alertsResult, auditResult] = await Promise.all([
      databases.listDocuments(DATABASE_ID, MOVEMENTS_COLLECTION, [Query.limit(1000)])
        .then(res => ({ documents: res.documents || [], error: null }))
        .catch(err => {
          console.warn(`⚠️ Error fetching movements: ${err.message}`)
          return { documents: [], error: err.message }
        }),
      databases.listDocuments(DATABASE_ID, ALERTS_COLLECTION, [Query.limit(1000)])
        .then(res => ({ documents: res.documents || [], error: null }))
        .catch(err => {
          console.warn(`⚠️ Error fetching alerts: ${err.message}`)
          return { documents: [], error: err.message }
        }),
      databases.listDocuments(DATABASE_ID, AUDIT_COLLECTION, [Query.limit(1000)])
        .then(res => ({ documents: res.documents || [], error: null }))
        .catch(err => {
          console.warn(`⚠️ Error fetching audit: ${err.message}`)
          return { documents: [], error: err.message }
        }),
    ])

    const movements = movementsResult.documents || []
    const alerts = alertsResult.documents || []
    const audit = auditResult.documents || []

    console.log(`✅ Fetched: ${movements.length} movements, ${alerts.length} alerts, ${audit.length} audit items`)

    // Build unified items map from movements
    const movementMap = new Map<string, any>()

    movements.forEach((m: any) => {
      const key = m.product_id || m.$id || m.product || 'unknown'
      if (!movementMap.has(key)) {
        movementMap.set(key, {
          id: key,
          customProductId: m.custom_product_id || key,
          name: m.product_name || m.name || 'Unknown',
          brandName: m.brand_name || 'Unknown',
          quantityOut: 0,
          quantityRemaining: m.quantity_after || 0,
          status: 'in',
          location: m.location || 'Warehouse',
          lastUpdated: m.$updatedAt || m.updatedAt || null,
        })
      }

      if (m.movement_type === 'out' || m.movement_type === 'sales') {
        movementMap.get(key).quantityOut += Math.abs(m.quantity_change || 0)
      }
    })

    // Start unified items with movementMap values
    const unifiedItems: any[] = Array.from(movementMap.values())

    // Merge alerts into unified items
    alerts.forEach((a: any) => {
      const pid = a.product_id || a.$id || a.product || 'unknown'
      const idx = unifiedItems.findIndex(i => i.id === pid)
      const statusValue = (a.status === 'out_of_stock') ? 'alert' : 'low_stock'

      if (idx >= 0) {
        unifiedItems[idx].status = a.status || statusValue
        unifiedItems[idx].quantityRemaining = a.stock_level ?? unifiedItems[idx].quantityRemaining
      } else {
        unifiedItems.push({
          id: pid,
          customProductId: a.custom_product_id || pid,
          name: a.product_name || a.name || 'Unknown',
          brandName: a.brand_name || 'Unknown',
          quantityOut: 0,
          quantityRemaining: a.stock_level || 0,
          status: statusValue,
          location: a.location || 'Warehouse',
          lastUpdated: a.$updatedAt || a.updatedAt || null,
        })
      }
    })

    // If we have no inventory data, try to build from products collection as fallback
    if (unifiedItems.length === 0) {
      console.log('⚠️ No inventory movements or alerts found. Attempting fallback from products collection...')
      try {
        const productsResult = await databases.listDocuments(DATABASE_ID, 'products', [Query.limit(1000)])
          .catch(() => ({ documents: [] }))
        
        const products = productsResult.documents || []
        console.log(`✅ Fallback: Found ${products.length} products`)
        
        // Log first product to debug the ID structure
        if (products.length > 0) {
          console.log('📝 First product structure:', {
            $id: products[0].$id,
            custom_product_id: products[0].custom_product_id,
            name: products[0].name
          })
        }

        // Fetch brands to map brand_id to brand names
        const brandsResult = await databases.listDocuments(DATABASE_ID, 'brands', [Query.limit(1000)])
          .catch(() => ({ documents: [] }))
        
        const brands = brandsResult.documents || []
        const brandMap = new Map(brands.map((b: any) => [b.$id, b.name || 'Unknown']))
        console.log(`✅ Fetched ${brands.length} brands for name mapping`)

        const fallbackItems = products.map((p: any) => ({
          id: p.$id,  // The document ID IS the customProductId (this is what the admin entered)
          customProductId: p.$id,  // Same - the user-defined ID from when product was created
          name: p.name || 'Unknown',
          brandName: brandMap.get(p.brand_id) || p.brand_id || 'Unknown',  // Brand NAME for display
          quantityOut: 0,
          quantityRemaining: p.units || p.stock || 0,
          status: (p.units || p.stock || 0) === 0 ? 'alert' : (p.units || p.stock || 0) < 5 ? 'low_stock' : 'in',
          location: 'Warehouse',
          lastUpdated: p.$updatedAt || null,
        }))

        unifiedItems.push(...fallbackItems)
      } catch (err: any) {
        console.warn(`⚠️ Fallback also failed: ${err.message}`)
      }
    }

    return NextResponse.json({ items: unifiedItems })
  } catch (error: any) {
    console.error('❌ Error building inventory overview:', error)
    console.error('  Stack:', error.stack)
    return NextResponse.json(
      { 
        items: [], 
        error: error.message || 'Unknown error',
        debug: {
          DATABASE_ID: DATABASE_ID || 'NOT_SET',
          env: process.env.NODE_ENV
        }
      },
      { status: 500 }
    )
  }
}
