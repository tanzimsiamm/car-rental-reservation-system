
PROJECT NAME : Car Rental Reservation System
LIVE SERVER  : https://assignment-3-lake-nine.vercel.app

This project is a Car Rental Reservation System that allows users to browse, book cars, and manage their reservations, while admins can manage cars and oversee bookings.

----------------------- *Features*------------------------
* User Functionality:

1.User Registration and Login: Users can sign up and log in with secure authentication.
2.Browse Available Cars: Users can view all cars or filter by specific criteria.
3.Book Cars: Users can make bookings for cars, specifying time and date.
4.View and Manage Bookings: Users can view their own bookings and manage them using JWT for authentication.


* Admin Functionality:

1.Create New Cars: Admins can add new cars to the system.
2.Update Cars: Admins can edit existing car details.
3.Delete Cars: Admins can remove cars from the listing.
4.View All Bookings: Admins can view all car bookings and filter by car ID or booking date.
5.Manage Car Returns: Admins can process car returns using booking ID and endTime.


* Key Features:

1.Error Handling: Comprehensive error handling is implemented for robustness.
2.Authentication and Authorization: Secure authentication using JWT and role-based authorization.
3.Validation: Input validation using Zod ensures data integrity.
4.Admin and User Roles: Role-based functionality for admins and users.


How to run the project locally?

1. Install all dependencies by this command 'npm install'.
2. Create a .env file in the root directory.
3. Add your DATABASE_URL, JWT_SECRET, and other environment variables as needed.

**Run the Application**
npm run start:dev

  ******* The packages used in this project :  

- 1. Express.js - Web framework for Node.js.
- 2.TypeScript - Static type-checking for JavaScript.
- 3. Mongoose - MongoDB object modeling tool.
- 4. JWT - JSON Web Token for authentication.
- 5. Zod - Input validation library.
- 6. Dotenv - Environment variable management.