# NestQuest
Accomodation Booking application

Web Link: https://nest-quest-accomodation-booking.vercel.app/


**Introduction:**
The project aims to develop a comprehensive booking app that simplifies the process of
reserving accommodations and experiences. In today's fast-paced world, travelers often seek a
quick
and convenient way to book stays, activities, and services. Our solution, the ‘NestQuest’ app,
will
address this need by offering a user-friendly platform for users to schedule and manage a
wide range of bookings effortlessly.

### Unique Features/Novelty:
• User profiles with profile-specific information
• Implement a strong booking system with booking calendars, and support for multiple
booking options system
• Upload pictures to accommodations using links or from your device
• Edit created accommodations and update the details.


**Modules:**
• Authentication and User Management: This module will handle user registration, login,
and profile management.
• Accommodation Management: This module will manage property listings, including
property details, images, pricing, and availability.
• Booking Management: This module will handle booking requests, adding specific
bookings to the user profiles
Modules to Operations:
• Create New Accommodations: Users can easily add new accommodation listings by
providing general information about the property, such as Title, address, and occupancy
details. They can also describe the property's unique features and amenities, set pricing,
and availability, and upload images to showcase their space.
• Update Listing: Hosts have the flexibility to update their property listings at any time. This
includes modifying property details, changing pricing, and updating availability. Hosts
can also add or delete images to keep the listing current and appealing.
• View Accommodation Details/List: Users can view detailed information about each
accommodation listing, including property description, images, pricing, availability
calendar, host contact information, and user reviews. Users can also browse a list of
available properties. The home page consists of all the accommodations available on the
website. Users can click on any accommodation to get more details about it. Clicking on
that would open a new page and show more images of that booking. Users can also book
the place from that page.
• Delete Listing: Hosts have the option to delete their property listings or temporarily set
them as invisible on the platform. This flexibility allows hosts to manage their listings as
needed.
• Send Booking Requests: Guests can send booking requests to hosts for specific
accommodations

From Operations to Pages:
I have used Node.js and Express.js for backend, react for frontend and MongoDB for Database
I have completed the following pages and the remaining ones are in progress
Home Page:
Login Page
Registration Page
Profile Page:
Bookings Page:
Accomodations Page:
Add New Accommodation:
Places Details:
Show More Photos:


**Database design schema**

• User Entity:
It stores information about users, including their name, email, and password.
user_id is the primary key.
email is marked as unique to ensure each user has a unique identifier.
Table Name: users
Fields:
user_id (Primary Key, Auto-increment)
name (String)
email (String, Unique)
password (String)

• Place Entity:
It represents information about places, including details like title, address, and pricing.
place_id is the primary key.
owner_id is a foreign key referencing the users table, indicating the owner of the place.
Table Name: places
Fields:
place_id (Primary Key, Auto-increment)
owner_id (Foreign Key referencing users.user_id)
title (String)
address (String)
photos (Array of Strings)
description (String)
perks (Array of Strings)
extraInfo (String)
checkIn (Number)
checkOut (Number)
maxGuests (Number)
price (Number)

• Booking Entity:
It records the information about bookings, including check-in and check-out dates.
booking_id is the primary key.
place_id and user_id are foreign keys linking to the places and users tables, respectively.
Table Name: bookings:
Fields:
booking_id (Primary Key, Auto-increment)
place_id (Foreign Key referencing places.place_id)
user_id (Foreign Key referencing users.user_id)
checkIn (Date)
checkOut (Date)
name (String)phone (String)
price (Number)
Table Entries:

**Testing**

• Homepage Exploration:
Open the website and land on the homepage.
Explore the featured accommodations displayed on the homepage.

• Accommodation Details:
Click on any accommodation to view more details.
Browse through pictures, read the description, and check available amenities.

• Booking Process:
Decide on an accommodation and click on the booking option.
Fill in the required information, including dates, number of guests, name, and phone
number.

• User Profile Interaction:
Login or register to get access
Navigate to the user profile section.
Check the bookings section to view details of the reservations made.

• Adding New Accommodation:
In the profile section, find the accommodation management area.
Explore already added accommodations and click on "Add New Place" if the user wants
to list a new accommodation.

• Editing Accommodation Listing:
If the user already has accommodations listed, click on the existing accommodation to
edit details.

• Logout: A user can go to the profile section and click on logout
