# Marketing & Authentication System

## Overview
Professional marketing system with delayed signup popup and mandatory checkout authentication.

## Features

### 1. Marketing Popup (After 1 Minute)
- **Trigger**: Displays after 60 seconds of browsing
- **Smart Detection**: Only shows to non-logged-in users
- **Cooldown**: Won't show again for 24 hours after dismissal
- **Offer**: 15% discount for new signups
- **Benefits Highlighted**:
  - Exclusive member-only deals
  - Free shipping on orders over $50
  - Early access to new products

### 2. Checkout Authentication Gate
- **Requirement**: Users MUST login/signup before completing purchase
- **Modal**: Beautiful checkout login modal appears if user is not authenticated
- **Dual Mode**: 
  - Quick login for existing users
  - Full signup form for new customers
- **Data Collection**:
  - Name
  - Email
  - Phone
  - Password
  - Shipping Address

### 3. User Experience Flow

```
Visitor lands on site
    ↓
Browses for 60 seconds
    ↓
Popup appears: "Get 15% OFF - Sign up now!"
    ↓
Options:
  ├─ Sign Up → Get discount code → Continue shopping
  ├─ Maybe Later → Continue browsing
  └─ (Won't show again for 24 hours)
    ↓
Adds items to cart
    ↓
Proceeds to checkout
    ↓
NOT Logged In?
    ↓
Checkout Login Modal appears
    ↓
Options:
  ├─ Login (existing user)
  └─ Sign Up (new user - collects full info)
    ↓
After successful auth → Proceeds with checkout
```

## Files Created

### Components
- `/src/components/marketing/signup-popup.tsx` - Main marketing popup component
- `/src/components/marketing/marketing-popup-provider.tsx` - Provider with timing logic
- `/src/components/checkout/checkout-login-modal.tsx` - Checkout authentication modal

### API Endpoints
- `/api/auth/session` - Check current user session
- `/api/auth/signup` - Create new user account
- `/api/auth/logout` - Clear user session

## Implementation

### 1. Root Layout Integration
The marketing popup provider is wrapped around the entire app in `/src/app/layout.tsx`:

```tsx
<MarketingPopupProvider>
  {children}
</MarketingPopupProvider>
```

### 2. Checkout Page Guard
The checkout page now checks authentication and shows modal if needed:

```tsx
useEffect(() => {
  if (!auth.isLoading && !auth.isAuthenticated) {
    setShowLoginModal(true);
  }
}, [auth.isLoading, auth.isAuthenticated]);
```

## Configuration

### Popup Timing (in `/src/components/marketing/marketing-popup-provider.tsx`)
```typescript
const POPUP_DELAY = 60000 // 1 minute (60,000 ms)
const POPUP_COOLDOWN = 24 * 60 * 60 * 1000 // 24 hours
```

### Discount Code
The signup popup redirects to: `/signup?discount=WELCOME15`

You can change this in the `handleSignup` function.

## Customization

### Change Popup Timing
Edit `POPUP_DELAY` in `marketing-popup-provider.tsx`:
```typescript
const POPUP_DELAY = 30000 // 30 seconds
const POPUP_DELAY = 120000 // 2 minutes
```

### Change Discount Offer
Edit the discount percentage and code in `signup-popup.tsx`:
```tsx
<p className="font-bold text-yellow-900 text-lg">Get 15% OFF</p>
```

### Change Required Fields
Edit the checkout login modal form fields in `checkout-login-modal.tsx`.

## Browser Storage

The system uses `localStorage` to track:
- `signup_popup_shown` - Whether popup was shown
- `signup_popup_timestamp` - When popup was last shown

This prevents annoying users with repeated popups.

## Benefits

### For Business
✅ Captures user data before purchase
✅ Builds email list for marketing
✅ Reduces abandoned carts (users committed once logged in)
✅ Creates urgency with discount offers
✅ Professional user experience

### For Users
✅ Exclusive discounts
✅ Order tracking
✅ Saved addresses for faster future checkouts
✅ Member-only benefits
✅ Clear value proposition

## Next Steps (TODO)

1. **Integrate with real authentication**:
   - Connect `/api/auth/signup` to Appwrite Users API
   - Connect `/api/auth/session` to verify real sessions
   - Implement proper password hashing

2. **Add discount code functionality**:
   - Create discount codes in database
   - Validate WELCOME15 code at checkout
   - Apply 15% discount automatically

3. **Track conversions**:
   - Log popup impressions
   - Track signup conversions from popup
   - Monitor checkout completion rates

4. **A/B Testing**:
   - Test different popup timings
   - Test different discount percentages
   - Test different copy/messaging

## Testing

1. **Test Popup**:
   - Open site in incognito
   - Wait 60 seconds
   - Popup should appear
   - Dismiss and check localStorage

2. **Test Checkout Gate**:
   - Add items to cart
   - Go to checkout
   - If not logged in, modal should appear
   - Try both login and signup flows

## Notes

- Popup only shows once per 24 hours
- Popup only shows to non-authenticated users
- Checkout requires authentication (no guest checkout)
- All forms include proper validation
- Mobile responsive design
- Smooth animations and transitions
