# Ecommerce Shop

Welcome to Ecommerce, an online store that specializes in selling branded clothing. This project consists of two parts: the **User Interface** and the **Admin Dashboard**.

## Table of Contents

- [User Interface](#user-interface)
- [Admin Dashboard](#admin-dashboard)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)

## User Interface

### Authentication

- **Registration/Login Form:** Displayed when users first land on the page.
- **Post-login:** Users are redirected to the homepage.

### Header

- The header includes:
  - **Logo (Link to Home)**
  - Links to other pages: **Products**, **Home**, and **Search**
  - **Cart Icon:** Opens the cart modal
  - **User Avatar:** Opens a dropdown menu with links to the **Account** page and a **Logout** button.

### Homepage

- **Hero Section:** Features a slider with images fetched from the backend.
- **Category/Brand Sections:** Allows users to filter by category or brand. Clicking on a category or brand redirects to a product listing page.
- **Product Section:** Displays product cards with:
  - Image
  - Price
  - **Add to Cart** button
  - Product cards are available on all pages displaying products.
- **Modal View for Products:** Clicking on a product card opens a modal showing:
  - Product image, name, description, price, and reviews.
  - Users can also leave a review with an input field and a submit button.

### Footer

- Includes general information, contact details, and social media links.

### Products Page

- **Sidebar:** Features filters for brand and category.
- **Load More Button:** Allows loading more product cards.

### Search Page

- **Search Input:** Users can search for specific products.

### Cart

- Displays all items added to the cart, with the total amount calculated.
- Users can adjust the quantity of items in the cart.
- **Checkout Button:** Redirects to the **Account** page.

### Account Page

- Includes tabs for user information and orders.
  - **Personal Information Form:** Users can fill in personal and shipping details, then confirm the purchase.
  - **Orders Tab:** Shows a table with the user’s orders and their status.

### Order Confirmation

- Once an order is completed, users are redirected to the order success page.

## Admin Dashboard

### Dashboard

- **Upload Hero Section Images:** Allows uploading images for the homepage slider.

### Products Section

- Displays all products in the system.
- **Add Product Button:** Allows admins to add new products to the store.

### Orders Section

- Displays all customer orders.
- **Edit Order Status:** Admins can change the status of any order.
- **Order Details:** Admins can view detailed information about each order.

## Technologies Used

1. **React:** Frontend framework for building a dynamic user interface.
2. **Redux Toolkit:** For state management across the application.
3. **Tailwind CSS:** For styling the components in a responsive and modular way.
4. **Node.js:** Backend runtime environment.
5. **MongoDB:** Database for storing product, order, and user data.
6. **Cloudinary:** For managing and storing product images.
7. **PayPal:** For handling payments and transactions.

## Features

- **Authentication:** Users can register and log in.
- **Product Filtering:** Filter products by brand or category.
- **Cart System:** Add products to the cart and proceed with checkout.
- **Admin Dashboard:** Manage products and orders.
- **Responsive Design:** The app is fully responsive, ensuring a seamless experience across all devices.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ecommerce-shop.git
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd ecommerce-shop
   npm install
   ```
3. Set up your `.env` file for environment variables:

   - MongoDB URL
   - Cloudinary API credentials
   - PayPal credentials

4. Run the development servers:

   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`

Enjoy shopping with **Ecommerce**!

![preview](https://github.com/Inna-Mykytiuk/polish-test/blob/main/public/presentation1.jpg)
![preview](https://github.com/Inna-Mykytiuk/polish-test/blob/main/public/presentation2.jpg)
![preview](https://github.com/Inna-Mykytiuk/polish-test/blob/main/public/presentation3.jpg)
