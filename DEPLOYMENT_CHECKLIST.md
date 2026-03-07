# Thermal Comfort Prediction System - Deployment Checklist

Complete this checklist before deploying to production.

## Pre-Deployment Setup

### Environment & Dependencies
- [ ] Node.js 18+ installed: `node --version`
- [ ] Python 3.8+ installed: `python3 --version`
- [ ] npm dependencies installed: `npm install`
- [ ] Python dependencies installed: `pip install -r requirements.txt`
- [ ] Git repository initialized (if deploying to GitHub)

### Dataset & Model
- [ ] India thermal comfort dataset located at: `user_read_only_context/text_attachments/india_data_cleaned-DpII7.csv`
- [ ] Dataset verified (769 rows, 6 columns)
- [ ] ML model trained: `python scripts/train_model.py`
- [ ] Model artifacts exist:
  - [ ] `public/models/model_info.json` ✓
  - [ ] `public/models/client_model.json` ✓
  - [ ] `data/preprocessing_info.json` ✓
- [ ] Model metrics verified (accuracy ~78%)

### Application Testing
- [ ] Application starts: `npm run dev`
- [ ] No console errors on startup
- [ ] Homepage loads correctly
- [ ] Prediction form accessible
- [ ] Sample scenarios working
- [ ] Analytics page displays correctly
- [ ] Model performance page shows metrics

### Prediction Testing
- [ ] Client-side predictions work instantly
- [ ] Server-side API endpoint responds: `curl http://localhost:3000/api/predict-real`
- [ ] Model status check works: `curl http://localhost:3000/api/predict-real` (GET)
- [ ] Form validation works (test invalid inputs)
- [ ] Error handling displays correctly
- [ ] Confidence scores display properly
- [ ] Feature importance visualization renders

### UI/UX Testing
- [ ] All buttons clickable
- [ ] Form inputs accept valid ranges
- [ ] Loading states display correctly
- [ ] Results display with proper formatting
- [ ] Navigation works between pages
- [ ] Responsive design on mobile/tablet
- [ ] No visual glitches or layout issues

## Local Production Build

- [ ] Production build succeeds: `npm run build`
- [ ] No build errors or warnings
- [ ] Build size acceptable (~500KB JavaScript)
- [ ] Build artifacts created: `.next/` directory
- [ ] Production server starts: `npm start`
- [ ] Application works on `http://localhost:3000`
- [ ] All features functional in production mode

## Code Quality

- [ ] No console errors: check browser DevTools
- [ ] No console warnings related to core functionality
- [ ] TypeScript compilation successful: `npm run build`
- [ ] No unused imports or variables
- [ ] Error handling in place for:
  - [ ] Invalid API responses
  - [ ] Network failures
  - [ ] Missing model files
  - [ ] Invalid user inputs

## Performance

- [ ] Initial page load < 3 seconds
- [ ] Prediction response < 500ms
- [ ] No memory leaks (check DevTools)
- [ ] Lighthouse score > 80
- [ ] API response times logged

## Security

- [ ] No hardcoded secrets or API keys
- [ ] Input validation on all form fields
- [ ] API validates all parameters
- [ ] No direct file system access from frontend
- [ ] CORS properly configured
- [ ] Environment variables for sensitive data

## Documentation

- [ ] README.md is current and complete
- [ ] TRAINING_GUIDE.md is accurate
- [ ] INTEGRATION_GUIDE.md describes architecture
- [ ] SYSTEM_README.md has quick start
- [ ] API endpoints documented
- [ ] Error messages are clear and helpful

## Deployment to Vercel

### Pre-Deployment
- [ ] GitHub repository created with latest code
- [ ] All changes committed and pushed
- [ ] No untracked files with sensitive data
- [ ] `.gitignore` updated properly:
  - [ ] `node_modules/`
  - [ ] `.env.local`
  - [ ] `*.pkl`
  - [ ] `.next/`

### Vercel Configuration
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Environment variables configured in Vercel:
  - [ ] `NODE_ENV=production`
  - [ ] Any custom variables needed
- [ ] Build command correct: `npm run build`
- [ ] Start command correct: `npm start`
- [ ] Regions selected appropriate to users

### Deployment Execution
- [ ] Trigger deployment from Vercel dashboard
- [ ] Deployment completes without errors
- [ ] Preview URL generated
- [ ] Preview URL works correctly
- [ ] All pages accessible on preview
- [ ] Predictions work on preview
- [ ] Model status endpoint works

### Post-Deployment Verification
- [ ] Production deployment completes successfully
- [ ] Production URL accessible worldwide
- [ ] All pages load correctly
- [ ] Predictions work (test multiple scenarios)
- [ ] Analytics dashboard functions
- [ ] Model performance page displays correctly
- [ ] No 404 errors for resources
- [ ] API endpoints respond correctly
- [ ] Error handling works on production

## Docker Deployment

### Image Building
- [ ] Dockerfile created and tested locally
- [ ] `docker build -t thermal-comfort:latest .` succeeds
- [ ] No build warnings
- [ ] Image size reasonable (<1GB)
- [ ] `docker run -p 3000:3000 thermal-comfort:latest` works

### Container Testing
- [ ] Container starts without errors
- [ ] Application accessible on http://localhost:3000
- [ ] Model loads correctly in container
- [ ] Predictions work in container
- [ ] All features functional

### Registry Deployment
- [ ] Container pushed to registry (Docker Hub/Private)
- [ ] Image tagged with version
- [ ] Image accessible for deployment
- [ ] Pull and run from registry succeeds

## Monitoring & Maintenance

### Post-Deployment
- [ ] Error logs monitored for 24 hours
- [ ] No critical errors in logs
- [ ] Performance metrics normal
- [ ] User interactions tracked (if enabled)
- [ ] Database queries performing well

### Ongoing
- [ ] Weekly model performance review
- [ ] Monthly user feedback review
- [ ] Quarterly model retraining considered
- [ ] Security updates applied promptly
- [ ] Dependencies kept up-to-date

## Rollback Plan

- [ ] Previous version backed up
- [ ] Rollback procedure documented
- [ ] Rollback tested (if possible)
- [ ] Team trained on rollback process
- [ ] Rollback time estimated < 30 minutes

## Communication

- [ ] Deployment communicated to stakeholders
- [ ] Users notified of new features (if applicable)
- [ ] Support team trained on new features
- [ ] Documentation accessible to users
- [ ] Contact info for issues provided

## Final Sign-Off

### Deployment Manager
- [ ] Name: _______________________
- [ ] Date: _______________________
- [ ] Approved: _____ (initial)

### Tech Lead
- [ ] Name: _______________________
- [ ] Date: _______________________
- [ ] Approved: _____ (initial)

### Product Owner
- [ ] Name: _______________________
- [ ] Date: _______________________
- [ ] Approved: _____ (initial)

## Deployment Execution Notes

Record any issues, timings, or notes during deployment:

```
Start Time: ________________
End Time:   ________________
Issues Encountered:
_____________________________________________________________________________
_____________________________________________________________________________

Resolution:
_____________________________________________________________________________
_____________________________________________________________________________

Performance Metrics:
- Page Load: _______ ms
- API Response: _______ ms
- Model Load: _______ ms

Additional Notes:
_____________________________________________________________________________
_____________________________________________________________________________
```

## Post-Deployment Tasks

- [ ] Monitor error rates for 24 hours
- [ ] Verify all metrics are normal
- [ ] Confirm user access and feedback
- [ ] Update deployment log
- [ ] Close deployment tickets
- [ ] Schedule retrospective meeting
- [ ] Plan next deployment (if needed)

---

**Deployment Status**: Not Started ⬚ | In Progress 🔄 | Completed ✅ | Failed ❌

**Deployment Date**: _______________________

**Deployed By**: _______________________

**Version**: _______________________

For questions or issues, refer to SYSTEM_README.md or contact the development team.
