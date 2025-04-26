#!/bin/bash

# Backup current state
echo "Creating backup..."
cp -r . ../app-citoyennete-backup

# Stage changes
echo "Staging changes..."
git add package.json app.json README.md PLAN.md
git add CONTENT_FRAMEWORK.md CONTENT_EXTRACTION.md
git add APP_STORE_CHECKLIST.md IMPROVEMENTS.md RENAME_PLAN.md

# Commit changes
echo "Committing changes..."
git commit -m "refactor: rename project to app-citoyennete

- Update package name and configurations
- Update documentation
- Harmonize naming conventions
- Remove Lovable references"

# Instructions for manual steps
echo "
=== Manual Steps Required ===

1. Rename the directory:
   cd ..
   mv app_naturalisation_lovable app-citoyennete

2. Update Git remote (if needed):
   cd app-citoyennete
   git remote set-url origin [new-repository-url]

3. Push changes:
   git push origin main

A backup has been created at: ../app-citoyennete-backup
"