# Chai & Biscuit Co. — Tea, Coffee, Snacks & Biscuits Shop

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full multi-page shop website with Home, Menu, About, Contact, and Cart/Billing pages
- Backend: product catalog stored in canister, customer orders stored in canister, admin authentication
- Frontend: animated hero, product cards, category filter + search, cart with GST calculation, printable bill receipt, order confirmation, admin panel for CRUD on products
- Toast notifications for cart actions
- Smooth page transitions and scroll animations

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend (Motoko)
1. Data types: Product (id, name, category, description, price, imageUrl, inStock), Order (id, items, customerName, total, gstAmount, status, timestamp), AdminCredentials
2. Product CRUD: getProducts, getProductsByCategory, addProduct, updateProduct, deleteProduct
3. Order management: placeOrder, getOrders, updateOrderStatus
4. Admin auth: adminLogin (returns session token), isAdminAuthenticated
5. Cart is client-side only (no backend needed for cart state)

### Frontend
1. **App shell**: React Router with pages: Home, Menu, About, Contact, Cart, OrderConfirmation, Admin
2. **Home page**: Animated hero with CSS steam/wave effect, welcome section, featured products carousel, CTA buttons
3. **Menu page**: Category tabs (Tea, Coffee, Snacks, Biscuits), search input, product grid with cards (image, name, price, add-to-cart button), loading skeleton
4. **About page**: Shop story text, owner profile section, shop photo gallery
5. **Contact page**: Address + phone info, Google Maps embed (iframe), contact form (name, message) — form submits to backend or shows toast confirmation
6. **Cart / Billing page**: Cart item list with quantity controls, subtotal, GST (18%) calculation, order total, customer name input, place order button, printable bill receipt (window.print)
7. **Order Confirmation page**: Success animation, order summary, order ID
8. **Admin panel**: Login form, product list table with edit/delete, add product form (name, category, description, price, imageUrl), order list with status update
9. **Global**: Warm color theme tokens, loading spinner, toast notification system, smooth scroll, responsive nav with hamburger menu on mobile
