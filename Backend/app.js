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
const categoryRouter = require('./router/category.route');
const BarcodeRouter = require('./router/barcode.route')
const HsnRouter = require('./router/hsn.route')
const UnitRouter = require('./router/unit.route')
const secondaryUnitRouter = require('./router/secondaryUnit.route')
const salePriceRouter = require('./router/salePrice.route')
const discountRouter = require('./router/discount.route')
const OpenStockRouter = require('./router/openStock.route')
const stockPriceRouter = require('./router/stockPrice.route')
const PurchasePriceRouter = require('./router/purchasePrice.route')
const itemLocationRouter = require('./router/itemLocation.route')
const StockDateRouter = require('./router/stockDate.route')
const MinStockRouter = require('./router/minStock.route')

const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.use(cors());

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