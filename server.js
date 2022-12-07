const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

const ApiError = require("./utils/apiError");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");

//error
const globalError = require("./middlewares/errorMiddleware");

// Connect with db
dbConnection();

// Routes
const mountRoutes = require("./routes");
const { webhookCheckout } = require("./services/orderService");

//
const app = express();

// Enable other domains to access your application
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// Checkout webhook
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);

// Middlewares
app.use(express.json());
// to enable access to images by link as:http://localhost:3000/categories/category-3.jpeg
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
mountRoutes(app);

app.all("*", (req, res, next) => {
  // const err=new Error(`rout not found : ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`rout not found : ${req.originalUrl}`, 401));
});
// Global error handling middleware ,
// when there is 4 parameters express know error middleware
app.use(globalError);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// lisen any error out express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error: ${err.name}| ${err.message}`);
  //close server
  server.close(() => {
    console.error("shutting down.....");
    //shutdown application
    process.exit(1);
  });
});
