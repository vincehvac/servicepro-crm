@echo off
REM Windows batch script to push ServicePro CRM to GitHub
REM Run this from the servicepro-crm directory

echo.
echo ========================================
echo  Pushing ServicePro CRM to GitHub
echo ========================================
echo.

REM Initialize git if needed
if not exist .git (
    echo Initializing Git repository...
    git init
)

REM Add all files
echo Adding files...
git add .

REM Commit
echo Creating commit...
git commit -m "Initial commit: Complete ServicePro Elite CRM - Full-stack HVAC Service Management System with Next.js, TypeScript, Supabase"

REM Set remote
echo Setting remote repository...
git remote add origin https://github.com/vincehvac/servicepro-crm.git 2>nul
if errorlevel 1 git remote set-url origin https://github.com/vincehvac/servicepro-crm.git

REM Push
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo  Done! Your code is now on GitHub
echo ========================================
echo.
echo Repository: https://github.com/vincehvac/servicepro-crm
echo.
echo Next steps:
echo 1. Set up Supabase (see SUPABASE_SETUP.md)
echo 2. Deploy to Vercel (see ONE_CLICK_DEPLOY.md)
echo.
pause