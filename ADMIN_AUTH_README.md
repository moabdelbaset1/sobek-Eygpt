# Admin Authentication System

## Overview
Secure admin authentication system with role-based access control.

## Features

### 1. Admin Access Control
- ✅ Only authorized emails can access admin panel
- ✅ Automatic redirect to login if not authenticated
- ✅ Session-based authentication with cookies
- ✅ Separate admin session cookie for security

### 2. Admin Emails Configuration
Admin emails are configured in:
- `/src/app/api/auth/login/route.ts`
- `/src/app/api/auth/check-admin/route.ts`

```typescript
const ADMIN_EMAILS = [
  'admin@devegy.com',
  'admin@dav-egypt.com',
  'moabdelbaset1@gmail.com'  // Add your admin emails here
]
```

### 3. Authentication Flow

```
User visits /admin
    ↓
Admin Layout checks authentication
    ↓
Calls /api/auth/check-admin
    ↓
No valid admin session?
    ↓
Redirect to /login?redirect=/admin&requireAdmin=true
    ↓
User logs in with admin email
    ↓
System checks if email is in ADMIN_EMAILS list
    ↓
If admin: Set admin_session cookie
If not: Show error "Admin access required"
    ↓
Redirect back to /admin
    ↓
Admin panel accessible
```

### 4. Session Management

**Session Cookies:**
- `session` - Regular user session
- `admin_session` - Admin-only session (required for admin panel)

**Cookie Settings:**
- `httpOnly: true` - Prevents JavaScript access (security)
- `secure: true` (production) - HTTPS only
- `sameSite: 'lax'` - CSRF protection
- `maxAge: 7 days` - Session expiration

### 5. Security Features

✅ **Role-Based Access**: Only emails in ADMIN_EMAILS can access admin panel
✅ **Automatic Logout**: Clear sessions on logout
✅ **Session Validation**: Check on every admin page load
✅ **Secure Cookies**: HttpOnly and Secure flags
✅ **No Direct Access**: Can't bypass to admin without proper authentication

## Setup Instructions

### 1. Add Your Admin Email

Edit these files and add your email:

**File 1:** `/src/app/api/auth/login/route.ts`
```typescript
const ADMIN_EMAILS = [
  'admin@devegy.com',
  'admin@dav-egypt.com',
  'your-email@example.com'  // ← Add your email here
]
```

**File 2:** `/src/app/api/auth/check-admin/route.ts`
```typescript
const ADMIN_EMAILS = [
  'admin@devegy.com',
  'admin@dav-egypt.com',
  'your-email@example.com'  // ← Add your email here
]
```

### 2. Create Admin Account in Appwrite

1. Go to Appwrite Console → Authentication → Users
2. Click "Create User"
3. Enter your admin email and password
4. Save

### 3. Test Admin Login

1. Go to `http://localhost:3000/admin`
2. You'll be redirected to login page
3. Enter your admin email and password
4. If email is in ADMIN_EMAILS list → Access granted
5. If not → Error: "Admin access required"

## API Endpoints

### POST `/api/auth/login`
Login endpoint that creates session and checks admin status.

**Request:**
```json
{
  "email": "admin@devegy.com",
  "password": "your-password"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user": { ... },
  "session": { ... },
  "isAdmin": true
}
```

**Response (Not Admin):**
```json
{
  "success": true,
  "user": { ... },
  "session": { ... },
  "isAdmin": false
}
```

### GET `/api/auth/check-admin`
Validates admin session before allowing admin panel access.

**Response (Admin):**
```json
{
  "isAdmin": true,
  "user": {
    "name": "Admin User",
    "email": "admin@devegy.com"
  }
}
```

**Response (Not Admin):**
```json
{
  "isAdmin": false,
  "error": "Unauthorized - Admin access required"
}
```

### POST `/api/auth/logout`
Clears all session cookies.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Customer Signup/Login Flow

### Signup Page: `/signup`
New customers can create accounts with:
- Full Name
- Email
- Phone Number
- Password (min 8 characters)
- Shipping Address (optional)
- Terms & Conditions acceptance

**Features:**
- Shows discount code if referred from marketing popup
- Email validation
- Password strength requirement
- Auto-redirect to login after successful signup

### Login Page: `/login`
Existing users can log in and will be redirected based on their role:
- **Admin users** → `/admin`
- **Regular users** → Home page or their intended destination

## Marketing Integration

The signup page integrates with the marketing popup system:
- When user clicks "Claim Discount" in popup → Redirects to `/signup?discount=WELCOME15`
- Discount code is displayed prominently
- After signup → User can use discount code at checkout

## Files Modified

### Components
- `/src/app/admin/layout.tsx` - Added authentication check
- `/src/app/signup/page.tsx` - New signup page

### API Routes
- `/src/app/api/auth/login/route.ts` - Enhanced with admin check
- `/src/app/api/auth/check-admin/route.ts` - New admin validation endpoint
- `/src/app/api/auth/logout/route.ts` - Enhanced to clear admin session

## Production Deployment

For production, consider:

1. **Move ADMIN_EMAILS to environment variables:**
```env
ADMIN_EMAILS=admin@devegy.com,admin@dav-egypt.com,your-email@example.com
```

2. **Use database for admin roles:**
   - Create `user_roles` collection in Appwrite
   - Store admin status in user document
   - Check role from database instead of hardcoded list

3. **Add rate limiting:**
   - Prevent brute force login attempts
   - Add captcha after failed attempts

4. **Enable 2FA for admins:**
   - SMS or email verification codes
   - Authenticator app support

## Troubleshooting

### Issue: "Unauthorized - Admin access required"
**Solution:** Make sure your email is added to ADMIN_EMAILS in both files

### Issue: Infinite redirect loop
**Solution:** Clear browser cookies and try again

### Issue: Admin panel shows loading forever
**Solution:** Check browser console for errors, verify API endpoints are working

### Issue: Can't access admin even with correct email
**Solution:** 
1. Verify email is in ADMIN_EMAILS (case-sensitive)
2. Clear cookies
3. Logout and login again
4. Check browser Network tab for API responses

## Security Best Practices

✅ **DO:**
- Use strong passwords for admin accounts
- Keep ADMIN_EMAILS list updated
- Monitor admin access logs
- Use HTTPS in production
- Rotate admin passwords regularly

❌ **DON'T:**
- Share admin credentials
- Use weak passwords
- Expose admin emails publicly
- Allow unencrypted connections in production

## Next Steps

1. Move admin emails to database
2. Add activity logging for admin actions
3. Implement 2FA
4. Add IP whitelisting option
5. Create audit trail for sensitive operations
