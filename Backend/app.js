import express  from 'express';
import categoryRouter from './routes/category.routes.js';
import userRouter from './routes/user.routes.js';
import vendorRouter from './routes/vendor.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';
import cartRouter from './routes/cart.routes.js';
import wishlistRouter from './routes/wishlist.routes.js'
import reviewRouter from './routes/review.route.js'
import adminRouter from './routes/admin.route.js'
import paymentRouter from './routes/payment.route.js'
import cors from 'cors';
// import dotenv from 'dotenv';
import { connection } from './config/dbConfig.js';
import bodyParser from 'body-parser';
import path from "path"
import { fileURLToPath } from 'url';
// dotenv.config();

const app = express();
app.use(cors());

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/category', categoryRouter);
app.use('/user', userRouter);
app.use('/vendor', vendorRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/review', reviewRouter);
app.use('/admin', adminRouter);
app.use('/payment', paymentRouter);
app.listen(4000, () => {
    console.log("server started....");
});