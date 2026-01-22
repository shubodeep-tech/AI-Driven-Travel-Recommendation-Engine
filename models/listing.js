const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const REview = require("./reviews.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true, 
  },

  description: String,

  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === "" || v === null || v === undefined? "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=60"
          : v,
    },
  },

  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref :"Review",

    }
  ]
});

listingSchema.post("findOneAndDelete",async(listing) =>{
  if(listing){
    await Review.deleteMany({_id :{$in : listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports =Listing;
