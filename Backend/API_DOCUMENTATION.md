# Aapka Vyapar - Backend API Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Database Structure](#database-structure)
4. [Authentication & Middleware](#authentication--middleware)
5. [API Routes & Endpoints](#api-routes--endpoints)
6. [Controllers](#controllers)
7. [Models](#models)
8. [Environment Variables](#environment-variables)
9. [Getting Started](#getting-started)

---

## Project Overview

**Aapka Vyapar** is a business management system that allows users to:
- Register and manage user accounts
- Create and manage business profiles
- Add, update, and manage inventory items
- Track item details including pricing, stock, and various attributes

---

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB (via Mongoose v8.15.0)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt v6.0.0
- **Email Service**: Nodemailer v7.0.3
- **Development**: Nodemon v3.1.10

---

## Database Structure

### Entity Relationship Diagram

```
User (1) ──────< (N) BusinessDetails (1) ──────< (N) Items
                                                        │
                                                        ├─< Category
                                                        ├─< Barcode
                                                        ├─< HSN
                                                        ├─< Unit
                                                        ├─< SecondaryUnit
                                                        ├─< SalePrice
                                                        ├─< Discount
                                                        ├─< OpeningStock
                                                        ├─< StockPrice
                                                        ├─< PurchasePrice
                                                        ├─< ItemLocation
                                                        ├─< StockDate
                                                        └─< MinStock
```

### Collections Overview

#### 1. **Users Collection**
Stores user authentication and profile information.

#### 2. **BusinessDetails Collection**
Stores business information linked to users.

#### 3. **Items Collection**
Main inventory collection with references to various item field models.

#### 4. **Item Field Collections** (13 collections)
- Category
- Barcode
- HSN
- Unit
- SecondaryUnit
- SalePrice
- Discount
- OpeningStock
- StockPrice
- PurchasePrice
- ItemLocation
- StockDate
- MinStock

---

## Authentication & Middleware

### Authentication Flow

The application uses **JWT-based authentication** with two types of tokens:
- **Access Token**: Valid for 1 day
- **Refresh Token**: Valid for 7 days

### Middleware: `authUser`

**Location**: `middleware/auth.middleware.js`

**Purpose**: Validates JWT tokens and protects routes

**How it works**:
1. Extracts Bearer token from `Authorization` header
2. Verifies token using JWT_SECRET
3. Fetches user from database (excluding password)
4. Attaches user object to `req.user`
5. Calls `next()` to proceed to the controller

**Usage**:
```javascript
router.post('/protected-route', authUser, controllerFunction);
```

**Protected Routes**: All routes except:
- `POST /user/register`
- `POST /user/login`
- `POST /user/sendOtp`
- `POST /user/verifyOTP`
- `POST /user/resetPassword`

---

## API Routes & Endpoints

### Base URL
```
http://localhost:3000
```

---

## 1. User Routes

**Base Path**: `/user`  
**Router File**: `router/user.route.js`  
**Controller**: `controller/user.controller.js`

| Method | Endpoint | Auth Required | Controller | Description |
|--------|----------|---------------|------------|-------------|
| POST | `/user/register` | ❌ | `registerUser` | Register a new user |
| POST | `/user/login` | ❌ | `loginUser` | Login existing user |
| POST | `/user/sendOtp` | ❌ | `changePassword` | Send OTP for password reset |
| POST | `/user/verifyOTP` | ❌ | `verifyOtp` | Verify OTP |
| POST | `/user/resetPassword` | ❌ | `resetPassword` | Reset password after OTP verification |
| GET | `/user/profile` | ✅ | `profile` | Get authenticated user profile |

### User Endpoints Details

#### 1.1 Register User
```http
POST /user/register
Content-Type: application/json

{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "User registered successfully",
  "Accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 1.2 Login User
```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**: Same as registration

#### 1.3 Send OTP
```http
POST /user/sendOtp
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response**:
```json
{
  "message": "OTP sent to your email",
  "otpData": {
    "email": "john@example.com",
    "otp": 123456
  }
}
```

#### 1.4 Verify OTP
```http
POST /user/verifyOTP
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": 123456
}
```

#### 1.5 Reset Password
```http
POST /user/resetPassword
Content-Type: application/json

{
  "email": "john@example.com",
  "newPassword": "newpassword123"
}
```

#### 1.6 Get Profile
```http
GET /user/profile
Authorization: Bearer <access_token>
```

**Response**:
```json
{
  "message": "User profile",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 2. Business Routes

**Base Path**: `/business`  
**Router File**: `router/business.route.js`  
**Controller**: `controller/business.controller.js`

| Method | Endpoint | Auth Required | Controller | Description |
|--------|----------|---------------|------------|-------------|
| POST | `/business/basic-details` | ✅ | `basicDetails` | Create business profile |
| PUT | `/business/basic-details/:id` | ✅ | `updateBusinessDetails` | Update business profile |

### Business Endpoints Details

#### 2.1 Create Business Details
```http
POST /business/basic-details
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "businessName": "ABC Traders",
  "GstNo": "22AAAAA0000A1Z5",
  "businessPhoneNumber1": "9876543210",
  "businessPhoneNumber2": "9876543211",
  "businessAddress": "123 Main Street, City",
  "businessEmail": "abc@traders.com",
  "businessPincode": 123456,
  "businessDescription": "Trading business",
  "signature": "signature_url_or_text"
}
```

**Response**:
```json
{
  "message": "Business details added successfully",
  "Business": {
    "_id": "507f1f77bcf86cd799439012",
    "businessName": "ABC Traders",
    "GstNo": "22AAAAA0000A1Z5",
    "userId": "507f1f77bcf86cd799439011",
    ...
  }
}
```

#### 2.2 Update Business Details
```http
PUT /business/basic-details/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "businessName": "ABC Traders Updated",
  ...
}
```

---

## 3. Item Routes

**Base Path**: `/item`  
**Router File**: `router/item.route.js`  
**Controller**: `controller/item.controller.js`

| Method | Endpoint | Auth Required | Controller | Description |
|--------|----------|---------------|------------|-------------|
| POST | `/item/addItem` | ✅ | `addItem` | Add new item to inventory |
| GET | `/item/getAllItem` | ✅ | `getAllItem` | Get all items for user's business |
| PUT | `/item/updateItem/:itemid` | ✅ | `updateItem` | Update existing item |
| DELETE | `/item/deleteItem/:itemid` | ✅ | `deleteItem` | Delete item |

### Item Endpoints Details

#### 3.1 Add Item
```http
POST /item/addItem
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "itemName": "Product A",
  "itemcode": "barcode_id",
  "itemCategory": "category_id",
  "HSNCode": "hsn_id",
  "Pricing": {
    "salePrice": "saleprice_id",
    "Discount": "discount_id",
    "withTax": true
  },
  "stock": {
    "quantity": "openingstock_id",
    "stockPrice": "stockprice_id",
    "minimumStock": "minstock_id",
    "stockDate": "stockdate_id",
    "itemLocation": "itemlocation_id"
  },
  "purchasePrice": "purchaseprice_id",
  "tax": 18
}
```

#### 3.2 Get All Items
```http
GET /item/getAllItem
Authorization: Bearer <access_token>
```

#### 3.3 Update Item
```http
PUT /item/updateItem/:itemid
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "itemName": "Updated Product A",
  ...
}
```

#### 3.4 Delete Item
```http
DELETE /item/deleteItem/:itemid
Authorization: Bearer <access_token>
```

---

## 4. Item Field Routes

All item field routes follow the same pattern with three operations: Create, Update, Delete.

**Authentication**: All routes require authentication (✅)

### 4.1 Category Routes

**Base Path**: `/item/category`  
**Router File**: `router/ItemFieldsRoutes/category.route.js`  
**Controller**: `controller/ItemFieldController/category.controller.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/category/` | `addCategory` | Add new category |
| PUT | `/item/category/:id` | `updateCategory` | Update category |
| DELETE | `/item/category/:id` | `deleteCategory` | Delete category |

**Example Request**:
```http
POST /item/category/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "categoryName": "Electronics"
}
```

### 4.2 Barcode Routes

**Base Path**: `/item/barcode`  
**Router File**: `router/ItemFieldsRoutes/barcode.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/barcode/` | `addBarcode` | Add new barcode |
| PUT | `/item/barcode/:id` | `updateBarcode` | Update barcode |
| DELETE | `/item/barcode/:id` | `deleteBarcode` | Delete barcode |

### 4.3 HSN Routes

**Base Path**: `/item/hsn`  
**Router File**: `router/ItemFieldsRoutes/hsn.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/hsn/` | `addHSN` | Add new HSN code |
| PUT | `/item/hsn/:id` | `updateHSN` | Update HSN code |
| DELETE | `/item/hsn/:id` | `deleteHSN` | Delete HSN code |

### 4.4 Unit Routes

**Base Path**: `/item/unit`  
**Router File**: `router/ItemFieldsRoutes/unit.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/unit/` | `addUnit` | Add new unit |
| PUT | `/item/unit/:id` | `updateUnit` | Update unit |
| DELETE | `/item/unit/:id` | `deleteUnit` | Delete unit |

### 4.5 Secondary Unit Routes

**Base Path**: `/item/secondunit`  
**Router File**: `router/ItemFieldsRoutes/secondaryUnit.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/secondunit/` | `addSecondaryUnit` | Add new secondary unit |
| PUT | `/item/secondunit/:id` | `updateSecondaryUnit` | Update secondary unit |
| DELETE | `/item/secondunit/:id` | `deleteSecondaryUnit` | Delete secondary unit |

### 4.6 Sale Price Routes

**Base Path**: `/item/saleprice`  
**Router File**: `router/ItemFieldsRoutes/salePrice.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/saleprice/` | `addSalePrice` | Add new sale price |
| PUT | `/item/saleprice/:id` | `updateSalePrice` | Update sale price |
| DELETE | `/item/saleprice/:id` | `deleteSalePrice` | Delete sale price |

### 4.7 Discount Routes

**Base Path**: `/item/discount`  
**Router File**: `router/ItemFieldsRoutes/discount.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/discount/` | `addDiscount` | Add new discount |
| PUT | `/item/discount/:id` | `updateDiscount` | Update discount |
| DELETE | `/item/discount/:id` | `deleteDiscount` | Delete discount |

### 4.8 Opening Stock Routes

**Base Path**: `/item/openstock`  
**Router File**: `router/ItemFieldsRoutes/openStock.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/openstock/` | `addOpeningStock` | Add new opening stock |
| PUT | `/item/openstock/:id` | `updateOpeningStock` | Update opening stock |
| DELETE | `/item/openstock/:id` | `deleteOpeningStock` | Delete opening stock |

### 4.9 Stock Price Routes

**Base Path**: `/item/stockprice`  
**Router File**: `router/ItemFieldsRoutes/stockPrice.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/stockprice/` | `addStockPrice` | Add new stock price |
| PUT | `/item/stockprice/:id` | `updateStockPrice` | Update stock price |
| DELETE | `/item/stockprice/:id` | `deleteStockPrice` | Delete stock price |

### 4.10 Purchase Price Routes

**Base Path**: `/item/purchaseprice`  
**Router File**: `router/ItemFieldsRoutes/purchasePrice.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/purchaseprice/` | `addPurchasePrice` | Add new purchase price |
| PUT | `/item/purchaseprice/:id` | `updatePurchasePrice` | Update purchase price |
| DELETE | `/item/purchaseprice/:id` | `deletePurchasePrice` | Delete purchase price |

### 4.11 Item Location Routes

**Base Path**: `/item/itemLocation`  
**Router File**: `router/ItemFieldsRoutes/itemLocation.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/itemLocation/` | `addItemLocation` | Add new item location |
| PUT | `/item/itemLocation/:id` | `updateItemLocation` | Update item location |
| DELETE | `/item/itemLocation/:id` | `deleteItemLocation` | Delete item location |

### 4.12 Stock Date Routes

**Base Path**: `/item/stockDate`  
**Router File**: `router/ItemFieldsRoutes/stockDate.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/stockDate/` | `addStockDate` | Add new stock date |
| PUT | `/item/stockDate/:id` | `updateStockDate` | Update stock date |
| DELETE | `/item/stockDate/:id` | `deleteStockDate` | Delete stock date |

### 4.13 Minimum Stock Routes

**Base Path**: `/item/minStock`  
**Router File**: `router/ItemFieldsRoutes/minStock.route.js`

| Method | Endpoint | Controller | Description |
|--------|----------|------------|-------------|
| POST | `/item/minStock/` | `addMinStock` | Add new minimum stock |
| PUT | `/item/minStock/:id` | `updateMinStock` | Update minimum stock |
| DELETE | `/item/minStock/:id` | `deleteMinStock` | Delete minimum stock |

---

## Controllers

### User Controller
**File**: `controller/user.controller.js`

**Functions**:
1. **registerUser**: Creates new user with hashed password, generates JWT tokens
2. **loginUser**: Validates credentials, returns JWT tokens
3. **changePassword**: Generates and sends OTP via email
4. **verifyOtp**: Validates OTP and expiration
5. **resetPassword**: Updates password after OTP verification
6. **profile**: Returns authenticated user profile

### Business Controller
**File**: `controller/business.controller.js`

**Functions**:
1. **basicDetails**: Creates business profile linked to authenticated user
2. **updateBusinessDetails**: Updates existing business profile

**Business Logic**:
- Validates unique GST number and business email per user
- Links business to authenticated user via `userId`

### Item Controller
**File**: `controller/item.controller.js`

**Functions**:
1. **addItem**: Creates new item with calculated totals
2. **getAllItem**: Fetches all items for user's business
3. **updateItem**: Updates item and recalculates totals
4. **deleteItem**: Deletes item from inventory

**Helper Function**:
- **calculateTotal**: Calculates subtotal, discount, tax, and total amounts

**Business Logic**:
- All operations require user to have a business profile
- Items are linked to business via `businessId`
- Automatic calculation of pricing and stock totals

### Item Field Controllers
**Location**: `controller/ItemFieldController/`

All item field controllers follow the same pattern:
- **add{Field}**: Creates new field entry
- **update{Field}**: Updates existing field entry
- **delete{Field}**: Deletes field entry

---

## Models

### 1. User Model
**File**: `models/User.js`

```javascript
{
  username: String (required, min: 3),
  email: String (required, unique, lowercase),
  password: String (required, min: 6, hashed),
  otp: Number (default: 0),
  otpexpiresAt: Date
}
```

### 2. BusinessDetails Model
**File**: `models/BusinessDetails.js`

```javascript
{
  businessName: String (required),
  GstNo: String (required),
  businessPhoneNumber1: String (required),
  businessPhoneNumber2: String (required),
  businessAddress: String (required),
  businessEmail: String (required, unique),
  businessPincode: Number (required),
  businessDescription: String,
  signature: String,
  userId: ObjectId (ref: 'User', required),
  timestamps: true
}
```

### 3. Items Model
**File**: `models/items.js`

```javascript
{
  itemName: String (required),
  itemcode: ObjectId (ref: 'Barcode', required),
  itemCategory: ObjectId (ref: 'Category'),
  HSNCode: ObjectId (ref: 'HSN', required),
  unit: {
    primaryUnit: ObjectId (ref: 'Unit', required),
    secondaryUnit: ObjectId (ref: 'SecondaryUnit')
  },
  Pricing: {
    salePrice: ObjectId (ref: 'SalePrice'),
    Discount: ObjectId (ref: 'discount'),
    withTax: Boolean (default: false)
  },
  stock: {
    quantity: ObjectId (ref: 'openingStock'),
    stockPrice: ObjectId (ref: 'stockPrice'),
    minimumStock: ObjectId (ref: 'minstock'),
    stockDate: ObjectId (ref: 'stockDate'),
    itemLocation: ObjectId (ref: 'itemLocation')
  },
  purchasePrice: ObjectId (ref: 'purchasePrice'),
  tax: Number (required if withTax is true),
  businessId: ObjectId (ref: 'BusinessDetails', required)
}
```

### 4. Item Field Models

All item field models are located in `models/ItemFieldModels/`

#### Category Model
```javascript
{
  categoryName: String (required),
  timestamps: true
}
```

#### Barcode Model
```javascript
{
  barcode: String (required),
  timestamps: true
}
```

#### Unit Model
```javascript
{
  unitName: String (required),
  timestamps: true
}
```

*Similar structure for other item field models (HSN, SecondaryUnit, SalePrice, Discount, OpeningStock, StockPrice, PurchasePrice, ItemLocation, StockDate, MinStock)*

---

## Environment Variables

Create a `.env` file in the Backend directory:

```env
# Server Configuration
PORT=3000

# Database
MONGOURL=mongodb://localhost:27017/aapka_vyapar

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

### Installation

1. **Clone the repository**
```bash
cd Backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Create .env file and add required variables
```

4. **Start MongoDB**
```bash
# Make sure MongoDB is running on your system
```

5. **Run the application**
```bash
# Development mode
npm run dev

# The server will start on http://localhost:3000
```

### Testing the API

You can test the API using:
- **Postman**: Import the endpoints and test
- **cURL**: Command-line testing
- **Thunder Client**: VS Code extension

**Example cURL request**:
```bash
# Register a user
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## Application Flow

### 1. User Registration & Authentication Flow
```
1. User registers → POST /user/register
2. Password is hashed using bcrypt
3. User document created in MongoDB
4. JWT tokens (Access & Refresh) generated
5. Tokens sent in response and cookies
```

### 2. Business Setup Flow
```
1. User logs in → POST /user/login
2. User creates business → POST /business/basic-details
3. Business linked to user via userId
4. Business details stored in BusinessDetails collection
```

### 3. Item Management Flow
```
1. User creates item field entries (category, barcode, etc.)
2. User creates item → POST /item/addItem
3. Item references all field entries by ObjectId
4. Item linked to business via businessId
5. Totals calculated automatically
6. Item stored in Items collection
```

### 4. Password Reset Flow
```
1. User requests OTP → POST /user/sendOtp
2. OTP generated and sent via email
3. OTP stored in User document with expiration
4. User verifies OTP → POST /user/verifyOTP
5. User resets password → POST /user/resetPassword
6. Password updated and OTP cleared
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication failed)
- **404**: Not Found
- **500**: Internal Server Error

**Error Response Format**:
```json
{
  "message": "Error description"
}
```

---

## Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **Token Expiration**: Access (1d) and Refresh (7d) tokens
4. **OTP Expiration**: 10 minutes validity
5. **Protected Routes**: Middleware-based route protection
6. **CORS**: Configured for cross-origin requests

---

## Future Enhancements

- Add pagination for item listing
- Implement role-based access control
- Add business deletion functionality
- Implement refresh token rotation
- Add API rate limiting
- Add request validation middleware
- Implement file upload for business signatures
- Add comprehensive error logging

---

## Support

For issues or questions, please contact the development team or create an issue in the project repository.

---

**Last Updated**: January 2026  
**Version**: 1.0.0
