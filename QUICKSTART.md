# SafeNet - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB running (local or MongoDB Atlas)
- Git

### Step 1: Clone & Install (2 minutes)

```bash
git clone <repository-url>
cd SafeNet

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### Step 2: Configure Environment (1 minute)

**Backend `.env`:**
```bash
cd backend
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safenet
JWT_SECRET=development_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF
```

**Frontend `.env`:**
```bash
cd ../frontend
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
```

### Step 3: Start Servers (2 minutes)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

### ✅ Done!

Visit `http://localhost:3000` and start exploring SafeNet!

---

## 🎯 First Steps

1. **Create Account**: Click "Sign Up" and create a user account
2. **Explore Resources**: Check out learning materials in the Resources section
3. **Enroll in Course**: Join a digital literacy course
4. **Report Incident**: (If authenticated) Report any online safety incidents
5. **Access Support**: Find support services in the Support section

---

## 📦 Docker Quick Start

```bash
docker-compose up --build
```

Access at `http://localhost:3000`

---

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas connection string in `.env`

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### Frontend Won't Connect
- Check backend is running on port 5000
- Verify `REACT_APP_API_URL` in frontend `.env`
- Clear browser cache

---

## 📚 Documentation

- [Full README](./README.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

## 🆘 Need Help?

- Check logs: `npm start` output
- Review browser console for frontend errors
- Test API: `curl http://localhost:5000/api/health`

**Contact:** support@safenet.org
