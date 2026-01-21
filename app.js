const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError");
const {listingSchema} = require("./schema.js");
const Review= require("./models/reviews.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// DB connection
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

// View engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Root
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

const validateListing =(req,res,next) =>{
  let {error} = listingSchema.validate(req.body);
  if(error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg)
  }else{
    next();
  }

 }

// INDEX
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
}));

// NEW
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// SHOW
app.get("/listings/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listings/show", { listing });
}));

// CREATE
app.post(
  "/listings", validateListing,
   wrapAsync(async (req, res) => {
    listingSchema.validate(req.body);
    console.log(result);
    if(result.error){
      throw new ExpressError(400,result.error);
    }

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })

);

// EDIT
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listings/edit", { listing });
}));

// UPDATE
app.put("/listings/:id", 
  validateListing,
  wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// DELETE
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.redirect("/listings");
}));

//Reviews 
//Post Route
app.post("/listings/:id/reviews",async(req,res)=>{
  let  listing = await Listing.findById(req.params.id);
  let newReview =new Review(req.body.review);
  listing.reviews.push(newReview);

   await newReview.save();
   await listing.save();

  res.redirect(`/listings/${listing._id}`);

});    


app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs",{message})
  //res.status(statusCode).send(message);
});

app.listen(8060, () => {
  console.log("server is listening on port 8060");
});