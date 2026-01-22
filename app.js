const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


// -------------------- DATABASE CONNECTION --------------------
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));


// -------------------- VIEW ENGINE --------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// -------------------- MIDDLEWARES --------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// -------------------- ROUTES --------------------
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


// -------------------- 404 HANDLER (IMPORTANT FIX) --------------------
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


// -------------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message });
});


// -------------------- START SERVER (ONLY ONCE) --------------------
app.listen(8060, () => {
  console.log("server is listening on port 8060");
});