const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const db = require('./config/db');
const userRouter = require('./router/user.route');
const BusinessRouter = require('./router/business.route');
const itemRouter = require('./router/item.route');

// item fields route
const categoryRouter = require('./router/ItemFieldsRoutes/category.route');
const BarcodeRouter = require('./router/ItemFieldsRoutes/barcode.route')
const HsnRouter = require('./router/ItemFieldsRoutes/hsn.route')
const UnitRouter = require('./router/ItemFieldsRoutes/unit.route')
const secondaryUnitRouter = require('./router/ItemFieldsRoutes/secondaryUnit.route')
const salePriceRouter = require('./router/ItemFieldsRoutes/salePrice.route')
const discountRouter = require('./router/ItemFieldsRoutes/discount.route')
const OpenStockRouter = require('./router/ItemFieldsRoutes/openStock.route')
const stockPriceRouter = require('./router/ItemFieldsRoutes/stockPrice.route')
const PurchasePriceRouter = require('./router/ItemFieldsRoutes/purchasePrice.route')
const itemLocationRouter = require('./router/ItemFieldsRoutes/itemLocation.route')
const StockDateRouter = require('./router/ItemFieldsRoutes/stockDate.route')
const MinStockRouter = require('./router/ItemFieldsRoutes/minStock.route')

const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.use(cors({
  // origin: "http://localhost:5173", // frontend
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/business', BusinessRouter);

// item routes 
app.use('/item', itemRouter);
app.use('/item/category', categoryRouter);
app.use('/item/barcode', BarcodeRouter);
app.use('/item/hsn', HsnRouter)
app.use('/item/unit', UnitRouter)
app.use('/item/secondunit', secondaryUnitRouter)
app.use('/item/saleprice', salePriceRouter)
app.use('/item/discount', discountRouter)
app.use('/item/openstock', OpenStockRouter)
app.use('/item/stockprice', stockPriceRouter)
app.use('/item/purchaseprice', PurchasePriceRouter)
app.use('/item/itemLocation', itemLocationRouter)
app.use('/item/stockDate', StockDateRouter)
app.use('/item/minStock', MinStockRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT)