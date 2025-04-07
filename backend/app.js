import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';




const app=express();


app.use(cors({
    origin: 'https://solbudget.vercel.app',
    // origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Ensure all necessary methods are allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if needed
}));
app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "website-url"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });


app.use(express.json({
    limit:"50kb",
}));

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());


//authentication routes
import userRouter from './src/routes/user.routes.js'
app.use('/api/user',userRouter);

import accountRouter from './src/routes/account.routes.js'
app.use('/api/account',accountRouter);

import paymentRouter from './src/routes/payment.route.js';
app.use('/api/payment',paymentRouter);

import limitRouter from './src/routes/limit.routes.js';
app.use('/api/limit',limitRouter);

export{app};
