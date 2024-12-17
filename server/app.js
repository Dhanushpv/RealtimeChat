const express= require('express');
const app =express();
const dotevn = require('dotenv');
dotevn.config();
const mongoConnect = require('./db/connection');
const router = require('./Routers/userRouter');
const authrouter = require('./Routers/authRouter');
// const path = require('path');
// const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');



app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoConnect();


app.use('/api', router);
app.use(router);
app.use(authrouter);

// app.use('/uploads', express.static('uploads'));


app.listen(process.env.PORT,() =>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})


// const express = require('express');
// const dotevn = require('dotenv');
// const mongoConnect = require('./db/connection');
// const userRouter = require('./Routers/userRouter');
// const authRouter = require('./Routers/authRouter');
// const cors = require('cors');

// // Initialize app and environment variables
// const app = express();
// dotevn.config();
// mongoConnect();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Replaces bodyParser.json()
// app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// // Static files
// app.use(express.static("../client")); // Ensure this path is correct

// // Routes
// app.use('/api', router);
// app.use(userRouter);
// app.use(authRouter); // Prefix auth routes with /api/auth

// // Start server
// const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not defined
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
