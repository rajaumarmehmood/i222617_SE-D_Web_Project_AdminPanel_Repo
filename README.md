# Heavenly Admin Panel

## Download Link
[Download Heavenly Admin Panel](https://github.com/rajaumarmehmood/i222617_SE-D_Web_Project_AdminPanel_Repo)

## Project Overview
The Heavenly Admin Panel is a comprehensive real estate management solution. This README file will guide you through the structure and functionality of the project.

## Project Structure
The Heavenly Admin Panel is organized into the following key components:

1. **Backend**
   - `config`: Contains configuration files for the application.
   - `db.js`: Database connection setup.
   - `controllers`: Houses the logic for handling user requests and interactions.
   - `middlewares`: Includes middleware functions for authentication, authorization, and other cross-cutting concerns.
   - `models`: Defines the data models and their relationships.
   - `routes`: Handles the routing and mapping of HTTP requests to appropriate controllers.

2. **Frontend**
   - `admin-panel`: Contains the administrative user interface components, pages, stylesheets, etc.
   - `src`: The main source code directory for the frontend application.
   - `assets`: Includes various static assets such as images, icons, and fonts.
   - `components`: Houses the reusable UI components used throughout the application.
   - `pages`: Defines the main pages and their corresponding functionality.

3. **Node Modules**
   - This directory contains the installed npm packages and dependencies required for the project.

4. **Routes**
   - `adminRoutes.js`: Defines the routes for the administrative functionality.
   - `analyticsRoutes.js`: Handles the routes for analytics-related features.
   - `authRoutes.js`: Manages the authentication-related routes.
   - `property.js`: Defines the routes for property-related functionality.
   - `userRoutes.js`: Handles the routes for user-related functionality.

5. **Middlewares**
   - `authMiddleware.js`: Implements the logic for user authentication and authorization.

6. **Models**
   - `adminModel.js`: Defines the data model and schema for admin users.
   - `analyticsModel.js`: Handles the data model and schema for analytics-related data.
   - `Property.js`: Defines the data model and schema for properties.
   - `userModel.js`: Handles the data model and schema for regular users.

7. **Context**
   - `UserContext.js`: Provides the context for managing user-related data and functionality.

8. **Pages**
   - `SettingsPage.js`: Handles the settings-related functionality.
   - `Auth.js`: Defines the login/signup functionality.
   - `DashboardPage.js`: Defines the dashboard management functionality.
   - `ReportsAnalyticsPage.js`: Defines the reports and analytics functionality.
   - `UserManagementPage.js`: Defines the user management functionality.

9. **Styles**
   - `AdminProperties.css`: Styles for the administrative properties-related components.
   - `Auth.css`: Styles for the authentication-related components.
   - `DarkModeToggle.css`: Styles for the dark mode toggle functionality.
   - `DashboardPage.css`: Styles for the dashboard page.
   - Similarly nearly all componenets and pages have there css files in this styles folder.

By understanding this project structure, you can easily navigate and contribute to the Heavenly Admin Panel development.

## Getting Started
To get started with the Heavenly Admin Panel, please follow these steps:

1. Clone the repository: `git clone https://github.com/rajaumarmehmood/i222617_SE-D_Web_Project_AdminPanel_Repo.git`
2. Install dependencies: `npm install`
3. Set up the necessary environment variables (e.g., database connection details, API keys, etc.)
4. Start the development server: `npm run start`
5. Open the application in your browser at `http://localhost:3000`

## Features
The Heavenly Admin Panel offers the following key features:

- Comprehensive property management
- User management and permissions control
- Detailed analytics and reporting
- Configurable settings and preferences
- Responsive and intuitive user interface
- Secure authentication and authorization

## Contributing
We welcome contributions from the community. If you'd like to contribute to the Heavenly Admin Panel, please follow these guidelines:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and ensure all tests pass
4. Submit a pull request with a detailed description of your changes

## Contact
If you have any questions or need further assistance, please feel free to reach out to us:

- Email: rajaumarmehmood2617@gmail.com or at i222617@nu.edu.pk

Thank you for your interest in the Heavenly Admin Panel!