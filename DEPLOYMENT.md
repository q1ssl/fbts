# FBTS Deployment Guide

## Architecture
- **Production:** nest.q1ssl.com (Flamingo client - LIVE)
- **Staging:** fbts.q1ssl.com (Testing environment)
- **Source:** GitHub q1ssl/fbts (main branch)

## Deployment Workflow

### 1. Local Development
```bash
cd ~/frappe-bench/apps/fbts
# Make changes
git add .
git commit -m "Description"
git push origin main
```

### 2. Deploy to Staging
```bash
ssh root@46.202.164.88
cd /home/erpnext/frappe-bench
bench --site fbts.q1ssl.com backup
cd apps/fbts
git pull origin main
cd ../..
bench --site fbts.q1ssl.com migrate
bench --site fbts.q1ssl.com clear-cache
sudo supervisorctl restart all
```

### 3. Deploy to Production
```bash
# CRITICAL: Backup first!
bench --site nest.q1ssl.com backup
bench --site nest.q1ssl.com migrate
bench --site nest.q1ssl.com clear-cache
sudo supervisorctl restart all
```

## Rollback
```bash
bench --site nest.q1ssl.com restore [backup-file]
```

---
Last Updated: December 21, 2024

## Custom HRMS Configuration

### Job Offer Customization
The HRMS Job Offer DocType has been customized with salary structure fields:
- Salary Structure Tab
- Grade, Salary Structure, Base, Level
- Earnings and Deductions tables

**Location:** `apps/hrms/hrms/hr/doctype/job_offer/job_offer.json`

**Deployment Note:** 
When deploying to new sites, the customized job_offer.json must be present in the HRMS app. The backup is stored at:
- Local: `~/job_offer_custom_backup.json`
- Should be version controlled separately

**Future Improvement:**
This customization should be converted to Custom Fields in the FBTS app for better Git tracking and deployment automation.

