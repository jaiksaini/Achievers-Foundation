🌱 Achievers Foundation

«A full-stack NGO management platform built to connect people, manage community initiatives, coordinate members, and simplify donations and organizational operations.»

Achievers Foundation is a modern web application designed for an NGO to manage its members, donors, projects, documents, donations, and administrative operations through a centralized platform.

The project follows a full-stack architecture with a React-based frontend and an Express.js backend, with authentication, role-based access control, payment integration, document management, and cloud services.

---

✨ Features

🌍 Public Platform

- 🏠 Landing/Home page
- 👥 Browse NGO members
- 📂 Access public documents
- 🚀 Explore ongoing projects
- ℹ️ About Us
- 📞 Contact Us
- 🤝 Join the organization
- 💝 Donation system

🔐 Authentication & Security

- User registration and login
- Email verification
- Password reset flow
- JWT-based authentication
- HTTP cookie-based token handling
- Google OAuth authentication
- Role-based authorization
- Protected routes
- Separate authentication flow for members

👤 User Dashboard

Users can:

- View their profile
- Track donations
- Manage account settings
- Access their personalized dashboard

🧑‍🤝‍🧑 Member Dashboard

Members have dedicated functionality for:

- Member overview
- Donation history
- Member ID card
- Account settings

🛠️ Admin Dashboard

Administrators can manage:

- 👥 Members
- 📋 Member requests
- 📄 Documents
- 💰 Donations
- 🚀 Projects
- ⚙️ Administrative settings
- 📊 Dashboard information

💳 Donations

- Donation management
- Donation history
- Payment integration
- Razorpay integration
- Admin donation management

📁 Document Management

- Upload and manage organizational documents
- Cloud-based media handling
- Dedicated document management for administrators

☁️ Cloud & Integrations

- Cloudinary for media management
- Razorpay for payments
- Google OAuth for authentication
- Nodemailer for email functionality

---

🏗️ Tech Stack

Frontend

Technology| Purpose
React 19| UI development
Vite| Frontend tooling
React Router| Application routing
Tailwind CSS| Styling
Zustand| State management
Axios| API communication
Recharts| Data visualization
Lucide React| Icons
React Hot Toast| Notifications

The frontend uses React with Vite and includes Zustand, Axios, React Router, Recharts and other supporting libraries.

Backend

Technology| Purpose
Node.js| Runtime
Express.js| REST API
JWT| Authentication
Passport.js| Authentication strategies
Google OAuth 2.0| Social authentication
bcrypt| Password hashing
Cookie Parser| Cookie handling
CORS| Cross-origin communication
Nodemailer| Email services
Razorpay| Payment processing
Cloudinary| Media storage
Prisma| Database tooling
Mongoose| MongoDB integration
MySQL2| MySQL connectivity

The backend exposes dedicated routes for users, donations, members, documents, projects and categories.

---

🧩 Project Architecture

Achievers-Foundation/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/
│   │   │   ├── Member/
│   │   │   └── User/
│   │   │
│   │   ├── pages/
│   │   │   ├── AuthPages/
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
│   │
│   ├── index.js
│   └── package.json
│
└── README.md

---

🔄 Application Flow

                    ┌──────────────────┐
                    │      Client      │
                    │   React + Vite   │
                    └────────┬─────────┘
                             │
                             │ REST API
                             ▼
                    ┌──────────────────┐
                    │     Express      │
                    │     Backend      │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Authentication   Business Logic   Payments
        JWT / OAuth      Members/Projects  Razorpay
              │              │
              ▼              ▼
         Database       Cloud Services
                       Cloudinary / Email

---

🔑 Role-Based Access

The application separates functionality based on user roles.

                    Authentication
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
           USER         MEMBER        ADMIN
             │            │            │
             ▼            ▼            ▼
         Dashboard     Dashboard    Dashboard
         Donations     ID Card      Members
         Settings      History      Donations
                                    Documents
                                    Projects
                                    Settings

The frontend implements protected routes that check authentication status and authorized roles before allowing access to dashboards and donation functionality.

---

🚀 Getting Started

Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- Required database
- Required API credentials

---

1. Clone the Repository

git clone https://github.com/jaiksaini/Achievers-Foundation.git

cd Achievers-Foundation

---

2. Setup Frontend

cd frontend
npm install
npm run dev

The frontend is built using Vite and provides the development workflow through "npm run dev".

---

3. Setup Backend

Open another terminal:

cd backend
npm install
npm run dev

The backend provides both development and production start commands.

By default, the backend is configured to use port "8000".

---

🔐 Environment Variables

Create a ".env" file inside the backend directory.

Example:

PORT=8000

DATABASE_URL=your_database_url

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password

«Never commit your ".env" file or expose API credentials publicly.»

---

📡 API Structure

The backend organizes its API around separate resources:

/api/user
/api/donation
/api/member
/api/document
/api/projects
/api/category

It also provides Google OAuth endpoints:

/auth/google
/auth/google/callback

These routes are registered directly in the Express application.

---

🛡️ Authentication

The application supports multiple authentication mechanisms:

Email / Password
       │
       ▼
     JWT
       │
       ▼
 HTTP Cookies
       │
       ▼
Protected Routes

Google authentication is also implemented through Passport's Google OAuth strategy.

---

🤝 Contributing

Contributions are welcome!

If you'd like to contribute:

# Fork the repository

# Clone your fork
git clone <your-fork-url>

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes
git add .

# Commit
git commit -m "feat: add your feature"

# Push
git push origin feature/your-feature

Then open a Pull Request.

Contribution Guidelines

- Keep code clean and maintainable
- Follow the existing project structure
- Use meaningful commit messages
- Test your changes before submitting a PR
- Avoid committing secrets or environment variables
- Clearly describe your changes in the Pull Request

---

📌 Future Improvements

Potential areas for future development include:

- [ ] Advanced analytics dashboard
- [ ] Improved donation reporting
- [ ] Automated email notifications
- [ ] Better document categorization
- [ ] Advanced member management
- [ ] Automated deployment pipeline
- [ ] Comprehensive API documentation
- [ ] Automated testing
- [ ] Enhanced monitoring and logging

---

👨‍💻 Contributors

This project is built collaboratively by contributors working across different areas of the application.

Special thanks to everyone who has contributed code, ideas, testing, design, and improvements to the project.

---

⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

Every contribution helps the project grow.

---

<div align="center">🌱 Built with technology for a better community.

Achievers Foundation

</div>
