# SafeNet API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user",
  "age_group": "18-25"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User
Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## User Profile Endpoints

### Get User Profile
Retrieve current user's profile information.

**Endpoint:** `GET /user/profile`
**Authentication:** Required

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "age_group": "18-25",
  "profile_completion": 100,
  "learning_progress": 45
}
```

### Update User Profile
Update user information.

**Endpoint:** `PUT /user/profile`
**Authentication:** Required

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "age_group": "18-25",
  "profile_completion": 100
}
```

**Response (200):**
```json
{
  "message": "Profile updated",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe Updated",
    ...
  }
}
```

---

## Report Endpoints

### Create Report
Submit an incident report.

**Endpoint:** `POST /reports`
**Authentication:** Required

**Request Body:**
```json
{
  "incident_type": "cyberbullying",
  "severity": "high",
  "description": "I've been receiving threatening messages on social media",
  "evidence_url": "https://example.com/evidence",
  "platform": "twitter",
  "is_anonymous": false
}
```

**Response (201):**
```json
{
  "message": "Report submitted successfully",
  "report": {
    "_id": "507f1f77bcf86cd799439011",
    "user_id": "507f1f77bcf86cd799439012",
    "incident_type": "cyberbullying",
    "severity": "high",
    "description": "...",
    "status": "reported",
    "created_at": "2024-11-28T10:30:00Z"
  }
}
```

### Get User Reports
Retrieve reports submitted by current user.

**Endpoint:** `GET /reports/user`
**Authentication:** Required

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "incident_type": "cyberbullying",
    "severity": "high",
    "status": "under_review",
    ...
  }
]
```

### Get All Reports (Admin Only)
Retrieve all reports in the system.

**Endpoint:** `GET /reports/all`
**Authentication:** Required (Admin)
**Query Parameters:**
- `status` (optional): "reported", "under_review", "resolved", "dismissed"
- `incident_type` (optional): Incident type filter
- `severity` (optional): "low", "medium", "high", "critical"

**Response (200):**
```json
[...]
```

### Update Report Status (Admin Only)
Change the status of a report.

**Endpoint:** `PUT /reports/:id`
**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "status": "resolved"
}
```

**Response (200):**
```json
{
  "message": "Report updated",
  "report": {...}
}
```

### Get Report Statistics (Admin Only)
Get analytics on incident reports.

**Endpoint:** `GET /reports/stats`
**Authentication:** Required (Admin)

**Response (200):**
```json
{
  "total": 145,
  "byType": [
    {"_id": "cyberbullying", "count": 45},
    {"_id": "harassment", "count": 32}
  ],
  "bySeverity": [
    {"_id": "high", "count": 60},
    {"_id": "medium", "count": 65}
  ],
  "byStatus": [
    {"_id": "resolved", "count": 90},
    {"_id": "under_review", "count": 45}
  ]
}
```

---

## Resource Endpoints

### Get Resources
List learning resources with optional filters.

**Endpoint:** `GET /resources`
**Authentication:** Optional

**Query Parameters:**
- `category` (optional): Filter by category
- `difficulty_level` (optional): "beginner", "intermediate", "advanced"
- `resource_type` (optional): "article", "video", "infographic", "podcast", "tool"

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Understanding Cyberbullying",
    "category": "safety_tips",
    "content": "...",
    "resource_type": "article",
    "difficulty_level": "beginner",
    "estimated_time": 8,
    "views": 234
  }
]
```

### Get Resource by ID
Retrieve a specific resource.

**Endpoint:** `GET /resources/:id`
**Authentication:** Optional

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Understanding Cyberbullying",
  ...
}
```

### Create Resource (Educator/Admin)
Add a new learning resource.

**Endpoint:** `POST /resources`
**Authentication:** Required (Educator/Admin)

**Request Body:**
```json
{
  "title": "Social Media Safety Guide",
  "category": "privacy_guide",
  "content": "A comprehensive guide to protecting your privacy on social platforms...",
  "resource_type": "article",
  "difficulty_level": "beginner",
  "estimated_time": 10,
  "thumbnail_url": "https://example.com/image.jpg"
}
```

**Response (201):**
```json
{
  "message": "Resource created",
  "resource": {...}
}
```

### Update Resource (Educator/Admin)
Modify an existing resource.

**Endpoint:** `PUT /resources/:id`
**Authentication:** Required (Educator/Admin)

**Response (200):**
```json
{
  "message": "Resource updated",
  "resource": {...}
}
```

### Delete Resource (Educator/Admin)
Remove a resource.

**Endpoint:** `DELETE /resources/:id`
**Authentication:** Required (Educator/Admin)

**Response (200):**
```json
{
  "message": "Resource deleted"
}
```

---

## Course Endpoints

### Get Courses
List available courses.

**Endpoint:** `GET /courses`
**Authentication:** Optional

**Query Parameters:**
- `level` (optional): "beginner", "intermediate", "advanced"

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Digital Literacy 101",
    "description": "A beginner's guide to staying safe online",
    "level": "beginner",
    "duration_hours": 4,
    "lessons": [...],
    "creator_id": {...}
  }
]
```

### Get Course by ID
Retrieve a specific course.

**Endpoint:** `GET /courses/:id`
**Authentication:** Optional

**Response (200):**
```json
{...}
```

### Create Course (Educator/Admin)
Add a new course.

**Endpoint:** `POST /courses`
**Authentication:** Required (Educator/Admin)

**Request Body:**
```json
{
  "title": "Advanced Cybersecurity",
  "description": "Deep dive into cybersecurity best practices",
  "level": "advanced",
  "duration_hours": 12,
  "lessons": [
    {
      "lesson_number": 1,
      "title": "Encryption Basics",
      "content": "Learn how encryption protects data...",
      "quiz_questions": [
        {
          "question": "What is encryption?",
          "options": ["Option A", "Option B"],
          "correct_answer": 0
        }
      ]
    }
  ]
}
```

**Response (201):**
```json
{
  "message": "Course created",
  "course": {...}
}
```

### Enroll in Course
Join a course.

**Endpoint:** `POST /courses/:id/enroll`
**Authentication:** Required

**Response (201):**
```json
{
  "message": "Enrolled successfully",
  "progress": {
    "_id": "507f1f77bcf86cd799439011",
    "user_id": "507f1f77bcf86cd799439012",
    "course_id": "507f1f77bcf86cd799439013",
    "overall_progress": 0,
    "certificate_earned": false
  }
}
```

### Complete Lesson
Mark a lesson as completed.

**Endpoint:** `POST /courses/:id/lessons/:lesson_id/complete`
**Authentication:** Required

**Request Body:**
```json
{
  "quiz_score": 85
}
```

**Response (200):**
```json
{
  "message": "Lesson completed",
  "progress": {...}
}
```

### Get User Progress
View user's course progress.

**Endpoint:** `GET /courses/user/progress`
**Authentication:** Required

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "user_id": "507f1f77bcf86cd799439012",
    "course_id": {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Digital Literacy 101",
      ...
    },
    "overall_progress": 50,
    "certificate_earned": false
  }
]
```

---

## Support Resource Endpoints

### Get Support Resources
List support services and resources.

**Endpoint:** `GET /support`
**Authentication:** Optional

**Query Parameters:**
- `type` (optional): "helpline", "counseling", "legal_aid", "shelter", "online_support"
- `availability` (optional): "24/7", "business_hours", "scheduled"
- `region` (optional): Region/country filter

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "National Cyberbullying Helpline",
    "description": "Free support for cyberbullying victims",
    "type": "helpline",
    "contact_info": {
      "phone": "1-800-CYBER-911",
      "email": "support@cyberbullyinghelp.org",
      "website": "https://cyberbullyinghelp.org"
    },
    "availability": "24/7",
    "languages": ["English", "Spanish"],
    "serving_regions": ["USA", "Canada"]
  }
]
```

### Get Support Resource by ID
Retrieve specific support resource.

**Endpoint:** `GET /support/:id`
**Authentication:** Optional

**Response (200):**
```json
{...}
```

### Create Support Resource (Admin Only)
Add new support resource.

**Endpoint:** `POST /support`
**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "Crisis Support Line",
  "description": "24/7 crisis support",
  "type": "helpline",
  "contact_info": {
    "phone": "1-800-CRISIS",
    "email": "help@crisis.org"
  },
  "availability": "24/7",
  "languages": ["English", "Spanish"],
  "serving_regions": ["USA"]
}
```

**Response (201):**
```json
{
  "message": "Support resource created",
  "resource": {...}
}
```

---

## Security Tips Endpoints

### Get Security Tips
List security tips with optional filters.

**Endpoint:** `GET /security-tips`
**Authentication:** Optional

**Query Parameters:**
- `category` (optional): Tip category
- `severity` (optional): "informational", "important", "critical"
- `risk_level` (optional): "low", "medium", "high"

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Enable Two-Factor Authentication",
    "category": "password_security",
    "tip": "Always enable 2FA for important accounts",
    "severity": "important",
    "risk_level": "high"
  }
]
```

### Get Security Tip by ID
Retrieve a specific tip.

**Endpoint:** `GET /security-tips/:id`
**Authentication:** Optional

**Response (200):**
```json
{...}
```

### Create Security Tip (Educator/Admin)
Add a new security tip.

**Endpoint:** `POST /security-tips`
**Authentication:** Required (Educator/Admin)

**Request Body:**
```json
{
  "title": "Use VPN for Public WiFi",
  "category": "privacy",
  "tip": "Always use a VPN when connecting to public WiFi networks",
  "severity": "important",
  "risk_level": "high"
}
```

**Response (201):**
```json
{
  "message": "Security tip created",
  "securityTip": {...}
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Unauthorized role"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Rate Limiting
No rate limiting currently implemented. Production deployment should include rate limiting.

## CORS
CORS is enabled for frontend URL specified in environment variables.

## Pagination
Pagination support can be added to list endpoints by adding `limit` and `skip` query parameters.
