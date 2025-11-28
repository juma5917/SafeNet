# SafeNet - Digital Literacy & Safety Platform

## Overview
SafeNet is a comprehensive digital literacy platform designed to prevent digital violence before it begins. It provides tools, resources, and community support for users to stay safe online, identify risks, and navigate digital spaces confidently.

## Features

### 🛡️ Core Features
- **Report Incidents**: Confidentially report cyberbullying, harassment, scams, and other online harms
- **Learn with Courses**: Structured courses on digital safety, privacy, and online literacy
- **Access Resources**: Comprehensive articles, videos, and infographics on safety topics
- **Support Services**: Access to helplines, counseling, and legal resources
- **Security Tips**: Daily security tips and best practices
- **Track Progress**: Monitor your learning journey with certificates

### 👥 User Roles
- **Regular Users**: Access to courses, resources, and reporting
- **Survivors**: Additional support resources and survivor-specific content
- **Educators**: Can create courses and resources
- **Admins**: Full platform management and moderation

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Security**: bcryptjs for password hashing

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **Styling**: Styled Components
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Charts**: Chart.js & React ChartJS 2

## Project Structure

```
SafeNet/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Report.js
│   │   ├── Resource.js
│   │   ├── Course.js
│   │   ├── UserProgress.js
│   │   ├── SupportResource.js
│   │   └── SecurityTip.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── reportController.js
│   │   ├── resourceController.js
│   │   ├── courseController.js
│   │   ├── supportController.js
│   │   └── securityTipController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── reports.js
│   │   ├── resources.js
│   │   ├── courses.js
│   │   ├── support.js
│   │   └── securityTips.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── ReportIncident.js
    │   │   ├── Courses.js
    │   │   ├── Resources.js
    │   │   └── Support.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── index.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── package.json
    └── .env
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safenet
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

### Reports
- `POST /api/reports` - Create incident report (protected)
- `GET /api/reports/user` - Get user's reports (protected)
- `GET /api/reports/all` - Get all reports (admin only)
- `PUT /api/reports/:id` - Update report status (admin only)
- `GET /api/reports/stats` - Get report statistics (admin only)

### Resources
- `GET /api/resources` - Get learning resources
- `GET /api/resources/:id` - Get specific resource
- `POST /api/resources` - Create resource (educator/admin only)
- `PUT /api/resources/:id` - Update resource (educator/admin only)
- `DELETE /api/resources/:id` - Delete resource (educator/admin only)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create course (educator/admin only)
- `POST /api/courses/:id/enroll` - Enroll in course (protected)
- `POST /api/courses/:id/lessons/:lesson_id/complete` - Complete lesson (protected)
- `GET /api/courses/user/progress` - Get user progress (protected)

### Support Resources
- `GET /api/support` - Get support resources
- `GET /api/support/:id` - Get specific support resource
- `POST /api/support` - Create support resource (admin only)

### Security Tips
- `GET /api/security-tips` - Get security tips
- `GET /api/security-tips/:id` - Get specific tip
- `POST /api/security-tips` - Create tip (educator/admin only)

## Key Database Schemas

### User
- name, email, password, role, age_group
- profile_completion, learning_progress
- timestamps

### Report
- user_id, incident_type, severity, description
- evidence_url, platform, status, is_anonymous
- timestamps

### Course
- title, description, level, duration_hours
- lessons (array), creator_id
- timestamp

### Resource
- title, category, content, thumbnail_url
- resource_type, difficulty_level, estimated_time
- views, timestamps

## Security Features
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Anonymous reporting option
- CORS protection
- Environment variable configuration

## Usage Examples

### Registering a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123",
    "role": "user",
    "age_group": "18-25"
  }'
```

### Creating an Incident Report
```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "incident_type": "cyberbullying",
    "severity": "high",
    "description": "Repeated harassment on social media",
    "platform": "twitter",
    "is_anonymous": false
  }'
```

## Environment Configuration

### Backend (.env)
```
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/safenet  # MongoDB connection
JWT_SECRET=your_secret_key                 # JWT secret
NODE_ENV=development                       # Environment
FRONTEND_URL=http://localhost:3000         # Frontend URL
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
```

## Deployment

### Backend Deployment (Heroku)
1. Push code to GitHub
2. Connect repository to Heroku
3. Set environment variables in Heroku dashboard
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Connect repository
2. Set environment variables
3. Deploy

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the MIT License.

## Support
For support, contact: support@safenet.org

## Roadmap
- [ ] Mobile app
- [ ] AI-powered content filtering
- [ ] Real-time chat support
- [ ] Video learning modules
- [ ] Community forums
- [ ] AI chatbot for safety guidance
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**SafeNet - Creating a Safer Digital World Together**
