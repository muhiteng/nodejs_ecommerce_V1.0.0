const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const apiError = require("./utils/apiError");
dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
//routes
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
//error
const globalError = require("./middlewares/errorMiddleware");

// Connect with db
dbConnection();

//
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);

app.all("*", (req, res, next) => {
  // const err=new Error(`rout not found : ${req.originalUrl}`);
  // next(err.message);
  next(new apiError(`rout not found : ${req.originalUrl}`, 401));
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
