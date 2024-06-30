# Nike Shoe Store
 This project is a simple Nike clone, built using modern technologies to deliver an exceptional shopping experience for shoe enthusiasts. The website is powered by Next.js for frontend rendering, Tailwind CSS for styling, Strapi for the backend, PostgreSQL for the database, and Stripe as the payment gateway.
# Shoe Store Ecommerce Website (Next.js, Tailwind CSS, Strapi)

![Shoe Store Logo](https://nextshoestore.vercel.app/logo.svg)

## Features

- Browse and explore a diverse collection of shoes.
- View detailed product information and images.
- Add products to the shopping cart.
- Secure and easy checkout process with Stripe payment integration.
- Admin panel to manage products, inventory, and orders.

## Demo

Link to live demo : [Next Shoe Store](https://nikeeshoestore.vercel.app)

## Technologies Used

- Next.js 13: A popular React framework for building fast and scalable applications.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- Strapi: A headless CMS providing a flexible backend for content management.
- PostgreSQL: A robust and open-source relational database for data storage.
- Stripe: A secure and reliable payment gateway for processing online payments.

## Getting Started

These instructions will help you set up a local development environment and get the project running on your machine.

### Prerequisites

- Node.js and npm must be installed on your system.
- PostgreSQL database with credentials for development and production environments.
- Stripe account for handling payments.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vivek-chaprana/shoe-store.git
cd shoe-store-ecommerce
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
Create a .env.local file in the root directory of the project and add the following variables:

```plaintext
STRIPE_SECRET_KEY=your_stripe_secret_key
DATABASE_URL=your_postgres_database_url
```
Replace your_stripe_secret_key with your actual Stripe secret key and your_postgres_database_url with your PostgreSQL database URL.
3. Run the development server
```
npm run dev
```
The application will be accessible at `http://localhost:3000`

### Deployment
To deploy the application to a production server, you can follow the Next.js deployment documentation for your preferred hosting platform.
