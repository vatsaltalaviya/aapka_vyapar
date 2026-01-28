# Aapka Vyapar - Backend

A comprehensive business management system backend built with Node.js, Express, and MongoDB. This system allows users to manage their businesses, inventory, and various item attributes.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Aapka Vyapar** is a backend API system designed to help businesses manage:
- User accounts and authentication
- Business profiles and details
- Comprehensive inventory management
- Item attributes (pricing, stock, categories, etc.)

The system uses JWT-based authentication and follows RESTful API principles.

---

## ✨ Features

### User Management
- ✅ User registration with encrypted passwords
- ✅ Secure login with JWT tokens
- ✅ Password reset via email OTP
- ✅ User profile management

### Business Management
- ✅ Create and manage business profiles
- ✅ Store business details (GST, contact info, address)
- ✅ Link businesses to user accounts

### Inventory Management
- ✅ Add, update, and delete items
- ✅ Comprehensive item attributes:
  - Categories
  - Barcodes
  - HSN codes
  - Units (primary and secondary)
  - Pricing (sale price, purchase price)
  - Discounts
  - Stock management
  - Item locations
  - Minimum stock alerts
- ✅ Automatic price calculations
- ✅ Tax management

### Security
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes with middleware
- ✅ Token expiration (Access: 1 day, Refresh: 7 days)
- ✅ OTP verification for password reset

---

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v8.15.0
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcrypt v6.0.0
- **Email Service**: Nodemailer v7.0.3
- **Development**: Nodemon v3.1.10

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Apka vyapar/Backend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the Backend directory:
   ```env
   PORT=3000
   MONGOURL=mongodb://localhost:27017/aapka_vyapar
   JWT_SECRET=your_super_secret_jwt_key_here
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # The server will start on http://localhost:3000
   ```

---

## 📚 Documentation

This project includes comprehensive documentation:

| Document | Description |
|----------|-------------|
| **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** | Complete API reference with all endpoints, request/response examples, and authentication details |
| **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** | Detailed database schema, relationships, ERD, and query examples |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | Quick reference guide with common commands, examples, and troubleshooting |

### Quick Links

- **Routes & Endpoints**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#api-routes--endpoints)
- **Database Structure**: See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md#collections-summary)
- **Authentication Flow**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#authentication--middleware)
- **Common Examples**: See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#common-request-examples)

---

## 📁 Project Structure

```
Backend/
├── app.js                          # Main application entry point
├── config/
│   └── db.js                       # MongoDB connection configuration
├── controller/
│   ├── user.controller.js          # User authentication & management
│   ├── business.controller.js      # Business operations
│   ├── item.controller.js          # Item CRUD operations
│   └── ItemFieldController/        # Item field controllers
│       ├── category.controller.js
│       ├── barcode.controller.js
│       ├── HSN.controller.js
│       ├── unit.controller.js
│       ├── secondaryunit.controller.js
│       ├── salePrice.controller.js
│       ├── discount.controller.js
│       ├── openingStock.controller.js
│       ├── stockPrice.controller.js
│       ├── purchasePrice.controller.js
│       ├── itemLocaton.controller.js
│       ├── stockDate.controller.js
│       └── minStockQuantitiy.controller.js
├── middleware/
│   └── auth.middleware.js          # JWT authentication middleware
├── models/
│   ├── User.js                     # User schema
│   ├── BusinessDetails.js          # Business schema
│   ├── items.js                    # Item schema
│   └── ItemFieldModels/            # Item field schemas
│       ├── Category.js
│       ├── Barcode.js
│       ├── HSN.js
│       ├── Unit.js
│       ├── SecondaryUnit.js
│       ├── salePrice.js
│       ├── discount.js
│       ├── openingStock.js
│       ├── stockPrice.js
│       ├── purchasePrice.js
│       ├── itemLocation.js
│       ├── stockDate.js
│       └── minStockQuantity.js
├── router/
│   ├── user.route.js               # User routes
│   ├── business.route.js           # Business routes
│   ├── item.route.js               # Item routes
│   └── ItemFieldsRoutes/           # Item field routes
│       ├── category.route.js
│       ├── barcode.route.js
│       ├── hsn.route.js
│       ├── unit.route.js
│       ├── secondaryUnit.route.js
│       ├── salePrice.route.js
│       ├── discount.route.js
│       ├── openStock.route.js
│       ├── stockPrice.route.js
│       ├── purchasePrice.route.js
│       ├── itemLocation.route.js
│       ├── stockDate.route.js
│       └── minStock.route.js
├── Utils/
│   └── sendOTP.js                  # Email OTP utility
├── .env                            # Environment variables
├── .gitignore                      # Git ignore file
├── package.json                    # Dependencies and scripts
├── API_DOCUMENTATION.md            # Complete API documentation
├── DATABASE_SCHEMA.md              # Database schema documentation
├── QUICK_REFERENCE.md              # Quick reference guide
└── README.md                       # This file
```

---

## 🔌 API Overview

### Base URL
```
http://localhost:3000
```

### Main Route Groups

#### 1. User Routes (`/user`)
- Registration and login
- Password reset with OTP
- User profile management

#### 2. Business Routes (`/business`)
- Create business profile
- Update business details

#### 3. Item Routes (`/item`)
- Add, update, delete items
- Get all items for a business

#### 4. Item Field Routes (`/item/*`)
- Manage categories, barcodes, HSN codes
- Manage units, pricing, discounts
- Manage stock, locations, dates

### Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

### Example Request

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

For more examples, see [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#common-request-examples)

---

## 🗄️ Database Schema

### Entity Relationships

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

### Collections

- **users**: User accounts and authentication
- **businessdetails**: Business profiles
- **itemdatas**: Inventory items
- **13 item field collections**: Categories, barcodes, HSN codes, units, pricing, stock, etc.

For detailed schema information, see [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

---

## 🔐 Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt before storage
2. **JWT Tokens**: Secure token-based authentication
3. **Token Expiration**: Access tokens expire after 1 day, refresh tokens after 7 days
4. **OTP Verification**: Email-based OTP for password reset (10-minute expiry)
5. **Protected Routes**: Middleware-based route protection
6. **CORS Configuration**: Controlled cross-origin access

---

## 🧪 Testing

### Manual Testing

Use tools like:
- **Postman**: API testing and documentation
- **Thunder Client**: VS Code extension
- **cURL**: Command-line testing

### Test Checklist

- [ ] User registration
- [ ] User login
- [ ] Password reset flow
- [ ] Business creation
- [ ] Item field creation
- [ ] Item CRUD operations
- [ ] Authentication middleware
- [ ] Error handling

---

## 📊 Response Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Validation error or missing fields |
| 401 | Unauthorized | Invalid or missing authentication |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## 🐛 Troubleshooting

### Common Issues

1. **"Database connection failed"**
   - Ensure MongoDB is running
   - Check MONGOURL in .env file

2. **"Unauthorized: No token provided"**
   - Include Authorization header with Bearer token

3. **"Email already exists"**
   - Use a different email or login with existing account

4. **"Business not found"**
   - Create a business profile before adding items

For more troubleshooting tips, see [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#common-issues--solutions)

---

## 🚧 Future Enhancements

- [ ] Pagination for item listings
- [ ] Role-based access control (RBAC)
- [ ] File upload for business signatures/logos
- [ ] Advanced search and filtering
- [ ] API rate limiting
- [ ] Request validation middleware
- [ ] Comprehensive logging system
- [ ] Unit and integration tests
- [ ] API versioning
- [ ] Swagger/OpenAPI documentation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- Development Team - Aapka Vyapar

---

## 📞 Support

For support, email support@aapkavyapar.com or create an issue in the repository.

---

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB team for the robust database
- All contributors and testers

---

**Version**: 1.0.0  
**Last Updated**: January 2026

---

## 📖 Quick Start Guide

### 1. First Time Setup
```bash
# Install dependencies
npm install

# Configure .env file
cp .env.example .env  # Edit with your values

# Start MongoDB
mongod

# Run the server
npm run dev
```

### 2. Test the API
```bash
# Register a user
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### 3. Explore Documentation
- Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference
- Check [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for database structure
- Use [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for quick lookups

---

**Happy Coding! 🚀**
