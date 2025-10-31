@echo off
echo ========================================
echo Brain Parenthood - Shutdown Script
echo ========================================
echo.

echo Stopping all development servers...
npx kill-port 3000 3003 2>nul
if %errorlevel% equ 0 (
    echo Successfully stopped all servers
) else (
    echo No running servers found
)
echo.

echo Cleaning up lock files...
if exist .next\dev\lock (
    del /f /q .next\dev\lock 2>nul
    echo Lock files removed
)
echo.

echo ========================================
echo Shutdown complete!
echo ========================================
pause
