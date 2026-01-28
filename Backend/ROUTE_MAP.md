# Route Map - Aapka Vyapar Backend

This document provides a visual map of all routes, their controllers, and the flow of data through the application.

---

## 🗺️ Complete Route Structure

```
http://localhost:3000
│
├── / (GET)
│   └── Returns: "Hello World!"
│
├── /user
│   ├── /register (POST) ❌ No Auth
│   │   ├── Controller: user.controller.js → registerUser
│   │   ├── Request: { username, email, password }
│   │   ├── Process: Hash password → Create user → Generate JWT
│   │   └── Response: { message, Accesstoken, Refreshtoken, user }
│   │
│   ├── /login (POST) ❌ No Auth
│   │   ├── Controller: user.controller.js → loginUser
│   │   ├── Request: { email, password }
│   │   ├── Process: Find user → Verify password → Generate JWT
│   │   └── Response: { message, Accesstoken, Refreshtoken, user }
│   │
│   ├── /sendOtp (POST) ❌ No Auth
│   │   ├── Controller: user.controller.js → changePassword
│   │   ├── Request: { email }
│   │   ├── Process: Generate OTP → Save to DB → Send email
│   │   └── Response: { message, otpData }
│   │
│   ├── /verifyOTP (POST) ❌ No Auth
│   │   ├── Controller: user.controller.js → verifyOtp
│   │   ├── Request: { email, otp }
│   │   ├── Process: Validate OTP → Check expiry
│   │   └── Response: { message, user }
│   │
│   ├── /resetPassword (POST) ❌ No Auth
│   │   ├── Controller: user.controller.js → resetPassword
│   │   ├── Request: { email, newPassword }
│   │   ├── Process: Hash password → Update user → Clear OTP → Generate JWT
│   │   └── Response: { message, Accesstoken, Refreshtoken, updateUser }
│   │
│   └── /profile (GET) ✅ Auth Required
│       ├── Middleware: authUser
│       ├── Controller: user.controller.js → profile
│       ├── Process: Return authenticated user from req.user
│       └── Response: { message, user }
│
├── /business
│   ├── /basic-details (POST) ✅ Auth Required
│   │   ├── Middleware: authUser
│   │   ├── Controller: business.controller.js → basicDetails
│   │   ├── Request: { businessName, GstNo, businessPhoneNumber1, 
│   │   │             businessPhoneNumber2, businessAddress, businessEmail,
│   │   │             businessPincode, businessDescription, signature }
│   │   ├── Process: Get userId from req.user → Check duplicates → Create business
│   │   └── Response: { message, Business }
│   │
│   └── /basic-details/:id (PUT) ✅ Auth Required
│       ├── Middleware: authUser
│       ├── Controller: business.controller.js → updateBusinessDetails
│       ├── Request: { businessName, GstNo, ... } (same as POST)
│       ├── Process: Find business by id and userId → Update
│       └── Response: { message, updatedBusiness }
│
├── /item
│   ├── /addItem (POST) ✅ Auth Required
│   │   ├── Middleware: authUser
│   │   ├── Controller: item.controller.js → addItem
│   │   ├── Request: { itemName, itemcode, itemCategory, HSNCode,
│   │   │             Pricing, stock, purchasePrice, tax }
│   │   ├── Process: Get userId → Find business → Calculate totals → Create item
│   │   └── Response: { message, data }
│   │
│   ├── /getAllItem (GET) ✅ Auth Required
│   │   ├── Middleware: authUser
│   │   ├── Controller: item.controller.js → getAllItem
│   │   ├── Process: Get userId → Find business → Get all items
│   │   └── Response: { message, data }
│   │
│   ├── /updateItem/:itemid (PUT) ✅ Auth Required
│   │   ├── Middleware: authUser
│   │   ├── Controller: item.controller.js → updateItem
│   │   ├── Request: { itemName, itemcode, ... } (same as addItem)
│   │   ├── Process: Find business → Find item → Calculate totals → Update
│   │   └── Response: { message, data }
│   │
│   ├── /deleteItem/:itemid (DELETE) ✅ Auth Required
│   │   ├── Middleware: authUser
│   │   ├── Controller: item.controller.js → deleteItem
│   │   ├── Process: Find business → Delete item
│   │   └── Response: { message, data }
│   │
│   ├── /category
│   │   ├── / (POST) ✅ Auth Required
│   │   │   ├── Middleware: authUser
│   │   │   ├── Controller: ItemFieldController/category.controller.js → addCategory
│   │   │   ├── Request: { categoryName }
│   │   │   └── Response: { message, data }
│   │   │
│   │   ├── /:id (PUT) ✅ Auth Required
│   │   │   ├── Middleware: authUser
│   │   │   ├── Controller: ItemFieldController/category.controller.js → updateCategory
│   │   │   ├── Request: { categoryName }
│   │   │   └── Response: { message, data }
│   │   │
│   │   └── /:id (DELETE) ✅ Auth Required
│   │       ├── Middleware: authUser
│   │       ├── Controller: ItemFieldController/category.controller.js → deleteCategory
│   │       └── Response: { message, data }
│   │
│   ├── /barcode
│   │   ├── / (POST) ✅ Auth Required → addBarcode
│   │   ├── /:id (PUT) ✅ Auth Required → updateBarcode
│   │   └── /:id (DELETE) ✅ Auth Required → deleteBarcode
│   │
│   ├── /hsn
│   │   ├── / (POST) ✅ Auth Required → addHSN
│   │   ├── /:id (PUT) ✅ Auth Required → updateHSN
│   │   └── /:id (DELETE) ✅ Auth Required → deleteHSN
│   │
│   ├── /unit
│   │   ├── / (POST) ✅ Auth Required → addUnit
│   │   ├── /:id (PUT) ✅ Auth Required → updateUnit
│   │   └── /:id (DELETE) ✅ Auth Required → deleteUnit
│   │
│   ├── /secondunit
│   │   ├── / (POST) ✅ Auth Required → addSecondaryUnit
│   │   ├── /:id (PUT) ✅ Auth Required → updateSecondaryUnit
│   │   └── /:id (DELETE) ✅ Auth Required → deleteSecondaryUnit
│   │
│   ├── /saleprice
│   │   ├── / (POST) ✅ Auth Required → addSalePrice
│   │   ├── /:id (PUT) ✅ Auth Required → updateSalePrice
│   │   └── /:id (DELETE) ✅ Auth Required → deleteSalePrice
│   │
│   ├── /discount
│   │   ├── / (POST) ✅ Auth Required → addDiscount
│   │   ├── /:id (PUT) ✅ Auth Required → updateDiscount
│   │   └── /:id (DELETE) ✅ Auth Required → deleteDiscount
│   │
│   ├── /openstock
│   │   ├── / (POST) ✅ Auth Required → addOpeningStock
│   │   ├── /:id (PUT) ✅ Auth Required → updateOpeningStock
│   │   └── /:id (DELETE) ✅ Auth Required → deleteOpeningStock
│   │
│   ├── /stockprice
│   │   ├── / (POST) ✅ Auth Required → addStockPrice
│   │   ├── /:id (PUT) ✅ Auth Required → updateStockPrice
│   │   └── /:id (DELETE) ✅ Auth Required → deleteStockPrice
│   │
│   ├── /purchaseprice
│   │   ├── / (POST) ✅ Auth Required → addPurchasePrice
│   │   ├── /:id (PUT) ✅ Auth Required → updatePurchasePrice
│   │   └── /:id (DELETE) ✅ Auth Required → deletePurchasePrice
│   │
│   ├── /itemLocation
│   │   ├── / (POST) ✅ Auth Required → addItemLocation
│   │   ├── /:id (PUT) ✅ Auth Required → updateItemLocation
│   │   └── /:id (DELETE) ✅ Auth Required → deleteItemLocation
│   │
│   ├── /stockDate
│   │   ├── / (POST) ✅ Auth Required → addStockDate
│   │   ├── /:id (PUT) ✅ Auth Required → updateStockDate
│   │   └── /:id (DELETE) ✅ Auth Required → deleteStockDate
│   │
│   └── /minStock
│       ├── / (POST) ✅ Auth Required → addMinStock
│       ├── /:id (PUT) ✅ Auth Required → updateMinStock
│       └── /:id (DELETE) ✅ Auth Required → deleteMinStock
```

---

## 📊 Route-to-File Mapping

### User Routes
```
Route File: router/user.route.js
Controller: controller/user.controller.js
Model: models/User.js

Routes:
  POST   /user/register      → registerUser
  POST   /user/login         → loginUser
  POST   /user/sendOtp       → changePassword
  POST   /user/verifyOTP     → verifyOtp
  POST   /user/resetPassword → resetPassword
  GET    /user/profile       → profile (auth required)
```

### Business Routes
```
Route File: router/business.route.js
Controller: controller/business.controller.js
Model: models/BusinessDetails.js

Routes:
  POST   /business/basic-details     → basicDetails (auth required)
  PUT    /business/basic-details/:id → updateBusinessDetails (auth required)
```

### Item Routes
```
Route File: router/item.route.js
Controller: controller/item.controller.js
Model: models/items.js

Routes:
  POST   /item/addItem             → addItem (auth required)
  GET    /item/getAllItem          → getAllItem (auth required)
  PUT    /item/updateItem/:itemid  → updateItem (auth required)
  DELETE /item/deleteItem/:itemid  → deleteItem (auth required)
```

### Item Field Routes (Pattern for all)
```
Route File: router/ItemFieldsRoutes/{field}.route.js
Controller: controller/ItemFieldController/{field}.controller.js
Model: models/ItemFieldModels/{Field}.js

Pattern (all auth required):
  POST   /item/{field}/     → add{Field}
  PUT    /item/{field}/:id  → update{Field}
  DELETE /item/{field}/:id  → delete{Field}

Fields:
  - category
  - barcode
  - hsn
  - unit
  - secondunit
  - saleprice
  - discount
  - openstock
  - stockprice
  - purchaseprice
  - itemLocation
  - stockDate
  - minStock
```

---

## 🔄 Request Flow Diagrams

### 1. User Registration Flow
```
Client Request
    ↓
POST /user/register
    ↓
app.js → userRouter
    ↓
user.route.js → registerUser
    ↓
user.controller.js
    ↓
1. Validate input
2. Check if email exists
3. Hash password (bcrypt)
4. Create user in DB
5. Generate JWT tokens
    ↓
Response with tokens & user data
```

### 2. Protected Route Flow (e.g., Add Item)
```
Client Request with Authorization Header
    ↓
POST /item/addItem
    ↓
app.js → itemRouter
    ↓
item.route.js → authUser middleware
    ↓
auth.middleware.js
    ↓
1. Extract Bearer token
2. Verify JWT
3. Fetch user from DB
4. Attach user to req.user
    ↓
item.controller.js → addItem
    ↓
1. Get userId from req.user
2. Find business for user
3. Validate item data
4. Calculate totals
5. Create item in DB
    ↓
Response with item data
```

### 3. Password Reset Flow
```
Step 1: Request OTP
Client → POST /user/sendOtp { email }
    ↓
Generate 6-digit OTP
Save OTP & expiry to user document
Send OTP via email
    ↓
Response: { message, otpData }

Step 2: Verify OTP
Client → POST /user/verifyOTP { email, otp }
    ↓
Find user by email
Check OTP matches
Check OTP not expired
    ↓
Response: { message, user }

Step 3: Reset Password
Client → POST /user/resetPassword { email, newPassword }
    ↓
Hash new password
Update user password
Clear OTP fields
Generate new JWT tokens
    ↓
Response: { message, tokens, user }
```

### 4. Item Creation Flow
```
Step 1: Create Item Fields
Client → POST /item/category { categoryName }
    ↓ Returns: { _id: "cat_id", ... }

Client → POST /item/barcode { barcode }
    ↓ Returns: { _id: "bar_id", ... }

Client → POST /item/hsn { hsnCode }
    ↓ Returns: { _id: "hsn_id", ... }

... (repeat for all required fields)

Step 2: Create Item
Client → POST /item/addItem {
  itemName: "Product A",
  itemcode: "bar_id",
  itemCategory: "cat_id",
  HSNCode: "hsn_id",
  ...
}
    ↓
1. Validate all ObjectId references exist
2. Get user's business
3. Calculate pricing totals
4. Create item with all references
    ↓
Response: { message, data: item }
```

---

## 🎯 Controller Function Mapping

### User Controller Functions
| Function | Route | HTTP Method | Auth | Description |
|----------|-------|-------------|------|-------------|
| registerUser | /user/register | POST | ❌ | Create new user account |
| loginUser | /user/login | POST | ❌ | Authenticate user |
| changePassword | /user/sendOtp | POST | ❌ | Send OTP for password reset |
| verifyOtp | /user/verifyOTP | POST | ❌ | Verify OTP code |
| resetPassword | /user/resetPassword | POST | ❌ | Update password |
| profile | /user/profile | GET | ✅ | Get user profile |

### Business Controller Functions
| Function | Route | HTTP Method | Auth | Description |
|----------|-------|-------------|------|-------------|
| basicDetails | /business/basic-details | POST | ✅ | Create business profile |
| updateBusinessDetails | /business/basic-details/:id | PUT | ✅ | Update business profile |

### Item Controller Functions
| Function | Route | HTTP Method | Auth | Description |
|----------|-------|-------------|------|-------------|
| addItem | /item/addItem | POST | ✅ | Add new item |
| getAllItem | /item/getAllItem | GET | ✅ | Get all items for business |
| updateItem | /item/updateItem/:itemid | PUT | ✅ | Update item |
| deleteItem | /item/deleteItem/:itemid | DELETE | ✅ | Delete item |

### Item Field Controller Functions (Pattern)
All item field controllers follow this pattern:

| Function | Route | HTTP Method | Auth | Description |
|----------|-------|-------------|------|-------------|
| add{Field} | /item/{field}/ | POST | ✅ | Create new field entry |
| update{Field} | /item/{field}/:id | PUT | ✅ | Update field entry |
| delete{Field} | /item/{field}/:id | DELETE | ✅ | Delete field entry |

---

## 🔐 Authentication Middleware Flow

```
Request with Authorization Header
    ↓
authUser Middleware (middleware/auth.middleware.js)
    ↓
1. Check Authorization header exists
2. Verify format: "Bearer <token>"
3. Extract token
    ↓
4. Verify token with JWT_SECRET
    ↓
5. Decode token to get user ID
    ↓
6. Fetch user from database
    ↓
7. Check user exists
    ↓
8. Attach user to req.user (without password)
    ↓
9. Call next() to proceed to controller
    ↓
Controller Function
```

---

## 📝 Route Registration in app.js

```javascript
// Main application setup
const express = require('express');
const app = express();

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route Registration
app.use('/user', userRouter);                    // User routes
app.use('/business', BusinessRouter);            // Business routes
app.use('/item', itemRouter);                    // Item routes

// Item Field Routes
app.use('/item/category', categoryRouter);
app.use('/item/barcode', BarcodeRouter);
app.use('/item/hsn', HsnRouter);
app.use('/item/unit', UnitRouter);
app.use('/item/secondunit', secondaryUnitRouter);
app.use('/item/saleprice', salePriceRouter);
app.use('/item/discount', discountRouter);
app.use('/item/openstock', OpenStockRouter);
app.use('/item/stockprice', stockPriceRouter);
app.use('/item/purchaseprice', PurchasePriceRouter);
app.use('/item/itemLocation', itemLocationRouter);
app.use('/item/stockDate', StockDateRouter);
app.use('/item/minStock', MinStockRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT);
```

---

## 🗂️ Complete File-to-Route Reference

### User Module
```
Route: /user/*
├── router/user.route.js          (defines routes)
├── controller/user.controller.js (business logic)
├── models/User.js                (database schema)
└── middleware/auth.middleware.js (authentication)
```

### Business Module
```
Route: /business/*
├── router/business.route.js          (defines routes)
├── controller/business.controller.js (business logic)
├── models/BusinessDetails.js         (database schema)
└── middleware/auth.middleware.js     (authentication)
```

### Item Module
```
Route: /item/*
├── router/item.route.js          (defines routes)
├── controller/item.controller.js (business logic)
├── models/items.js               (database schema)
└── middleware/auth.middleware.js (authentication)
```

### Item Field Modules (13 modules)
```
Route: /item/{field}/*
├── router/ItemFieldsRoutes/{field}.route.js
├── controller/ItemFieldController/{field}.controller.js
├── models/ItemFieldModels/{Field}.js
└── middleware/auth.middleware.js
```

---

## 🎨 Visual Route Hierarchy

```
Application Root
│
├─ Public Routes (No Auth)
│  ├─ GET  /
│  ├─ POST /user/register
│  ├─ POST /user/login
│  ├─ POST /user/sendOtp
│  ├─ POST /user/verifyOTP
│  └─ POST /user/resetPassword
│
└─ Protected Routes (Auth Required)
   │
   ├─ User Routes
   │  └─ GET /user/profile
   │
   ├─ Business Routes
   │  ├─ POST /business/basic-details
   │  └─ PUT  /business/basic-details/:id
   │
   ├─ Item Routes
   │  ├─ POST   /item/addItem
   │  ├─ GET    /item/getAllItem
   │  ├─ PUT    /item/updateItem/:itemid
   │  └─ DELETE /item/deleteItem/:itemid
   │
   └─ Item Field Routes (13 groups)
      ├─ Category Routes (/item/category)
      ├─ Barcode Routes (/item/barcode)
      ├─ HSN Routes (/item/hsn)
      ├─ Unit Routes (/item/unit)
      ├─ Secondary Unit Routes (/item/secondunit)
      ├─ Sale Price Routes (/item/saleprice)
      ├─ Discount Routes (/item/discount)
      ├─ Opening Stock Routes (/item/openstock)
      ├─ Stock Price Routes (/item/stockprice)
      ├─ Purchase Price Routes (/item/purchaseprice)
      ├─ Item Location Routes (/item/itemLocation)
      ├─ Stock Date Routes (/item/stockDate)
      └─ Min Stock Routes (/item/minStock)
```

---

**Last Updated**: January 2026  
**Version**: 1.0.0
