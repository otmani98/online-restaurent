# Online Resaurant for ordering online with system management

Online Restaurant Ordering System is a full-stack website built in (Node.js Exress.js MongoDb, pug for rendering server side and restful apis with Express)

it empowers customers to easily browse and sort through a diverse menu, add multiple meals to their cart, and securely pay through Stripe. They can also utilize the 'Contact Us' section for inquiries. Meanwhile, the single admin can manage their profile, oversee orders, maintain the menu with CRUD capabilities, add and remove moderators, handle customer messages, and access detailed profit statistics. This comprehensive system ensures a seamless and efficient dining experience for customers, while the admin gains the tools to streamline restaurant operations and make data-driven decisions.

## Documentation

[Documentation](https://documenter.getpostman.com/view/27529827/2s9Y5crz1N)

## Demo

- follow this link bellow to see the project online

  [Demo link](https://online-restaurant.onrender.com/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file and ofcourse you have to create you own accounts that you need like stipre account and atlas mongodb and sendgrid to send emails

`NODE_ENV=production or devlopment`

`ATLAS_DATABASE=`

`PASSWORD_DB=`

`STRIPE_SECRET_KEY=`

`STRIPE_WEBHOOKS_SECRET=`

`JWT_SECRET=`

`JWT_EXPIRES_IN=90d`

`JWT_COOKIE_EXPIRES_IN=90`

`EMAIL_FROM=`

`SENDGRID_USERNAME=apikey`

`SENDGRID_PASSWORD=`

## Installation

Install This project with npm

- first make sure you create confing.env in the folder project after downloaded it with the right environment variables
- open the command line

```bash
  cd ./dir_of_this_project
  npm install
  npm run st
```

- open on the brwoser http://127.0.0.1:3000

## Video to explore the features

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/cRpuuGEN2tk/0.jpg)](https://www.youtube.com/watch?v=cRpuuGEN2tk)

## Features detail of this project

### Customer-facing features

- #### Menu Exploration:

  Easily browse and filter through an extensive menu.

- #### Cart Functionality:

  Add multiple meals to your cart for a convenient checkout process.

- #### Secure Payments:

  Ensure peace of mind with secure payments through Stripe.

- #### Contact Us:

  Directly communicate with the restaurant for inquiries or special requests.

- #### Real-time Order Tracking:
  Monitor order status in real-time for transparency and convenience.

### Admin panel features

- #### Profile Section:

  The admin can access their profile settings to change passwords, usernames, and add an email for password reset functionality, enhancing security and convenience.

- #### Order Management:

  The admin panel allows for the seamless handling of orders. When a paid order is placed, the system immediately notifies the admin. The admin can then manage orders by marking them as pending or executed, maintaining a history of orders for reference.

- #### Menu Management:

  The admin has full CRUD (Create, Read, Update, Delete) capabilities for managing the restaurant's menu. This ensures that the menu is always up-to-date and can be customized to reflect changes in offerings.

- #### Moderator Management:

  While there is only one admin, the system can still support the addition or removal of moderators, with the admin having the sole authority to make these changes. Moderators have limited access, ensuring they cannot manage meals or other moderators. This feature simplifies team management and delegation of responsibilities.

- #### Messages Section:

  Messages from the "Contact Us" section are accessible to the admin, who receives notifications when new messages are received. This facilitates communication between customers and the restaurant.

- #### Statistics and Profit Analysis:
  The admin panel provides comprehensive statistics on profits for the current month and previous months, offering detailed insights into revenue trends, bestselling items, and other relevant financial data. This data can inform business decisions and strategies.
