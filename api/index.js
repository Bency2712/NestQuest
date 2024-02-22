// Importing required libraries and modules
const limiter = require('express-rate-limit')
const express=require('express')
const cors=require('cors');
const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
//const PlacesFormPage  = require('../client/src/pages/PlacesFormPage.jsx');
const {S3Client, PutObjectCommand}=require('@aws-sdk/client-s3')
const fs = require('fs');
const multer = require('multer');
const mime = require('mime-types');

// Importing models
const Place = require('./models/Place.js');
const User=require('./models/user.js');
const Booking = require('./models/booking.js');

// Configuring environment variables
require('dotenv').config();

// Creating an Express application
const app=express();

// Setting up constants and middleware
const bcryptSalt= bcrypt.genSaltSync(10);
const jwtSecret = 'sdcjkscjsjklaklks';
const path = require('path');
const bucket = "nestquest-uploads";

// Middleware for handling JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Serving static files from the '/uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuring Cross-Origin Resource Sharing (CORS)
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5174'
}));

// Function to upload files to AWS S3
async function uploadToS3(path, originalFilename, mimetype) {
    const client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    // Generating a new filename and uploading the file to S3
    const parts = originalFilename.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: 'public-read',
    }));

    // Returning the URL of the uploaded file
    return (`https://${bucket}.s3.amazonaws.com/${newFilename}`);
  }


  //https://nestquest-uploads.s3.amazonaws.com/
 // Destination: https://s3.console.aws.amazon.com/s3/buckets/nestquest-uploads?region=us-east-2&tab=objects

console.log(path.join(__dirname, 'uploads'));





// Connecting to the MongoDB database
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);


// Defining a route for testing purposes
app.get('/api/test', (req,res) =>{
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok');
});

// Route for user registration
app.post('/api/register', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password} = req.body;

    try{
        // Creating a new user document in the database
        const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    });

    // Returning the user document in the response
    res.json(userDoc);
}

// Handling errors and returning a 422 status code with the error details
catch(e)
{
    res.status(422).json(e);
}
});



//limiting login attempts
const loginLimiter = limiter(
    {windowMs: 15 * 60 * 1000,
    max: 3,
    handler:(req,res)=>{
        console.log(req.rateLimit);
        const date = new Date(req.rateLimit.resetTime);
        res.status(429).json({
            message:"fail",
            payload: `Too many failed requests, try again at ${req.rateLimit.resetTime}`,
        })
    },
    requestWasSuccessful: (request, response) => response.statusCode < 400,
    skipSuccessfulRequests:true, 
    });

// Route for user login and applying rate limiter middleware to it
app.post('/api/login',loginLimiter, async(req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password}=req.body;

    // Finding a user with the provided email
    const userDoc = await User.findOne({email});

    if(userDoc){
        // Checking if the provided password matches the hashed password in the database
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            // Creating a JWT token and setting it as a cookie in the response
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id, 
                
            }, jwtSecret, {}, (err,token) =>{
                if(err) throw err;
                res.cookie('token', token).json (userDoc);
            });
            
        }
        else{
            // Handling incorrect password
            res.status(422).json('pass not ok');
        }
    }
    else
    {
         // Handling user not found
        res.json('not found');
    }
});

// Route for user profile information
app.get('/api/profile',(req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;

    // Verifying the JWT token to get user data
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err,userData) =>{

        if (err) throw err;
        // Retrieving user details and sending them in the response
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
    });
    }
    else{
        // Sending null if no token is present
        res.json(null);
    }
});

app.post('/api/logout', (req,res) => {
    res.cookie('token', '').json(true);
  });

// Route for handling file upload via link
  app.post('/api/upload-by-link', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';

    // Downloading an image from the provided link
    await imageDownloader.image({
        url: link,
        dest: '/tmp/' + newName,
    });

    // Uploading the downloaded image to AWS S3 and sending the URL in the response
    const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
    res.json(url);
  })

  // Middleware for handling photo uploads
  const photosMiddleware = multer({dest:'/tmp'});

  // Route for handling file uploads with multiple photos
  app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
    console.log('File upload request received');

    // Uploading each file to AWS S3 and collecting the URLs in an array
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const {path,originalname,mimetype} = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url);
    }
    // Sending the array of URLs in the response
    res.json(uploadedFiles);
  });


  // Route for creating a new place
app.post('/api/places', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {title, address, addedPhotos,
            description, perks, extraInfo,checkIn,checkOut,maxGuests,price}=req.body;
    // Verifying the JWT token to get user data
            jwt.verify(token, jwtSecret, {}, async (err,userData) =>{

        if (err) throw err;
        // Creating a new place with the owner's ID and other details
        const placeDoc = await Place.create({
            owner:userData.id,price,
            title, address, photos:addedPhotos,
            description, perks, extraInfo,checkIn,checkOut,maxGuests,price
        
    });
    // Sending the newly created place in the response
    res.json(placeDoc);


});
});

// Route for retrieving user's own places
app.get('/api/user-places', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    // Verifying the JWT token to get user data
    jwt.verify(token, jwtSecret, {}, async (err,userData) =>{
const {id} = userData;

// Fetching places owned by the user and sending them in the response
res.json(await Place.find({owner:id}));
       });
});

// Route for retrieving details of a specific place by its ID
app.get('/api/places/:id', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} =req.params;

    // Fetching details of the specified place by its ID and sending in the response
    res.json(await Place.findById(id));
});
// Route for updating place details
app.put('/api/places', async (req,res) =>{
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const{
        id,title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut,maxGuests,price
    } = req.body;
   
     // Verifying the JWT token to get user data
    jwt.verify(token, jwtSecret, {}, async (err,userData) =>{
        if (err) throw err;

        // Fetching the place by its ID
        const placeDoc= await Place.findById(id);

        // Checking if the authenticated user is the owner of the place
    if(userData.id===placeDoc.owner.toString()){
        // Updating place details and saving changes
        placeDoc.set({
            title, address, photos:addedPhotos,
            description, perks, extraInfo,checkIn,checkOut,maxGuests,price});
        await placeDoc.save();
        // Sending success message in the response
        res.json('ok');
    }
});
})
// Route for retrieving all places
app.get('/api/places', async(req,res) =>  {
    mongoose.connect(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL);

    // Fetching all places and sending in the response
    res.json(await Place.find());
})

// Route for creating bookings
app.post('/api/bookings', async (req,res)=> {
    mongoose.connect(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL);

    // Fetching user data from the request
    const userData = await getUserDataFromReq(req);
    const {
        place,checkIn,checkOut,numberOfGuests,name,phone,price
    }=req.body;

    // Creating a new booking and sending it in the response
     Booking.create({
        place,checkIn,checkOut,numberOfGuests,name,phone,price,
        user:userData.id
    }).then((doc) =>{

        res.json(doc);
    }).catch((err)=> {
        throw err;
    });

});

async function getUserDataFromReq(req){
    mongoose.connect(process.env.MONGO_URL);
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err,userData) =>{
            if(err) throw err;
            resolve (userData);
        });
    });
   
}

// Route for retrieving user's bookings
app.get('/api/bookings', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL);
    // Fetching user data from the request
    const userData = await getUserDataFromReq(req);
    const bookings = await Booking.find({ user: userData.id }).populate('place');
        res.json(bookings);
});

app.listen(3000);