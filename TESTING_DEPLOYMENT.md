# Testing & Deployment Guide

## Pre-Deployment Checklist

### Code Quality
- [ ] TypeScript compilation passes: `npm run build`
- [ ] ESLint linting passes: `npm run lint`
- [ ] No console errors in browser
- [ ] All API endpoints tested

### Frontend Testing
- [ ] Home page loads correctly
- [ ] ML Prediction form renders
- [ ] Sample scenarios work
- [ ] Client-side predictions work
- [ ] Server-side predictions work (if API available)
- [ ] Navigation works
- [ ] Model Performance page displays
- [ ] Analytics page displays
- [ ] Responsive on mobile, tablet, desktop

### Backend Testing
- [ ] API endpoint `/api/predict` responds to GET
- [ ] API endpoint `/api/predict` responds to POST
- [ ] Input validation works
- [ ] Error handling works
- [ ] CORS configured if needed

### ML Model Testing
- [ ] Client ML model imports without errors
- [ ] Model predictions are reasonable
- [ ] Confidence scores make sense
- [ ] Extreme inputs handled properly

## Local Testing

### 1. Build Verification

```bash
# Clean build
rm -rf .next
npm run build

# Expected output:
# ✓ All builds complete
# - wait compiling...
# - Compiling /
# - Compiling /analytics
# - Compiling /model-performance
# ✓ Ready in Xs
```

### 2. Development Server Testing

```bash
# Start dev server
npm run dev

# Expected output:
# > next dev
# ▲ Next.js 16.0.10
# ✓ Ready in Xs
# ○ Listening on http://localhost:3000
```

### 3. Manual Testing Scenarios

#### Scenario 1: Basic Prediction
1. Navigate to http://localhost:3000
2. Use default values (Ta: 22, RH: 50, etc.)
3. Click "Predict Comfort"
4. Verify TSV result is 0 (Neutral/Comfortable)
5. Check confidence > 80%

#### Scenario 2: Sample Scenarios
1. Click "Ideal Office Environment"
2. Form values should update
3. Results should show Comfortable
4. Repeat for other scenarios

#### Scenario 3: Client vs Server
1. Enable "Server-Side" mode
2. Make prediction
3. Toggle to "Client-Side" mode
4. Make same prediction
5. Results should be similar (±1 TSV)

#### Scenario 4: Input Validation
1. Enter temperature 100°C (out of range)
2. Should show error
3. Correct to 22°C
4. Error should clear

#### Scenario 5: ML Model Page
1. Click "ML Model" in navigation
2. Page should load model performance
3. Feature importance chart visible
4. Confusion matrix displayed
5. All metrics shown correctly

#### Scenario 6: Mobile Responsiveness
1. Open DevTools (F12)
2. Toggle device toolbar
3. Select iPhone 12
4. Form should be responsive
5. Navigation should collapse to menu

### 4. API Testing

```bash
# Test GET endpoint
curl http://localhost:3000/api/predict

# Expected response:
# {
#   "model": "Thermal Comfort Random Forest",
#   "version": "1.0.0",
#   "features": [...],
#   "output": "TSV (-3 to 3)",
#   "accuracy": 0.78
# }

# Test POST endpoint
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "ta": 22,
    "tr": 22,
    "rh": 50,
    "v": 0.1,
    "met": 1.0,
    "clo": 0.5
  }'

# Expected response:
# {
#   "success": true,
#   "prediction": {
#     "tsv": 0,
#     "comfort_category": "Comfortable",
#     "confidence": 0.85,
#     "explanation": "..."
#   }
# }
```

### 5. Browser Compatibility Testing

Test in each browser:

```
Chrome/Edge:
- [ ] All features work
- [ ] Performance good
- [ ] Styling correct

Firefox:
- [ ] All features work
- [ ] Charts render
- [ ] Colors match

Safari:
- [ ] All features work
- [ ] Touch interactions work
- [ ] Smooth scrolling
```

### 6. Performance Testing

```bash
# Lighthouse audit (in Chrome DevTools)
1. Open DevTools
2. Click "Lighthouse"
3. Click "Generate report"
4. Check scores:
   - Performance: 85+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

# Check bundle size
npm run build
# Look for final output size
```

### 7. Accessibility Testing

```bash
# Keyboard navigation
1. Tab through all interactive elements
2. Verify focus visible
3. Verify tab order logical
4. Test enter/space to activate buttons

# Screen reader (NVDA/JAWS/VoiceOver)
1. Open with screen reader
2. Verify all content readable
3. Verify form labels present
4. Verify button purposes clear
```

## Production Deployment

### Option 1: Vercel Deployment (Recommended)

#### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected

#### Steps

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel
# Follow prompts:
# - Set project name: thermal-comfort-predictor
# - Framework: Next.js
# - Root directory: ./

# 4. View deployment
vercel --prod

# Expected: Deployment URL
# https://thermal-comfort-predictor-xxxx.vercel.app
```

#### Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select project
3. Settings → Environment Variables
4. Add (if needed):
   - `NEXT_PUBLIC_API_TIMEOUT=5000`
   - `NEXT_PUBLIC_MODEL_VERSION=1.0.0`

### Option 2: Docker Deployment

#### Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

#### Build & Run

```bash
# Build image
docker build -t thermal-comfort:latest .

# Run container
docker run -p 3000:3000 thermal-comfort:latest

# Or with docker-compose
cat > docker-compose.yml << EOF
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
EOF

docker-compose up
```

### Option 3: Traditional Server Deployment

#### On Linux/Ubuntu

```bash
# 1. Connect to server
ssh user@your-server.com

# 2. Clone repository
git clone your-repo
cd thermal-comfort-predictor

# 3. Install dependencies
npm install --production

# 4. Build application
npm run build

# 5. Start with PM2
npm install -g pm2
pm2 start npm --name "thermal-comfort" -- start
pm2 startup
pm2 save

# 6. Configure Nginx (reverse proxy)
sudo apt install nginx
sudo systemctl start nginx
```

#### Nginx Configuration

```nginx
upstream thermal_comfort {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://thermal_comfort;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

#### SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
# Update Nginx config with certificate paths
```

## Post-Deployment Testing

### 1. Health Checks

```bash
# Check application is accessible
curl https://your-domain.com

# Should return HTML homepage
# Status: 200 OK
```

### 2. API Verification

```bash
# Test production API
curl https://your-domain.com/api/predict

# Expected: Model info response
# Status: 200 OK
```

### 3. Frontend Verification

```bash
# Check each page loads
curl -s https://your-domain.com | grep -q "thermal" && echo "✓ Homepage OK"
curl -s https://your-domain.com/model-performance | grep -q "Model" && echo "✓ Model page OK"
curl -s https://your-domain.com/analytics | grep -q "Analytics" && echo "✓ Analytics OK"
```

### 4. Performance Monitoring

```bash
# Monitor in production
# Use Vercel Analytics (if deployed on Vercel)
# Check: https://vercel.com/dashboard

# Or self-hosted monitoring:
# - New Relic
# - DataDog
# - Sentry for error tracking
```

## Continuous Integration/Deployment

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Monitoring & Maintenance

### Log Monitoring

```bash
# Vercel logs
vercel logs https://thermal-comfort.vercel.app

# Docker logs
docker logs -f thermal-comfort

# PM2 logs
pm2 logs thermal-comfort

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Error Tracking Setup

#### Sentry Integration (Optional)

```bash
# Install Sentry
npm install @sentry/nextjs @sentry/cli

# Create Sentry account
# Add SENTRY_AUTH_TOKEN to environment

# Deploy with Sentry
vercel env add SENTRY_AUTH_TOKEN
vercel deploy
```

### Uptime Monitoring

```bash
# UptimeRobot (free)
# 1. Go to https://uptimerobot.com
# 2. Add monitor for your URL
# 3. Set check interval: 5 minutes
# 4. Configure alerts

# Healthchecks.io (free)
# Similar service with more features
```

## Rollback Procedure

### Vercel Rollback

```bash
# View deployment history
vercel deployments

# Rollback to previous
vercel promote <deployment-url>

# Or redeploy specific commit
git revert <commit-hash>
git push
# Vercel auto-deploys on push
```

### Manual Rollback

```bash
# Check git history
git log --oneline

# Revert to previous version
git revert HEAD
git push

# Or checkout previous version
git checkout <commit-hash>
git push --force-with-lease
```

## Performance Optimization

### Production Optimizations

```bash
# 1. Enable compression
# Already done by Next.js

# 2. Image optimization
# Already done by Next.js Image component

# 3. Code splitting
# Already done by Next.js

# 4. CDN caching
# Configure in next.config.js:
```

```javascript
// next.config.mjs
export default {
  headers: async () => [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

### Database Query Optimization (if added)

```typescript
// Example: Use connection pooling
import { Pool } from 'pg';

const pool = new Pool({
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 30000,
  max: 20,
});
```

## Security Checklist

- [ ] HTTPS enabled (SSL/TLS)
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] Rate limiting enabled (if needed)
- [ ] Environment variables not exposed
- [ ] Dependencies up to date
- [ ] SQL injection prevented (N/A - no DB)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented (if needed)

### Security Headers (Nginx)

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self'" always;
```

## Scaling Considerations

### Horizontal Scaling

```bash
# Load balancing setup
# Use Nginx upstream or cloud load balancer

upstream thermal_cluster {
  server app1.local:3000;
  server app2.local:3000;
  server app3.local:3000;
}

server {
  location / {
    proxy_pass http://thermal_cluster;
  }
}
```

### Database Scaling (if added)

```bash
# Connection pooling
# Use PgBouncer for PostgreSQL

# Read replicas
# Scale read operations

# Caching layer
# Redis for frequent predictions
```

### ML Model Scaling

```bash
# Model caching
# Cache predictions for identical inputs

# Batch processing
# Process multiple predictions efficiently

# Distributed inference
# Split model across multiple GPUs (if applicable)
```

## Disaster Recovery

### Backup Strategy

```bash
# Backup code
git clone --mirror your-repo your-repo.git

# Backup configuration
tar -czf config-backup.tar.gz config/

# Automated backups
# Set up via GitHub Actions
```

### Recovery Procedure

```bash
# 1. Restore from git
git clone your-repo-backup

# 2. Reinstall dependencies
npm ci

# 3. Rebuild
npm run build

# 4. Redeploy
npm start
```

## Testing Checklist Summary

### Pre-Deployment
- [ ] Local build succeeds
- [ ] Dev server runs correctly
- [ ] All pages load
- [ ] API endpoints work
- [ ] Predictions reasonable
- [ ] Responsive design works
- [ ] No console errors

### Post-Deployment
- [ ] Production URL accessible
- [ ] API working
- [ ] All pages load
- [ ] Performance acceptable
- [ ] Analytics tracked
- [ ] Monitoring configured
- [ ] Alerts working

## Troubleshooting Deployment Issues

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm ci
npm run build
```

### Runtime Error
```bash
# Check logs
vercel logs <url>
# or
docker logs <container>
# or
pm2 logs thermal-comfort
```

### Performance Issues
```bash
# Check Next.js analytics
# Profile with Chrome DevTools
# Use Lighthouse
# Check resource usage
```

### API Not Responding
```bash
# Check endpoint
curl -v /api/predict

# Check server logs
# Verify environment variables
# Check network connectivity
```

## Support & Next Steps

1. **Monitor in production** - Set up alerts
2. **Gather feedback** - User testing
3. **Optimize** - Based on real usage
4. **Scale** - As traffic grows
5. **Update** - Keep dependencies fresh

For detailed system information, see `ML_SYSTEM.md`.
For setup help, see `INSTALLATION.md`.
For feature information, see `FEATURES.md`.
