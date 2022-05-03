const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require('cors');
const passport = require('passport')

connectDB();





const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(passport.initialize());

require('./config/passport')(passport)






const adminRoutes = require('./routes/authRoute')


const studentRoutes = require('./routes/studentRoute')


// Routes
app.use('/api/admin', adminRoutes)
app.use('/api/student', studentRoutes)



// Error Handler Middleware( should be last piece of middleware)
 app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)