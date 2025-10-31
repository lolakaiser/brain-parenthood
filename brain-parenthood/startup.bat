@echo off
echo ========================================
echo Brain Parenthood - Startup Script
echo ========================================
echo.

echo Checking for running instances...
npx kill-port 3000 3003 2>nul
if %errorlevel% equ 0 (
    echo Stopped existing instances
) else (
    echo No running instances found
)
echo.

echo Cleaning build cache...
if exist .next (
    rmdir /s /q .next
    echo Cache cleaned
) else (
    echo No cache to clean
)
echo.

echo Starting development server...
echo Press Ctrl+C to stop the server
echo ========================================
npm run dev
