# 🔪 BladeVault App

[link](https://bladevault-app-893aefd55f3f.herokuapp.com/)

A comprehensive web application for knife enthusiasts, collectors, and professionals to organize, catalog, and manage their knife collections with ease.

## Overview

BladeVault is a full-stack web application built with Node.js, Express, and MongoDB that allows users to create a digital inventory of their knife collection. Whether you're a professional chef, outdoor enthusiast, tactical specialist, or passionate collector, this app provides an elegant solution to track and showcase your blades.


### User Authentication
- Secure user registration and login system
- Personalized collections for each user
- Session-based authentication

### Collection Management
- **Add New Knives** - Complete details including name, material, category, description, and images
- **Edit & Update** - Modify knife information
- **Delete Items** - Remove knives from your collection 
- **Image Upload** - Cloudinary integration for knife photos

### Advanced Organization
- **Categorized System**:
  - Kitchen Knives - Culinary tools and chef's companions
  - Combat Knives - Tactical and defense blades
  - Survival Knives - Outdoor and emergency tools
  - Throwing Knives - Precision and sport blades
  - Automatic Knives - Modern mechanical designs
  - Hunting Knives - Game processing and field use

- **Search** - Find knives instantly by name
- **Category Filtering** - Browse collections by specific types




## Technology Stack

### Backend
- **Node.js** 
- **Express.js** 
- **MongoDB** 
- **Mongoose** 
- **EJS** 

### Frontend
- **CSS3** 
- **JavaScript** 

### Services & Middleware
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **Express-Session** - User session management
- **Method-Override** - RESTful form actions










My app:
- would have homepage with sign in and sign up links
- signing up would contain username, password and confirm password. Filling everything would redirect me to signing in route (all the data will be stored in the database)
- signing in would take me to the user homepage, containing sign out and knives section
- knives route would be a list of knives
 would have option to add a new knife, which leads to new route for knife name, description, material and category, saved to user
- only the owner would be able edit and delete each knife, later saved to user

## Wireframe and ERD 


![ss](https://i.imgur.com/sOIPymC.png)
