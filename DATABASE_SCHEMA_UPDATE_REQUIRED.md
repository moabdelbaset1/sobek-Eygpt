# Database Schema Update Required - Enhanced Inventory Management

## 🚨 Action Required: Add New Fields to Appwrite Database

The enhanced inventory management system requires adding new fields to the `products` collection in Appwrite. Currently, these fields are temporarily stored in the `meta_keywords` field to avoid database errors.

### New Fields to Add to Products Collection

#### 1. Season Field
- **Field Name:** `season`
- **Type:** `String` (Enum)
- **Size:** 20 characters
- **Required:** No
- **Default:** `all-season`
- **Allowed Values:** `summer`, `winter`, `all-season`
- **Description:** Product season for inventory categorization

```sql
-- Appwrite Console > Database > products collection > Add Attribute
Name: season
Type: String
Size: 20
Required: false
Default: all-season
Array: false
```

#### 2. Custom Product ID Field
- **Field Name:** `customProductId`
- **Type:** `String`
- **Size:** 50 characters
- **Required:** No
- **Default:** (empty)
- **Description:** Unique ID for factory tracking and easy searching

```sql
-- Appwrite Console > Database > products collection > Add Attribute
Name: customProductId
Type: String
Size: 50
Required: false
Array: false
```

#### 3. Carton Code Field
- **Field Name:** `cartonCode`
- **Type:** `String`
- **Size:** 50 characters
- **Required:** No
- **Default:** (empty)
- **Description:** Code to be printed on factory cartons for inventory tracking

```sql
-- Appwrite Console > Database > products collection > Add Attribute
Name: cartonCode
Type: String
Size: 50
Required: false
Array: false
```

### Steps to Update Database Schema

1. **Login to Appwrite Console**
   - Go to: https://fra.cloud.appwrite.io/console
   - Login with admin credentials

2. **Navigate to Database**
   - Select the project: `68dbeba80017571a1581`
   - Go to `Database` section
   - Select database: `68dbeceb003bf10d9498`
   - Select collection: `products`

3. **Add New Attributes**
   - Click "Add Attribute" button
   - Add each field with the specifications above
   - **Important:** Make sure field names match exactly: `season`, `customProductId`, `cartonCode`

4. **Update API Code**
   - After adding the fields, uncomment the new fields in:
   - File: `src/app/api/admin/products/route.ts`
   - Replace the temporary meta_keywords storage with proper field assignment

### Code Changes After Database Update

Once the database fields are added, update the API payload:

```typescript
// In src/app/api/admin/products/route.ts
const productPayload = {
  name: data.name,
  slug: data.slug,
  brand_id: data.brand_id,
  category_id: data.category_id,
  units: data.units ?? 1,
  price: data.price,
  discount_price: data.discount_price ?? 0,
  min_order_quantity: data.min_order_quantity ?? 1,
  description: data.description || "",
  is_active: data.is_active ?? true,
  is_new: data.is_new ?? false,
  is_featured: data.is_featured ?? false,
  meta_title: data.meta_title || data.name,
  meta_description: data.meta_description || "",
  meta_keywords: data.meta_keywords || "",
  // Add these fields back after database schema update:
  season: data.season || 'all-season',
  customProductId: data.customProductId || '',
  cartonCode: data.cartonCode || '',
}
```

### Current Status

✅ **Frontend Forms:** Ready with new fields
✅ **TypeScript Types:** Updated with new interfaces  
✅ **Validation:** Added for new fields
✅ **Enhanced Catalog:** Ready with hierarchical filtering
⚠️ **Database Schema:** Needs to be updated (this document)
⚠️ **API Storage:** Temporarily using meta_keywords field

### Testing After Update

1. Add a new product with the enhanced form
2. Verify the new fields are saved correctly
3. Test the enhanced catalog filtering
4. Confirm search works with custom product IDs and carton codes

### Benefits After Update

- **Factory Integration:** Carton codes can be printed directly from the system
- **Easy Search:** Find products by custom ID instantly
- **Seasonal Management:** Filter products by season (summer/winter)
- **Warehouse Tracking:** Better inventory management with unique codes
- **Enhanced Filtering:** Hierarchical brand-category filtering in customer catalog

### Files Modified

- `src/types/product.ts` - Added new fields to TypeScript interfaces
- `src/app/admin/products/new/page.tsx` - Added form fields for new data
- `src/app/api/admin/products/route.ts` - API validation and temporary storage
- `src/components/catalog/EnhancedProductCatalog.tsx` - New enhanced catalog with filtering

---

**Priority:** High  
**Impact:** Enables full inventory management system  
**Estimated Time:** 15 minutes to add database fields  

Contact the database administrator to add these fields to enable the complete enhanced inventory management system.