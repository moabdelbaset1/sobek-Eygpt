# Sobek Pharma - Admin Panel Setup Plan

## 🏗️ Architecture Overview
```
Frontend (Next.js) 
├── Public Website (Current)
├── Admin Dashboard (/admin)
└── API Routes (/api)

Backend (Supabase)
├── PostgreSQL Database
├── Auto-generated APIs
├── Authentication
├── File Storage
└── Real-time subscriptions
```

## 📊 Database Schema

### Human Products Table
```sql
CREATE TABLE human_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  generic_name VARCHAR(255) NOT NULL,
  strength VARCHAR(100) NOT NULL,
  dosage_form VARCHAR(100) NOT NULL,
  indication TEXT NOT NULL,
  pack_size VARCHAR(100),
  registration_number VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Veterinary Products Table
```sql
CREATE TABLE veterinary_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  generic_name VARCHAR(255) NOT NULL,
  strength VARCHAR(100) NOT NULL,
  dosage_form VARCHAR(100) NOT NULL,
  indication TEXT NOT NULL,
  species VARCHAR(255) NOT NULL,
  withdrawal_period VARCHAR(255),
  pack_size VARCHAR(100),
  registration_number VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'human' or 'veterinary'
  icon VARCHAR(10),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🛠️ Implementation Steps

### Step 1: Setup Supabase
1. Create account at supabase.com
2. Create new project
3. Setup database tables
4. Configure authentication
5. Setup file storage bucket

### Step 2: Admin Dashboard Features
```
├── 🏠 Dashboard Overview
│   ├── Total Products Count
│   ├── Recent Activities
│   └── Quick Stats
├── 💊 Products Management
│   ├── Human Products CRUD
│   ├── Veterinary Products CRUD
│   ├── Bulk Import/Export
│   └── Product Images Upload
├── 📁 Categories Management
│   ├── Add/Edit Categories
│   └── Category Icons
├── 👥 User Management
│   ├── Admin Users
│   └── Permissions
└── ⚙️ Settings
    ├── Site Configuration
    └── API Keys Management
```

### Step 3: Required Packages
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "@supabase/auth-helpers-nextjs": "^0.x",
    "react-hook-form": "^7.x",
    "react-table": "^8.x",
    "@headlessui/react": "^1.x",
    "react-hot-toast": "^2.x",
    "lucide-react": "^0.x"
  }
}
```

## 🚀 Quick Start Commands

### Setup Supabase
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🎨 Admin UI Components
- Dashboard Layout with Sidebar
- Data Tables with Sorting/Filtering
- Forms with Validation
- Image Upload with Preview
- Modal Dialogs
- Toast Notifications
- Loading States

## 🔒 Security Features
- JWT Authentication
- Role-based Access Control
- Input Validation
- SQL Injection Protection
- File Upload Restrictions
- Rate Limiting

## 📱 Responsive Design
- Mobile-friendly admin panel
- Touch-optimized controls
- Responsive tables
- Mobile navigation

## 🔄 Real-time Features
- Live product updates
- Real-time notifications
- Collaborative editing
- Auto-save functionality