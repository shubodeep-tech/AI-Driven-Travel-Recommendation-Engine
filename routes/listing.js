const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js")

// VALIDATION
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(
      400,
      error.details.map(el => el.message).join(",")
    );
  }
  next();
};

// INDEX
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
}));

// NEW (IMPORTANT: before :id)
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// SHOW (ALWAYS LAST)
router.get("/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews");
  if (!listing) {
    req.flash("error","Listing you requeted for does not exist! ");
    res.direct("/listings");
  }
  res.render("listings/show", { listing });
}));

// CREATE
router.post("/", validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success","New Listing Created!");
  res.redirect(`/listings/${newListing._id}`);
}));

// UPDATE
router.put("/:id",
  isLoggedIn,
   validateListing,
    wrapAsync(async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${req.params.id}`);
}));

// EDIT
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
     req.flash("error","Listing you requested for does not exist! ");
     req.redirect("/listings")

  }

  res.render("listings/edit", { listing });
}));

// DELETE
router.delete("/:id",
  isLoggedIn, wrapAsync(async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
}));


module.exports = router;