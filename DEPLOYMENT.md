# SafeNet Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Docker Deployment](#docker-deployment)
3. [Cloud Deployment](#cloud-deployment)
4. [Production Checklist](#production-checklist)

---

## Local Development Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn
- Git

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd SafeNet
```

### Step 2: Backend Setup
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/safenet
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF

# Seed database (optional)
node seed.js

# Start server
npm start
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF

# Start frontend
npm start
```

The application will be available at `http://localhost:3000`

---

## Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Quick Start

1. **Clone repository:**
```bash
git clone <repository-url>
cd SafeNet
```

2. **Configure environment:**
```bash
# Update docker-compose.yml with your settings
# Update .env files for backend and frontend
```

3. **Build and run:**
```bash
docker-compose up --build
```

4. **Access application:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### Docker Commands

```bash
# Start containers
docker-compose up

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build
```

---

## Cloud Deployment

### Heroku Deployment (Backend)

1. **Install Heroku CLI:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login to Heroku:**
```bash
heroku login
```

3. **Create Heroku app:**
```bash
heroku create safenet-api
```

4. **Set environment variables:**
```bash
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-secret>
heroku config:set FRONTEND_URL=https://safenet-frontend.netlify.app
```

5. **Deploy:**
```bash
cd backend
git push heroku main
```

### Netlify Deployment (Frontend)

1. **Build frontend:**
```bash
cd frontend
npm run build
```

2. **Connect to Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

3. **Set environment variables in Netlify:**
   - REACT_APP_API_URL: https://safenet-api.herokuapp.com/api

### AWS Deployment

**Using EC2:**

1. **Launch EC2 instance:**
   - OS: Ubuntu 20.04 LTS
   - Type: t3.medium or larger

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install MongoDB:**
```bash
sudo apt-get install -y mongodb
```

4. **Deploy application:**
```bash
git clone <repo>
cd SafeNet/backend
npm install
npm start
```

5. **Use PM2 for process management:**
```bash
npm install -g pm2
pm2 start server.js --name "safenet-api"
pm2 startup
pm2 save
```

**Using AWS Amplify (Frontend):**
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

### Google Cloud Platform (GCP)

**Using App Engine:**

1. **Install Google Cloud SDK**

2. **Create app.yaml:**
```yaml
runtime: nodejs18
env: standard

env_variables:
  MONGODB_URI: "your-mongodb-uri"
  JWT_SECRET: "your-secret"
  NODE_ENV: "production"
```

3. **Deploy:**
```bash
gcloud app deploy
```

---

## Production Checklist

### Security
- [ ] Change all default credentials
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Set secure CORS origin
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Enable CSRF protection
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated
- [ ] Set up security headers

### Performance
- [ ] Enable caching
- [ ] Optimize database indexes
- [ ] Use CDN for static files
- [ ] Implement pagination
- [ ] Enable gzip compression
- [ ] Monitor response times
- [ ] Set up database backups

### Monitoring & Logging
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging (Winston/Morgan)
- [ ] Monitor API endpoints
- [ ] Set up alerts
- [ ] Track user analytics

### Database
- [ ] Set up MongoDB backups
- [ ] Enable authentication
- [ ] Use secure connection string
- [ ] Monitor database performance
- [ ] Plan capacity

### Deployment
- [ ] Use environment-specific configs
- [ ] Set up CI/CD pipeline
- [ ] Implement health checks
- [ ] Set up auto-scaling
- [ ] Prepare rollback plan

### Testing
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Perform load testing
- [ ] Security testing

### Documentation
- [ ] Update README
- [ ] Document API
- [ ] Create runbooks
- [ ] Document deployment process

---

## Environment Variables

### Backend
```
PORT=5000
MONGODB_URI=<your-connection-string>
JWT_SECRET=<strong-random-key>
NODE_ENV=production
FRONTEND_URL=<frontend-url>
```

### Frontend
```
REACT_APP_API_URL=<backend-api-url>
```

---

## Backup & Recovery

### MongoDB Backup

```bash
# Full backup
mongodump --uri "mongodb://username:password@host:port/safenet" --out ./backup

# Restore
mongorestore --uri "mongodb://username:password@host:port" ./backup
```

### Automated Backup (Cron)

```bash
# Add to crontab
0 2 * * * mongodump --uri "mongodb://..." --out /backups/safenet-$(date +\%Y\%m\%d)
```

---

## Monitoring Commands

```bash
# Check application status
curl http://localhost:5000/api/health

# Monitor logs
docker-compose logs -f

# Check database
mongo <connection-string>
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Issues
```bash
# Test connection
mongosh "mongodb://username:password@host:port/safenet"
```

### Frontend Build Issues
```bash
# Clear cache
rm -rf node_modules
npm install
npm run build
```

---

## Performance Tips

1. **Database Indexing:**
```javascript
// Create indexes
db.users.createIndex({ email: 1 })
db.reports.createIndex({ user_id: 1, created_at: -1 })
```

2. **API Response Caching:**
```javascript
// Implement Redis caching
const cache = require('redis').createClient()
```

3. **Compression:**
```javascript
// Use compression middleware
app.use(compression())
```

---

## Support & Troubleshooting

For issues and support:
- Check logs: `docker-compose logs`
- Review error messages in browser console
- Check MongoDB connection
- Verify environment variables
- Test API endpoints with Postman

---

Last Updated: November 2024
