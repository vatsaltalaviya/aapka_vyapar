# Quick Reference Guide - Aapka Vyapar Backend

## 🚀 Quick Start

```bash
cd Backend
npm install
npm run dev
```

Server runs on: `http://localhost:3000`

---

## 📁 Project Structure

```
Backend/
├── app.js                      # Main application entry point
├── config/
│   └── db.js                   # MongoDB connection
├── controller/
│   ├── user.controller.js      # User authentication logic
│   ├── business.controller.js  # Business management logic
│   ├── item.controller.js      # Item management logic
│   └── ItemFieldController/    # Item field controllers (13 files)
├── middleware/
│   └── auth.middleware.js      # JWT authentication middleware
├── models/
│   ├── User.js                 # User schema
│   ├── BusinessDetails.js      # Business schema
│   ├── items.js                # Item schema
│   └── ItemFieldModels/        # Item field schemas (13 files)
├── router/
│   ├── user.route.js           # User routes
│   ├── business.route.js       # Business routes
│   ├── item.route.js           # Item routes
│   └── ItemFieldsRoutes/       # Item field routes (13 files)
├── Utils/
│   └── sendOTP.js              # Email OTP utility
├── .env                        # Environment variables
└── package.json                # Dependencies
```

---

## 🔑 Environment Variables

```env
PORT=3000
MONGOURL=mongodb://localhost:27017/aapka_vyapar
JWT_SECRET=your_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 🛣️ Routes Quick Reference

### User Routes (`/user`)
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/register` | POST | ❌ | Register new user |
| `/login` | POST | ❌ | Login user |
| `/sendOtp` | POST | ❌ | Send password reset OTP |
| `/verifyOTP` | POST | ❌ | Verify OTP |
| `/resetPassword` | POST | ❌ | Reset password |
| `/profile` | GET | ✅ | Get user profile |

### Business Routes (`/business`)
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/basic-details` | POST | ✅ | Create business |
| `/basic-details/:id` | PUT | ✅ | Update business |

### Item Routes (`/item`)
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/addItem` | POST | ✅ | Add new item |
| `/getAllItem` | GET | ✅ | Get all items |
| `/updateItem/:itemid` | PUT | ✅ | Update item |
| `/deleteItem/:itemid` | DELETE | ✅ | Delete item |

### Item Field Routes (All require ✅ Auth)
All follow pattern: `POST /`, `PUT /:id`, `DELETE /:id`

- `/item/category` - Categories
- `/item/barcode` - Barcodes
- `/item/hsn` - HSN codes
- `/item/unit` - Primary units
- `/item/secondunit` - Secondary units
- `/item/saleprice` - Sale prices
- `/item/discount` - Discounts
- `/item/openstock` - Opening stock
- `/item/stockprice` - Stock prices
- `/item/purchaseprice` - Purchase prices
- `/item/itemLocation` - Item locations
- `/item/stockDate` - Stock dates
- `/item/minStock` - Minimum stock

---

## 📝 Common Request Examples

### 1. Register User
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create Business (with Auth)
```bash
curl -X POST http://localhost:3000/business/basic-details \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "businessName": "ABC Traders",
    "GstNo": "22AAAAA0000A1Z5",
    "businessPhoneNumber1": "9876543210",
    "businessPhoneNumber2": "9876543211",
    "businessAddress": "123 Main Street",
    "businessEmail": "abc@traders.com",
    "businessPincode": 123456,
    "businessDescription": "Trading business",
    "signature": "signature_text"
  }'
```

### 4. Add Category
```bash
curl -X POST http://localhost:3000/item/category \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "categoryName": "Electronics"
  }'
```

### 5. Add Item
```bash
curl -X POST http://localhost:3000/item/addItem \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "itemName": "Product A",
    "itemcode": "BARCODE_OBJECT_ID",
    "itemCategory": "CATEGORY_OBJECT_ID",
    "HSNCode": "HSN_OBJECT_ID",
    "unit": {
      "primaryUnit": "UNIT_OBJECT_ID",
      "secondaryUnit": "SECONDARY_UNIT_OBJECT_ID"
    },
    "Pricing": {
      "salePrice": "SALEPRICE_OBJECT_ID",
      "Discount": "DISCOUNT_OBJECT_ID",
      "withTax": true
    },
    "stock": {
      "quantity": "OPENINGSTOCK_OBJECT_ID",
      "stockPrice": "STOCKPRICE_OBJECT_ID",
      "minimumStock": "MINSTOCK_OBJECT_ID",
      "stockDate": "STOCKDATE_OBJECT_ID",
      "itemLocation": "ITEMLOCATION_OBJECT_ID"
    },
    "purchasePrice": "PURCHASEPRICE_OBJECT_ID",
    "tax": 18
  }'
```

### 6. Get All Items
```bash
curl -X GET http://localhost:3000/item/getAllItem \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔐 Authentication Flow

### 1. Registration/Login
```
User → POST /user/register or /user/login
     ↓
Server validates & creates/finds user
     ↓
Password hashed with bcrypt
     ↓
JWT tokens generated (Access: 1d, Refresh: 7d)
     ↓
Tokens returned in response + cookies
```

### 2. Protected Route Access
```
Client → Request with Authorization: Bearer <token>
      ↓
authUser middleware extracts token
      ↓
JWT verified with JWT_SECRET
      ↓
User fetched from database
      ↓
req.user populated with user data
      ↓
Controller executes
```

### 3. Password Reset
```
User → POST /user/sendOtp (email)
    ↓
OTP generated (6 digits, 10 min expiry)
    ↓
OTP sent via email
    ↓
User → POST /user/verifyOTP (email, otp)
    ↓
OTP validated
    ↓
User → POST /user/resetPassword (email, newPassword)
    ↓
Password updated, OTP cleared
```

---

## 💾 Database Relationships

```
User (1) ──< (N) BusinessDetails (1) ──< (N) Items
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

---

## 🎯 Key Business Logic

### Item Total Calculation
```javascript
// In item.controller.js
const calculateTotal = (item) => {
  const subTotal = item.stock.quantity * item.Pricing.salePrice;
  const discount = (subTotal * item.Pricing.Discount) / 100;
  let tax = 0;
  let totalAmount = subTotal;

  if (item.Pricing.withTax) {
    tax = (subTotal * item.tax) / 100;
    totalAmount = subTotal - discount + tax;
  } else {
    totalAmount = subTotal - discount;
  }
  
  const totalStockAmount = item.stock.quantity * item.stock.stockPrice;
  return { subTotal, discount, tax, totalAmount, totalStockAmount };
};
```

### User-Business-Item Relationship
```javascript
// 1. Get user from JWT token (in middleware)
const user = await UserModel.findById(decoded.id);

// 2. Find business for user
const business = await BusinessDetails.findOne({ userId: user._id });

// 3. Get items for business
const items = await itemData.find({ businessId: business._id });
```

---

## 🛠️ Common Development Tasks

### Add New Item Field Type

1. **Create Model** (`models/ItemFieldModels/NewField.js`)
```javascript
const mongoose = require('mongoose');

const NewFieldSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    required: true,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('NewField', NewFieldSchema);
```

2. **Create Controller** (`controller/ItemFieldController/newField.controller.js`)
```javascript
const NewFieldModel = require('../../models/ItemFieldModels/NewField');

module.exports.addNewField = async (req, res) => {
  try {
    const { fieldName } = req.body;
    if (!fieldName) {
      return res.status(400).json({ message: 'Field name is required' });
    }
    const data = await NewFieldModel.create({ fieldName });
    res.status(201).json({ message: 'Field added successfully', data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.updateNewField = async (req, res) => {
  // Similar pattern
};

module.exports.deleteNewField = async (req, res) => {
  // Similar pattern
};
```

3. **Create Route** (`router/ItemFieldsRoutes/newField.route.js`)
```javascript
const express = require('express');
const router = express.Router();
const { addNewField, updateNewField, deleteNewField } = require('../../controller/ItemFieldController/newField.controller');
const { authUser } = require('../../middleware/auth.middleware');

router.post('/', authUser, addNewField);
router.put('/:id', authUser, updateNewField);
router.delete('/:id', authUser, deleteNewField);

module.exports = router;
```

4. **Register in app.js**
```javascript
const newFieldRouter = require('./router/ItemFieldsRoutes/newField.route');
app.use('/item/newfield', newFieldRouter);
```

---

## 🐛 Common Issues & Solutions

### Issue: "Unauthorized: No token provided"
**Solution**: Include Authorization header
```javascript
headers: {
  'Authorization': 'Bearer ' + accessToken
}
```

### Issue: "Business not found"
**Solution**: Create business profile first before adding items

### Issue: "Invalid or expired token"
**Solution**: Login again to get new tokens

### Issue: "Email already exists"
**Solution**: Use different email or login with existing account

### Issue: OTP expired
**Solution**: Request new OTP (valid for 10 minutes only)

---

## 📊 Response Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation errors, missing fields |
| 401 | Unauthorized | Invalid/missing token, wrong credentials |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected server errors |

---

## 🔍 Debugging Tips

### Enable Detailed Logging
```javascript
// In controllers, add:
console.log('Request body:', req.body);
console.log('User:', req.user);
console.log('Params:', req.params);
```

### Check MongoDB Connection
```javascript
// In config/db.js
mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB connection error:", err));
```

### Verify JWT Token
```javascript
// Decode token without verification (for debugging)
const jwt = require('jsonwebtoken');
const decoded = jwt.decode(token);
console.log('Token payload:', decoded);
```

---

## 📦 Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.1.0 | Web framework |
| mongoose | ^8.15.0 | MongoDB ODM |
| bcrypt | ^6.0.0 | Password hashing |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| nodemailer | ^7.0.3 | Email sending |
| cors | ^2.8.5 | Cross-origin requests |
| dotenv | ^16.5.0 | Environment variables |
| cookie-parser | ^1.4.7 | Cookie parsing |
| nodemon | ^3.1.10 | Auto-restart (dev) |

---

## 🚦 Testing Checklist

- [ ] User can register
- [ ] User can login
- [ ] User can request OTP
- [ ] User can verify OTP
- [ ] User can reset password
- [ ] User can create business
- [ ] User can update business
- [ ] User can create item fields (category, barcode, etc.)
- [ ] User can add items
- [ ] User can get all items
- [ ] User can update items
- [ ] User can delete items
- [ ] Authentication middleware works
- [ ] Unauthorized requests are blocked

---

## 📚 Additional Resources

- **Full API Documentation**: `API_DOCUMENTATION.md`
- **Database Schema**: `DATABASE_SCHEMA.md`
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **JWT Docs**: https://jwt.io/

---

**Last Updated**: January 2026  
**Version**: 1.0.0
