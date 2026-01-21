# AI Driven Travel Recommendation Engine

MERN stack project inspired AI intregrated

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose


 Day 1 - Project Setup
- Project folder setup
- Express app setup
- MongoDB connection
- Listing model created
- Database initialization
- Git & GitHub setup

Day 2 – CRUD Operations

What I worked on
	•	Implemented CRUD operations
	•	Connected routes with controllers
	•	Tested basic functionality

⸻

CRUD Features

Create
	•	Add new data to database
	•	Form data saved successfully

Read
	•	Fetch all records
	•	View single record by ID

Update
	•	Edit existing data
	•	Changes reflected in database

Delete
	•	Remove data by ID
	•	Record deleted permanently

⸻

Files Updated
	•	listing/
	•	models/
	•	views/

Day 3 – UI Layout & Styling 

Work Done
	•	Created main boilerplate layout using EJS
	•	Added reusable navbar component
	•	Added reusable footer component
	•	Integrated Bootstrap for UI styling
	•	Linked Google Font (Plus Jakarta Sans)
	•	Applied global CSS styling
	•	Styled listings index page (card layout)
	•	Styled new listing form
	•	Styled edit listing form
	•	Styled show listing pages

Concepts Used
	•	EJS layouts (ejs-mate)
	•	Partials (navbar, footer)
	•	Bootstrap grid system
	•	Custom CSS
	•	Responsive design basics


Day 4 – Error Handling & Validation

Progress
	•	Implemented client-side form validation
	•	Added success and failure feedback messages
	•	Created custom error handling flow
	•	Added server-side validation middleware

What I Worked On
	•	Built client-side validation using Bootstrap feedback
	•	Handled invalid form submissions gracefully
	•	Created a custom ExpressError class for centralized error handling
	•	Implemented server-side error handling middleware
	•	Added schema-based validation middleware to validate request data
	•	Managed validation errors with meaningful error messages

Concepts Used
	•	Custom Error Class (ExpressError)
	•	Express Error Handling Middleware
	•	Client-side Form Validation
	•	Server-side Schema Validation (Middleware)
	•	Centralized Error Flow
	•	Clean MVC-friendly error handling structure

Files Updated / Added
	•	utils/expressError.js
	•	utils/wrapAsync.js
	•	middleware/validation.js (schema validation)
	•	public/js/script.js
	•	app.js

Day 5 – Reviews & Mongoose Middleware

Progress
	•	Implemented Mongoose middleware
	•	Created Review model
	•	Added client-side validation for reviews
	•	Integrated reviews with listings

What I Worked On
	•	Designed and created a Review schema and model using Mongoose
	•	Linked reviews to listings using ObjectId references
	•	Used Mongoose middleware to handle review-related logic
	•	Added client-side validation for review forms
	•	Ensured invalid review submissions are blocked on the client side
	•	Improved error handling for review operations

Concepts Used
	•	Mongoose Schema & Model
	•	One-to-Many Relationships (Listing → Reviews)
	•	Mongoose Middleware (pre / post hooks)
	•	Client-side Form Validation
	•	Express Routes for Nested Resources
	•	Data Integrity & Validation Flow

Files Updated / Added
	•	models/review.js
	•	models/listing.js
	•	public/js/script.js
	•	views/listings/show.ejs
	•	app.js (or routes/controllers related to reviews)

⸻
