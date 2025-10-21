 🏥 Sobek Pharma Admin Panel Guide

## 📋 Overview
Complete admin panel for managing Sobek Pharma's pharmaceutical products, categories, and website content.

---

## 🎯 Current Features

### ✅ **1. Dashboard** (`/admin/dashboard`)
- **Statistics Overview**
  - Total Human Products
  - Total Veterinary Products
  - Active Products Count
  - Products Needing Review
  
- **Quick Actions**
  - Add Human Product (links to /admin/products/human)
  - Add Veterinary Product (links to /admin/products/veterinary)
  - Manage Categories (links to /admin/categories)
  
- **Recent Activity Feed**
  - Product additions
  - Product updates
  - Product deletions
  - Timestamps for all activities

- **View Website Button**
  - Direct link to live website

---

### ✅ **2. Human Products Management** (`/admin/products/human`)
**Full CRUD Operations:**
- ➕ **Add Products**
  - Product Name (English & Arabic)
  - Active Ingredient
  - Concentration
  - Dosage Form
  - Pack Size
  - Indication
  - Contraindications
  - Side Effects
  - **Category Selection** (dropdown with all human categories)
  - **Image Upload** (drag & drop or click to browse)
  
- ✏️ **Edit Products**
  - Modify all product fields
  - Change product image
  - Update category assignment
  
- 🗑️ **Delete Products**
  - Soft delete (sets is_active = false)
  - Products remain in database but hidden from public
  
- 🔍 **Search & Filter**
  - Search by product name
  - Filter by category
  - Filter by active status
  - Real-time search results

- 📊 **Product Statistics**
  - Total products count
  - Category breakdown

---

### ✅ **3. Veterinary Products Management** (`/admin/products/veterinary`)
**Same as Human Products, plus:**
- 🐄 **Species Field** (e.g., Cattle, Poultry, Pets, Fish)
- ⏱️ **Withdrawal Period** (for meat/milk safety)
- All standard CRUD operations
- Category-based organization

---

### ✅ **4. Categories Management** (`/admin/categories`)
**Complete Category Control:**
- ➕ **Add New Categories**
  - Category Name (English) *required
  - Category Name (Arabic) *optional
  - Slug (URL-friendly) *required
  - Type (Human/Veterinary) *required
  - Description *optional
  
- 🔍 **Search & Filter**
  - Search by category name
  - Filter by type (All/Human/Veterinary)
  - Live count of filtered results
  
- 📊 **Category Display**
  - Color-coded badges (Blue=Human, Green=Veterinary)
  - Category details in cards
  - Edit and Delete buttons
  
- ✏️ **Edit Categories** (Coming Soon)
  - Modify category details
  - Update type and slug
  
- 🗑️ **Delete Categories** (Coming Soon)
  - Remove unused categories

---

## 🎨 Design Features

### **Consistent UI/UX**
- ✅ All English interface
- ✅ Professional gray/red color scheme
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations (Framer Motion)
- ✅ Intuitive navigation

### **Sidebar Navigation**
- Dashboard
- Human Products
- Veterinary Products
- Categories
- Settings
- Logout button

### **Form Validation**
- Required field indicators (*)
- Real-time input validation
- Error messages
- Success notifications

---

## 🔐 Authentication

### **Login System** (`/admin/login`)
- Email/Password authentication
- Stored in localStorage
- Session management
- Auto-redirect if not authenticated

### **Default Credentials**
```
Email: admin@sobekpharma.com
Password: admin123
```

---

## 🗄️ Database Structure

### **Tables:**

#### **1. categories**
```sql
id (UUID)
name (VARCHAR) - English name
name_ar (VARCHAR) - Arabic name
slug (VARCHAR) - URL-friendly identifier
type (VARCHAR) - 'human' or 'veterinary'
icon (VARCHAR) - Icon identifier
description (TEXT)
created_at (TIMESTAMP)
```

#### **2. human_products**
```sql
id (UUID)
name (VARCHAR)
name_en (VARCHAR)
generic_name (VARCHAR)
strength (VARCHAR)
dosage_form (VARCHAR)
indication (TEXT)
contraindications (TEXT)
side_effects (TEXT)
pack_size (VARCHAR)
category (VARCHAR) - References categories.slug
image_url (TEXT)
is_active (BOOLEAN)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### **3. veterinary_products**
```sql
(Same as human_products, plus:)
species (VARCHAR)
withdrawal_period (VARCHAR)
```

---

## 📂 File Structure

```
web/src/app/
├── admin/
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   ├── products/
│   │   ├── human/
│   │   │   └── page.tsx      # Human products management
│   │   └── veterinary/
│   │       └── page.tsx      # Veterinary products management
│   └── categories/
│       └── page.tsx          # Categories management
├── lib/
│   ├── supabase.ts           # Database API functions
│   └── uploadHelpers.ts      # Image upload utilities
└── products/
    ├── human-new/
    │   ├── page.tsx          # Human categories page
    │   ├── cardiovascular/
    │   ├── anti-infectives/
    │   ├── endocrinology-diabetes/
    │   └── gastroenterology/
    └── veterinary-new/
        └── page.tsx          # Veterinary categories page
```

---

## 🚀 Suggested Future Enhancements

### **1. Advanced Analytics** 📊
- [ ] Products per category chart
- [ ] Growth trends over time
- [ ] Most viewed products
- [ ] Export reports (PDF/Excel)

### **2. Bulk Operations** 📦
- [ ] Import products from CSV/Excel
- [ ] Bulk edit (activate/deactivate multiple)
- [ ] Bulk delete
- [ ] Bulk category assignment

### **3. Image Management** 🖼️
- [ ] Image gallery/library
- [ ] Bulk image upload
- [ ] Image optimization
- [ ] Multiple images per product

### **4. User Management** 👥
- [ ] Multiple admin accounts
- [ ] Role-based permissions
- [ ] Activity logs per user
- [ ] Password reset functionality

### **5. SEO & Marketing** 🔍
- [ ] Meta tags management
- [ ] Product descriptions SEO
- [ ] Featured products
- [ ] New arrivals section

### **6. Advanced Search** 🔎
- [ ] Full-text search
- [ ] Advanced filters
- [ ] Sort options
- [ ] Saved searches

### **7. Notifications** 🔔
- [ ] Email notifications for new products
- [ ] Low stock alerts
- [ ] Update notifications
- [ ] Admin activity alerts

### **8. Settings Page** ⚙️
- [ ] Change admin password
- [ ] Website settings
- [ ] Email configurations
- [ ] Backup & restore

### **9. Product Variants** 🔄
- [ ] Different pack sizes
- [ ] Different strengths
- [ ] Bundled products
- [ ] Related products

### **10. Inventory Management** 📦
- [ ] Stock levels
- [ ] Low stock alerts
- [ ] Expiry date tracking
- [ ] Batch numbers

---

## 💡 How to Use

### **Adding a New Product:**
1. Navigate to Human Products or Veterinary Products
2. Click "+ Add Product" button
3. Fill in all required fields (*)
4. Select category from dropdown
5. Upload product image
6. Click "Add Product"
7. Product appears in category page immediately

### **Adding a New Category:**
1. Navigate to Categories
2. Click "+ Add Category" button
3. Enter category name (English required)
4. Create URL-friendly slug
5. Select type (Human/Veterinary)
6. Add optional description
7. Click "Create Category"
8. Category available in product forms immediately

### **Managing Products:**
1. Use search box to find specific products
2. Filter by category or status
3. Click edit icon to modify
4. Click delete icon to remove (soft delete)
5. Changes reflect immediately on website

---

## 🌐 Website Integration

### **Public Pages:**
- `/products/human-new` - Human categories browser
- `/products/human-new/cardiovascular` - Cardiovascular products
- `/products/human-new/anti-infectives` - Anti-infectives
- `/products/human-new/endocrinology-diabetes` - Endocrinology
- `/products/human-new/gastroenterology` - Gastroenterology
- `/products/veterinary-new` - Veterinary categories browser

### **Data Flow:**
```
Admin adds product
    ↓
Supabase database
    ↓
Public website fetches
    ↓
Displays in category page
```

---

## 🔧 Technical Stack

- **Framework:** Next.js 15.5.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Animations:** Framer Motion 12
- **Forms:** React Hook Form
- **Icons:** Lucide React

---

## 📞 Support

For any questions or issues:
1. Check this README
2. Review database schema
3. Check browser console for errors
4. Verify Supabase connection

---

## ✅ Completed Features Checklist

- [x] Admin authentication
- [x] Dashboard with statistics
- [x] Human products CRUD
- [x] Veterinary products CRUD
- [x] Categories management
- [x] Image upload system
- [x] Search & filter
- [x] Category-based products
- [x] Public website integration
- [x] English interface
- [x] Responsive design
- [x] Database structure
- [x] Real-time updates

---

**Last Updated:** October 20, 2025
**Version:** 2.0
**Status:** Production Ready 🚀