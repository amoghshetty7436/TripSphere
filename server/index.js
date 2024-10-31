const express = require("express");
const app = express();
const cors = require("cors");

const expressSession = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require('passport');

require("dotenv").config();
require("./config/google_oauth_config");
require('./config/db');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const userRouter = require('./routes/userRoutes');
const destinationRouter = require('./routes/destinationRoutes');
const messageRouter = require('./routes/messageRoutes');
const paymentRouter = require('./routes/payment');

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/destination", destinationRouter);
app.use("/message", messageRouter);
app.use("/payment", paymentRouter);

app.listen(5000, () => console.log("Server running on port 5000"));