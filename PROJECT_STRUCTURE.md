# SafeNet Project Structure

```
SafeNet/
│
├── 📖 DOCUMENTATION
│   ├── README.md                   # Main project documentation
│   ├── QUICKSTART.md              # 5-minute setup guide
│   ├── API_DOCUMENTATION.md       # Complete API reference
│   └── DEPLOYMENT.md              # Deployment & production guide
│
├── 🐳 INFRASTRUCTURE
│   ├── docker-compose.yml         # Docker Compose configuration
│   ├── setup.sh                   # Automated setup script
│   └── .gitignore                 # Git ignore rules
│
├── 🔙 BACKEND (Node.js/Express)
│   ├── server.js                  # Main server file
│   ├── package.json               # Dependencies
│   ├── .env                       # Environment variables
│   ├── Dockerfile                 # Container configuration
│   │
│   ├── 📁 models/                 # Database schemas
│   │   ├── User.js                # User model
│   │   ├── Report.js              # Incident report model
│   │   ├── Resource.js            # Learning resource model
│   │   ├── Course.js              # Course model
│   │   ├── UserProgress.js        # User progress tracking
│   │   ├── SecurityTip.js         # Security tips
│   │   └── SupportResource.js     # Support services
│   │
│   ├── 📁 controllers/            # Business logic
│   │   ├── authController.js      # Authentication logic
│   │   ├── reportController.js    # Report handling
│   │   ├── resourceController.js  # Resource management
│   │   ├── courseController.js    # Course management
│   │   ├── supportController.js   # Support resources
│   │   └── securityTipController.js # Security tips
│   │
│   ├── 📁 routes/                 # API endpoints
│   │   ├── auth.js                # Auth routes
│   │   ├── user.js                # User routes
│   │   ├── reports.js             # Report routes
│   │   ├── resources.js           # Resource routes
│   │   ├── courses.js             # Course routes
│   │   ├── support.js             # Support routes
│   │   └── securityTips.js        # Security tip routes
│   │
│   ├── 📁 middleware/
│   │   └── auth.js                # JWT authentication
│   │
│   └── seed.js                    # Database seeding script
│
├── 🎨 FRONTEND (React)
│   ├── package.json               # Dependencies
│   ├── .env                       # Environment variables
│   ├── Dockerfile                 # Container configuration
│   │
│   ├── public/
│   │   └── index.html             # HTML entry point
│   │
│   └── src/
│       ├── App.js                 # Main App component
│       ├── index.js               # React entry point
│       │
│       ├── 📁 pages/              # Page components
│       │   ├── Home.js            # Landing page
│       │   ├── Login.js           # Login page
│       │   └── Register.js        # Registration page
│       │
│       ├── 📁 components/         # Reusable components
│       │   ├── Navbar.js          # Navigation bar
│       │   ├── Footer.js          # Footer
│       │   ├── Courses.js         # Courses listing
│       │   ├── Resources.js       # Resources listing
│       │   ├── ReportIncident.js  # Report form
│       │   ├── Support.js         # Support services
│       │   ├── SecurityTipsWidget.js # Security tips display
│       │   └── AdminDashboard.js  # Admin analytics
│       │
│       └── 📁 services/           # API communication
│           ├── api.js             # Axios configuration
│           └── index.js           # Service functions
│
└── 📋 PROJECT FILES
    ├── .env.example               # Environment template
    └── .gitignore                 # Git ignore file
```

---

## Key Features by Component

### User Management
- **Models**: User.js
- **Controller**: authController.js
- **Routes**: auth.js, user.js

### Incident Reporting
- **Models**: Report.js
- **Controller**: reportController.js
- **Routes**: reports.js
- **Frontend**: ReportIncident.js

### Learning System
- **Models**: Course.js, UserProgress.js, Resource.js
- **Controllers**: courseController.js, resourceController.js
- **Routes**: courses.js, resources.js
- **Frontend**: Courses.js, Resources.js

### Support Services
- **Models**: SupportResource.js, SecurityTip.js
- **Controllers**: supportController.js, securityTipController.js
- **Routes**: support.js, securityTips.js
- **Frontend**: Support.js, SecurityTipsWidget.js

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Security**: bcryptjs

### Frontend
- **Library**: React 18
- **Router**: React Router v6
- **Styling**: Styled Components
- **HTTP**: Axios
- **UI**: React Icons

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Process Manager**: PM2 (production)

---

## API Routes Summary

### Public Routes
- `GET /api/resources` - List resources
- `GET /api/courses` - List courses
- `GET /api/support` - List support services
- `GET /api/security-tips` - List security tips
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Protected Routes (Authenticated)
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `POST /api/reports` - Create report
- `GET /api/reports/user` - Get user reports
- `POST /api/courses/:id/enroll` - Enroll course
- `GET /api/courses/user/progress` - Get progress

### Admin Routes
- `GET /api/reports/all` - All reports
- `PUT /api/reports/:id` - Update report
- `GET /api/reports/stats` - Report statistics

---

## Development Workflow

1. **Frontend Development**: `cd frontend && npm start`
2. **Backend Development**: `cd backend && npm run dev`
3. **Database**: Connect to MongoDB
4. **API Testing**: Use Postman or curl
5. **Production Build**: `npm run build`

---

## File Sizes (Approximate)

- Backend: ~150 KB
- Frontend: ~200 KB (before build)
- Models: ~15 KB
- Controllers: ~25 KB
- Components: ~80 KB

---

## Adding New Features

### New Endpoint
1. Create model in `models/`
2. Create controller in `controllers/`
3. Create route in `routes/`
4. Add service in `frontend/src/services/`
5. Create component in `frontend/src/components/`

### New Database Collection
1. Create schema in `models/`
2. Add endpoints in controllers
3. Update API services
4. Add UI components

---

## Environment Variables

### Backend
```
PORT                # Server port
MONGODB_URI        # Database URL
JWT_SECRET         # Token secret
NODE_ENV           # Environment
FRONTEND_URL       # Frontend URL
```

### Frontend
```
REACT_APP_API_URL  # Backend API URL
```

---

For complete setup instructions, see [QUICKSTART.md](./QUICKSTART.md)
